import type { FC, ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  accentColor: string;
  className?: string;
  titleClassName?: string;
  showBorder?: boolean;
  variant?: 'default' | 'inline' | 'colored';
}

const Section: FC<SectionProps> = ({ 
  title, 
  children, 
  accentColor, 
  className = '',
  titleClassName = '',
  showBorder = true,
  variant = 'default'
}) => {
  const getTitleElement = () => {
    switch (variant) {
      case 'inline':
        return (
          <div 
            className="inline-block py-1 pr-3 pl-12 mb-4 text-lg font-medium text-white uppercase" 
            style={{ backgroundColor: accentColor }}
          >
            {title}
          </div>
        );
      case 'colored':
        return (
          <div 
            className="mb-4 text-lg font-semibold uppercase" 
            style={{ color: accentColor }}
          >
            {title}
          </div>
        );
      default:
        return showBorder ? (
          <div 
            className="mb-4 border-b-2 px-8 text-lg font-semibold uppercase" 
            style={{ borderColor: accentColor }}
          >
            <h3 className={`${titleClassName}`}>{title}</h3>
          </div>
        ) : (
          <div 
            className="mb-4 px-8 text-lg font-semibold uppercase" 
            style={{ color: accentColor }}
          >
            <h3 className={`${titleClassName}`}>{title}</h3>
          </div>
        );
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      {getTitleElement()}
      {children}
    </div>
  );
};

export default Section;
