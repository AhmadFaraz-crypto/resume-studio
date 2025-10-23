import React, { useState } from 'react';
import { Button, Input, Date, Textarea, JobTitleDropdown } from '../common';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import type { CVData, WorkExperience } from '../../types/cv.types';

interface WorkExperienceStepProps {
  data: CVData;
  onUpdate: (data: Partial<CVData>) => void;
}

const WorkExperienceStep: React.FC<WorkExperienceStepProps> = ({ data, onUpdate }) => {
  const [experiences, setExperiences] = useState<WorkExperience[]>(data.workExperience || []);
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { handleResumeError } = useErrorHandler();

  const addNewExperience = () => {
    try {
      const newExperience: WorkExperience = {
        id: `work-${Math.random().toString(36).substr(2, 9)}`,
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        responsibilities: [],
      };
      setExperiences([...experiences, newExperience]);
    } catch (error) {
      handleResumeError(error);
    }
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: string) => {
    try {
      const updated = experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      );
      setExperiences(updated);
      onUpdate({ workExperience: updated });
    } catch (error) {
      handleResumeError(error);
    }
  };

  const removeExperience = (id: string) => {
    try {
      const updated = experiences.filter(exp => exp.id !== id);
      setExperiences(updated);
      onUpdate({ workExperience: updated });
    } catch (error) {
      handleResumeError(error);
    }
  };

  const updateResponsibilities = (experienceId: string, value: string) => {
    try {
      // Split by newlines and filter out empty lines
      const responsibilities = value.split('\n').filter(line => line.trim() !== '');
      const updated = experiences.map(exp => 
        exp.id === experienceId 
          ? { ...exp, responsibilities }
          : exp
      );
      setExperiences(updated);
    } catch (error) {
      handleResumeError(error);
    }
  };

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      // TODO: Integrate with AI API
      // For now, we'll simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate AI-generated content
      const aiGenerated = {
        title: 'Senior Software Engineer',
        company: 'Tech Company Inc.',
        location: 'San Francisco, CA',
        startDate: '2020',
        endDate: 'Present',
        responsibilities: [
          'Led development of scalable web applications',
          'Collaborated with cross-functional teams',
          'Mentored junior developers',
          'Implemented CI/CD pipelines'
        ]
      };

      const newExperience: WorkExperience = {
        id: `work-${Math.random().toString(36).substr(2, 9)}`,
        ...aiGenerated,
      };
      
      setExperiences([...experiences, newExperience]);
      setShowAI(false);
      setAiPrompt('');
    } catch (error) {
      handleResumeError(error);
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <div className="space-y-6">
      {/* Enhanced AI Assistant Section */}
      <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">AI Assistant</h3>
              <p className="text-sm text-gray-600">Let AI help you create professional work experience</p>
            </div>
          </div>
          <Button
            onClick={() => setShowAI(!showAI)}
            variant="outline"
            size="sm"
            className="border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
          >
            {showAI ? 'Hide AI' : 'Use AI'}
          </Button>
        </div>
        
        {showAI && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Describe your work experience
              </label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g., I worked as a software engineer at Google for 3 years, developing web applications using React and Node.js..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none"
                rows={4}
              />
              <div className="mt-2 text-xs text-gray-500">
                💡 Be specific about your role, company, duration, and key achievements
              </div>
            </div>
            <Button
              onClick={generateWithAI}
              disabled={!aiPrompt.trim() || isGenerating}
              className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                isGenerating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Generate with AI
                </div>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Manual Entry */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
          <Button onClick={addNewExperience} size="sm">
            + Add Experience
          </Button>
        </div>

        {experiences.map((experience, index) => (
          <div key={experience.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Experience #{index + 1}</h4>
              <Button
                onClick={() => removeExperience(experience.id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Job Title
                </label>
                <JobTitleDropdown
                  value={experience.title}
                  onChange={(title) => updateExperience(experience.id, 'title', title)}
                  onResponsibilitiesChange={(responsibilities) => {
                    try {
                      const updated = experiences.map(exp => 
                        exp.id === experience.id 
                          ? { ...exp, responsibilities }
                          : exp
                      );
                      setExperiences(updated);
                      onUpdate({ workExperience: updated });
                    } catch (error) {
                      handleResumeError(error);
                    }
                  }}
                  placeholder="Select or type a job title"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Company
                </label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder="Tech Company Inc."
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Location
                </label>
                <Input
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="space-y-2">
                <Date
                  label="Start Date"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Date
                  label="End Date"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Textarea
                label="Key Responsibilities"
                value={experience.responsibilities.join('\n')}
                onChange={(e) => updateResponsibilities(experience.id, e.target.value)}
                placeholder="Enter each responsibility on a new line:&#10;&#10;• Led development of scalable web applications&#10;• Collaborated with cross-functional teams&#10;• Mentored junior developers&#10;• Implemented CI/CD pipelines"
                rows={6}
                helperText="Enter each responsibility on a new line. Use bullet points or dashes for better formatting."
              />
            </div>
          </div>
        ))}
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No work experience added yet. Click "Add Experience" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default WorkExperienceStep;
