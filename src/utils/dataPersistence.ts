import type { CVData } from '../types/cv.types';

const STORAGE_KEY = 'cv-builder-data';
const SELECTED_TEMPLATE_KEY = 'cv-builder-selected-template';

export const saveCVData = (data: CVData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    // Handle localStorage quota exceeded or other errors
    console.error('Failed to save CV data:', error);
    throw new Error('Failed to save CV data. Please try again.');
  }
};

export const loadCVData = (): CVData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load CV data:', error);
    return null;
  }
};

export const clearCVData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SELECTED_TEMPLATE_KEY);
  } catch (error) {
    console.error('Failed to clear CV data:', error);
  }
};

export const saveSelectedTemplate = (templateId: string): void => {
  try {
    localStorage.setItem(SELECTED_TEMPLATE_KEY, templateId);
  } catch (error) {
    console.error('Failed to save selected template:', error);
    throw new Error('Failed to save selected template. Please try again.');
  }
};

export const loadSelectedTemplate = (): string | null => {
  try {
    return localStorage.getItem(SELECTED_TEMPLATE_KEY);
  } catch (error) {
    console.error('Failed to load selected template:', error);
    return null;
  }
};
