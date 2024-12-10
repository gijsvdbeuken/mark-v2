import React, { useEffect } from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose, duration = 8000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="error-message">
      <i className="fa-regular fa-circle-xmark"></i> {message}
    </div>
  );
};

export default ErrorMessage;
