import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { cvTemplates } from '../data/templates';
import { previewCVData } from '../data/previewCV';
import TemplatePreview from '../components/TemplatePreview';

const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId: string) => {
    // Save selected template to localStorage
    localStorage.setItem('selectedTemplate', templateId);
    
    // Navigate to wizard
    navigate('/wizard');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header Section */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
                    Choose Your Resume Template
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 text-center">
                    Select from our collection of professionally designed resume templates
                  </p>
                  
            </div>
          </div>
        </div>

        {/* Templates Grid Section */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-6 justify-center">
              {cvTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group relative flex-shrink-0 w-96"
                >
                  {/* Template Preview */}
                  <div className="relative">
                        <div className="w-full h-[450px] overflow-hidden rounded-lg shadow-lg">
                          <TemplatePreview
                            templateId={template.id}
                            data={previewCVData}
                            accentColor={template.accentColor}
                          />
                        </div>
                    
                    {/* Use Template Button - Overlay on template */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {/* Very minor blur background */}
                      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-[0.5px]"></div>
                      
                      {/* Button in center */}
                      <button
                        onClick={() => handleTemplateSelect(template.id)}
                        className="relative bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold shadow-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 z-10"
                      >
                        Use this template
                      </button>
                    </div>
                  </div>

                  {/* Template Name */}
                  <div className="text-center mt-4">
                    <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Templates?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our professionally designed templates are optimized for success
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">ATS Optimized</h3>
                <p className="text-gray-600">Templates designed to pass Applicant Tracking Systems</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast & Easy</h3>
                <p className="text-gray-600">Create your resume in minutes, not hours</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Design</h3>
                <p className="text-gray-600">Stand out with beautifully designed templates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TemplatesPage;
