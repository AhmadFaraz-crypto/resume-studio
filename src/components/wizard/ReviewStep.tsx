import React from 'react';
import { Button } from '../common';
import type { CVData } from '../../types/cv.types';

interface ReviewStepProps {
  data: CVData;
  onEdit: (step: string) => void;
  onComplete: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ data, onEdit, onComplete }) => {
  const { personalInfo, workExperience, education, skills } = data;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Your Information</h1>
        <p className="text-lg text-gray-600">
          Please review all the information below. You can edit any section by clicking the edit button.
        </p>
      </div>

      {/* Personal Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          <Button onClick={() => onEdit('personal')} variant="outline" size="sm">
            Edit
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-500">Name:</span>
            <p className="text-gray-900">{personalInfo.name || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Email:</span>
            <p className="text-gray-900">{personalInfo.email || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Phone:</span>
            <p className="text-gray-900">{personalInfo.phone || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Location:</span>
            <p className="text-gray-900">
              {personalInfo.location.city && personalInfo.location.country
                ? `${personalInfo.location.city}, ${personalInfo.location.country}`
                : 'Not provided'
              }
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">LinkedIn:</span>
            <p className="text-gray-900">{personalInfo.linkedin || 'Not provided'}</p>
          </div>
        </div>
        {personalInfo.summary && (
          <div className="mt-4">
            <span className="text-sm font-medium text-gray-500">Summary:</span>
            <p className="text-gray-900 mt-1">{personalInfo.summary}</p>
          </div>
        )}
      </div>

      {/* Work Experience */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Work Experience ({workExperience.length} positions)
          </h2>
          <Button onClick={() => onEdit('work')} variant="outline" size="sm">
            Edit
          </Button>
        </div>
        {workExperience.length > 0 ? (
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                <p className="text-gray-600">{exp.company} • {exp.location}</p>
                <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                {exp.responsibilities.length > 0 && (
                  <ul className="mt-2 text-sm text-gray-700">
                    {exp.responsibilities.slice(0, 3).map((resp, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                    {exp.responsibilities.length > 3 && (
                      <li className="text-gray-500">... and {exp.responsibilities.length - 3} more</li>
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No work experience added</p>
        )}
      </div>

      {/* Education */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Education ({education.length} entries)
          </h2>
          <Button onClick={() => onEdit('education')} variant="outline" size="sm">
            Edit
          </Button>
        </div>
        {education.length > 0 ? (
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution} • {edu.location}</p>
                <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No education added</p>
        )}
      </div>

      {/* Skills */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Skills ({skills.length} skills)
          </h2>
          <Button onClick={() => onEdit('skills')} variant="outline" size="sm">
            Edit
          </Button>
        </div>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No skills added</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        <Button onClick={onComplete} className="px-8 py-3">
          Continue to Template Selection
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
