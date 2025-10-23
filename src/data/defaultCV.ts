import type { CVData } from '../types/cv.types';

export const freshCVData: CVData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: {
      city: '',
      zipCode: '',
      country: '',
    },
    linkedin: '',
    summary: '',
  },
  workExperience: [],
  education: [],
  skills: [],
};

// Default CV data is now handled by template-specific dummy data
// This file only contains the fresh/empty template

