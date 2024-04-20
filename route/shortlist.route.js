import express from 'express';
import questionsModel from '../schema/questionsSchema.js';
import responseModel from '../schema/interviewSchema.js';
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI('AIzaSyCS6PIl49oqxvJFcMd60C5yAyjQhaTcz0w');

const AIRouter = express.Router();

const model = genAI.getGenerativeModel({ model: "gemini-pro"});

async function run() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "Write a story about a magic backpack."
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
  
  run();

export default AIRouter;