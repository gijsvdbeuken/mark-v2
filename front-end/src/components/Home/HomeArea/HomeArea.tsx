import React, { useState, useEffect, useRef } from 'react';
import ChatConfiguration from '../Config/Config';
import { Interaction } from '../Interaction/Interaction';
import './HomeArea.css';

interface HomeAreaProps {
  updateNewRequest: (question: string, model: string, originality: number, corpus: string) => void;
  answer: string;
  question: string;
}

const HomeArea: React.FC<HomeAreaProps> = ({ updateNewRequest, answer, question }) => {
  const [interactions, setInteractions] = useState<{ question: string; answer: string | null; model: string; originality: number; corpus: string }[]>([]);

  const handleQuestionSubmit = (question: string, model: string, originality: number, corpus: string) => {
    setInteractions((prevInteractions) => [...prevInteractions, { question: question, answer: 'Aan het nadenken...', model: model, originality: originality, corpus: corpus }]);
    updateNewRequest(question, model, originality, corpus);
  };

  useEffect(() => {
    if (answer) {
      setInteractions((prevInteractions) => {
        const lastInteraction = prevInteractions[prevInteractions.length - 1];
        if (lastInteraction && lastInteraction.answer === 'Aan het nadenken...') {
          const updatedInteractions = [...prevInteractions];
          updatedInteractions[updatedInteractions.length - 1] = {
            ...lastInteraction,
            answer,
          };
          return updatedInteractions;
        }
        return prevInteractions;
      });
    }
  }, [answer]);

  return (
    <div className="chatArea">
      <div className="chatAreaScroller">
        {interactions.map((interaction, index) => (
          <Interaction key={index} question={interaction.question} answer={interaction.answer || ''} />
        ))}
      </div>
      <ChatConfiguration onQuestionSubmit={handleQuestionSubmit} />
    </div>
  );
};

export default HomeArea;
