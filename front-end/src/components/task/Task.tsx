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
      <button className="delete-btn" onClick={deleteTask}>
        Afronden
      </button>
    </div>
  );
};

export default Task;
