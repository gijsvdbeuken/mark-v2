import './TasksArea.css';
import '../../App.css';
import { useState, useEffect } from 'react';
import Task from '../task/Task';
import tasksData from './tasks.json';

const TasksArea = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<{ [key: string]: string }>({});

  const API_URL = 'http://localhost:3001/api/tasks';

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  const createTask = () => {
    if (task.trim()) {
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      })
        .then((res) => res.json())
        .then((newTask) => {
          setTasks({ ...tasks, [newTask.taskId]: newTask.task });
          setTask('');
        })
        .catch((err) => console.error('Error adding task:', err));
    } else {
      console.error('Task cannot be empty!');
    }
  };

  const deleteTask = (taskId: string) => {
    fetch(`${API_URL}/${taskId}`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) {
          const updatedTasks = { ...tasks };
          delete updatedTasks[taskId];
          setTasks(updatedTasks);
        } else {
          console.error('Error deleting task.');
        }
      })
      .catch((err) => console.error('Error:', err));
  };

  return (
    <div className="tasks-area">
      <div className="tasks-area-container">
        <div className="task-form">
          <h1>Taken</h1>
          <h2>Taak aanmaken</h2>
          <label>Waar ga je aan werken?</label>
          <input className="input" onChange={(e) => setTask(e.target.value)}></input>
          <div className="btn-container">
            <button className="create-task-btn" onClick={createTask}>
              Taak aanmaken
            </button>
          </div>
          <h2>Openstaande taken</h2>
          <div className="open-tasks">
            {Object.entries(tasks).map(([taskId, taskName]) => (
              <Task key={taskId} task={taskName} deleteTask={() => deleteTask(taskId)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksArea;
