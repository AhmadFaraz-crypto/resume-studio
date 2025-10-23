import React from 'react';
import TemplatePreview from '../TemplatePreview';
import { cvTemplates } from '../../data/templates';
import type { ResumeDocument } from '../../services/resumeService';

interface ResumeCardProps {
  resume: ResumeDocument;
  onEdit: (resumeId: string) => void;
  onDelete: (resumeId: string) => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ resume, onEdit, onDelete }) => {
  return (
    <div className="group relative flex-shrink-0 w-96">
      {/* Resume Preview */}
      <div className="relative">
        <div className="w-full h-[450px] overflow-hidden rounded-lg shadow-lg">
          <TemplatePreview
            templateId={resume.templateId}
            data={resume.data}
            accentColor={cvTemplates.find(t => t.id === resume.templateId)?.accentColor || '#3B82F6'}
          />
        </div>
        
        {/* Action Buttons - Overlay on template */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          {/* Very minor blur background */}
          <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-[0.5px]"></div>
          
          {/* Action Buttons */}
          <div className="relative flex space-x-3 z-10">
            <button
              onClick={() => onEdit(resume.id)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              onClick={() => onDelete(resume.id)}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-xl hover:bg-red-700 transform hover:scale-105 transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Resume Name */}
      <div className="text-center mt-4">
        <h3 className="text-lg font-semibold text-gray-900">{resume.title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ResumeCard;
