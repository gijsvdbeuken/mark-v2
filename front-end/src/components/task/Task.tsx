import React from 'react';
import './Task.css';

interface TaskProps {
  task: string;
  corpus: string;
  deleteTask: () => void;
}

const Task: React.FC<TaskProps> = ({ task, corpus, deleteTask }) => {
  return (
    <div className="task">
      <div>
        <h3 className="task-title">{task}</h3>
        <label className="task-corpus">{corpus}</label>
      </div>
      <div className="buttons">
        <button className="done-btn" onClick={deleteTask}>
          Afvinken <i className="fa-solid fa-check"></i>
        </button>
      </div>
    </div>
  );
};

export default Task;
