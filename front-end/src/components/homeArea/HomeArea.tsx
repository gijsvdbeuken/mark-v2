import React, { useEffect, useRef } from 'react';
import { useInteractions, Interaction as InteractionType } from '../../context/InteractionsContext';
import Config from '../configPanel/ConfigPanel';
import { Interaction } from '../interaction/Interaction';
import './HomeArea.css';

interface HomeAreaProps {
  updateNewRequest: (question: string, model: string, originality: number, corpus: string) => void;
  answer: string;
}

const HomeArea: React.FC<HomeAreaProps> = ({ updateNewRequest, answer }) => {
  const { interactions, addInteraction, updateLastInteractionAnswer } = useInteractions();
  const chatAreaScrollerRef = useRef<HTMLDivElement>(null);

  const handleQuestionSubmit = (question: string, model: string, originality: number, corpus: string) => {
    addInteraction({
      question,
      answer: 'Aan het nadenken...',
      model,
      originality,
      corpus,
    });
    updateNewRequest(question, model, originality, corpus);
  };

  useEffect(() => {
    if (answer) {
      updateLastInteractionAnswer(answer);
    }
  }, [answer]);

  // Scroll to bottom whenever interactions change
  useEffect(() => {
    if (chatAreaScrollerRef.current) {
      chatAreaScrollerRef.current.scrollTop = chatAreaScrollerRef.current.scrollHeight;
    }
  }, [interactions]);

  return (
    <div className="chatArea">
      <div ref={chatAreaScrollerRef} className="chatAreaScroller">
        {interactions.map((interaction: InteractionType, index: number) => (
          <Interaction key={index} question={interaction.question} answer={interaction.answer || ''} />
        ))}
      </div>
      <div className="configPanelContainer">
        <Config onQuestionSubmit={handleQuestionSubmit} />
      </div>
    </div>
  );
};

export default HomeArea;
