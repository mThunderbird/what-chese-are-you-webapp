import axios, {Axios, AxiosResponse} from 'axios';
import express, {Request, Response} from 'express';
import { IQuizData } from './interfaces';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = 8000;
const app = express();


app.get('/quiz-item',async (req: Request, res: Response) => {
    
    try{
       
        // @ts-ignore
        const response: AxiosResponse = await axios.get(process.env.URL,
        {
            headers: {
                'X-Cassandra-Token': process.env.TOKEN,
                'Accept': 'application/json'
            }
        });
    
        if(response.status === 200)
        {
            const quizItem: IQuizData = await response.data.data['68fc7899-9155-4342-bd3a-7743ee779352'];
            res.setHeader('Access-Control-Allow-Origin',
            'http://localhost:3000');
            res.send(quizItem);
        }
    }
    catch(error){
        console.error(error);
    }

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}⚡!`);
})