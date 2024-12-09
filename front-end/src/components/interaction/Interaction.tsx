import React, { useState, useEffect } from 'react';
import './Interaction.css';
import 'highlight.js/styles/github-dark.css';
import hljs from 'highlight.js';
import { useTime } from '../../utilities/useTime';

interface InteractionProps {
  question: string;
  answer: string;
}

export const Interaction: React.FC<InteractionProps> = ({ question, answer }) => {
  const currentTime = useTime();

  useEffect(() => {
    const codeBlocks = document.querySelectorAll('.chatbotMessage code');
    codeBlocks.forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [answer]);

  return (
    <div className="chatInteraction">
      <small className="interactionTime">Om {currentTime}</small>
      <div className="userRequest">
        {question ? (
          <>
            <div className="userMessage">
              <p>{question}</p>
            </div>
          </>
        ) : null}
      </div>
      <div className="chatbotResponse">
        {answer == 'Aan het nadenken...' ? (
          <div className="chatbotMessageThinking">
            <div className="pfpMark">M</div>
            <p className="thinking">
              <i className="fa-solid fa-wand-magic-sparkles"></i>&nbsp;
              {answer}
            </p>
          </div>
        ) : (
          <div className="chatbotMessage">
            <div className="pfpMark">M</div>
            <p dangerouslySetInnerHTML={{ __html: answer }} />
          </div>
        )}
      </div>
    </div>
  );
};
