import React from 'react';
import './Task.css';

interface TaskProps {
  task: string;
  deleteTask: () => void;
}

const Task: React.FC<TaskProps> = ({ task, deleteTask }) => {
  return (
    <div className="task">
      <h3>{task}</h3>
      <div className="buttons">
        <button className="done-btn" onClick={deleteTask}>
          Afvinken <i className="fa-solid fa-check"></i>
        </button>
      </div>
    </div>
  );
};

export default Task;
