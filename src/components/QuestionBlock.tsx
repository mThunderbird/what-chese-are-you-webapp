import React, {useState, useEffect} from 'react';
import { IAnswer, IQuestion } from '../../interfaces';
import AnswerOption from './AnswerOption';

function QuestionBlock({ question, trackAnswer } : {
  question: IQuestion;
  trackAnswer: Function;
}) {

  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(Array(question?.questions?.length).fill(false));

  function handleAnswer(chosenOption: IAnswer) {

    if(isAnswered) return;

    setIsAnswered(true);
    trackAnswer(chosenOption, question.id);

    const newState = [...isDisabled];
    question.questions.forEach((answerOption, index) => {
      if(answerOption.text !== chosenOption.text)
      {
        newState[index] = true;
      }
    })
    setIsDisabled(newState);
  }

  return (
    <div>
        <h2 className='question-block-title' id={"question-block" + String(question.id)}>{question.text}</h2>

        <div className='answer-options-container'>
        {question?.questions?.map((option: IAnswer, index: number) => (
         
         <AnswerOption
            key={index}
            answer={option}
            isDisabled={Boolean(isDisabled[index])}
            handleAnswer={handleAnswer}
         />
        ))}
        </div>

    </div>
  );
}

export default QuestionBlock;
