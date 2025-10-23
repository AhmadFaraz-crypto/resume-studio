import React from 'react';
import ResumeCard from './ResumeCard';
import type { ResumeDocument } from '../../services/resumeService';

interface ResumeGridProps {
  resumes: ResumeDocument[];
  searchQuery: string;
  onEditResume: (resumeId: string) => void;
  onDeleteResume: (resumeId: string) => void;
}

const ResumeGrid: React.FC<ResumeGridProps> = ({
  resumes,
  searchQuery,
  onEditResume,
  onDeleteResume,
}) => {
  return (
    <div>
      {searchQuery && (
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            {resumes.length} resume{resumes.length !== 1 ? 's' : ''} found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
      )}
      <div className="flex flex-wrap gap-6 justify-center">
        {resumes.map((resume) => (
          <ResumeCard
            key={resume.id}
            resume={resume}
            onEdit={onEditResume}
            onDelete={onDeleteResume}
          />
        ))}
      </div>
    </div>
  );
};

export default ResumeGrid;
