import type { FC } from 'react';
import type { CVData } from '../../types/cv.types';
import { ContactInfo, Section, WorkExperienceItem, EducationItem } from '../common';

interface CVTemplate11Props {
  data: CVData;
  accentColor?: string;
  scale?: number;
  width?: string;
}

const CVTemplate11: FC<CVTemplate11Props> = ({ 
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
        transform: `scale(${scale})`,
        backgroundColor: '#F7F7F7'
      }}
    >
          <div className="overflow-hidden py-9 leading-normal text-black">
            {/* Header Section */}
            <div>
              <div className="flex items-center px-12">
                <div>
                  {personalInfo.name && (
                    <div className="pb-2 text-2xl font-bold" style={{ color: accentColor }}>
                      {personalInfo.name}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 text-sm font-medium text-gray-600">
                    <ContactInfo 
                      personalInfo={personalInfo}
                      accentColor={accentColor}
                      layout="horizontal"
                      showIcons={true}
                    />
                  </div>
                </div>
              </div>
              <div className="mx-12 my-4 h-px bg-gray-300"></div>
            </div>

            {/* Summary Section */}
            {personalInfo.summary && (
              <div className="flex flex-col px-12 avoid-page-break">
                <div className="pb-2 text-base font-semibold uppercase">Summary</div>
                <div className="text-sm">{personalInfo.summary}</div>
                <div className="my-4 w-full h-px bg-gray-300"></div>
              </div>
            )}

            {/* Work Experience Section */}
            {workExperience.length > 0 && (
              <Section 
                title="Work Experience" 
                accentColor={accentColor}
                variant="colored"
                className="flex flex-col px-12"
                showBorder={false}
              >
                <div className="avoid-page-break pb-2">
                  {workExperience.map((job, index) => (
                    <WorkExperienceItem
                      key={job.id}
                      job={job}
                      accentColor={accentColor}
                      variant="minimal"
                      isLast={index === workExperience.length - 1}
                      className={index > 0 ? 'mt-2' : ''}
                    />
                  ))}
                </div>
                <div className="my-4 w-full h-px bg-gray-300"></div>
              </Section>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <Section 
                title="Education" 
                accentColor={accentColor}
                variant="colored"
                className="flex flex-col px-12"
                showBorder={false}
              >
                <div className="avoid-page-break">
                  {education.map((edu, index) => (
                    <EducationItem
                      key={edu.id}
                      education={edu}
                      accentColor={accentColor}
                      variant="minimal"
                      isLast={index === education.length - 1}
                    />
                  ))}
                </div>
                <div className="my-4 w-full h-px bg-gray-300"></div>
              </Section>
            )}

            {/* Skills Section - Comma Separated */}
            {skills.length > 0 && (
              <Section 
                title="Skills" 
                accentColor={accentColor}
                variant="colored"
                className="flex flex-col px-12 avoid-page-break"
                showBorder={false}
              >
                <div className="flex flex-wrap">
                  {skills.join(', ')}
                </div>
                <div className="my-4 w-full h-px bg-gray-300"></div>
              </Section>
            )}
          </div>
    </div>
  );
};

export default CVTemplate11;

