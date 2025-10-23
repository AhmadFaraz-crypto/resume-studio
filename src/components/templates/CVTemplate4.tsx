import type { FC } from 'react';
import type { CVData } from '../../types/cv.types';
import { Section, WorkExperienceItem, EducationItem } from '../common'; 

interface CVTemplate4Props {
  data: CVData;
  accentColor?: string;
  scale?: number;
  width?: string;
}

const CVTemplate4: FC<CVTemplate4Props> = ({ 
  data, 
  accentColor = '#903749',
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
          <div className="overflow-hidden pb-6 leading-normal text-black">
            {/* Header Section with SVG Pattern */}
            <div className="relative pt-12 pb-8 text-center">
              <div className="absolute -top-12 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 794 200">
                  <g stroke={accentColor} strokeWidth="2">
                    <path strokeOpacity=".06" d="M558.913 20.3294 592.657.776148 626.465 20.2272m-67.552.1022L525.11.887071 491.366 20.4404m67.547-.111.064 39.0043m-67.611-38.8933L457.557.989346 423.813 20.5426l.064 39.0043 33.803 19.4424m33.686-58.5489.059 38.9956m0 0L457.68 78.9893m33.745-19.5533 33.808 19.451m-67.553.1023.065 39.0047 33.803 19.442 33.744-19.553m168.721-97.7668L727.757.562951 761.565 20.014m-67.552.1022L660.21.673874 626.465 20.2272m67.548-.111.064 39.0043m-67.612-38.8933.059 38.9956m0 0L592.78 78.7761m33.744-19.5533 33.809 19.451m-67.553.1023-33.803-19.4424m33.803 19.4424.064 39.0039m-33.867-58.4463L525.233 78.887m0 0 .059 38.996m0 0 33.808 19.451 33.744-19.554m168.721-97.766L795.309.460676 829.118 19.9117l.059 38.9956-33.745 19.5533M761.565 20.014l.064 39.0042m0 0-33.744 19.5533m33.744-19.5533 33.803 19.4424m-67.547.1109-33.808-19.451m33.808 19.451.059 38.9955m-33.867-58.4465-33.744 19.5533m0 0 .064 39.0042m0 0-33.744 19.553m33.744-19.553L694.2 137.12m-67.547.111-33.809-19.451m33.809 19.451.059 38.996 33.808 19.451 33.744-19.553m101.168-97.6644.065 39.0044m0 0-33.745 19.553m33.745-19.553 33.803 19.442.064 39.005-33.744 19.553m-33.868-58.447-33.808-19.451m33.808 19.451.059 38.996m-33.867-58.447L694.2 137.12m0 0 .064 39.005m0 0 33.803 19.442 33.744-19.553m33.809 19.451-33.809-19.451m33.809 19.451.064 39.004"></path>
                    <path strokeOpacity=".03" d="m524.953 39.6098 33.744-19.5533 33.808 19.451m-67.552.1023L491.15 20.1674l-33.744 19.5533m67.547-.1109.064 39.0042m-67.611-38.8933-33.809-19.451m33.809 19.451.059 38.9956 33.808 19.451m168.78-58.7707 33.744-19.5533 33.808 19.451m-67.552.1023L626.25 19.9542l-33.745 19.5533m67.548-.1109.064 39.0042m-67.612-38.8933.059 38.9956m0 0L558.82 98.0564m33.744-19.5533 33.809 19.451m-67.553.1023L525.017 78.614m33.803 19.4424.064 39.0046m-33.867-58.447-33.744 19.5533m0 0 .059 38.9957 33.808 19.451 33.744-19.553M828.902 19.6387 795.158 39.192m0 0-33.809-19.451-33.744 19.5533m67.553-.1023.059 38.9956m-67.612-38.8933.064 39.0043m0 0-33.744 19.5532m33.744-19.5532 33.803 19.4423m-67.547.1109-33.808-19.451m33.808 19.451.059 38.9952m-33.867-58.4462-33.744 19.5533m0 0 .064 39.0039m0 0-33.744 19.554-33.809-19.451m67.553-.103 33.803 19.443m134.977-78.2134 33.808 19.451.059 38.9954-33.744 19.554m-.123-78.0004-33.745 19.5533m0 0 .065 39.0041m0 0-33.745 19.553m33.745-19.553 33.803 19.443m-67.548.11-33.808-19.451m33.808 19.451.059 38.996m-33.867-58.447-33.744 19.554m0 0 .064 39.004m135.036-39.217.064 39.004 33.808 19.451.059 38.995"></path>
                  </g>
                </svg>
              </div>
              <div className="relative">
                {personalInfo.name && (
                  <div className="text-2xl font-medium" style={{ color: accentColor }}>
                    {personalInfo.name}
                  </div>
                )}
                <div style={{ display: 'none' }} className="text-lg"></div>
                <div className="px-4 pt-2 space-x-2 text-center">
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
                    <>
                      <br />
                      <a 
                        href={personalInfo.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="no-underline"
                      >
                        {personalInfo.linkedin}
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="relative p-6 mx-12 border-t avoid-page-break border-subtle">
              <div 
                style={{ backgroundColor: accentColor }} 
                className="absolute top-0 left-0 w-16 h-1"
              ></div>
              <div className="mb-2 font-medium uppercase" style={{ color: accentColor }}>
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
                className="relative p-6 pb-2 mx-12 border-t border-subtle"
                showBorder={false}
              >
                <div 
                  style={{ backgroundColor: accentColor }} 
                  className="absolute top-0 left-0 w-16 h-1"
                ></div>
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
                className="relative p-6 pb-2 mx-12 border-t border-subtle"
                showBorder={false}
              >
                <div 
                  style={{ backgroundColor: accentColor }} 
                  className="absolute top-0 left-0 w-16 h-1"
                ></div>
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
                className="relative p-6 mx-12 border-t border-subtle avoid-page-break"
                showBorder={false}
              >
                <div 
                  style={{ backgroundColor: accentColor }} 
                  className="absolute top-0 left-0 w-16 h-1"
                ></div>
                <ul className="flex flex-wrap pl-4 list-disc">
                  {skills.map((skill, index) => (
                    <li key={index} className="w-1/2">
                      {skill}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>
    </div>
  );
};

export default CVTemplate4;

