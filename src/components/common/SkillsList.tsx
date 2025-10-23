import type { FC } from 'react';

interface SkillsListProps {
  skills: string[];
  accentColor: string;
  className?: string;
}

const SkillsList: FC<SkillsListProps> = ({ 
  skills, 
  accentColor, 
  className = ''
}) => {
  if (skills.length === 0) return null;

  return (
    <div className={`flex flex-wrap px-8 ${className}`}>
      {skills.map((skill, index) => (
        <div 
          key={index} 
          className="relative mt-2 mr-2 mb-2 px-3 py-1 text-white"
        >
          <div 
            className="absolute top-0 left-0 h-full w-full rounded opacity-90" 
            style={{ backgroundColor: accentColor }}
          />
          <span className="relative">{skill}</span>
        </div>
      ))}
    </div>
  );
};

export default SkillsList;
