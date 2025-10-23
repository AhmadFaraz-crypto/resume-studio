import type { FC } from 'react';
import type { WorkExperience } from '../../types/cv.types';

interface WorkExperienceItemProps {
  job: WorkExperience;
  accentColor: string;
  isLast?: boolean;
  className?: string;
  variant?: 'default' | 'simple' | 'compact' | 'sidebar' | 'minimal' | 'split';
}

const WorkExperienceItem: FC<WorkExperienceItemProps> = ({ 
  job, 
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
        <div className="-translate-y-0.5 font-semibold">{job.title}</div>
        <div>{job.company}</div>
        <div 
          className="flex justify-between italic" 
          style={{ color: accentColor }}
        >
          <span>{job.location}</span>
          <span>{job.startDate} – {job.endDate}</span>
        </div>
        <ul 
          className="mt-2 border-l-2 border-dotted pl-4" 
          style={{ borderColor: accentColor }}
        >
          {job.responsibilities.map((responsibility, idx) => (
            <li 
              key={idx} 
              style={{ color: accentColor }} 
              className="relative"
            >
              <span className="text-subtle">{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderSimple = () => (
    <div className={`px-12 pb-4 avoid-page-break ${className}`}>
      <div className="flex">
        <div className="pr-4 grow">
          <div className="mb-1 font-bold">{job.title}</div>
          <div className="text-subtle">{job.company} • {job.location}</div>
        </div>
        <div className="whitespace-nowrap text-sm">
          {job.startDate} – {job.endDate}
        </div>
      </div>
      <ul className="pl-4 mt-1 list-disc">
        {job.responsibilities.map((responsibility, idx) => (
          <li key={idx} className="pt-2">{responsibility}</li>
        ))}
      </ul>
    </div>
  );

  const renderCompact = () => (
    <div className={`avoid-page-break pb-4 ${className}`}>
      <div className="mb-1 font-medium">
        {job.title}, {job.company}, {job.location}
      </div>
      <div className="mb-1">
        {job.startDate} – {job.endDate}
      </div>
      <ul className="list-disc pl-8">
        {job.responsibilities.map((responsibility, idx) => (
          <li key={idx}>{responsibility}</li>
        ))}
      </ul>
    </div>
  );

  const renderSidebar = () => (
    <div className={`flex pb-3 space-x-3 avoid-page-break ${className}`}>
      <div className="w-1/4 shrink-0 text-gray-600">
        {job.location} <br /> {job.startDate} – {job.endDate}
      </div>
      <div className="grow">
        <div className="text-base" style={{ color: accentColor }}>
          <span className="font-semibold">{job.title}</span>
          <br />
          {job.company}
        </div>
        <ul className="pl-4 mt-1 list-disc">
          {job.responsibilities.map((responsibility, idx) => (
            <li key={idx}>{responsibility}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderMinimal = () => (
    <div className={`flex flex-col avoid-page-break ${className}`}>
      <div className="flex gap-2 items-center font-semibold">
        <span style={{ color: accentColor }}>{job.title}</span>
        <div className="w-px h-4 bg-gray-300"></div>
        <span>{job.company}</span>
      </div>
      <div className="font-medium text-gray-600">
        {job.startDate} – {job.endDate}, {job.location}
      </div>
      <ul className="pl-4 mt-1 list-disc">
        {job.responsibilities.map((responsibility, idx) => (
          <li key={idx}>{responsibility}</li>
        ))}
      </ul>
    </div>
  );

  const renderSplit = () => (
    <div className={`avoid-page-break flex pb-4 ${className}`}>
      <div className="w-1/4 shrink-0 pr-2">
        {job.startDate} – {job.endDate}
      </div>
      <div className="w-3/4">
        <div className="flex">
          <div className="grow pr-4 font-medium text-black">
            {job.title}, {job.company}
          </div>
          <div className="whitespace-nowrap">{job.location}</div>
        </div>
        <ul className="list-disc pt-2 pl-6">
          {job.responsibilities.map((responsibility, idx) => (
            <li key={idx}>{responsibility}</li>
          ))}
        </ul>
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

export default WorkExperienceItem;
