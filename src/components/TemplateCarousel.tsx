import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cvTemplates } from '../data/templates';
import { previewCVData } from '../data/previewCV';
import TemplatePreview from './TemplatePreview';
import type { CVData } from '../types/cv.types';

interface TemplateCarouselProps {
  onTemplateSelect: (templateId: string) => void;
  data?: CVData;
}

const TemplateCarousel: React.FC<TemplateCarouselProps> = ({ onTemplateSelect, data = previewCVData }) => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId: string) => {
    // Save selected template to localStorage
    localStorage.setItem('selectedTemplate', templateId);
    
    // Navigate to wizard
    navigate('/wizard');
    
    // Also call the original callback if provided
    onTemplateSelect(templateId);
  };

  return (
    <div className="w-full py-12">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8 px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Choose Your Resume Template</h1>
          <p className="text-gray-600">
            Select from our collection of professionally designed resume templates
          </p>
        </div>

        {/* Carousel Container */}
        <div className="w-full">
          {/* Scrollable Container */}
          <div className="flex gap-6 overflow-x-auto scroll-smooth pb-4">
            {cvTemplates.map((template) => (
              <div
                key={template.id}
                className="group relative flex-shrink-0 w-96"
              >
                {/* Template Preview */}
                <div className="relative">
                  <div className="w-full h-[450px] overflow-hidden rounded-lg shadow-lg">
                    <TemplatePreview
                      templateId={template.id}
                      data={data}
                      accentColor={template.accentColor}
                    />
                  </div>
                  
                  {/* Use Template Button - Overlay on template */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {/* Very minor blur background */}
                    <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-[0.5px]"></div>
                    
                    {/* Button in center */}
                    <button
                      onClick={() => handleTemplateSelect(template.id)}
                      className="relative bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold shadow-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 z-10"
                    >
                      Use this template
                    </button>
                  </div>
                </div>

                {/* Template Name */}
                <div className="text-center mt-4">
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCarousel;
