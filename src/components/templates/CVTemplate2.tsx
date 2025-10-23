import type { FC } from 'react';
import type { CVData } from '../../types/cv.types';
import { ContactInfo, Section, WorkExperienceItem, EducationItem, SkillsList } from '../common';

interface CVTemplate2Props {
  data: CVData;
  accentColor?: string;
  scale?: number;
  width?: string;
}

const CVTemplate2: FC<CVTemplate2Props> = ({ 
  data, 
  accentColor = '#144272',
  scale = 1, // Full A4 size for accurate preview
  width = '793.92px'
}) => {
  const { personalInfo, workExperience, education, skills } = data;

  return (
    <div 
      className="resume-template-wrapper origin-top-left bg-white text-sm leading-tight" 
      style={{ 
        fontFamily: 'Arimo, sans-serif', 
        width: width,
        minHeight: '1123.2px',
        transform: `scale(${scale})` 
      }}
    >
          <div className="leading-normal text-black">
            {/* Header Section */}
            <div 
              className="mb-8 pt-8 text-center text-white" 
              style={{ backgroundColor: accentColor }}
            >
              {personalInfo.name && <div className="text-2xl font-medium">{personalInfo.name}</div>}
              <div style={{ display: 'none' }} className="text-lg"></div>
              <div className="mt-4 border-t border-white p-4">
                <ContactInfo 
                  personalInfo={personalInfo}
                  accentColor="#ffffff"
                  layout="horizontal"
                  showIcons={true}
                  className="justify-center"
                />
              </div>
            </div>

            {/* Summary Section */}
            <div className="avoid-page-break px-24 pb-8">
              <div 
                className="mb-2 text-lg font-medium" 
                style={{ color: accentColor }}
              >
                Summary
              </div>
              <div>{personalInfo.summary}</div>
            </div>

            {/* Work Experience Section */}
            {workExperience.length > 0 && (
              <Section 
                title="Work Experience" 
                accentColor={accentColor}
                variant="colored"
                className="px-24 pb-4"
                showBorder={false}
              >
                <div className="avoid-page-break">
                  {workExperience.map((job, index) => (
                    <WorkExperienceItem
                      key={job.id}
                      job={job}
                      accentColor={accentColor}
                      variant="compact"
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
                className="px-24 pb-4"
                showBorder={false}
              >
                <div className="avoid-page-break">
                  {education.map((edu, index) => (
                    <EducationItem
                      key={edu.id}
                      education={edu}
                      accentColor={accentColor}
                      variant="compact"
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
                variant="colored"
                className="avoid-page-break px-24 pb-8"
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

export default CVTemplate2;

