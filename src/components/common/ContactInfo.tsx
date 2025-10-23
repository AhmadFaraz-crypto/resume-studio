import type { FC } from 'react';
import type { CVData } from '../../types/cv.types';

interface ContactInfoProps {
  personalInfo: CVData['personalInfo'];
  accentColor: string;
  layout?: 'horizontal' | 'vertical' | 'grid';
  showIcons?: boolean;
  className?: string;
}

const ContactInfo: FC<ContactInfoProps> = ({ 
  personalInfo, 
  accentColor, 
  layout = 'horizontal',
  showIcons = true,
  className = ''
}) => {
  const contactItems = [
    {
      icon: '📧',
      value: personalInfo.email,
      show: !!personalInfo.email
    },
    {
      icon: '📞',
      value: personalInfo.phone,
      show: !!personalInfo.phone
    },
    {
      icon: '📍',
      value: personalInfo.location.city || personalInfo.location.zipCode || personalInfo.location.country
        ? `${personalInfo.location.city || ''}${personalInfo.location.zipCode ? `, ${personalInfo.location.zipCode}` : ''}${personalInfo.location.country ? `, ${personalInfo.location.country}` : ''}`
        : '',
      show: !!(personalInfo.location.city || personalInfo.location.zipCode || personalInfo.location.country)
    },
    {
      icon: '🔗',
      value: personalInfo.linkedin,
      show: !!personalInfo.linkedin,
      isLink: true
    }
  ].filter(item => item.show);

  const getLayoutClasses = () => {
    switch (layout) {
      case 'vertical':
        return 'flex flex-col space-y-2';
      case 'grid':
        return 'grid grid-cols-2 gap-2';
      default:
        return 'flex flex-wrap gap-4';
    }
  };

  const getItemClasses = () => {
    switch (layout) {
      case 'vertical':
        return 'flex items-center space-x-2';
      case 'grid':
        return 'flex items-center space-x-1';
      default:
        return 'flex items-center space-x-1';
    }
  };

  if (contactItems.length === 0) return null;

  return (
    <div className={`${getLayoutClasses()} ${className}`}>
      {contactItems.map((item, index) => (
        <div key={index} className={getItemClasses()}>
          {showIcons && (
            <span 
              className="text-sm"
              style={{ color: accentColor }}
            >
              {item.icon}
            </span>
          )}
          {item.isLink ? (
            <a 
              href={item.value} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs no-underline hover:underline"
            >
              {item.value}
            </a>
          ) : (
            <span className="text-xs">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
