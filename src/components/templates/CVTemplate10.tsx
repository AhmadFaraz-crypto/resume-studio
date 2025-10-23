import type { FC } from 'react';
import type { CVData } from '../../types/cv.types';
import { ContactInfo, Section, WorkExperienceItem, EducationItem } from '../common';

interface CVTemplate10Props {
  data: CVData;
  accentColor?: string;
  scale?: number;
  width?: string;
}

const CVTemplate10: FC<CVTemplate10Props> = ({ 
  data, 
  accentColor = '#8675A9',
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
          <div className="overflow-hidden pb-9 leading-normal text-black">
            {/* Header with Name */}
            <div>
              <div 
                className="relative px-12 mb-3 text-2xl font-semibold" 
                style={{ color: accentColor }}
              >
                <div 
                  className="absolute top-0 left-0 w-full h-full opacity-10" 
                  style={{ backgroundColor: accentColor }}
                ></div>
                <div className="flex items-center">
                  {personalInfo.name && <div className="py-12">{personalInfo.name}</div>}
                </div>
              </div>
              
              {/* Contact Section */}
              <div className="flex px-12 py-3 space-x-3">
                <div 
                  className="w-1/4 font-semibold uppercase shrink-0" 
                  style={{ color: accentColor }}
                >
                  Contact
                </div>
                <div className="grow">
                  <ContactInfo 
                    personalInfo={personalInfo}
                    accentColor={accentColor}
                    layout="vertical"
                    showIcons={true}
                  />
                </div>
              </div>
            </div>

            {/* Summary Section */}
            {personalInfo.summary && (
              <div className="flex px-12 space-x-3 avoid-page-break">
                <div 
                  className="py-3 w-1/4 font-semibold uppercase border-t-2 shrink-0 border-gray-300" 
                  style={{ color: accentColor }}
                >
                  Summary
                </div>
                <div className="py-3 border-t-2 grow border-gray-300">
                  {personalInfo.summary}
                </div>
              </div>
            )}

            {/* Work Experience Section */}
            {workExperience.length > 0 && (
              <Section 
                title="Work Experience" 
                accentColor={accentColor}
                variant="colored"
                className="px-12"
                showBorder={false}
              >
                <div className="avoid-page-break">
                  <div className="flex space-x-3">
                    <div className="w-1/4 border-t-2 shrink-0 border-gray-300"></div>
                    <div className="border-t-2 grow border-gray-300"></div>
                  </div>
                  {workExperience.map((job, index) => (
                    <WorkExperienceItem
                      key={job.id}
                      job={job}
                      accentColor={accentColor}
                      variant="sidebar"
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
                className="px-12"
                showBorder={false}
              >
                <div className="avoid-page-break">
                  <div className="flex space-x-3">
                    <div className="w-1/4 border-t-2 shrink-0 border-gray-300"></div>
                    <div className="border-t-2 grow border-gray-300"></div>
                  </div>
                  {education.map((edu, index) => (
                    <EducationItem
                      key={edu.id}
                      education={edu}
                      accentColor={accentColor}
                      variant="sidebar"
                      isLast={index === education.length - 1}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* Skills Section - 2 Column Grid */}
            {skills.length > 0 && (
              <Section 
                title="Skills" 
                accentColor={accentColor}
                variant="colored"
                className="flex px-12 space-x-3 avoid-page-break"
                showBorder={false}
              >
                <div className="flex flex-wrap py-3 border-t-2 grow border-gray-300">
                  {skills.map((skill, index) => (
                    <div key={index} className="pr-2 w-1/2">
                      {skill}
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>
    </div>
  );
};

export default CVTemplate10;

