import { createContext, useState, useContext } from 'react';

// Create the context
const LoadingContext = createContext();

// Custom hook for using the loading context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

// Provider component
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Value object to be provided to consumers
  const value = {
    isLoading,
    setIsLoading,
    // Utility function to wrap async operations
    withLoading: async (operation) => {
      try {
        setIsLoading(true);
        await operation();
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}; 