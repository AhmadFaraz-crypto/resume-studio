import type { FC, ChangeEvent } from 'react';
import type { CVData, WorkExperience, Education } from '../types/cv.types';
import { freshCVData } from '../data/defaultCV';
import { Button, Input } from './common';

interface CVEditorProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

const CVEditor: FC<CVEditorProps> = ({ data, onChange }) => {
  const handlePersonalInfoChange = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const handleLocationChange = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        location: {
          ...data.personalInfo.location,
          [field]: value,
        },
      },
    });
  };

  const handleWorkExperienceChange = (index: number, field: keyof WorkExperience, value: string | string[]) => {
    const updatedExperience = [...data.workExperience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    onChange({
      ...data,
      workExperience: updatedExperience,
    });
  };

  const handleResponsibilityChange = (workIndex: number, respIndex: number, value: string) => {
    const updatedExperience = [...data.workExperience];
    const updatedResponsibilities = [...updatedExperience[workIndex].responsibilities];
    updatedResponsibilities[respIndex] = value;
    updatedExperience[workIndex] = {
      ...updatedExperience[workIndex],
      responsibilities: updatedResponsibilities,
    };
    onChange({
      ...data,
      workExperience: updatedExperience,
    });
  };

  const addWorkExperience = () => {
    onChange({
      ...data,
      workExperience: [
        ...data.workExperience,
        {
          id: Date.now().toString(),
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          responsibilities: [''],
        },
      ],
    });
  };

  const removeWorkExperience = (index: number) => {
    const updatedExperience = data.workExperience.filter((_, i) => i !== index);
    onChange({
      ...data,
      workExperience: updatedExperience,
    });
  };

  const addResponsibility = (workIndex: number) => {
    const updatedExperience = [...data.workExperience];
    updatedExperience[workIndex].responsibilities.push('');
    onChange({
      ...data,
      workExperience: updatedExperience,
    });
  };

  const removeResponsibility = (workIndex: number, respIndex: number) => {
    const updatedExperience = [...data.workExperience];
    updatedExperience[workIndex].responsibilities = updatedExperience[workIndex].responsibilities.filter(
      (_, i) => i !== respIndex
    );
    onChange({
      ...data,
      workExperience: updatedExperience,
    });
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...data.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    onChange({
      ...data,
      education: updatedEducation,
    });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          id: Date.now().toString(),
          degree: '',
          institution: '',
          location: '',
          startDate: '',
          endDate: '',
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = data.education.filter((_, i) => i !== index);
    onChange({
      ...data,
      education: updatedEducation,
    });
  };

  const handleSkillsChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const skills = event.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
    onChange({
      ...data,
      skills,
    });
  };

  const handleStartFresh = () => {
    if (window.confirm('Are you sure you want to clear all data and start fresh? This action cannot be undone.')) {
      onChange(freshCVData);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mr-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Your CV</h2>
            <p className="text-gray-600">Customize your information and experience</p>
          </div>
        </div>
        <Button
          onClick={handleStartFresh}
          variant="danger"
          size="sm"
        >
          Start Fresh
        </Button>
      </div>

      {/* Personal Information */}
      <section className="mb-8">
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
        </div>
        <div className="space-y-3">
          <Input
            label="Name"
            type="text"
            value={data.personalInfo.name}
            onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              value={data.personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                value={data.personalInfo.location.city}
                onChange={(e) => handleLocationChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Zip Code</label>
              <input
                type="text"
                value={data.personalInfo.location.zipCode}
                onChange={(e) => handleLocationChange('zipCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                value={data.personalInfo.location.country}
                onChange={(e) => handleLocationChange('country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn</label>
            <input
              type="url"
              value={data.personalInfo.linkedin || ''}
              onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Summary</label>
            <textarea
              value={data.personalInfo.summary}
              onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mr-3">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Work Experience</h3>
          </div>
          <button
            onClick={addWorkExperience}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Experience
          </button>
        </div>
        {data.workExperience.map((job, index) => (
          <div key={job.id} className="mb-6 p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold">Experience #{index + 1}</h4>
              <button
                onClick={() => removeWorkExperience(index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input
                  type="text"
                  value={job.title}
                  onChange={(e) => handleWorkExperienceChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input
                  type="text"
                  value={job.company}
                  onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={job.location}
                  onChange={(e) => handleWorkExperienceChange(index, 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="text"
                    value={job.startDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                    placeholder="MM/YYYY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="text"
                    value={job.endDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                    placeholder="MM/YYYY or Present"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Responsibilities</label>
                  <button
                    onClick={() => addResponsibility(index)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
                  >
                    Add Responsibility
                  </button>
                </div>
                {job.responsibilities.map((resp, respIndex) => (
                  <div key={respIndex} className="flex gap-2 mb-2">
                    <textarea
                      value={resp}
                      onChange={(e) => handleResponsibilityChange(index, respIndex, e.target.value)}
                      rows={2}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => removeResponsibility(index, respIndex)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full mr-3">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Education</h3>
          </div>
          <button
            onClick={addEducation}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Education
          </button>
        </div>
        {data.education.map((edu, index) => (
          <div key={edu.id} className="mb-6 p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold">Education #{index + 1}</h4>
              <button
                onClick={() => removeEducation(index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    placeholder="YYYY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                    placeholder="YYYY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-8">
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-3">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Skills</h3>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Skills (comma-separated)
          </label>
          <textarea
            value={data.skills.join(', ')}
            onChange={handleSkillsChange}
            rows={6}
            placeholder="HTML, CSS, JavaScript, React, ..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>
    </div>
  );
};

export default CVEditor;

