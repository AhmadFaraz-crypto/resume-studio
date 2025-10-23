import React, { type FC, useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useCVData } from '../hooks/useCVData';
import { useSelectedTemplate } from '../hooks/useSelectedTemplate';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { Layout } from '../components/layout';
import CVEditorCollapsible from '../components/CVEditorCollapsible';
import TemplateSelector from '../components/TemplateSelector';
import { renderTemplate } from '../utils/templateRenderer';
import { getDummyDataByIndex } from '../data/cvTitles';
import { getDraftResume } from '../services/draftService';
import { getResume } from '../services/resumeService';
import { onAuthStateChange } from '../services/authService';

const EditorPage: FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { cvData, updateCVData, isLoading } = useCVData();
  const { selectedTemplate, updateSelectedTemplate } = useSelectedTemplate();
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const { handleResumeError } = useErrorHandler();
  const hasLoadedData = useRef(false);
  
  // Get resume ID from URL params if editing existing resume
  const resumeId = searchParams.get('resumeId');

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      setIsAuthChecked(true);
      
      // If user is not authenticated and trying to edit a specific resume, redirect to login
      if (!firebaseUser && resumeId) {
        navigate(`/login?redirect=/editor/${templateId}&resumeId=${resumeId}`);
        return;
      }
    });

    return () => unsubscribe();
  }, [resumeId, templateId, navigate]);

  // Update selected template when URL changes
  React.useEffect(() => {
    if (templateId && templateId !== selectedTemplate) {
      updateSelectedTemplate(templateId);
    }
  }, [templateId, selectedTemplate, updateSelectedTemplate]);

  // Load resume data when resumeId changes
  useEffect(() => {
    if (resumeId && !hasLoadedData.current) {
      const loadResume = async () => {
        try {
          setIsLoadingResume(true);
          const resume = await getResume(resumeId);
          if (resume) {
            updateCVData(resume.data);
            hasLoadedData.current = true;
          }
        } catch (error) {
          handleResumeError(error);
        } finally {
          setIsLoadingResume(false);
        }
      };
      loadResume();
    }
  }, [resumeId, updateCVData, handleResumeError]);

  // Load other data sources if no resumeId
  useEffect(() => {
    if (!resumeId && !hasLoadedData.current) {
      // Check for draft resume data first (from wizard completion)
      const draftResume = getDraftResume();
      if (draftResume) {
        updateCVData(draftResume.cvData);
        hasLoadedData.current = true;
        return;
      }

      // Check for extracted resume data (from PDF upload)
      const extractedData = localStorage.getItem('extractedResumeData');
      if (extractedData) {
        try {
          const parsedData = JSON.parse(extractedData);
          // Convert to CVData format and update
          const cvData = {
            personalInfo: parsedData.personalInfo,
            workExperience: parsedData.workExperience,
            education: parsedData.education,
            skills: parsedData.skills
          };
          updateCVData(cvData);
          // Clear the extracted data to avoid reloading
          localStorage.removeItem('extractedResumeData');
          hasLoadedData.current = true;
        } catch (error) {
          handleResumeError(error);
        }
        return;
      }

      // If no resume data found, load template-specific dummy data
      if (!cvData.personalInfo.name || cvData.personalInfo.name === '') {
        try {
          const templateIndex = parseInt(selectedTemplate) - 1;
          const dummyData = getDummyDataByIndex(templateIndex);
          
          // Convert dummy data to CVData format
          const templateCVData = {
            personalInfo: {
              name: dummyData.personalInfo.name,
              email: dummyData.personalInfo.email,
              phone: dummyData.personalInfo.phone,
              location: {
                city: dummyData.personalInfo.location.split(',')[0].trim(),
                zipCode: '10001',
                country: 'USA',
              },
              linkedin: dummyData.personalInfo.linkedin,
              summary: dummyData.summary,
            },
            workExperience: dummyData.workExperience.map((exp, index) => ({
              id: (index + 1).toString(),
              title: exp.position,
              company: exp.company,
              location: 'Location',
              startDate: exp.startDate,
              endDate: exp.endDate,
              responsibilities: [exp.description],
            })),
            education: dummyData.education.map((edu, index) => ({
              id: (index + 1).toString(),
              degree: edu.degree,
              institution: edu.institution,
              location: 'Location',
              startDate: edu.startDate,
              endDate: edu.endDate,
            })),
            skills: dummyData.skills,
          };
          
          // Update CV data with template-specific dummy data
          updateCVData(templateCVData);
          hasLoadedData.current = true;
        } catch (error) {
          handleResumeError(error);
        }
      }
    }
  }, [resumeId, selectedTemplate, updateCVData, handleResumeError, cvData.personalInfo.name]);


  const handleTemplateChange = (templateId: string) => {
    try {
      updateSelectedTemplate(templateId);
      setIsTemplateModalOpen(false);
    } catch (error) {
      handleResumeError(error);
    }
  };

  if (isLoading || isLoadingResume || !isAuthChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {!isAuthChecked ? 'Checking authentication...' : 
             isLoadingResume ? 'Loading your resume...' : 'Loading your CV...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="w-full max-w-none px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-[calc(100vh-200px)]">
          {/* Left Side - CV Editor */}
          <div className="overflow-y-auto pr-2">
            {/* Template Selection Button */}
            <div className="mb-6">
              <button
                onClick={() => setIsTemplateModalOpen(true)}
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Select Template
              </button>
            </div>
            
            {/* CV Editor */}
            <CVEditorCollapsible 
              data={cvData} 
              onChange={(newData) => {
                try {
                  updateCVData(newData);
                } catch (error) {
                  handleResumeError(error);
                }
              }} 
            />
          </div>

          {/* Right Side - CV Preview */}
          <div className="overflow-y-auto">
            <div id="cv-export-content" className="w-full">
              {(() => {
                try {
                  return renderTemplate(selectedTemplate, cvData);
                } catch (error) {
                  handleResumeError(error);
                  return (
                    <div className="p-8 text-center text-red-600">
                      <p>Error rendering template. Please try again.</p>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>

        {/* Template Selection Modal */}
        {isTemplateModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Choose Your Template</h2>
                  </div>
                  <button
                    onClick={() => setIsTemplateModalOpen(false)}
                    className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-all duration-200 group cursor-pointer"
                  >
                    <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-700 group-active:text-gray-900 group-hover:scale-110 group-active:scale-95 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <TemplateSelector
                  selectedTemplateId={selectedTemplate}
                  onSelectTemplate={handleTemplateChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EditorPage;
