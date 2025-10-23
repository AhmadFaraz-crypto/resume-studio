import React, { useState, useCallback, type ReactNode } from 'react';
import ToastContainer from '../components/common/ToastContainer';
import type { ToastProps } from '../components/common/Toast';
import type { ErrorContextType } from '../types/error.types';
import { ErrorContext } from './ErrorContext';

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastProps = {
      ...toast,
      id,
      onClose: removeToast,
    };
    
    setToasts(prev => [...prev, newToast]);
  }, [removeToast]);

  const showSuccess = useCallback((title: string, message?: string) => {
    showToast({
      type: 'success',
      title,
      message,
      duration: 4000,
    });
  }, [showToast]);

  const showError = useCallback((title: string, message?: string) => {
    showToast({
      type: 'error',
      title,
      message,
      duration: 6000,
    });
  }, [showToast]);

  const showWarning = useCallback((title: string, message?: string) => {
    showToast({
      type: 'warning',
      title,
      message,
      duration: 5000,
    });
  }, [showToast]);

  const showInfo = useCallback((title: string, message?: string) => {
    showToast({
      type: 'info',
      title,
      message,
      duration: 4000,
    });
  }, [showToast]);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const contextValue: ErrorContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    clearToasts,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </ErrorContext.Provider>
  );
};
