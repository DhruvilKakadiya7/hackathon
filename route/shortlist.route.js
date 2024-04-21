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

export default AIRouter;