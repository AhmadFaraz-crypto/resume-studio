import React from 'react';
import { Button } from '../common';

interface NoSearchResultsProps {
  searchQuery: string;
  onClearSearch: () => void;
}

const NoSearchResults: React.FC<NoSearchResultsProps> = ({ searchQuery, onClearSearch }) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No resumes found</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        No resumes match your search for "{searchQuery}". Try a different search term.
      </p>
      <Button
        onClick={onClearSearch}
        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
      >
        Clear Search
      </Button>
    </div>
  );
};

export default NoSearchResults;
