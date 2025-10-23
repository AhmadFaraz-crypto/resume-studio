import { useContext } from 'react';
import { ErrorContext } from '../contexts/ErrorContext';
import type { ErrorContextType } from '../types/error.types';

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};
