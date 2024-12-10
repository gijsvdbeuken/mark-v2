import React, { ReactNode, useState } from 'react';
import ErrContext from '../context/ErrContext';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

export const ErrProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(8000); // Default duration

  // Function to show an error message
  const showError = (message: string, duration?: number) => {
    setError(message);
    if (duration) {
      setDuration(duration);
    }
  };

  // Function to close the error popup
  const handleCloseError = () => {
    setError(null);
  };

  return (
    <ErrContext.Provider value={{ showError }}>
      {children}
      {error && <ErrorMessage message={error} onClose={handleCloseError} duration={duration} />}
    </ErrContext.Provider>
  );
};

export default ErrProvider;
