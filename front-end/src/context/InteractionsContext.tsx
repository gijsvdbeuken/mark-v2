import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the type for an interaction
export interface Interaction {
  question: string;
  answer: string | null;
  model: string;
  originality: number;
  corpus: string;
  timestamp: number;
}

// Create the context
export interface InteractionsContextType {
  interactions: Interaction[];
  addInteraction: (interaction: Omit<Interaction, 'timestamp'>) => void;
  updateLastInteractionAnswer: (answer: string) => void;
  clearInteractions: () => void;
}

const InteractionsContext = createContext<InteractionsContextType | undefined>(undefined);

// Context Provider Component
export const InteractionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [interactions, setInteractions] = useState<Interaction[]>(() => {
    // Initialize from localStorage
    const savedInteractions = localStorage.getItem('chatInteractions');
    return savedInteractions ? JSON.parse(savedInteractions) : [];
  });

  // Save interactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatInteractions', JSON.stringify(interactions));
  }, [interactions]);

  const addInteraction = (interaction: Omit<Interaction, 'timestamp'>) => {
    const newInteraction: Interaction = {
      ...interaction,
      timestamp: Date.now(),
    };
    setInteractions((prev) => [...prev, newInteraction]);
  };

  const updateLastInteractionAnswer = (answer: string) => {
    setInteractions((prev) => {
      if (prev.length === 0) return prev;

      const updatedInteractions = [...prev];
      const lastInteraction = updatedInteractions[updatedInteractions.length - 1];

      if (lastInteraction.answer === null || lastInteraction.answer === 'Aan het nadenken...') {
        updatedInteractions[updatedInteractions.length - 1] = {
          ...lastInteraction,
          answer,
        };
      }

      return updatedInteractions;
    });
  };

  const clearInteractions = () => {
    setInteractions([]);
    localStorage.removeItem('chatInteractions');
  };

  return (
    <InteractionsContext.Provider
      value={{
        interactions,
        addInteraction,
        updateLastInteractionAnswer,
        clearInteractions,
      }}
    >
      {children}
    </InteractionsContext.Provider>
  );
};

// Custom hook to use the interactions context
export const useInteractions = () => {
  const context = useContext(InteractionsContext);
  if (context === undefined) {
    throw new Error('useInteractions must be used within an InteractionsProvider');
  }
  return context;
};
