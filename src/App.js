import React from 'react'
import { useGlobalContext } from './contextProvider/context'
import QuizForm from './component/QuizForm'
import Loading from './component/Loading'
import Modal from './component/Modal'
function App() {
  const {
    isLoading,
    quizForm,
    correct,
    index,
    questions,
    nextQuestion,
    correctAnswer,
    isModal,
  } = useGlobalContext()

  if (isModal) {
    return <Modal />
  }
  if (quizForm) {
    return <QuizForm />
  }
  if (isLoading) {
    return <Loading />
  }

  const { question, correct_answer, incorrect_answers } = questions[index]

  // const answers = [...incorrect_answers, correct_answer]
  let tempNumber = Math.ceil(Math.random() * 3)

  const answers = [...incorrect_answers]
  if (tempNumber === 3) {
    answers.push(correct_answer)
  } else {
    answers.push(answers[tempNumber])
    answers[tempNumber] = correct_answer
  }

  return (
    <main>
      <section className='quiz '>
        <p className='correct-answers'>
          {correct}/{index}
        </p>
        <div className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
          <div className='btn-container'>
            {answers.map((item, index) => {
              return (
                <button
                  key={index}
                  dangerouslySetInnerHTML={{ __html: item }}
                  className='answer-btn'
                  onClick={() => correctAnswer(correct_answer === item)}
                ></button>
              )
            })}
          </div>
          <button className='next-question' onClick={nextQuestion}>
            next question
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
