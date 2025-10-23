import React from 'react';
import type { CVData } from '../types/cv.types';
import {
  CVTemplate,
  CVTemplate2,
  CVTemplate3,
  CVTemplate4,
  CVTemplate5,
  CVTemplate6,
  CVTemplate7,
  CVTemplate8,
  CVTemplate9,
  CVTemplate10,
  CVTemplate11
} from '../components/templates';

const templates = {
  '1': CVTemplate,
  '2': CVTemplate2,
  '3': CVTemplate3,
  '4': CVTemplate4,
  '5': CVTemplate5,
  '6': CVTemplate6,
  '7': CVTemplate7,
  '8': CVTemplate8,
  '9': CVTemplate9,
  '10': CVTemplate10,
  '11': CVTemplate11,
};

export const renderTemplate = (templateId: string, data: CVData): React.ReactElement => {
  const TemplateComponent = templates[templateId as keyof typeof templates];
  
  if (!TemplateComponent) {
    return React.createElement('div', null, 'Template not found');
  }

  return React.createElement(TemplateComponent, { data });
};
