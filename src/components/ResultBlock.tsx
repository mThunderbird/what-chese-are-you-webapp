import React, {useState, useEffect} from 'react';
import { IResult } from '../../interfaces';

function ResultBlock( {answers, chosenAnswers} :
  {
    answers: IResult[] | undefined
    chosenAnswers: string[]
  }) {

  const [result, setResult] = useState<IResult | undefined>(undefined);
  
  useEffect(() => {

    setResult(answers?.at(0))

    answers?.forEach(answer => {
      if(chosenAnswers.includes(answer.combination[0]) &&
        chosenAnswers.includes(answer.combination[1]) &&
        chosenAnswers.includes(answer.combination[2])
      )
        {
          setResult(answer);
        }
    })

  }, [])

  return (
    <div className='result-block'>
      <h2>{result?.text}</h2>
      <br />
      <img id='result' src={result?.image} alt={result?.alt} />
    </div>
  );
}

export default ResultBlock;
