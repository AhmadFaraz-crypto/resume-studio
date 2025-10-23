import type { CVTemplate } from '../types/cv.types';

export const cvTemplates: CVTemplate[] = [
  // FREE PLAN TEMPLATES (3 templates)
  {
    id: '1',
    name: 'Professional Timeline',
    description: 'Clean timeline layout with professional styling',
    category: 'Professional',
    accentColor: '#AD8B73',
    planAccess: 'free',
  },
  {
    id: '2',
    name: 'Modern Header',
    description: 'Bold header design with modern aesthetics',
    category: 'Modern',
    accentColor: '#144272',
    planAccess: 'free',
  },
  {
    id: '3',
    name: 'Minimalist Two-Column',
    description: 'Two-column layout with minimalist design',
    category: 'Minimalist',
    accentColor: '#393E46',
    planAccess: 'free',
  },
  
  // PRO PLAN TEMPLATES (8 additional templates)
  {
    id: '4',
    name: 'Decorative Pattern',
    description: 'Clean design with decorative elements',
    category: 'Professional',
    accentColor: '#903749',
    planAccess: 'pro',
  },
  {
    id: '5',
    name: 'Centered Classic',
    description: 'Classic centered design with elegant styling',
    category: 'Classic',
    accentColor: '#3F72AF',
    planAccess: 'pro',
  },
  {
    id: '6',
    name: 'Accent Tabs',
    description: 'Modern design with accent tab styling',
    category: 'Modern',
    accentColor: '#C06C84',
    planAccess: 'pro',
  },
  {
    id: '7',
    name: 'Full Header',
    description: 'Full-width header with professional layout',
    category: 'Professional',
    accentColor: '#3F72AF',
    planAccess: 'pro',
  },
  {
    id: '8',
    name: 'Light Contact',
    description: 'Light design with clean contact section',
    category: 'Minimalist',
    accentColor: '#6096B4',
    planAccess: 'pro',
  },
  {
    id: '9',
    name: 'Bookmark Ribbon',
    description: 'Creative design with bookmark ribbon elements',
    category: 'Creative',
    accentColor: '#DF7861',
    planAccess: 'pro',
  },
  {
    id: '10',
    name: 'Sidebar Labels',
    description: 'Sidebar layout with labeled sections',
    category: 'Academic',
    accentColor: '#8675A9',
    planAccess: 'pro',
  },
  {
    id: '11',
    name: 'Gray Background',
    description: 'Modern design with gray background accents',
    category: 'Modern',
    accentColor: '#3F72AF',
    planAccess: 'pro',
  },
];

// Helper functions to get templates by plan
export const getTemplatesByPlan = (plan: 'free' | 'pro' | 'business') => {
  if (plan === 'business') {
    return cvTemplates; // Business gets all templates
  }
  return cvTemplates.filter(template => template.planAccess === plan);
};

export const getFreeTemplates = () => getTemplatesByPlan('free');
export const getProTemplates = () => getTemplatesByPlan('pro');
export const getAllTemplates = () => cvTemplates;