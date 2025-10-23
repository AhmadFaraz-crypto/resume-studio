import React from 'react';
import type { CVData } from '../types/cv.types';
import CVTemplate from './templates/CVTemplate';
import CVTemplate2 from './templates/CVTemplate2';
import CVTemplate3 from './templates/CVTemplate3';
import CVTemplate4 from './templates/CVTemplate4';
import CVTemplate5 from './templates/CVTemplate5';
import CVTemplate6 from './templates/CVTemplate6';
import CVTemplate7 from './templates/CVTemplate7';
import CVTemplate8 from './templates/CVTemplate8';
import CVTemplate9 from './templates/CVTemplate9';
import CVTemplate10 from './templates/CVTemplate10';
import CVTemplate11 from './templates/CVTemplate11';

interface TemplatePreviewProps {
  templateId: string;
  data: CVData;
  accentColor: string;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ templateId, data, accentColor }) => {
  const renderTemplateComponent = () => {
    const templateProps = {
      data,
      accentColor,
      scale: 0.55, // Optimized scale for carousel
      width: '696.92px' // Custom width for preview
    };

    switch (templateId) {
      case '1':
        return <CVTemplate {...templateProps} />;
      case '2':
        return <CVTemplate2 {...templateProps} />;
      case '3':
        return <CVTemplate3 {...templateProps} />;
      case '4':
        return <CVTemplate4 {...templateProps} />;
      case '5':
        return <CVTemplate5 {...templateProps} />;
      case '6':
        return <CVTemplate6 {...templateProps} />;
      case '7':
        return <CVTemplate7 {...templateProps} />;
      case '8':
        return <CVTemplate8 {...templateProps} />;
      case '9':
        return <CVTemplate9 {...templateProps} />;
      case '10':
        return <CVTemplate10 {...templateProps} />;
      case '11':
        return <CVTemplate11 {...templateProps} />;
      default:
        return <CVTemplate {...templateProps} />;
    }
  };

  return (
    <div className="w-full h-full overflow-hidden bg-white">
      {renderTemplateComponent()}
    </div>
  );
};

export default TemplatePreview;
