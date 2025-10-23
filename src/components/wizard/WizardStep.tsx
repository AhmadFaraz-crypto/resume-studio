import React from 'react';

interface WizardStepProps {
  title: string;
  description: string;
  children: React.ReactNode;
  stepNumber: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip?: () => void;
  canProceed: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const WizardStep: React.FC<WizardStepProps> = ({
  title,
  description,
  children,
  stepNumber,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  canProceed,
  isFirstStep,
  isLastStep,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Animated Progress Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
              <span className="text-2xl font-bold text-white">{stepNumber}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Step {stepNumber} of {totalSteps}</h2>
            <p className="text-lg text-gray-600">{Math.round((stepNumber / totalSteps) * 100)}% Complete</p>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
              ></div>
            </div>
            {/* Progress Dots */}
            <div className="flex justify-between mt-4">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i < stepNumber
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg scale-125'
                      : i === stepNumber - 1
                      ? 'bg-blue-400 shadow-md scale-110'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Step Content */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                <p className="text-blue-100 text-lg">{description}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mb-8">
              {children}
            </div>

            {/* Enhanced Navigation */}
            <div className="flex justify-between items-center pt-8 border-t border-gray-100">
              <div>
                {!isFirstStep && (
                  <button
                    onClick={onPrevious}
                    className="group flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                )}
              </div>

              <div className="flex gap-4">
                {onSkip && (
                  <button
                    onClick={onSkip}
                    className="px-6 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200"
                  >
                    Skip for now
                  </button>
                )}
                
                <button
                  onClick={onNext}
                  disabled={!canProceed}
                  className={`group flex items-center px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    canProceed
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isLastStep ? 'Review & Continue' : 'Next Step'}
                  {canProceed && (
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardStep;
