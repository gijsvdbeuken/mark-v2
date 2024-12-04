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

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const memory = new BufferMemory({ returnMessages: true, memoryKey: 'history' });

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

    const x = replace_braces(corpus);

    const promptTemplate = `You are an AI assistant named Mark, specializing in marketing, working for Geen Gedoe. You will be working with this data. When answering, don't rely on the structure of this data too much, keep the output natural: ` + x + `. History: {history} Human: {input} AI:`;

    const prompt = ChatPromptTemplate.fromTemplate(promptTemplate);

    const chain = new ConversationChain({
      memory: memory,
      prompt: prompt,
      llm: chatModel,
    });

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
