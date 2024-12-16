import React, { useState } from 'react';
import './Dropdown.css';

interface DropdownProps {
  title: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-item">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {title} {isOpen ? '\u25B4' : '\u25BE'}
      </button>
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
};

export default Dropdown;
