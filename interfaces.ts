import exp from "constants";

interface IQuizData {
    title: string;
    subtitle: string;
    quizID: string;
    content: IQuestion[];
    answers: IResult[];
}

interface IQuestion{
    id: number;
    text: string;
    questions: IAnswer[];
}

interface IAnswer{
    text: string;
    credit: string;
    image: string;
    alt: string;
}

interface IResult{
    text: string;
    image: string;
    alt: string;
    combination: string[];
}

export type {IQuizData, IQuestion, IAnswer, IResult};