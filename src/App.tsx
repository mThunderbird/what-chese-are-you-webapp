import React, { useEffect, useState } from 'react';
import Title from './components/Title';
import { json } from 'stream/consumers';
import { IAnswer, IQuestion, IQuizData } from '../interfaces';
import { error } from 'console';
import QuestionBlock from './components/QuestionBlock';
import ResultBlock from './components/ResultBlock';

function App() {

  const [quiz, setQuiz] = useState<IQuizData | null>();
  const [chosenAnswers, setChosenAnswers] = useState<string[]>([]);
  const [unansweredIDs, setUnansweredIDs] = useState<number[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unansw: number[] = [];

    quiz?.content.forEach((e, index) => {
      unansw.push(index);
    })

    setUnansweredIDs(unansw);
  }, [quiz]);


  useEffect(() => {

    if(unansweredIDs.length <= 0 && chosenAnswers.length > 0)
    {
      setShowResult(true);
      const resultElement = document.getElementById('result');
      resultElement?.scrollIntoView({behavior:'smooth'});
    }

  }, [chosenAnswers, showResult])

  async function fetchData(){
    try{

        const response = await fetch('http://localhost:8000/quiz-item');
        const json = await response.json();
        setQuiz(json);

    }catch(err){console.error(err)};

  }
  
  function trackAnswer(answer: IAnswer, id: number)
  {
    setChosenAnswers((prevState) => [...prevState, answer.text])

    const unansw = unansweredIDs.filter(item => item !== id)
    setUnansweredIDs(unansw);

    const highestUnansweredQuestion = 
    document.getElementById("question-block" + String(Math.min(...unansw)))

    highestUnansweredQuestion?.scrollIntoView({behavior:"smooth"});
  }

  console.log(quiz);
  console.log(unansweredIDs);
  console.log(chosenAnswers);
  console.log(showResult);

  return (
    <div className='app'>
      <Title title={quiz?.title} subtitle={quiz?.subtitle}/>

      {quiz?.content?.map((question: IQuestion, id: IQuestion['id']) => (
        <QuestionBlock
          key={id}
          question={question}
          trackAnswer={trackAnswer}
          />
      ))}

      {showResult && 
        <ResultBlock
          answers={quiz?.answers}
          chosenAnswers={chosenAnswers}
        />
      }

    </div>
  );
}

export default App;
