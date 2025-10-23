import type { FC } from 'react';
import type { CVData } from '../../types/cv.types';
import { Section, WorkExperienceItem, EducationItem } from '../common';

interface CVTemplate3Props {
  data: CVData;
  accentColor?: string;
  scale?: number;
  width?: string;
}

const CVTemplate3: FC<CVTemplate3Props> = ({ 
  data, 
  accentColor = '#393E46',
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
          <div className="p-16 pb-12">
            {/* Header Section */}
            <div className="flex items-center pb-8 text-center">
              <div className="grow">
                {personalInfo.name && (
                  <div className="pb-2 text-xl font-medium text-black">
                    {personalInfo.name}
                    <span style={{ display: 'none' }}>, </span>
                  </div>
                )}
                <div>
                  <span>{personalInfo.location.city}</span>
                  <span>, {personalInfo.location.zipCode}</span>
                  <span>, {personalInfo.location.country}</span>
                  {personalInfo.phone && <span className="no-underline">, {personalInfo.phone}</span>}
                  {personalInfo.email && <span className="no-underline">, {personalInfo.email}</span>}
                  {personalInfo.linkedin && (
                    <a 
                      href={personalInfo.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="no-underline"
                    >
                      , {personalInfo.linkedin}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div 
              className="avoid-page-break flex border-t-2 py-4" 
              style={{ borderColor: accentColor }}
            >
              <div className="w-1/4 shrink-0 uppercase">Summary</div>
              <div>{personalInfo.summary}</div>
            </div>

            {/* Work Experience Section */}
            {workExperience.length > 0 && (
              <Section 
                title="Work Experience" 
                accentColor={accentColor}
                variant="colored"
                className="border-t-2 pt-4"
                showBorder={false}
              >
                <div className="avoid-page-break">
                  {workExperience.map((job, index) => (
                    <WorkExperienceItem
                      key={job.id}
                      job={job}
                      accentColor={accentColor}
                      variant="split"
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
                className="border-t-2 pt-4"
                showBorder={false}
              >
                <div className="avoid-page-break">
                  {education.map((edu, index) => (
                    <EducationItem
                      key={edu.id}
                      education={edu}
                      accentColor={accentColor}
                      variant="split"
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
                className="avoid-page-break flex border-t-2 py-4"
                showBorder={false}
              >
                <div className="-mt-2 flex w-3/4 flex-wrap">
                  {skills.map((skill, index) => (
                    <div 
                      key={index} 
                      className="w-1/2 pt-2 pr-4 font-medium text-black"
                    >
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

export default CVTemplate3;

