import type { FC } from 'react';
import type { CVData } from '../../types/cv.types';
import { Section, WorkExperienceItem, EducationItem, SkillsList } from '../common';

interface CVTemplate5Props {
  data: CVData;
  accentColor?: string;
  scale?: number;
  width?: string;
}

const CVTemplate5: FC<CVTemplate5Props> = ({ 
  data, 
  accentColor = '#3F72AF',
  scale = 1, // Full A4 size for accurate preview
  width = '793.92px'
}) => {
  const { personalInfo, workExperience, education, skills } = data;

  return (
    <div 
      className="text-sm leading-tight bg-white origin-top-left resume-template-wrapper" 
      style={{ 
        fontFamily: 'Arimo, sans-serif', 
        width: width,
        minHeight: '1123.2px',
        transform: `scale(${scale})`
      }}
    >
          <div className="pb-6 text-black">
            {/* Header Section */}
            <div className="pt-6 mb-6 text-center">
              {personalInfo.name && (
                <div className="text-2xl font-bold" style={{ color: accentColor }}>
                  {personalInfo.name}
                </div>
              )}
              <div className="pb-6 text-lg font-medium text-subtle"></div>
              <div className="flex flex-wrap justify-center px-4 py-2 space-x-2 border-y-2 border-subtle">
                <span className="no-underline">{personalInfo.phone}</span>
                <span className="text-subtle">•</span>
                <span>
                  <span>{personalInfo.location.city}</span>
                  <span>, {personalInfo.location.zipCode}</span>
                  <span>, {personalInfo.location.country}</span>
                </span>
                <span className="text-subtle">•</span>
                <span className="no-underline">{personalInfo.email}</span>
                {personalInfo.linkedin && (
                  <a 
                    href={personalInfo.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pt-1 w-full no-underline"
                  >
                    {personalInfo.linkedin}
                  </a>
                )}
              </div>
            </div>

            {/* Summary Section */}
            <div className="px-12 pb-6 avoid-page-break">
              <div className="relative p-4">
                <div 
                  className="absolute top-0 left-0 w-full h-full rounded opacity-10" 
                  style={{ backgroundColor: accentColor }}
                ></div>
                <span className="relative">{personalInfo.summary}</span>
              </div>
            </div>

            {/* Work Experience Section */}
            {workExperience.length > 0 && (
              <Section 
                title="Work Experience" 
                accentColor={accentColor}
                variant="default"
                className="px-12"
                showBorder={true}
              >
                <div className="avoid-page-break">
                  {workExperience.map((job, index) => (
                    <WorkExperienceItem
                      key={job.id}
                      job={job}
                      accentColor={accentColor}
                      variant="simple"
                      isLast={index === workExperience.length - 1}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <Section 
                title="Education" 
                accentColor={accentColor}
                variant="default"
                className="px-12"
                showBorder={true}
              >
                <div className="avoid-page-break">
                  {education.map((edu, index) => (
                    <EducationItem
                      key={edu.id}
                      education={edu}
                      accentColor={accentColor}
                      variant="simple"
                      isLast={index === education.length - 1}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* Skills Section */}
            {skills.length > 0 && (
              <Section 
                title="Skills" 
                accentColor={accentColor}
                variant="default"
                className="px-12 pb-6 avoid-page-break"
                showBorder={true}
              >
                <SkillsList 
                  skills={skills}
                  accentColor={accentColor}
                />
              </Section>
            )}
          </div>
    </div>
  );
};

export default CVTemplate5;

