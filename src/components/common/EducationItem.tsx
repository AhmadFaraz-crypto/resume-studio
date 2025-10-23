import type { FC } from 'react';
import type { Education } from '../../types/cv.types';

interface EducationItemProps {
  education: Education;
  accentColor: string;
  isLast?: boolean;
  className?: string;
  variant?: 'default' | 'simple' | 'compact' | 'sidebar' | 'minimal' | 'split';
}

const EducationItem: FC<EducationItemProps> = ({ 
  education, 
  accentColor, 
  isLast = false,
  className = '',
  variant = 'default'
}) => {
  const renderDefault = () => (
    <div className={`avoid-page-break px-8 ${className}`}>
      <div 
        style={{ borderColor: accentColor }} 
        className={`relative pb-4 pl-4 ${!isLast ? 'border-l-2' : ''}`}
      >
        <div 
          className="absolute top-0 -left-2 h-4 w-4 rounded-full border-4 bg-white" 
          style={{ borderColor: accentColor }}
        />
        <div className="-translate-y-0.5 font-semibold">{education.degree}</div>
        <div>{education.institution}</div>
        <div 
          className="flex justify-between italic" 
          style={{ color: accentColor }}
        >
          <span>{education.location}</span>
          <span>{education.startDate} – {education.endDate}</span>
        </div>
      </div>
    </div>
  );

  const renderSimple = () => (
    <div className={`px-12 pb-4 avoid-page-break ${className}`}>
      <div className="flex">
        <div className="pr-4 grow">
          <div className="mb-1 font-bold">{education.degree}</div>
          <div className="text-subtle">{education.institution} • {education.location}</div>
        </div>
        <div className="whitespace-nowrap text-sm">
          {education.startDate} – {education.endDate}
        </div>
      </div>
    </div>
  );

  const renderCompact = () => (
    <div className={`avoid-page-break pb-4 ${className}`}>
      <div className="mb-1 font-medium">
        {education.degree}, {education.institution}, {education.location}
      </div>
      <div className="mb-1">
        {education.startDate} – {education.endDate}
      </div>
    </div>
  );

  const renderSidebar = () => (
    <div className={`flex pb-3 space-x-3 avoid-page-break ${className}`}>
      <div className="w-1/4 shrink-0 text-gray-600">
        {education.location} <br /> {education.startDate} – {education.endDate}
      </div>
      <div className="grow">
        <div className="text-base" style={{ color: accentColor }}>
          <span className="font-semibold">{education.degree}</span>
          <br />
          {education.institution}
        </div>
      </div>
    </div>
  );

  const renderMinimal = () => (
    <div className={`flex flex-col avoid-page-break ${className}`}>
      <div className="flex gap-2 items-center font-semibold">
        <span style={{ color: accentColor }}>{education.degree}</span>
        <div className="w-px h-4 bg-gray-300"></div>
        <span>{education.institution}</span>
      </div>
      <div className="font-medium text-gray-600">
        {education.startDate} – {education.endDate}, {education.location}
      </div>
    </div>
  );

  const renderSplit = () => (
    <div className={`avoid-page-break flex pb-4 ${className}`}>
      <div className="w-1/4 shrink-0 pr-2">
        {education.startDate} – {education.endDate}
      </div>
      <div className="w-3/4">
        <div className="flex">
          <div className="grow pr-4 font-medium text-black">
            {education.degree}, {education.institution}
          </div>
          <div className="whitespace-nowrap">{education.location}</div>
        </div>
      </div>
    </div>
  );

  switch (variant) {
    case 'simple':
      return renderSimple();
    case 'compact':
      return renderCompact();
    case 'sidebar':
      return renderSidebar();
    case 'minimal':
      return renderMinimal();
    case 'split':
      return renderSplit();
    default:
      return renderDefault();
  }
};

export default EducationItem;
