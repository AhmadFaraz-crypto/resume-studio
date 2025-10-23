import { useState, useEffect, useCallback } from 'react';
import { saveSelectedTemplate, loadSelectedTemplate } from '../utils/dataPersistence';

export const useSelectedTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('1');

  // Load selected template from localStorage on mount
  useEffect(() => {
    const savedTemplate = loadSelectedTemplate();
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
  }, []);

  const updateSelectedTemplate = useCallback((templateId: string) => {
    setSelectedTemplate(templateId);
    saveSelectedTemplate(templateId);
  }, []);

  return {
    selectedTemplate,
    updateSelectedTemplate,
  };
};
