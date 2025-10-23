import type { FC } from 'react';
import type { CVData } from '../../types/cv.types';
import { ContactInfo, Section, WorkExperienceItem, EducationItem, SkillsList } from '../common';

interface CVTemplate8Props {
  data: CVData;
  accentColor?: string;
  scale?: number;
  width?: string;
}

const CVTemplate8: FC<CVTemplate8Props> = ({ 
  data, 
  accentColor = '#6096B4',
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
          <div className="overflow-hidden pb-4 leading-normal text-black">
            {/* Header Section */}
            <div className="pb-4">
              {/* Name and Summary */}
              <div className="flex items-center p-8 pb-4">
                <div>
                  {personalInfo.name && <div className="text-2xl">{personalInfo.name}</div>}
                  {personalInfo.summary && (
                    <div className="pt-1">{personalInfo.summary}</div>
                  )}
                </div>
              </div>
              
              {/* Contact Info Grid with Light Background */}
              <div className="flex relative flex-wrap px-8 py-2">
                <div 
                  className="absolute top-0 left-0 w-full h-full opacity-10" 
                  style={{ backgroundColor: accentColor }}
                ></div>
                <ContactInfo 
                  personalInfo={personalInfo}
                  accentColor={accentColor}
                  layout="grid"
                  showIcons={true}
                />
              </div>
            </div>

            {/* Work Experience Section */}
            {workExperience.length > 0 && (
              <Section 
                title="Work Experience" 
                accentColor={accentColor}
                variant="colored"
                className="px-8"
                showBorder={false}
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
                variant="colored"
                className="px-8"
                showBorder={false}
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

            {/* Skills Section - 3 Column Grid */}
            {skills.length > 0 && (
              <Section 
                title="Skills" 
                accentColor={accentColor}
                variant="colored"
                className="px-8 pb-4 avoid-page-break"
                showBorder={false}
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

export default CVTemplate8;

