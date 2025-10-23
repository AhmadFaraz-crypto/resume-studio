import React, { useState } from 'react';
import { Button } from '../common';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import type { CVData } from '../../types/cv.types';

interface SkillsStepProps {
  data: CVData;
  onUpdate: (data: Partial<CVData>) => void;
}

const SkillsStep: React.FC<SkillsStepProps> = ({ data, onUpdate }) => {
  const [skills, setSkills] = useState<string[]>(data.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { handleResumeError } = useErrorHandler();

  const addSkill = () => {
    try {
      if (newSkill.trim() && !skills.includes(newSkill.trim())) {
        const updated = [...skills, newSkill.trim()];
        setSkills(updated);
        onUpdate({ skills: updated });
        setNewSkill('');
      }
    } catch (error) {
      handleResumeError(error);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    try {
      const updated = skills.filter(skill => skill !== skillToRemove);
      setSkills(updated);
      onUpdate({ skills: updated });
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
      
      // Simulate AI-generated skills based on prompt
      const aiGeneratedSkills = [
        'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker'
      ];
      
      const newSkills = aiGeneratedSkills.filter(skill => !skills.includes(skill));
      if (newSkills.length > 0) {
        const updated = [...skills, ...newSkills];
        setSkills(updated);
        onUpdate({ skills: updated });
      }
      
      setShowAI(false);
      setAiPrompt('');
    } catch (error) {
      handleResumeError(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };


  return (
    <div className="space-y-6">
      {/* Enhanced AI Assistant Section */}
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">AI Skills Generator</h3>
              <p className="text-sm text-gray-600">Let AI suggest relevant skills based on your background</p>
            </div>
          </div>
          <Button
            onClick={() => setShowAI(!showAI)}
            variant="outline"
            size="sm"
            className="border-2 border-green-300 hover:border-green-500 hover:bg-green-50 transition-all duration-200"
          >
            {showAI ? 'Hide AI' : 'Use AI'}
          </Button>
        </div>
        
        {showAI && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Describe your skills and experience
              </label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g., I'm a full-stack developer with 5 years of experience in web development, I work with React, Node.js, Python, and have experience with cloud platforms like AWS..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-none"
                rows={4}
              />
              <div className="mt-2 text-xs text-gray-500">
                💡 Mention your technical skills, tools, programming languages, and soft skills
              </div>
            </div>
            <Button
              onClick={generateWithAI}
              disabled={!aiPrompt.trim() || isGenerating}
              className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                isGenerating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Skills...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Generate Skills with AI
                </div>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Manual Skills Entry */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Your Skills</h3>
          <span className="text-sm text-gray-500">{skills.length} skills added</span>
        </div>

        {/* Add New Skill */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a skill (e.g., JavaScript, Python, Leadership)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button onClick={addSkill} disabled={!newSkill.trim()}>
            Add
          </Button>
        </div>

        {/* Skills List */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Current Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Skills */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {[
              'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'AWS', 'Docker',
              'Leadership', 'Communication', 'Problem Solving', 'Project Management'
            ].map((suggestedSkill) => (
              <button
                key={suggestedSkill}
                onClick={() => {
                  if (!skills.includes(suggestedSkill)) {
                    const updated = [...skills, suggestedSkill];
                    setSkills(updated);
                    onUpdate({ skills: updated });
                  }
                }}
                disabled={skills.includes(suggestedSkill)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  skills.includes(suggestedSkill)
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                {suggestedSkill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {skills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No skills added yet. Add skills manually or use AI to generate them.</p>
        </div>
      )}
    </div>
  );
};

export default SkillsStep;
