import React, { useEffect, useState } from 'react';
import './ConfigPanel.css';
import ConfigSearch from '../configSearch/ConfigSearch';
import ConfigSettings from '../configSettings/ConfigSettings';

interface ChatConfigurationProps {
  onQuestionSubmit: (question: string, model: string, originality: number, corpus: string) => void;
}

const ChatConfiguration: React.FC<ChatConfigurationProps> = ({ onQuestionSubmit }) => {
  const [showSettings, setShowSettings] = useState<boolean>(true);
  const [question, setQuestion] = useState<string>('');
  const [settings, setSettings] = useState({ model: '', temperature: 0.5, corpus: '' });

  const toggleSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSettings(!showSettings);
  };

  const receiveQuestion = (question: string) => {
    setQuestion(question);
  };

  const receiveSettings = (newSettings: { model: string; temperature: number; corpus: string }) => {
    setSettings(newSettings);
  };

  useEffect(() => {
    if (question.trim().length > 0) {
      onQuestionSubmit(question, settings.model, settings.temperature, settings.corpus);
      setQuestion('');
    }
  }, [question]);

  return (
    <div className="configPanel">
      <ConfigSearch sendQuestion={receiveQuestion} toggleSettings={toggleSettings} />
      {showSettings ? <ConfigSettings sendSettings={receiveSettings} /> : null}
    </div>
  );
};

export default ChatConfiguration;
