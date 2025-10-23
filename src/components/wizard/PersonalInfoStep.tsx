import React, { useState } from 'react';
import { Input } from '../common';
import type { CVData } from '../../types/cv.types';

interface PersonalInfoStepProps {
  data: CVData;
  onUpdate: (data: Partial<CVData>) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: data.personalInfo.name || '',
    email: data.personalInfo.email || '',
    phone: data.personalInfo.phone || '',
    city: data.personalInfo.location.city || '',
    zipCode: data.personalInfo.location.zipCode || '',
    country: data.personalInfo.location.country || '',
    linkedin: data.personalInfo.linkedin || '',
  });

  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Update the main data
    onUpdate({
      personalInfo: {
        ...data.personalInfo,
        name: newFormData.name,
        email: newFormData.email,
        phone: newFormData.phone,
        location: {
          city: newFormData.city,
          zipCode: newFormData.zipCode,
          country: newFormData.country,
        },
        linkedin: newFormData.linkedin,
      }
    });
  };


  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Full Name *
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Email Address *
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Phone Number
          </label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            LinkedIn Profile
          </label>
          <Input
            type="url"
            value={formData.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/yourprofile"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            City
          </label>
          <Input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="New York"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            ZIP Code
          </label>
          <Input
            type="text"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            placeholder="10001"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Country
          </label>
          <Input
            type="text"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            placeholder="United States"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-semibold text-blue-800">
              Privacy & Security
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              Your personal information is stored securely in your browser and never shared with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
