import React from 'react'
import { useGlobalContext } from '../contextProvider/context'

const Modal = () => {
  const { isModal, correct, closeModal, questions } = useGlobalContext()

  return (
    <div
      className={`${isModal ? 'modal-container isOpen' : 'modal-container'} `}
    >
      <div className='modal-content'>
        <p>
          you answered {((correct / questions.length) * 100).toFixed(0)} % of
          questions
        </p>
        <button className='close-btn' onClick={closeModal}>
          play again
        </button>
      </div>
    </div>
  )
}

export default Modal
