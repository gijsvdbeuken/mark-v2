import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';
import './Sidebar.css';

const Sidebar2 = () => {
  const navigate = useNavigate();
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

  const handleNewChat = () => {
    window.location.reload();
  };

  const handleClick = () => {
    window.open('https://github.com/gijsvdbeuken/ai-marketing-assistant', '_blank');
  };

  return (
    <div className="sidebarArea">
      {showSidebar ? (
        <div className="sidebar">
          <div className="sidebarContainer">
            <h2>Mark</h2>
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
                <div>Corpora beheren</div>
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
