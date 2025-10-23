import type { FC } from 'react';
import classnames from 'classnames';
import { cvTemplates } from '../data/templates';

interface TemplateSelectorProps {
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector: FC<TemplateSelectorProps> = ({ 
  selectedTemplateId, 
  onSelectTemplate 
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
        {cvTemplates.map((template) => {
          const isSelected = template.id === selectedTemplateId;
          
          const cardClasses = classnames(
            'p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group transform hover:scale-105 active:scale-95 hover:shadow-lg',
            {
              'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 shadow-md': isSelected,
              'border-gray-200 hover:border-blue-400 hover:shadow-lg hover:bg-blue-50 active:bg-blue-100': !isSelected,
            }
          );

          return (
            <div
              key={template.id}
              className={cardClasses}
              onClick={() => onSelectTemplate(template.id)}
              role="button"
              tabIndex={0}
              aria-label={`Select ${template.name} template`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectTemplate(template.id);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-semibold text-gray-900 mr-2 group-hover:text-blue-600 transition-colors duration-300">{template.name}</h4>
                    <div
                      className="w-3 h-3 rounded-full border border-gray-300 shadow-sm group-hover:scale-125 group-hover:shadow-md transition-all duration-300"
                      style={{ backgroundColor: template.accentColor }}
                      aria-label={`Accent color ${template.accentColor}`}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{template.description}</p>
                </div>
                {isSelected && (
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white text-sm font-bold shadow-md group-hover:scale-110 group-active:scale-95 transition-transform duration-200" aria-label="Selected">
                    ✓
                  </div>
                )}
                {!isSelected && (
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 group-active:scale-95 group-hover:bg-blue-200" aria-label="Select">
                    +
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TemplateSelector;

