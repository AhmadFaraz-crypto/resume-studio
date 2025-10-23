// CV Titles and Dummy Data for Template Previews
export interface CVDummyData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  summary: string;
  workExperience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }>;
  skills: string[];
}

export const cvTitles: CVDummyData[] = [
  {
    personalInfo: {
      name: "Sarah Johnson",
      title: "Senior Software Engineer",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/sarahjohnson",
      website: "sarahjohnson.dev"
    },
    summary: "Experienced software engineer with 5+ years of expertise in full-stack development, cloud architecture, and team leadership. Passionate about building scalable applications and mentoring junior developers.",
    workExperience: [
      {
        company: "TechCorp Inc.",
        position: "Senior Software Engineer",
        startDate: "2021",
        endDate: "Present",
        description: "Lead development of microservices architecture, mentor junior developers, and implement CI/CD pipelines."
      },
      {
        company: "StartupXYZ",
        position: "Full Stack Developer",
        startDate: "2019",
        endDate: "2021",
        description: "Developed web applications using React, Node.js, and AWS. Collaborated with cross-functional teams."
      }
    ],
    education: [
      {
        institution: "Stanford University",
        degree: "Master of Science",
        field: "Computer Science",
        startDate: "2017",
        endDate: "2019"
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "AWS", "Python", "Docker", "Kubernetes", "MongoDB"]
  },
  {
    personalInfo: {
      name: "Michael Chen",
      title: "Marketing Director",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      location: "New York, NY",
      linkedin: "linkedin.com/in/michaelchen",
      website: "michaelchenmarketing.com"
    },
    summary: "Results-driven marketing professional with 8+ years of experience in digital marketing, brand management, and team leadership. Proven track record of increasing revenue by 40% through strategic campaigns.",
    workExperience: [
      {
        company: "Global Marketing Solutions",
        position: "Marketing Director",
        startDate: "2020",
        endDate: "Present",
        description: "Lead marketing strategy for B2B and B2C campaigns, manage $2M annual budget, and oversee team of 12 professionals."
      },
      {
        company: "Digital Agency Pro",
        position: "Senior Marketing Manager",
        startDate: "2018",
        endDate: "2020",
        description: "Developed and executed digital marketing campaigns, increased client ROI by 35%, and managed key accounts."
      }
    ],
    education: [
      {
        institution: "Columbia Business School",
        degree: "Master of Business Administration",
        field: "Marketing",
        startDate: "2016",
        endDate: "2018"
      }
    ],
    skills: ["Digital Marketing", "SEO/SEM", "Social Media", "Content Strategy", "Analytics", "Team Leadership", "Brand Management"]
  },
  {
    personalInfo: {
      name: "Dr. Emily Rodriguez",
      title: "Senior Research Scientist",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      location: "Boston, MA",
      linkedin: "linkedin.com/in/emilyrodriguez",
      website: "emilyrodriguezresearch.com"
    },
    summary: "Accomplished research scientist with 10+ years of experience in biomedical research, drug development, and clinical trials. Published 25+ peer-reviewed papers and led multiple NIH-funded projects.",
    workExperience: [
      {
        company: "Biotech Innovations",
        position: "Senior Research Scientist",
        startDate: "2019",
        endDate: "Present",
        description: "Lead research on cancer therapeutics, manage $3M research budget, and supervise team of 8 researchers."
      },
      {
        company: "Harvard Medical School",
        position: "Research Fellow",
        startDate: "2017",
        endDate: "2019",
        description: "Conducted groundbreaking research on immunotherapy, published 12 papers, and mentored graduate students."
      }
    ],
    education: [
      {
        institution: "MIT",
        degree: "Ph.D.",
        field: "Biomedical Engineering",
        startDate: "2012",
        endDate: "2017"
      }
    ],
    skills: ["Research & Development", "Clinical Trials", "Data Analysis", "Project Management", "Scientific Writing", "Team Leadership", "Biotechnology"]
  },
  {
    personalInfo: {
      name: "James Wilson",
      title: "Financial Analyst",
      email: "james.wilson@email.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      linkedin: "linkedin.com/in/jameswilson",
      website: "jameswilsonfinance.com"
    },
    summary: "Detail-oriented financial analyst with 6+ years of experience in investment analysis, financial modeling, and risk assessment. CFA charterholder with expertise in equity research and portfolio management.",
    workExperience: [
      {
        company: "Goldman Sachs",
        position: "Senior Financial Analyst",
        startDate: "2020",
        endDate: "Present",
        description: "Analyze investment opportunities, build financial models, and provide recommendations to senior management."
      },
      {
        company: "JP Morgan Chase",
        position: "Financial Analyst",
        startDate: "2018",
        endDate: "2020",
        description: "Conducted equity research, prepared investment reports, and supported portfolio management decisions."
      }
    ],
    education: [
      {
        institution: "University of Chicago",
        degree: "Master of Business Administration",
        field: "Finance",
        startDate: "2016",
        endDate: "2018"
      }
    ],
    skills: ["Financial Modeling", "Investment Analysis", "Risk Assessment", "Excel", "Bloomberg Terminal", "Portfolio Management", "CFA"]
  },
  {
    personalInfo: {
      name: "Lisa Thompson",
      title: "UX/UI Designer",
      email: "lisa.thompson@email.com",
      phone: "+1 (555) 567-8901",
      location: "Seattle, WA",
      linkedin: "linkedin.com/in/lisathompson",
      website: "lisathompsondesign.com"
    },
    summary: "Creative UX/UI designer with 7+ years of experience in user-centered design, prototyping, and design systems. Passionate about creating intuitive and accessible digital experiences.",
    workExperience: [
      {
        company: "Microsoft",
        position: "Senior UX Designer",
        startDate: "2021",
        endDate: "Present",
        description: "Lead design for enterprise software products, conduct user research, and establish design system standards."
      },
      {
        company: "Amazon",
        position: "UX Designer",
        startDate: "2019",
        endDate: "2021",
        description: "Designed e-commerce experiences, improved conversion rates by 25%, and collaborated with product and engineering teams."
      }
    ],
    education: [
      {
        institution: "Art Center College of Design",
        degree: "Bachelor of Fine Arts",
        field: "Graphic Design",
        startDate: "2014",
        endDate: "2018"
      }
    ],
    skills: ["User Research", "Prototyping", "Figma", "Adobe Creative Suite", "Design Systems", "Accessibility", "User Testing"]
  },
  {
    personalInfo: {
      name: "David Kim",
      title: "Data Scientist",
      email: "david.kim@email.com",
      phone: "+1 (555) 678-9012",
      location: "Austin, TX",
      linkedin: "linkedin.com/in/davidkim",
      website: "davidkimdata.com"
    },
    summary: "Data scientist with 5+ years of experience in machine learning, statistical analysis, and big data processing. Expert in Python, R, and cloud platforms with a focus on predictive modeling and business intelligence.",
    workExperience: [
      {
        company: "Netflix",
        position: "Senior Data Scientist",
        startDate: "2021",
        endDate: "Present",
        description: "Develop ML models for recommendation systems, analyze user behavior data, and lead data science initiatives."
      },
      {
        company: "Uber",
        position: "Data Scientist",
        startDate: "2019",
        endDate: "2021",
        description: "Built predictive models for demand forecasting, optimized pricing algorithms, and improved operational efficiency."
      }
    ],
    education: [
      {
        institution: "Carnegie Mellon University",
        degree: "Master of Science",
        field: "Machine Learning",
        startDate: "2017",
        endDate: "2019"
      }
    ],
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "PyTorch", "AWS", "Statistical Analysis", "Data Visualization"]
  },
  {
    personalInfo: {
      name: "Maria Garcia",
      title: "Project Manager",
      email: "maria.garcia@email.com",
      phone: "+1 (555) 789-0123",
      location: "Miami, FL",
      linkedin: "linkedin.com/in/mariagarcia",
      website: "mariagarciapm.com"
    },
    summary: "Certified Project Management Professional (PMP) with 8+ years of experience leading cross-functional teams and delivering complex projects on time and within budget. Expert in Agile methodologies and stakeholder management.",
    workExperience: [
      {
        company: "Accenture",
        position: "Senior Project Manager",
        startDate: "2020",
        endDate: "Present",
        description: "Lead digital transformation projects for Fortune 500 clients, manage teams of 15+ professionals, and ensure project delivery excellence."
      },
      {
        company: "Deloitte",
        position: "Project Manager",
        startDate: "2018",
        endDate: "2020",
        description: "Managed IT implementation projects, coordinated with global teams, and delivered solutions exceeding client expectations."
      }
    ],
    education: [
      {
        institution: "Florida International University",
        degree: "Master of Science",
        field: "Project Management",
        startDate: "2016",
        endDate: "2018"
      }
    ],
    skills: ["Project Management", "Agile", "Scrum", "Stakeholder Management", "Risk Management", "Budget Planning", "Team Leadership"]
  },
  {
    personalInfo: {
      name: "Alex Johnson",
      title: "Sales Manager",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 890-1234",
      location: "Denver, CO",
      linkedin: "linkedin.com/in/alexjohnson",
      website: "alexjohnsonsales.com"
    },
    summary: "Results-oriented sales professional with 9+ years of experience in B2B sales, team management, and revenue growth. Consistently exceeded sales targets by 20% and built strong client relationships across various industries.",
    workExperience: [
      {
        company: "Salesforce",
        position: "Regional Sales Manager",
        startDate: "2021",
        endDate: "Present",
        description: "Lead sales team of 8 representatives, manage $5M annual quota, and develop strategic partnerships with enterprise clients."
      },
      {
        company: "Oracle",
        position: "Senior Sales Representative",
        startDate: "2018",
        endDate: "2021",
        description: "Generated $3M in annual revenue, managed key accounts, and mentored junior sales professionals."
      }
    ],
    education: [
      {
        institution: "University of Colorado",
        degree: "Bachelor of Science",
        field: "Business Administration",
        startDate: "2012",
        endDate: "2016"
      }
    ],
    skills: ["Sales Management", "CRM", "Lead Generation", "Client Relations", "Negotiation", "Team Leadership", "Revenue Growth"]
  }
];

// Function to get dummy data by index (for template previews)
export const getDummyDataByIndex = (index: number): CVDummyData => {
  return cvTitles[index % cvTitles.length];
};

// Function to get random dummy data
export const getRandomDummyData = (): CVDummyData => {
  const randomIndex = Math.floor(Math.random() * cvTitles.length);
  return cvTitles[randomIndex];
};
