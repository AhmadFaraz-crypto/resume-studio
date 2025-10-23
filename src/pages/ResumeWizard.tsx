import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { 
  WizardStep, 
  PersonalInfoStep, 
  WorkExperienceStep, 
  EducationStep, 
  SkillsStep, 
  SummaryStep, 
  ReviewStep 
} from '../components/wizard';
import { useCVData } from '../hooks/useCVData';
import { useSelectedTemplate } from '../hooks/useSelectedTemplate';
import { getDummyDataByIndex } from '../data/cvTitles';
import { isAuthenticated } from '../services/authService';
import { saveDraftResume } from '../services/draftService';
import type { CVData } from '../types/cv.types';

const ResumeWizard: React.FC = () => {
  const navigate = useNavigate();
  const { cvData, updateCVData } = useCVData();
  const { updateSelectedTemplate } = useSelectedTemplate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<CVData>(cvData);

  // Load selected template from localStorage when wizard starts
  useEffect(() => {
    const selectedTemplate = localStorage.getItem('selectedTemplate');
    if (selectedTemplate) {
      updateSelectedTemplate(selectedTemplate);
      
      // Load template-specific dummy data if no existing data
      if (!cvData.personalInfo.name || cvData.personalInfo.name === '') {
        const templateIndex = parseInt(selectedTemplate) - 1;
        const dummyData = getDummyDataByIndex(templateIndex);
        
        // Convert dummy data to CVData format
        const templateCVData: CVData = {
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
        setWizardData(templateCVData);
      }
    }
  }, [updateSelectedTemplate, cvData.personalInfo.name, updateCVData]);
  
  const totalSteps = 6;
  
  const steps = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Tell us about yourself - your name, contact details, and location.',
      component: PersonalInfoStep,
    },
    {
      id: 'work',
      title: 'Work Experience',
      description: 'Add your professional experience and achievements.',
      component: WorkExperienceStep,
    },
    {
      id: 'education',
      title: 'Education',
      description: 'Include your educational background and qualifications.',
      component: EducationStep,
    },
    {
      id: 'skills',
      title: 'Skills',
      description: 'List your technical and soft skills.',
      component: SkillsStep,
    },
    {
      id: 'summary',
      title: 'Professional Summary',
      description: 'Write a compelling summary that highlights your strengths.',
      component: SummaryStep,
    },
  ];

  const handleDataUpdate = (updatedData: Partial<CVData>) => {
    const newData = { ...wizardData, ...updatedData };
    setWizardData(newData);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleEdit = (stepId: string) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handleComplete = () => {
    // Save the wizard data
    updateCVData(wizardData);
    
    // Get the selected template before clearing it
    const selectedTemplate = localStorage.getItem('selectedTemplate') || '1';
    
    // Check if user is authenticated
    if (!isAuthenticated()) {
      // User is not logged in, save as draft
      saveDraftResume(wizardData, selectedTemplate);
      
      // Clear the selected template from localStorage
      localStorage.removeItem('selectedTemplate');
      
      // Navigate to editor with the selected template
      navigate(`/editor/${selectedTemplate}`);
    } else {
      // User is authenticated, proceed normally
      // Clear the selected template from localStorage since it's now saved
      localStorage.removeItem('selectedTemplate');
      
      // Navigate to editor with the selected template
      navigate(`/editor/${selectedTemplate}`);
    }
  };

  const getCanProceed = () => {
    const currentStepData = steps[currentStep - 1];
    
    switch (currentStepData.id) {
      case 'personal':
        return wizardData.personalInfo.name.trim() !== '' && 
               wizardData.personalInfo.email.trim() !== '';
      case 'work':
        return wizardData.workExperience.length > 0;
      case 'education':
        return wizardData.education.length > 0;
      case 'skills':
        return wizardData.skills.length > 0;
      case 'summary':
        return wizardData.personalInfo.summary.trim().length > 50;
      case 'review':
        return true;
      default:
        return false;
    }
  };

  // Handle review step separately
  if (currentStep === 6) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <WizardStep
            title="Review & Complete"
            description="Review all your information before proceeding."
            stepNumber={6}
            totalSteps={6}
            onNext={handleComplete}
            onPrevious={handlePrevious}
            canProceed={true}
            isFirstStep={false}
            isLastStep={true}
          >
            <ReviewStep
              data={wizardData}
              onEdit={handleEdit}
              onComplete={handleComplete}
            />
          </WizardStep>
        </div>
      </Layout>
    );
  }

  const currentStepData = steps[currentStep - 1];
  const StepComponent = currentStepData.component;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <WizardStep
          title={currentStepData.title}
          description={currentStepData.description}
          stepNumber={currentStep}
          totalSteps={6}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSkip={currentStep < 5 ? handleSkip : undefined}
          canProceed={getCanProceed()}
          isFirstStep={currentStep === 1}
          isLastStep={currentStep === 5}
        >
          <StepComponent
            data={wizardData}
            onUpdate={handleDataUpdate}
          />
        </WizardStep>
      </div>
    </Layout>
  );
};

export default ResumeWizard;
