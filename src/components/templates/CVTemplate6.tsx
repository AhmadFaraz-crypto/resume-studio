import type { FC } from 'react';
import type { CVData } from '../../types/cv.types';
import { ContactInfo, Section, WorkExperienceItem, EducationItem, SkillsList } from '../common';

interface CVTemplate6Props {
  data: CVData;
  accentColor?: string;
  scale?: number;
  width?: string;
}

const CVTemplate6: FC<CVTemplate6Props> = ({ 
  data, 
  accentColor = '#C06C84',
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
          <div className="pb-6 leading-normal text-black">
            {/* Header Section */}
            <div>
              <div className="relative p-6 pb-0 text-2xl font-bold text-center">
                <div 
                  className="absolute top-0 left-0 w-full h-full opacity-10" 
                  style={{ backgroundColor: accentColor }}
                ></div>
                {personalInfo.name && <span className="relative">{personalInfo.name}</span>}
                <div className="pb-6 text-lg font-medium" style={{ color: accentColor }}></div>
              </div>
              
              {/* Contact Info Grid */}
              <div className="p-12 py-6">
                <ContactInfo 
                  personalInfo={personalInfo}
                  accentColor={accentColor}
                  layout="grid"
                  showIcons={true}
                />
              </div>
            </div>

            {/* Summary Section */}
            <div className="avoid-page-break">
              <div 
                className="inline-block py-1 pr-3 pl-12 mb-4 text-lg font-medium text-white uppercase" 
                style={{ backgroundColor: accentColor }}
              >
                Summary
              </div>
              <div className="px-12 pb-6">{personalInfo.summary}</div>
            </div>

            {/* Work Experience Section */}
            {workExperience.length > 0 && (
              <Section 
                title="Work Experience" 
                accentColor={accentColor}
                variant="inline"
                className="pb-2"
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
                variant="inline"
                className="pb-2"
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
                variant="inline"
                className="pb-6 avoid-page-break"
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

export default CVTemplate6;

