// Draft Service - Handles saving and restoring draft resumes
import { getAuthToken, isAuthenticated, getCurrentUser } from './authService';
import { createResume } from './resumeService';
import type { CVData } from '../types/cv.types';

// Save draft resume data to localStorage
export const saveDraftResume = (cvData: CVData, templateId: string): void => {
  try {
    const draftData = {
      cvData,
      templateId,
      timestamp: new Date().toISOString(),
      isDraft: true
    };
    
    localStorage.setItem('draftResume', JSON.stringify(draftData));
  } catch (error) {
    console.error('Failed to save draft resume:', error);
    throw new Error('Failed to save draft resume. Please try again.');
  }
};

// Get draft resume data from localStorage
export const getDraftResume = (): { cvData: CVData; templateId: string; timestamp: string } | null => {
  try {
    const draftData = localStorage.getItem('draftResume');
    if (draftData) {
      const parsed = JSON.parse(draftData);
      return {
        cvData: parsed.cvData,
        templateId: parsed.templateId,
        timestamp: parsed.timestamp
      };
    }
    return null;
  } catch (error) {
    console.error('Failed to load draft resume:', error);
    return null;
  }
};

// Clear draft resume data
export const clearDraftResume = (): void => {
  try {
    localStorage.removeItem('draftResume');
  } catch (error) {
    console.error('Failed to clear draft resume:', error);
  }
};

// Save draft as actual resume in Firestore
export const saveDraftAsResume = async (cvData: CVData, templateId: string): Promise<string | null> => {
  if (!isAuthenticated()) {
    throw new Error('User must be authenticated to save resume');
  }

  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token available');
  }

  // Get current user ID
  const user = getCurrentUser();
  if (!user) {
    throw new Error('No authenticated user found');
  }
  const userId = user.uid;
  
  // Create resume in Firestore
  const resumeId = await createResume(
    userId,
    `${cvData.personalInfo.name} - Resume`,
    templateId,
    cvData
  );
  
  // Clear draft after successful save
  clearDraftResume();
  
  return resumeId;
};

// Check if user has a draft resume
export const hasDraftResume = (): boolean => {
  return localStorage.getItem('draftResume') !== null;
};

// Get draft resume age in minutes
export const getDraftAge = (): number | null => {
  const draft = getDraftResume();
  if (!draft) return null;
  
  const draftTime = new Date(draft.timestamp).getTime();
  const currentTime = new Date().getTime();
  return Math.floor((currentTime - draftTime) / (1000 * 60)); // minutes
};
