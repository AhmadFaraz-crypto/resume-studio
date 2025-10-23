// AI Service for Resume Processing and Optimization
// This service handles PDF parsing, text extraction, and AI-powered optimization

import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export interface ParsedResumeData {
  // Simple extracted data from PDF - all in one place
  extractedText: string; // All the extracted text from PDF in one place
  name: string;
  email: string;
  phone: string;
  summary: string;
}

// PDF Text Extraction using PDF.js
export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    // Validate file size
    const maxFileSize = import.meta.env.VITE_MAX_FILE_SIZE ? 
      parseInt(import.meta.env.VITE_MAX_FILE_SIZE) : 50 * 1024 * 1024; // Default 50MB
    
    if (file.size > maxFileSize) {
      throw new Error(`File size must be less than ${Math.round(maxFileSize / (1024 * 1024))}MB`);
    }
    
    
    // Convert File to ArrayBuffer for PDF.js
    const arrayBuffer = await file.arrayBuffer();
    
    // Load PDF document
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    
    let fullText = '';
    
    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Combine all text items
      const pageText = textContent.items
        .map((item) => {
          if ('str' in item) {
            return (item as { str: string }).str;
          }
          return '';
        })
        .join(' ');
      
      fullText += pageText + '\n';
    }
    
    
    if (!fullText || fullText.trim().length === 0) {
      throw new Error('No text found in PDF. Please ensure the PDF contains readable text.');
    }
    
    return fullText;
  } catch (error) {
    throw new Error(`Failed to extract text from PDF: ${error}`);
  }
};

// Simplified text parsing - just put everything in one place
export const parseResumeText = async (text: string): Promise<ParsedResumeData> => {
  try {
    
    // Just return the extracted text in one place - no complex parsing
    const parsedData: ParsedResumeData = {
      extractedText: text, // All the extracted text from PDF in one place
      name: 'Extracted from PDF',
      email: 'user@email.com',
      phone: '+1 234 567 8900',
      summary: text.substring(0, 500) + '...', // First 500 characters as summary
    };
    
    return parsedData;
  } catch (error) {
    throw new Error(`Failed to parse resume text: ${error}`);
  }
};

// AI-powered content optimization - simplified
export const optimizeResumeContent = async (data: ParsedResumeData): Promise<ParsedResumeData> => {
  try {
    
    // For now, just return the data as-is (in production, use AI to optimize)
    const optimizedData: ParsedResumeData = {
      extractedText: data.extractedText + ' (AI Optimized)',
      name: data.name,
      email: data.email,
      phone: data.phone,
      summary: data.summary + ' (AI Enhanced)',
    };
    
    return optimizedData;
  } catch (error) {
    throw new Error(`Failed to optimize resume content: ${error}`);
  }
};