import React, { useState } from 'react';
import { Button } from '../common';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import type { CVData } from '../../types/cv.types';

interface SummaryStepProps {
  data: CVData;
  onUpdate: (data: Partial<CVData>) => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ data, onUpdate }) => {
  const [summary, setSummary] = useState(data.personalInfo.summary || '');
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { handleResumeError } = useErrorHandler();

  const handleSummaryChange = (value: string) => {
    try {
      setSummary(value);
      onUpdate({
        personalInfo: {
          ...data.personalInfo,
          summary: value
        }
      });
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
      
      // Simulate AI-generated summary based on prompt and existing data
      const aiGeneratedSummary = `Experienced ${data.personalInfo.name || 'professional'} with a strong background in ${data.skills?.slice(0, 3).join(', ') || 'relevant skills'}. Proven track record of delivering high-quality results and collaborating effectively with cross-functional teams. Passionate about continuous learning and driving innovation in the field.`;
      
      setSummary(aiGeneratedSummary);
      handleSummaryChange(aiGeneratedSummary);
      setShowAI(false);
      setAiPrompt('');
    } catch (error) {
      handleResumeError(error);
    } finally {
      setIsGenerating(false);
    }
  };

  // const canProceed = summary.trim().length > 50; // At least 50 characters

  return (
    <div className="space-y-6">
      {/* Enhanced AI Assistant Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">AI Summary Generator</h3>
              <p className="text-sm text-gray-600">Let AI craft a compelling professional summary</p>
            </div>
          </div>
          <Button
            onClick={() => setShowAI(!showAI)}
            variant="outline"
            size="sm"
            className="border-2 border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
          >
            {showAI ? 'Hide AI' : 'Use AI'}
          </Button>
        </div>
        
        {showAI && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Describe yourself and your career goals
              </label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g., I'm a passionate software engineer with 5 years of experience in full-stack development. I love building scalable web applications and leading technical teams. I'm looking for senior developer roles where I can mentor others and work on challenging projects..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
                rows={5}
              />
              <div className="mt-2 text-xs text-gray-500">
                💡 Include your experience, skills, achievements, and what you're looking for
              </div>
            </div>
            <Button
              onClick={generateWithAI}
              disabled={!aiPrompt.trim() || isGenerating}
              className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                isGenerating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Summary...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Generate Summary with AI
                </div>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Manual Summary Entry */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Summary
          </label>
          <textarea
            value={summary}
            onChange={(e) => handleSummaryChange(e.target.value)}
            placeholder="Write a compelling summary that highlights your key strengths, experience, and career goals. This should be 2-3 sentences that make a strong first impression."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={6}
          />
          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <span>{summary.length} characters</span>
            <span className={summary.length < 50 ? 'text-red-500' : 'text-green-500'}>
              {summary.length < 50 ? 'At least 50 characters recommended' : 'Good length'}
            </span>
          </div>
        </div>

        {/* Summary Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Summary Writing Tips:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Start with your professional title and years of experience</li>
            <li>• Highlight your key skills and achievements</li>
            <li>• Mention your career goals or what you're looking for</li>
            <li>• Keep it concise but impactful (2-3 sentences)</li>
            <li>• Use action words and quantify achievements when possible</li>
          </ul>
        </div>

        {/* Example Summaries */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-800 mb-3">Example Summaries:</h4>
          <div className="space-y-3">
            <div className="text-sm text-gray-700">
              <strong>Software Engineer:</strong> "Experienced full-stack developer with 5+ years building scalable web applications using React, Node.js, and cloud technologies. Passionate about clean code and mentoring junior developers."
            </div>
            <div className="text-sm text-gray-700">
              <strong>Marketing Manager:</strong> "Results-driven marketing professional with 7 years of experience in digital marketing and brand management. Proven track record of increasing revenue by 40% through strategic campaigns."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;
