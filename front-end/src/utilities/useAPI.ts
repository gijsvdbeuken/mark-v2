import { useState } from 'react';
import { useError } from '../context/ErrContext';

export const useAPI = () => {
  const { showError } = useError();

  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [originality, setOriginality] = useState<number>();
  const [corpus, setCorpus] = useState<string>('');

  const updateRequest = (question: string, model: string, originality: number, corpus: string) => {
    setQuestion(question);
    setModel(model);
    setOriginality(originality);
    setCorpus(corpus);
    setAnswer('');
  };

  const submitRequest = async () => {
    const message = question;
    const max_tokens = 4096;
    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, model, originality, max_tokens, corpus }),
      });
      const answerResponse = await response.json();
      setAnswer(answerResponse.content);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      showError(errorMessage + '. Controleer je OpenAI API-tegoed, de huidige serverstatus, en zorg ervoor dat je API-sleutel correct is gekoppeld aan je account.');
      setAnswer('');
      console.error(error);
    }
  };

  return {
    question,
    answer,
    updateRequest,
    submitRequest,
  };
};
