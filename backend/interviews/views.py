from rest_framework.decorators import api_view
from twilio.twiml.voice_response import Gather, VoiceResponse


# import pandas as pd
from nltk.tokenize import word_tokenize, sent_tokenize
import re
from nltk.corpus import stopwords
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import speech_recognition as sr
from .models import Question,Answer
from .serializers import QuestionSerializer
from rest_framework.response import Response
from django.http import HttpResponse



@api_view(["GET"])
def getQuestion(request):
    if request.method == 'GET':
        question = Question.objects.all()
        
        serializer = QuestionSerializer(question,many=True)
        
        return Response(serializer.data)
    
    
    

@api_view(
    ["POST"],
)
def saveNotes(request,id):
    if(request.method == 'POST'):
        note = request.data.get('note')
        username = request.data.get('username')
        question = Question.objects.get(pk=id)
        compareText = question.compare_text
        answer = Answer(answer=note,user=username,questionId=id)
        answer.save()
        return Similarity(request,note,compareText)
        

# def test(request,note,compareText):
#     print('my note is : ',note)
#     print('compare text is : ',compareText)
#     return HttpResponse('moha')
    


    



# def Similarity(request, filename, comparefile):
def Similarity(request,note,compareText):
        
        # compareText = Question.objects.get(pk=id)
        # get comparefile from database
        # get compare_text from database and convert the text to file and name it comparefile.
        
        # recive recorded text from frontend and convert it to file and name it filename
        
        file_docs = []
        with open (comparefile) as f:
            tokens = sent_tokenize(f.read())
            for line in tokens:
                file_docs.append(line)
        file_docs
        
        text = []
        with open (filename) as f:
            tokens = sent_tokenize(f.read())
            for line in tokens:
                text.append(line)
        text

        # this function returns a list of tokenized and stemmed words of any text
        
        def get_tokenized_list(doc_text):
            doc_text = re.sub("^\d+\s|\s\d+\s|\s\d+$", " ", doc_text)
            doc_text = re.sub('[()]', '', doc_text)

            doc_text = doc_text.lower()
            tokens = nltk.word_tokenize(doc_text)
            return tokens

        # This function will performing stemming on tokenized words
        def word_stemmer(token_list):

            ps = nltk.stem.PorterStemmer()
            stemmed = []
            for words in token_list:
                stemmed.append(ps.stem(words))
            return stemmed


        # Function to remove stopwords from tokenized word list
        def remove_stopwords(doc_text):

            cleaned_text = []
            for words in doc_text:
                if words not in stop_words:
                    cleaned_text.append(words)
            return cleaned_text

        def convert_to_lower(text):
            input_str = text.lower()
            return input_str

        
        #print(stopwords.words('english'))
        stop_words = set(stopwords.words('english'))
        cleaned_corpus = []
        #text = str(text)
        for doc in [str(text)]:

            tokens = get_tokenized_list(doc)
            doc_text = remove_stopwords(tokens)
            doc_text  = word_stemmer(doc_text)
            doc_text = ' '.join(doc_text)
            cleaned_corpus.append(doc_text)
        cleaned_corpus

        cleaned_corpus2 = []
        for doc in file_docs :

            tokens = get_tokenized_list(doc)
            #print(tokens)
            doc_text = remove_stopwords(tokens)
            #print(doc_text)
            doc_text  = word_stemmer(doc_text)
            #print(doc_text)
            doc_text = ' '.join(doc_text)
            #print(doc_text)
            cleaned_corpus2.append(doc_text)
        cleaned_corpus2
        def clean_text(document):
            '''it must take a list and it will return it cleaned'''
            cleaned_corpus = []
            for doc in document:
                tokens = get_tokenized_list(doc)
                doc_text = remove_stopwords(tokens)
                doc_text  = word_stemmer(doc_text)
                doc_text = ' '.join(doc_text)
                cleaned_corpus.append(doc_text)
                print("document after cleaning: "+doc_text)

        clean_text(file_docs)
        
        clean_text(text)

        tfidf_vectorizer = TfidfVectorizer()
        vectorizer = CountVectorizer()
        #y = vectorizer.fit_transform(file_docs)
        tfidf_matrix_train = tfidf_vectorizer.fit_transform(file_docs)
        tfidf_matrix_test = tfidf_vectorizer.transform(text)
        cosine_similarity(tfidf_matrix_train,tfidf_matrix_test)

        tfidf_vectorizer = TfidfVectorizer()
        vectorizer = CountVectorizer()
        #y = vectorizer.fit_transform(file_docs)
        tfidf_matrix_train2 = tfidf_vectorizer.fit_transform(cleaned_corpus2)
        tfidf_matrix_test2 = tfidf_vectorizer.transform(cleaned_corpus)
        cosine_similarity(tfidf_matrix_train2,tfidf_matrix_test2,dense_output=True)
        sim=cosine_similarity(tfidf_matrix_train2,tfidf_matrix_test2,dense_output=True)*100
        return sim[0]

        















        

