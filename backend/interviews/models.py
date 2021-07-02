from django.db import models
from django.utils import timezone as _timezone



class Interview(models.Model):
    """
    Lma al model yshtaghal m7tageen n3ml foreign key m3 al user
    """
    interview_id = models.IntegerField()
    start_date = models.DateTimeField(default=_timezone.now)


class Question(models.Model):
    question = models.TextField(max_length=1000, blank=True)
    compare_text = models.TextField(max_length=1000, blank=True)
    question_period = models.IntegerField()
    
    def __str__(self):
        return self.question
    
class Answer(models.Model):
    answer = models.TextField(max_length=1000, blank=True)
    user = models.CharField(max_length=200,default='')
    questionId = models.IntegerField()
    
    def __str__(self):
        return self.answer


class Feedback(models.Model):
    feedback_id = models.IntegerField()
    interview = models.ForeignKey(Interview, on_delete=models.CASCADE)
    feedback_text = models.TextField(max_length=1000, blank=True)