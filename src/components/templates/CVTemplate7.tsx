import type { FC } from 'react';
import type { CVData } from '../../types/cv.types';
import { ContactInfo, Section, WorkExperienceItem, EducationItem, SkillsList } from '../common';

interface CVTemplate7Props {
  data: CVData;
  accentColor?: string;
  scale?: number;
  width?: string;
}

const CVTemplate7: FC<CVTemplate7Props> = ({ 
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
          <div className="overflow-hidden leading-normal text-black">
            {/* Header Section with Background */}
            <div className="pb-8 text-white">
              {/* Name and Summary */}
              <div className="flex relative items-center p-8 pb-4">
                <div 
                  className="absolute top-0 left-0 w-full h-full opacity-90" 
                  style={{ backgroundColor: accentColor }}
                ></div>
                <div>
                  {personalInfo.name && <div className="relative text-2xl">{personalInfo.name}</div>}
                  {personalInfo.summary && (
                    <div className="relative pt-4 italic">{personalInfo.summary}</div>
                  )}
                </div>
              </div>
              
              {/* Contact Info Grid */}
              <div 
                className="px-8 py-2" 
                style={{ backgroundColor: accentColor }}
              >
                <ContactInfo 
                  personalInfo={personalInfo}
                  accentColor="#ffffff"
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
                variant="default"
                className="px-8 pb-4"
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
                className="px-8 pb-4"
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
                className="px-8 pb-8 avoid-page-break"
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

export default CVTemplate7;

