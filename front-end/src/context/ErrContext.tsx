import React, { createContext, useContext, useState, ReactNode } from 'react';
import ErrMsg from '../components/Other/ErrMsg/ErrMsg';

interface ErrContextProps {
  showError: (message: string, duration?: number) => void;
}

const ErrContext = createContext<ErrContextProps | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrContext);
  if (!context) {
    throw new Error('useError must be used within an ErrProvider');
  }
  return context;
};

export default ErrContext;
