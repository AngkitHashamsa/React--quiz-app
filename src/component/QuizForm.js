import React from 'react'
import { useGlobalContext } from '../contextProvider/context'

const QuizForm = () => {
  const { formInput, handleChange, error, startQuiz } = useGlobalContext()

  return (
    <main>
      <div className='quiz quiz-small'>
        <form className='setup-form' onClick={(e) => e.preventDefault()}>
          <h2>setup quiz</h2>
          {/* amount */}
          <div className='form-control'>
            <input
              type='number'
              className='form-input'
              name='amount'
              value={formInput.amount}
              onChange={handleChange}
              min={1}
              max={50}
            />
          </div>
          {/* dificulty*/}
          <div className='form-control'>
            <select
              className='form-input'
              name='category'
              value={formInput.category}
              onChange={handleChange}
            >
              <option value='sports'>sports</option>
              <option value='history'>history</option>
              <option value='politics'>politics</option>
              <option value='anime'>anime</option>

              <option value='animals'>animals</option>
              <option value='general knowledge'>general knowledge</option>
              <option value='science: Math'>science: Math</option>
            </select>
          </div>
          {/* category */}
          <div className='form-control'>
            <select
              className='form-input'
              name='category'
              value={formInput.difficulty}
              onChange={handleChange}
            >
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
          </div>

          {error && (
            <p className='error'>
              Can't Generate Questions, Please Try Different Options
            </p>
          )}
          <button type='submit' className='submit-btn ' onClick={startQuiz}>
            start
          </button>
        </form>
      </div>
    </main>
  )
}

export default QuizForm
