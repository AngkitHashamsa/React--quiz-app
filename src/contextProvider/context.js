import React, { useContext, useState } from 'react'
import axios from 'axios'
const AppContext = React.createContext()
const END_POINT = 'https://opentdb.com/api.php?'

export const AppProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false)
  const [quizForm, setQuizForm] = useState(true)
  const [correct, setCorrect] = useState(0)
  const [index, setIndex] = useState(0)
  const [error, setError] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [questions, setQuestions] = useState([])
  const [formInput, setFormInput] = useState({
    amount: 10,
    category: 'anime',
    difficulty: 'easy',
  })
  const table = {
    sports: 21,
    history: 23,
    politics: 24,
    anime: 31,
    'general knowledge': 9,
    'science: Math': 10,
    animals: 27,
  }
  const fetchQuestion = async (url) => {
    setQuizForm(false)
    setLoading(true)
    const res = await axios(url).catch((err) => console.log(err))

    if (res) {
      const data = res.data.results
      if (data.length > 0) {
        setQuestions(data)
        setQuizForm(false)
        setLoading(false)
        setError(false)
      } else {
        setQuizForm(true)
        setError(true)
      }
    } else {
      setQuizForm(true)
    }
  }

  const correctAnswer = (value) => {
    if (value) {
      setCorrect((currentCorrect) => {
        let newCorrect = currentCorrect + 1
        return newCorrect
      })
    }
    nextQuestion()
  }
  const nextQuestion = () => {
    setIndex((currentIndex) => {
      let newIndex = currentIndex + 1
      if (newIndex > questions.length - 1) {
        ModalOpen()
        return 0
      } else {
        return newIndex
      }
    })
  }
  const ModalOpen = () => {
    setIsModal(true)
  }
  const closeModal = () => {
    setQuizForm(true)
    setCorrect(0)
    setIsModal(false)
  }

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setFormInput({ ...formInput, [name]: value })
  }
  const startQuiz = () => {
    let url = `${END_POINT}amount=${formInput.amount}&category=${
      table[formInput.category]
    }&difficulty=${formInput.difficulty}&type=multiple`

    fetchQuestion(url)
  }

  return (
    <AppContext.Provider
      value={{
        isLoading,
        quizForm,
        correct,
        index,
        questions,
        error,
        isModal,
        nextQuestion,
        correctAnswer,
        closeModal,
        formInput,
        startQuiz,
        handleChange,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
