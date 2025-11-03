import { useState, useCallback, memo } from 'react';
import type { FC, ChangeEvent, ReactNode } from 'react';
import type { CVData, WorkExperience, Education } from '../types/cv.types';
import { Button, Input, Textarea, Date, JobTitleDropdown } from './common';

interface CVEditorCollapsibleProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

interface CollapsibleSectionProps {
  title: string;
  icon: ReactNode;
  iconColor: string;
  children: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

const CollapsibleSection: FC<CollapsibleSectionProps> = memo(({ 
  title, 
  icon, 
  iconColor, 
  children, 
  isExpanded, 
  onToggle 
}) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
    <button
      onClick={onToggle}
      className="w-full p-6 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 flex items-center justify-between"
    >
      <div className="flex items-center">
        <div className={`w-10 h-10 ${iconColor} rounded-full flex items-center justify-center mr-4`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <svg
        className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
          isExpanded ? 'rotate-180' : ''
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    {isExpanded && (
      <div className="p-6 border-t border-gray-100">
        {children}
      </div>
    )}
  </div>
));

const CVEditorCollapsible: FC<CVEditorCollapsibleProps> = ({ data, onChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    work: true,
    education: true,
    skills: true,
  });
  const [counter, setCounter] = useState(0);

  const toggleSection = useCallback((section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const handlePersonalInfoChange = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const handleLocationChange = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        location: {
          ...data.personalInfo.location,
          [field]: value,
        },
      },
    });
  };

  const handleWorkExperienceChange = (index: number, field: keyof WorkExperience, value: string | string[]) => {
    const updatedExperience = [...data.workExperience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    onChange({
      ...data,
      workExperience: updatedExperience,
    });
  };

  const updateResponsibilities = (workIndex: number, value: string) => {
    const responsibilities = value.split('\n').filter(line => line.trim() !== '');
    const updatedExperience = [...data.workExperience];
    updatedExperience[workIndex] = {
      ...updatedExperience[workIndex],
      responsibilities,
    };
    onChange({
      ...data,
      workExperience: updatedExperience,
    });
  };

  const addWorkExperience = () => {
    onChange({
      ...data,
      workExperience: [
        ...data.workExperience,
        {
          id: `work-${counter}-${Math.random().toString(36).substr(2, 9)}`,
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          responsibilities: [],
        },
      ],
    });
    setCounter(counter + 1);
  };

  const removeWorkExperience = (index: number) => {
    const updatedExperience = data.workExperience.filter((_, i) => i !== index);
    onChange({
      ...data,
      workExperience: updatedExperience,
    });
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...data.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    onChange({
      ...data,
      education: updatedEducation,
    });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          id: `edu-${counter}-${Math.random().toString(36).substr(2, 9)}`,
          degree: '',
          institution: '',
          location: '',
          startDate: '',
          endDate: '',
        },
      ],
    });
    setCounter(counter + 1);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = data.education.filter((_, i) => i !== index);
    onChange({
      ...data,
      education: updatedEducation,
    });
  };

  const handleSkillsChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const skills = event.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
    onChange({
      ...data,
      skills,
    });
  };

  const togglePersonal = useCallback(() => toggleSection('personal'), [toggleSection]);
  const toggleWork = useCallback(() => toggleSection('work'), [toggleSection]);
  const toggleEducation = useCallback(() => toggleSection('education'), [toggleSection]);
  const toggleSkills = useCallback(() => toggleSection('skills'), [toggleSection]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Edit Your CV</h1>
              <p className="text-blue-100">Customize your information and experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <CollapsibleSection
        title="Personal Information"
        iconColor="bg-blue-100"
        icon={
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
        isExpanded={expandedSections.personal}
        onToggle={togglePersonal}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              type="text"
              value={data.personalInfo.name}
              onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={data.personalInfo.email}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
            />
            <Input
              label="Phone"
              type="tel"
              value={data.personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
            />
            <Input
              label="LinkedIn"
              type="url"
              value={data.personalInfo.linkedin || ''}
              onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
            />
            <Input
              label="City"
              type="text"
              value={data.personalInfo.location.city}
              onChange={(e) => handleLocationChange('city', e.target.value)}
            />
            <Input
              label="ZIP Code"
              type="text"
              value={data.personalInfo.location.zipCode}
              onChange={(e) => handleLocationChange('zipCode', e.target.value)}
            />
            <div className="md:col-span-2">
              <Input
                label="Country"
                type="text"
                value={data.personalInfo.location.country}
                onChange={(e) => handleLocationChange('country', e.target.value)}
              />
            </div>
          </div>
          <Textarea
            label="Professional Summary"
            value={data.personalInfo.summary}
            onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
            rows={4}
            placeholder="Write a compelling summary that highlights your key strengths, experience, and career goals..."
          />
        </div>
      </CollapsibleSection>

      {/* Work Experience */}
      <CollapsibleSection
        title={`Work Experience (${data.workExperience.length})`}
        iconColor="bg-purple-100"
        icon={
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        }
        isExpanded={expandedSections.work}
        onToggle={toggleWork}
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Add your professional experience and achievements</p>
            <Button onClick={addWorkExperience} size="sm">
              + Add Experience
            </Button>
          </div>
          
          {data.workExperience.map((job, index) => (
            <div key={job.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-semibold text-gray-900">Experience #{index + 1}</h4>
                <Button
                  onClick={() => removeWorkExperience(index)}
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
                    value={job.title}
                    onChange={(title) => handleWorkExperienceChange(index, 'title', title)}
                    onResponsibilitiesChange={(responsibilities) => {
                      const updatedExperience = [...data.workExperience];
                      updatedExperience[index] = {
                        ...updatedExperience[index],
                        responsibilities,
                      };
                      onChange({
                        ...data,
                        workExperience: updatedExperience,
                      });
                    }}
                    placeholder="Select or type a job title"
                  />
                </div>
                <Input
                  label="Company"
                  value={job.company}
                  onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                  placeholder="Tech Company Inc."
                />
                <Input
                  label="Location"
                  value={job.location}
                  onChange={(e) => handleWorkExperienceChange(index, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                />
                <Date
                  label="Start Date"
                  value={job.startDate}
                  onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                />
                <Date
                  label="End Date"
                  value={job.endDate}
                  onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                />
              </div>
              
              <Textarea
                label="Key Responsibilities"
                value={job.responsibilities.join('\n')}
                onChange={(e) => updateResponsibilities(index, e.target.value)}
                rows={4}
                placeholder="Enter each responsibility on a new line:&#10;&#10;• Led development of scalable web applications&#10;• Collaborated with cross-functional teams&#10;• Mentored junior developers&#10;• Implemented CI/CD pipelines"
                helperText="Enter each responsibility on a new line. Use bullet points or dashes for better formatting."
              />
            </div>
          ))}
          
          {data.workExperience.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No work experience added yet. Click "Add Experience" to get started.</p>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* Education */}
      <CollapsibleSection
        title={`Education (${data.education.length})`}
        iconColor="bg-orange-100"
        icon={
          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        }
        isExpanded={expandedSections.education}
        onToggle={toggleEducation}
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Include your educational background and qualifications</p>
            <Button onClick={addEducation} size="sm">
              + Add Education
            </Button>
          </div>
          
          {data.education.map((edu, index) => (
            <div key={edu.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-semibold text-gray-900">Education #{index + 1}</h4>
                <Button
                  onClick={() => removeEducation(index)}
                  variant="danger"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
                <Input
                  label="Institution"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                  placeholder="University of California"
                />
                <Input
                  label="Location"
                  value={edu.location}
                  onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                  placeholder="Berkeley, CA"
                />
                <Date
                  label="Start Date"
                  value={edu.startDate}
                  onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                />
                <Date
                  label="End Date"
                  value={edu.endDate}
                  onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                />
              </div>
            </div>
          ))}
          
          {data.education.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No education added yet. Click "Add Education" to get started.</p>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* Skills */}
      <CollapsibleSection
        title={`Skills (${data.skills.length})`}
        iconColor="bg-green-100"
        icon={
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        }
        isExpanded={expandedSections.skills}
        onToggle={toggleSkills}
      >
        <div className="space-y-6">
          <p className="text-gray-600">List your technical and soft skills</p>
          
          <Textarea
            label="Skills"
            value={data.skills.join(', ')}
            onChange={handleSkillsChange}
            rows={6}
            placeholder="HTML, CSS, JavaScript, React, Node.js, Python, SQL, Git, Leadership, Communication, Problem Solving, Project Management"
            helperText="Enter skills separated by commas. Include both technical and soft skills."
          />
          
          {data.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default CVEditorCollapsible;
