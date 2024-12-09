import React, { useState } from 'react';
import './ConfigSearch.css';

interface ConfigSearchInterface {
  sendQuestion: (question: string) => void;
  toggleSettingsHere: (e: React.MouseEvent) => void;
}

const ConfigSearch: React.FC<ConfigSearchInterface> = ({ sendQuestion, toggleSettingsHere }) => {
  const [question, setQuestion] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(question);
    setQuestion('');
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <div className="question-bar">
        <button className="settings-btn" onClick={toggleSettingsHere}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <input
          className="question-input"
          placeholder="Vraag iets aan Mark..."
          type="text"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        ></input>
        <button className="submit-btn" type={'submit'} disabled={question.trim() === ''}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </div>
    </form>
  );
};

export default ConfigSearch;
