import axios from "axios"
import React, { useState, useEffect } from "react"
import "./InterviewPage.css"
import Loader from "./Loader/Loader"
import { FooterContainer } from './Containers/footer';
import Navbar from './Navbar/Navbar';
import { SidebarLogged } from './SidebarLogged';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = "en-US"

function InterviewPage() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])
  const [allData, setAllData] = useState("")
  const [question, setQuestion] = useState("")
  const [i, setI] = useState(0)
  const usernameFromStorage = localStorage.getItem('username')
 

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("/api/getQuestion")

      setAllData(data)
      setQuestion(data[i])
      
    }
    fetchData()
    handleListen()
  }, [isListening])

  

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log("continue..")
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log("Stopped Mic on Click")
      }
      
    }
    mic.onstart = () => {
      console.log("Mics on")
    }

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("")

      setNote(transcript)
      mic.onerror = (event) => {
        console.log(event.error)
      }
    }
  }
  const handleSaveNote = async () => {
    if (i < allData.length) {

      setI(i + 1)
      setQuestion(allData[i])
  
    } else {
      setQuestion('don')
    }
    setSavedNotes([...savedNotes, note])
    await axios.post(`/api/saveNotes/${question.id}`,{note,username:usernameFromStorage})
    setNote("")

    // send savedNotes to backend using axios
  }

  return (
    <>
      <Navbar screenName={'Log out'} nextNav={'/'} arr={ SidebarLogged }/>
      <h1>Intervew Records</h1>

      <div className='IV-container'>
        <div className='box'>
          {question === "" ? <Loader /> :question ===undefined?<h2>Don</h2>: <h2 key={i}>{question.question}</h2>}
          {isListening ? <span>🎙️</span> : <span>🛑</span>}
          <button
            className='interview-buttons'
            onClick={handleSaveNote}
            disabled={!note}
          >
            Save Note
          </button>
          <button
            className='interview-buttons'
            onClick={() => setIsListening((prevState) => !prevState)}
          >
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className='box'>
          <h2>Note</h2>
     
          {savedNotes.map((n,i) => (
            <p key={i}>{n}</p>
          ))}
          <button className='interview-buttons'> Clear Answer </button>
          <button className='interview-buttons'> Submit Answer </button>
        </div>
      </div>
      <FooterContainer />
    </>
  )
}
export default InterviewPage
/*

*/
