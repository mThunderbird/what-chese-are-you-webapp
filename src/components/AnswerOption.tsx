import React from 'react';
import { IAnswer } from '../../interfaces';

function AnswerOption({ answer, isDisabled, handleAnswer } : {

  answer: IAnswer
  isDisabled: boolean
  handleAnswer: any

}) {

  function handleClick(){
      handleAnswer(answer);
  }
  
  return (
    <button
      className='answer-option'
      onClick={handleClick}
      disabled={isDisabled}
    >
      <img src={answer.image} alt={answer.alt} />
      <h3>{answer.text}</h3>
      <p>
        <a href={answer.image}>{answer.credit} </a>
        <a href="https://www.Unsplash.com">Unsplash</a>
      </p>
    </button>
  );
}

export default AnswerOption;
