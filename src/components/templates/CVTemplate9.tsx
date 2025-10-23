import type { FC } from 'react';
import type { CVData } from '../../types/cv.types';
import { ContactInfo, Section, WorkExperienceItem, EducationItem, SkillsList } from '../common';

interface CVTemplate9Props {
  data: CVData;
  accentColor?: string;
  scale?: number;
  width?: string;
}

const CVTemplate9: FC<CVTemplate9Props> = ({ 
  data, 
  accentColor = '#DF7861',
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
          <div className="overflow-hidden relative p-8 pb-4 leading-normal text-black">
            {/* Decorative Bookmark SVG */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 36 48" 
              className="absolute top-0 right-8 w-8"
            >
              <path 
                fill={accentColor} 
                d="M.00015658 0H36.0002v45c0 1.7504-1.3216 3-3.0001 3-1.404 0-12.0449-6.6525-13.5-7.4999-1.4565-.8475-1.4789-.897-3 0C14.9791 41.4015 4.43116 48 3.00004 48 1.3005 48 0 46.7955 0 45L.00015658 0Z"
              />
              <path 
                fill="#000" 
                fillOpacity=".1" 
                d="M36 0 18 .0000332V39.8474c.387-.0031.7575.219 1.5.6525 1.449.8446 12.0136 7.4475 13.476 7.4955h.0705c1.656-.024 2.9534-1.2614 2.9534-2.9954L36 0Z"
              />
            </svg>

            {/* Header Section */}
            <div>
              <div className="flex items-center mb-2">
                <div>
                  {personalInfo.name && <div className="text-2xl">{personalInfo.name}</div>}
                </div>
              </div>
              
              {/* Contact Info - Inline */}
              <div className="pb-2">
                <ContactInfo 
                  personalInfo={personalInfo}
                  accentColor={accentColor}
                  layout="horizontal"
                  showIcons={true}
                />
              </div>
              
              {/* Summary with Border */}
              {personalInfo.summary && (
                <div className="py-4 border-t border-gray-300">
                  {personalInfo.summary}
                </div>
              )}
            </div>

            {/* Work Experience Section */}
            {workExperience.length > 0 && (
              <Section 
                title="Work Experience" 
                accentColor={accentColor}
                variant="colored"
                className="pt-4 border-t border-gray-300"
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
                className="pt-4 border-t border-gray-300"
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
                className="py-4 border-t border-gray-300 avoid-page-break"
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

export default CVTemplate9;

