import './TasksArea.css';
import '../../App.css';
import { useState, useEffect } from 'react';
import Task from '../task/Task';
import Dropdown from '../dropdown/Dropdown';

const TasksArea = () => {
  const [task, setTask] = useState<string>('');
  const [filenames, setFilenames] = useState<string[]>([]);
  const [corpus, setCorpus] = useState<string>('');
  const [tasks, setTasks] = useState<{ [key: string]: { task: string; corpus: string } }>({});

  const API_URL = 'http://localhost:3001/api/tasks';

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/files');
        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }
        const files = await response.json();
        setFilenames(files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  const createTask = () => {
    if (task.trim() && corpus.trim()) {
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task, corpus }),
      })
        .then((res) => res.json())
        .then((newTask) => {
          setTasks((prevTasks) => ({
            ...prevTasks,
            [newTask.taskId]: { task: newTask.task, corpus: newTask.corpus },
          }));
          setTask('');
          setCorpus('');
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
          <label>Werkzaamheden</label>
          <input className="input" value={task} onChange={(e) => setTask(e.target.value)}></input>
          <label>Benodigde corpus</label>
          <select className="corpus-options" onChange={(e) => setCorpus(e.target.value)}>
            <option value="geen-corpus">Geen corpus</option>
            {filenames.map((filename, index) => (
              <option key={index} value={filename}>
                {filename}
              </option>
            ))}
          </select>
          <div className="btn-container">
            <button className="create-task-btn" onClick={createTask}>
              Taak aanmaken
            </button>
          </div>
          <h2>Openstaande taken ({Object.keys(tasks).length})</h2>
          <Dropdown title="Alle taken">
            <div className="open-tasks">
              {Object.entries(tasks).map(([taskId, taskData]) => (
                <Task key={taskId} task={taskData.task} corpus={taskData.corpus} deleteTask={() => deleteTask(taskId)} />
              ))}
            </div>
          </Dropdown>
          {filenames.map((filename) => (
            <Dropdown key={filename} title={filename}>
              <div className="open-tasks">
                {Object.entries(tasks)
                  .filter(([_, taskData]) => taskData.corpus === filename)
                  .map(([taskId, taskData]) => (
                    <Task key={taskId} task={taskData.task} corpus={taskData.corpus} deleteTask={() => deleteTask(taskId)} />
                  ))}
              </div>
            </Dropdown>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksArea;
