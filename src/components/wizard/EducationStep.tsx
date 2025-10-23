import React, { useState } from 'react';
import { Button, Input, Date } from '../common';
import type { CVData, Education } from '../../types/cv.types';

interface EducationStepProps {
  data: CVData;
  onUpdate: (data: Partial<CVData>) => void;
}

const EducationStep: React.FC<EducationStepProps> = ({ data, onUpdate }) => {
  const [educations, setEducations] = useState<Education[]>(data.education || []);
  const [counter, setCounter] = useState(0);

  const addNewEducation = () => {
    const newEducation: Education = {
      id: `edu-${counter}-${Math.random().toString(36).substr(2, 9)}`,
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
    };
    setEducations([...educations, newEducation]);
    setCounter(counter + 1);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducations(updated);
    onUpdate({ education: updated });
  };

  const removeEducation = (id: string) => {
    const updated = educations.filter(edu => edu.id !== id);
    setEducations(updated);
    onUpdate({ education: updated });
  };


  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Education</h3>
          <Button onClick={addNewEducation} size="sm">
            + Add Education
          </Button>
        </div>

        {educations.map((education, index) => (
          <div key={education.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Education #{index + 1}</h4>
              <Button
                onClick={() => removeEducation(education.id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Degree
                </label>
                <Input
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Institution
                </label>
                <Input
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                  placeholder="University of California"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Location
                </label>
                <Input
                  value={education.location}
                  onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                  placeholder="Berkeley, CA"
                />
              </div>
              <div className="space-y-2">
                <Date
                  label="Start Date"
                  value={education.startDate}
                  onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Date
                  label="End Date"
                  value={education.endDate}
                  onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {educations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No education added yet. Click "Add Education" to get started.</p>
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Education Tips
            </h3>
            <p className="text-sm text-green-700 mt-1">
              Include your highest degree first. You can add multiple degrees, certifications, or courses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationStep;
