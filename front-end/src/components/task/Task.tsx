import React, { useState } from 'react';
import './Task.css';

interface TaskProps {
  task: string;
  corpus: string;
  deleteTask: () => void;
}

const Task: React.FC<TaskProps> = ({ task, corpus, deleteTask }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      deleteTask();
    }, 1000);
  };

  return (
    <div className={`task ${isCompleted ? 'completed' : ''}`}>
      <div>
        <h3 className="task-title">{task}</h3>
        <label className="task-corpus">{corpus}</label>
      </div>
      <div className="buttons">
        <button className={`done-btn ${isCompleted ? 'completed' : ''}`} onClick={handleComplete}>
          {isCompleted ? (
            <>
              Afgevinkt <i className="fa-solid fa-check"></i>
            </>
          ) : (
            'Afvinken'
          )}
        </button>
      </div>
    </div>
  );
};

export default Task;
