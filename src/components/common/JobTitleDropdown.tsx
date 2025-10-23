import React, { useState, useRef, useEffect } from 'react';
import { jobTitles, getJobTitlesByCategory, getDefaultResponsibilities } from '../../data/jobTitles';

interface JobTitleDropdownProps {
  value: string;
  onChange: (title: string) => void;
  onResponsibilitiesChange: (responsibilities: string[]) => void;
  placeholder?: string;
  className?: string;
}

const JobTitleDropdown: React.FC<JobTitleDropdownProps> = ({
  value,
  onChange,
  onResponsibilitiesChange,
  placeholder = "Select or type a job title",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomOption, setShowCustomOption] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = getJobTitlesByCategory();
  const filteredTitles = searchQuery 
    ? jobTitles.filter(title => 
        title.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : jobTitles;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onChange(query);
    
    // Show custom option if query doesn't match any existing title
    const exactMatch = jobTitles.find(title => 
      title.title.toLowerCase() === query.toLowerCase()
    );
    setShowCustomOption(query.length > 0 && !exactMatch);
  };

  const handleTitleSelect = (title: string) => {
    onChange(title);
    setSearchQuery('');
    setIsOpen(false);
    
    // Auto-populate responsibilities
    const defaultResponsibilities = getDefaultResponsibilities(title);
    if (defaultResponsibilities.length > 0) {
      onResponsibilitiesChange(defaultResponsibilities);
    }
  };

  const handleCustomTitleAdd = () => {
    if (searchQuery.trim()) {
      onChange(searchQuery.trim());
      setSearchQuery('');
      setIsOpen(false);
      setShowCustomOption(false);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    setSearchQuery(value);
  };

  // Update searchQuery when value changes externally
  React.useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  const handleInputBlur = () => {
    // Delay closing to allow for clicks on dropdown items
    setTimeout(() => {
      setIsOpen(false);
      setShowCustomOption(false);
    }, 150);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCustomOption(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <input
        ref={inputRef}
        type="text"
        value={isOpen ? searchQuery : value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
      />
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {searchQuery && showCustomOption && (
            <div className="p-2 border-b border-gray-100">
              <button
                type="button"
                onClick={handleCustomTitleAdd}
                className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">+</span>
                Add "{searchQuery}" as custom title
              </button>
            </div>
          )}
          
          {Object.entries(categories).map(([category, titles]) => {
            const categoryTitles = searchQuery 
              ? titles.filter(title => 
                  title.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
              : titles;

            if (categoryTitles.length === 0) return null;

            return (
              <div key={category} className="border-b border-gray-100 last:border-b-0">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                  {category}
                </div>
                {categoryTitles.map((jobTitle) => (
                  <button
                    key={jobTitle.title}
                    type="button"
                    onClick={() => handleTitleSelect(jobTitle.title)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                  >
                    <span className="text-gray-900">{jobTitle.title}</span>
                    <span className="text-xs text-gray-400">
                      {jobTitle.defaultResponsibilities.length} default responsibilities
                    </span>
                  </button>
                ))}
              </div>
            );
          })}
          
          {filteredTitles.length === 0 && !searchQuery && (
            <div className="px-3 py-4 text-center text-gray-500">
              No job titles found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobTitleDropdown;
