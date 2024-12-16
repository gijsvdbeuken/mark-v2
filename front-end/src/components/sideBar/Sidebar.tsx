import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './Sidebar.css';
import logo from '../../assets/mark-logo.png';
import { useInteractions } from '../../context/InteractionsContext';

const Sidebar2 = () => {
  const navigate = useNavigate();
  const { clearInteractions } = useInteractions();
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleGoToSettings = () => {
    navigate('/settings');
  };

  const handleGoToTasks = () => {
    navigate('/tasks');
  };

  const handleNewChat = () => {
    clearInteractions();
    fetch('http://localhost:3001/reset-chat', { method: 'POST' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to reset chat on server');
        }
        navigate('/');
      })
      .catch((error) => {
        console.error('Error resetting chat:', error);
      });
  };

  const handleClick = () => {
    window.open('https://github.com/gijsvdbeuken/mark-v2', '_blank');
  };

  return (
    <div className="sidebarArea">
      {showSidebar ? (
        <div className="sidebar">
          <div className="sidebarContainer">
            <img src={logo} alt="logo" className="logo" />
            <button className="newChatBtn" onClick={handleNewChat}>
              <i className="fa-regular fa-pen-to-square"></i> Nieuwe Chat
            </button>
            <label>Algemeen</label>
            <div className="options">
              <button className="optionBtn" onClick={handleGoToHome}>
                <div className="optionIcon">
                  <i className="fa-regular fa-message"></i>
                </div>
                <div>Chat met Mark</div>
              </button>
              <button className="optionBtn" onClick={handleGoToSettings}>
                <div className="optionIcon">
                  <i className="fa-regular fa-file-lines"></i>
                </div>
                <div>Corpora</div>
              </button>
              <button className="optionBtn" onClick={handleGoToTasks}>
                <div className="optionIcon">
                  <i className="fa-solid fa-list-check"></i>
                </div>
                <div>Taken</div>
              </button>
              <button onClick={handleClick} className="optionBtn">
                <div className="optionIcon">
                  <i className="fa-solid fa-code-compare"></i>
                </div>
                <div>GitHub repository</div>
              </button>
            </div>
            <label>Account</label>
            <div className="options">
              <button className="optionBtn">
                <div className="optionIcon">
                  <i className="fa-regular fa-user"></i>
                </div>
                <div>Gegevens bijwerken</div>
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <button className="toggleBtn" onClick={toggleSidebar}>
        <i className="fa-solid fa-bars"></i>
      </button>
    </div>
  );
};

export default Sidebar2;
