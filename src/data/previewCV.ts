import type { CVData } from '../types/cv.types';

// Compact data for template preview in carousel
export const previewCVData: CVData = {
  personalInfo: {
    name: 'John Doe',
    email: 'john@email.com',
    phone: '+1 234 567 8900',
    location: {
      city: 'New York',
      zipCode: '10001',
      country: 'USA',
    },
    linkedin: 'linkedin.com/in/johndoe',
    summary: 'Experienced developer with strong technical skills.',
  },
  workExperience: [
    {
      id: '1',
      title: 'Senior Developer',
      company: 'Tech Company',
      location: 'New York, NY',
      startDate: '2020',
      endDate: 'Present',
      responsibilities: [
        'Developed web applications',
        'Collaborated with teams',
      ],
    },
    {
      id: '2',
      title: 'Developer',
      company: 'Software Inc',
      location: 'Boston, MA',
      startDate: '2018',
      endDate: '2019',
      responsibilities: [
        'Built user interfaces',
      ],
    },
  ],
  education: [
    {
      id: '1',
      degree: 'BS Computer Science',
      institution: 'University Name',
      location: 'City, State',
      startDate: '2014',
      endDate: '2018',
    },
  ],
  skills: [
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'SQL',
    'Git',
  ],
};

