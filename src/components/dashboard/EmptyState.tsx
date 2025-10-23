import React from 'react';
import { Button } from '../common';

interface EmptyStateProps {
  onCreateResume: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateResume }) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No resumes yet</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Create your first professional resume and start building your career.
      </p>
      <Button
        onClick={onCreateResume}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Create Your First Resume
      </Button>
    </div>
  );
};

export default EmptyState;
