import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { marked } from 'marked';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { BufferMemory } from 'langchain/memory';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ConversationChain } from 'langchain/chains';
import { ChatOpenAI } from '@langchain/openai';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import openTasks from '../../front-end/src/data/tasks/tasks.json' assert { type: 'json' };
const tasks = JSON.stringify(openTasks);

dotenv.config();

const app = express();
const port = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tasksFilePath = path.join(__dirname, '../../front-end/src/data/tasks/tasks.json');
const corporaFilesPath = path.join(__dirname, '../../front-end/src/data/corpora');

app.use(express.json());
app.use(cors());

let memory = new BufferMemory({ returnMessages: true, memoryKey: 'history' });

app.post('/reset-chat', (req, res) => {
  try {
    memory = new BufferMemory({
      returnMessages: true,
      memoryKey: 'history',
    });

    res.json({ status: 'Chat memory reset successfully' });
  } catch (error) {
    console.error('Error resetting chat memory:', error);
    res.status(500).json({
      error: 'Failed to reset chat memory',
      message: error.message,
    });
  }
});

app.post('/chat', async (req, res) => {
  try {
    const { message, model, temperature, max_tokens, corpus } = req.body;

    const chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: model,
      temperature: temperature,
      maxTokens: max_tokens,
    });

    function replace_braces(text) {
      return text.replace(/{/g, '{{').replace(/}/g, '}}');
    }

    const corpusContent = replace_braces(corpus);
    const tasksFormatted = replace_braces(tasks);

    const promptTemplate =
      `You are an AI assistant named Mark, specializing in marketing, working for the marketing agency Geen Gedoe. You will be working with the following data, if there is any: ` +
      corpusContent +
      `. And the human you're talking to is currently working on these tasks, if there are any:` +
      tasksFormatted +
      `. Note that these are internal private tasks binded to the specific human you're talking to, meaning the tasks have no correlation with the actual activities of Geen Gedoe as a whole.` +
      `History: {history} Human: {input} AI:`;

    const prompt = ChatPromptTemplate.fromTemplate(promptTemplate);

    const chain = new ConversationChain({
      memory: memory,
      prompt: prompt,
      llm: chatModel,
    });

    console.log('Final Prompt:', promptTemplate.replace('{history}', memory.history).replace('{input}', message));

    const response = await chain.call({
      input: message,
    });

    const rawMarkdown = response.response;
    const formattedHTML = marked(rawMarkdown);
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const cleanHTML = purify.sanitize(formattedHTML);

    res.json({ content: cleanHTML });
  } catch (error) {
    console.error('Error during chat completion:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      stack: error.stack,
    });
  }
});

app.get('/api/tasks', (req, res) => {
  fs.readFile(tasksFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading tasks file.');
    const tasks = JSON.parse(data).tasks;
    res.json(tasks);
  });
});

app.get('/api/files', (req, res) => {
  console.log(tasksFilePath);
  fs.readdir(corporaFilesPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read files' });
    }
    res.json(files);
  });
});

app.post('/api/tasks', (req, res) => {
  const { task, corpus } = req.body; // Get task and corpus from the request body

  if (!task || !corpus) return res.status(400).send('Task and corpus are required.');

  fs.readFile(tasksFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading tasks file.');

    const tasksData = JSON.parse(data);
    const taskId = `task_${Date.now()}`; // Generate a unique taskId

    // Store the task and corpus under the generated taskId
    tasksData.tasks[taskId] = { task, corpus };

    fs.writeFile(tasksFilePath, JSON.stringify(tasksData, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).send('Error saving task.');
      res.status(201).json({ taskId, task, corpus }); // Return taskId, task, and corpus in the response
    });
  });
});

app.delete('/api/tasks/:taskId', (req, res) => {
  const { taskId } = req.params;

  fs.readFile(tasksFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading tasks file.');

    const tasksData = JSON.parse(data);

    if (!tasksData.tasks[taskId]) {
      return res.status(404).send('Task not found.');
    }

    delete tasksData.tasks[taskId];

    fs.writeFile(tasksFilePath, JSON.stringify(tasksData, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).send('Error deleting task.');
      res.status(200).send('Task deleted successfully.');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
