import express from 'express';
import questionsModel from '../schema/questionsSchema.js';
import responseModel from '../schema/interviewSchema.js';
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI('AIzaSyCS6PIl49oqxvJFcMd60C5yAyjQhaTcz0w');

const AIRouter = express.Router();

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function run(textData) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `"${textData}"\n\nHere is the extracted data from a resume of a tech guy. I want to know that in which languages he/she proficient from the languages ['HTML', 'JavaScript', 'C++', 'Python']. Just mention the names of the langauages seprated by comma in single line only.`
    console.log(prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
}

//   run();

AIRouter.post('/getSkills', async (req, res) => {
    const { text } = req.body;
    console.log(text);
    const ret = await run(text);
    res.json({text: ret});
})

async function evalute(res) {
    // For text-only input, use the gemini-pro model
    // const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `"Question: ${res.question}\n\n Answer: ${res.answer}" I am a interviewer and a candidate provided this answer for the given question. I want to evalute the candidate on based of points out of 10 for the answer. So, evalute this answer and tell me how much score you will assign to this answer. 

    Just provide me a single digit number in the range 0 to 10, I just want a number in the response do not provide me any other text in the response. `
    console.log(prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text); 
    return text;
}

AIRouter.post('/checkAnswers', async (req, res) => {
    const { responses } = req.body;
    console.log(responses);
    let data = [];
    for (let i = 0; i < responses.length; i++) {
        let txt = await evalute(responses[i]);
        data.push(txt);
    }
    // const ret = await evalute(text);
    res.json({data: data});
})


export default AIRouter;