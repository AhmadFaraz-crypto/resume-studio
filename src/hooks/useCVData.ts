import { useState, useEffect, useCallback } from 'react';
import type { CVData } from '../types/cv.types';
import { freshCVData } from '../data/defaultCV';
import { saveCVData, loadCVData, clearCVData } from '../utils/dataPersistence';

export const useCVData = () => {
  const [cvData, setCvData] = useState<CVData>(freshCVData);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = loadCVData();
    if (savedData) {
      setCvData(savedData);
    }
    setIsLoading(false);
  }, []);

  // Save data to localStorage whenever cvData changes
  useEffect(() => {
    if (!isLoading) {
      saveCVData(cvData);
    }
  }, [cvData, isLoading]);

  const updateCVData = useCallback((newData: CVData) => {
    setCvData(newData);
  }, []);

  const resetCVData = useCallback(() => {
    setCvData(freshCVData);
    clearCVData();
  }, []);

  return {
    cvData,
    updateCVData,
    resetCVData,
    isLoading,
  };
};
