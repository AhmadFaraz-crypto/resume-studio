export interface CVData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: {
      city: string;
      zipCode: string;
      country: string;
    };
    linkedin?: string;
    summary: string;
  };
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail?: string;
  accentColor: string;
  planAccess: 'free' | 'pro' | 'business';
}

export type ExportFormat = 'pdf' | 'docx';

