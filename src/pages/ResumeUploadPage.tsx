import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Button } from '../components/common';
import { extractTextFromPDF, parseResumeText, optimizeResumeContent } from '../utils/aiService';
import { useErrorHandler } from '../hooks/useErrorHandler';

interface ExtractedData {
  // Simplified structure - all extracted data in one place
  extractedText: string;
  name: string;
  email: string;
  phone: string;
  summary: string;
}

const ResumeUploadPage: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { handleResumeError, handleAIOptimizing } = useErrorHandler();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file');
      return;
    }

    const maxFileSize = import.meta.env.VITE_MAX_FILE_SIZE ? 
      parseInt(import.meta.env.VITE_MAX_FILE_SIZE) : 50 * 1024 * 1024; // Default 50MB
    
    if (file.size > maxFileSize) {
      setError(`File size must be less than ${Math.round(maxFileSize / (1024 * 1024))}MB`);
      return;
    }

    setIsUploading(true);
    setError('');
    setUploadProgress(0);

    try {
      // Simulate file upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 30) {
            clearInterval(progressInterval);
            return 30;
          }
          return prev + 10;
        });
      }, 200);

      // Extract text from PDF
      const extractedText = await extractTextFromPDF(file);
      
      setUploadProgress(50);

      // Parse the extracted text
      const parsedData = await parseResumeText(extractedText);
      
      setUploadProgress(80);

      // Convert to ExtractedData format
      const extractedData: ExtractedData = {
        extractedText: parsedData.extractedText,
        name: parsedData.name,
        email: parsedData.email,
        phone: parsedData.phone,
        summary: parsedData.summary
      };

      setUploadProgress(100);
      setExtractedData(extractedData);
      setIsProcessing(false);
    } catch (err) {
      handleResumeError(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleOptimizeWithAI = async () => {
    if (!extractedData) return;

    setIsProcessing(true);
    setError('');

    try {
      handleAIOptimizing();
      
      // Convert ExtractedData to the format expected by AI service
      const dataForAI = {
        extractedText: extractedData.extractedText,
        name: extractedData.name,
        email: extractedData.email,
        phone: extractedData.phone,
        summary: extractedData.summary
      };

      // Use AI service to optimize content
      const optimizedData = await optimizeResumeContent(dataForAI);

      // Convert back to ExtractedData format
      const optimizedExtractedData: ExtractedData = {
        extractedText: optimizedData.extractedText,
        name: optimizedData.name,
        email: optimizedData.email,
        phone: optimizedData.phone,
        summary: optimizedData.summary
      };

      setExtractedData(optimizedExtractedData);
      
      // Save optimized data to localStorage for template selection
      localStorage.setItem('extractedResumeData', JSON.stringify(optimizedExtractedData));
      
      // Navigate to template selection
      navigate('/templates');
    } catch (err) {
      handleResumeError(err);
    } finally {
      setIsProcessing(false);
    }
  };


  const handleRetry = () => {
    setExtractedData(null);
    setError('');
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              AI-Powered Resume Parser
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Upload Your Existing Resume
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Upload your current resume and let our AI extract, clean, and optimize all the information 
              to create a professional resume with one of our templates.
            </p>
          </div>

          {!extractedData ? (
            /* Upload Section */
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center">
                <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Upload Your Resume PDF
                </h2>
                <p className="text-gray-600 mb-8">
                  Our AI will extract all information and optimize it for better results
                </p>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex">
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div className="ml-3">
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors duration-200">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isUploading}
                  />
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full flex flex-col items-center justify-center py-8"
                  >
                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      {isUploading ? 'Processing...' : 'Click to upload PDF'}
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF files only, max {Math.round((import.meta.env.VITE_MAX_FILE_SIZE ? 
                        parseInt(import.meta.env.VITE_MAX_FILE_SIZE) : 50 * 1024 * 1024) / (1024 * 1024))}MB
                    </p>
                  </button>

                  {isUploading && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {uploadProgress < 100 ? 'Extracting information...' : 'Processing complete!'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Results Section */
            <div className="space-y-8">

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleOptimizeWithAI}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Optimizing...' : 'Optimize with AI'}
                </Button>
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  className="px-8 py-4 rounded-lg font-semibold text-lg"
                >
                  Upload Different Resume
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ResumeUploadPage;
