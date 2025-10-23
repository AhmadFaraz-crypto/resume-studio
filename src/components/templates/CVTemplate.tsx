import type { FC } from 'react';
import type { CVData } from '../../types/cv.types';
import { ContactInfo, Section, WorkExperienceItem, EducationItem, SkillsList } from '../common';

interface CVTemplateProps {
  data: CVData;
  accentColor?: string;
  scale?: number;
  width?: string;
}

const CVTemplate: FC<CVTemplateProps> = ({ 
  data, 
  accentColor = '#AD8B73',
  scale = 1, // Full A4 size for accurate preview
  width = '793.92px'
}) => {
  const { personalInfo, workExperience, education, skills } = data;

  return (
    <div 
      className="resume-template-wrapper origin-top-left bg-white text-sm" 
      style={{ 
        fontFamily: 'Arimo, sans-serif', 
        width: width,
        minHeight: '1123.2px',
        transform: `scale(${scale})` 
      }}
    >
      <div className="resume-template-7 overflow-hidden text-black">
        {/* Header Section */}
        <div className="flex flex-wrap justify-between p-8">
          <div className="flex flex-col items-start">
            {personalInfo.name && <div className="text-2xl">{personalInfo.name}</div>}
            <div style={{ display: 'none', color: accentColor }}></div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <ContactInfo 
              personalInfo={personalInfo}
              accentColor={accentColor}
              layout="vertical"
              showIcons={true}
            />
          </div>
        </div>

        {/* Summary Section */}
        {personalInfo.summary && (
          <div className="text-subtle w-full pt-4 px-8">
            {personalInfo.summary}
          </div>
        )}

        {/* Work Experience Section */}
        {workExperience.length > 0 && (
          <Section title="Work Experience" accentColor={accentColor}>
            <div className="avoid-page-break">
              {workExperience.map((job, index) => (
                <WorkExperienceItem
                  key={job.id}
                  job={job}
                  accentColor={accentColor}
                  isLast={index === workExperience.length - 1}
                />
              ))}
            </div>
          </Section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <Section title="Education" accentColor={accentColor}>
            <div className="avoid-page-break">
              {education.map((edu, index) => (
                <EducationItem
                  key={edu.id}
                  education={edu}
                  accentColor={accentColor}
                  isLast={index === education.length - 1}
                />
              ))}
            </div>
          </Section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <Section title="Skills" accentColor={accentColor}>
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

export default CVTemplate;

