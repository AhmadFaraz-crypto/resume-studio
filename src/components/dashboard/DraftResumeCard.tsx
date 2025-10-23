import React from 'react';
import { Button } from '../common';

interface DraftResumeCardProps {
  onContinueDraft: () => void;
  onDiscardDraft: () => void;
}

const DraftResumeCard: React.FC<DraftResumeCardProps> = ({
  onContinueDraft,
  onDiscardDraft,
}) => {
  return (
    <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <div className="flex items-start">
        <svg className="h-6 w-6 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <div className="ml-3 flex-1">
          <h3 className="text-lg font-medium text-yellow-800">Draft Resume Available</h3>
          <p className="mt-1 text-sm text-yellow-700">
            You have a draft resume that was saved when you tried to export. You can continue editing it or discard it.
          </p>
          <div className="mt-4 flex space-x-3">
            <Button
              onClick={onContinueDraft}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Continue Editing
            </Button>
            <Button
              onClick={onDiscardDraft}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Discard Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftResumeCard;
