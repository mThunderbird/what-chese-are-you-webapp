import React from 'react';
import { IQuizData } from '../../interfaces';

function Title({ title, subtitle } : {
  title: IQuizData['title'] | undefined;
  subtitle: IQuizData['subtitle'] | undefined;
} ) 
{
  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

export default Title;
