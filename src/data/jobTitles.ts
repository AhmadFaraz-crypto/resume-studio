// Job Titles with Default Responsibilities
export interface JobTitle {
  title: string;
  category: string;
  defaultResponsibilities: string[];
}

export const jobTitles: JobTitle[] = [
  // Software Development
  {
    title: "Software Engineer",
    category: "Software Development",
    defaultResponsibilities: [
      "Develop and maintain software applications",
      "Collaborate with cross-functional teams",
      "Write clean, efficient, and well-documented code",
      "Participate in code reviews and technical discussions",
      "Debug and troubleshoot software issues"
    ]
  },
  {
    title: "Senior Software Engineer",
    category: "Software Development",
    defaultResponsibilities: [
      "Lead development of complex software systems",
      "Mentor junior developers and conduct code reviews",
      "Architect scalable and maintainable solutions",
      "Collaborate with product managers and stakeholders",
      "Drive technical decision-making and best practices"
    ]
  },
  {
    title: "Full Stack Developer",
    category: "Software Development",
    defaultResponsibilities: [
      "Develop both frontend and backend applications",
      "Design and implement database schemas",
      "Create responsive user interfaces",
      "Integrate third-party APIs and services",
      "Optimize application performance and scalability"
    ]
  },
  {
    title: "Frontend Developer",
    category: "Software Development",
    defaultResponsibilities: [
      "Build responsive and interactive user interfaces",
      "Implement modern web technologies and frameworks",
      "Optimize frontend performance and user experience",
      "Collaborate with designers and backend developers",
      "Ensure cross-browser compatibility"
    ]
  },
  {
    title: "Backend Developer",
    category: "Software Development",
    defaultResponsibilities: [
      "Develop server-side applications and APIs",
      "Design and implement database systems",
      "Ensure system security and data protection",
      "Optimize backend performance and scalability",
      "Integrate with external services and APIs"
    ]
  },
  {
    title: "DevOps Engineer",
    category: "Software Development",
    defaultResponsibilities: [
      "Automate deployment and infrastructure processes",
      "Manage cloud infrastructure and services",
      "Implement CI/CD pipelines and monitoring",
      "Ensure system reliability and performance",
      "Collaborate with development teams on deployment strategies"
    ]
  },
  {
    title: "Data Scientist",
    category: "Data & Analytics",
    defaultResponsibilities: [
      "Analyze large datasets to extract insights",
      "Build machine learning models and algorithms",
      "Create data visualizations and reports",
      "Collaborate with stakeholders to define requirements",
      "Present findings and recommendations to leadership"
    ]
  },
  {
    title: "Data Analyst",
    category: "Data & Analytics",
    defaultResponsibilities: [
      "Collect and analyze data from various sources",
      "Create reports and dashboards for stakeholders",
      "Identify trends and patterns in data",
      "Ensure data quality and accuracy",
      "Provide actionable insights to support business decisions"
    ]
  },
  {
    title: "Product Manager",
    category: "Product & Strategy",
    defaultResponsibilities: [
      "Define product strategy and roadmap",
      "Gather and prioritize product requirements",
      "Collaborate with engineering and design teams",
      "Analyze market trends and competitive landscape",
      "Drive product launches and go-to-market strategies"
    ]
  },
  {
    title: "Project Manager",
    category: "Management",
    defaultResponsibilities: [
      "Plan and execute projects from initiation to completion",
      "Manage project timelines, budgets, and resources",
      "Coordinate with cross-functional teams",
      "Identify and mitigate project risks",
      "Ensure deliverables meet quality standards"
    ]
  },
  {
    title: "Marketing Manager",
    category: "Marketing",
    defaultResponsibilities: [
      "Develop and execute marketing strategies",
      "Manage marketing campaigns and budgets",
      "Analyze market trends and customer behavior",
      "Collaborate with sales and product teams",
      "Measure and report on marketing performance"
    ]
  },
  {
    title: "Sales Manager",
    category: "Sales",
    defaultResponsibilities: [
      "Lead and manage sales team performance",
      "Develop sales strategies and targets",
      "Build and maintain client relationships",
      "Analyze sales data and market trends",
      "Drive revenue growth and market expansion"
    ]
  },
  {
    title: "UX/UI Designer",
    category: "Design",
    defaultResponsibilities: [
      "Design user interfaces and user experiences",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and design systems",
      "Collaborate with developers and product managers",
      "Ensure designs meet accessibility standards"
    ]
  },
  {
    title: "Graphic Designer",
    category: "Design",
    defaultResponsibilities: [
      "Create visual designs for various media",
      "Develop brand identity and marketing materials",
      "Collaborate with clients and stakeholders",
      "Ensure designs align with brand guidelines",
      "Stay updated with design trends and tools"
    ]
  },
  {
    title: "Financial Analyst",
    category: "Finance",
    defaultResponsibilities: [
      "Analyze financial data and market trends",
      "Prepare financial reports and forecasts",
      "Support budgeting and planning processes",
      "Evaluate investment opportunities",
      "Provide financial insights to support business decisions"
    ]
  },
  {
    title: "HR Manager",
    category: "Human Resources",
    defaultResponsibilities: [
      "Develop and implement HR policies and procedures",
      "Manage recruitment and onboarding processes",
      "Handle employee relations and performance management",
      "Ensure compliance with labor laws and regulations",
      "Support employee development and training programs"
    ]
  },
  {
    title: "Operations Manager",
    category: "Operations",
    defaultResponsibilities: [
      "Oversee daily operations and processes",
      "Optimize operational efficiency and productivity",
      "Manage vendor relationships and contracts",
      "Ensure compliance with regulations and standards",
      "Lead process improvement initiatives"
    ]
  },
  {
    title: "Business Analyst",
    category: "Business",
    defaultResponsibilities: [
      "Analyze business processes and requirements",
      "Document functional and technical specifications",
      "Facilitate communication between stakeholders",
      "Support system implementations and improvements",
      "Provide recommendations for business optimization"
    ]
  },
  {
    title: "Customer Success Manager",
    category: "Customer Service",
    defaultResponsibilities: [
      "Manage customer relationships and satisfaction",
      "Onboard new customers and ensure success",
      "Identify opportunities for account growth",
      "Collaborate with sales and support teams",
      "Monitor customer health and retention metrics"
    ]
  },
  {
    title: "Content Manager",
    category: "Marketing",
    defaultResponsibilities: [
      "Develop and execute content strategies",
      "Create and manage content across multiple channels",
      "Collaborate with marketing and design teams",
      "Analyze content performance and engagement",
      "Ensure brand consistency and messaging"
    ]
  }
];

// Function to get job titles by category
export const getJobTitlesByCategory = (): Record<string, JobTitle[]> => {
  const categories: Record<string, JobTitle[]> = {};
  
  jobTitles.forEach(jobTitle => {
    if (!categories[jobTitle.category]) {
      categories[jobTitle.category] = [];
    }
    categories[jobTitle.category].push(jobTitle);
  });
  
  return categories;
};

// Function to get default responsibilities for a job title
export const getDefaultResponsibilities = (title: string): string[] => {
  const jobTitle = jobTitles.find(jt => jt.title.toLowerCase() === title.toLowerCase());
  return jobTitle ? jobTitle.defaultResponsibilities : [];
};

// Function to search job titles
export const searchJobTitles = (query: string): JobTitle[] => {
  const lowercaseQuery = query.toLowerCase();
  return jobTitles.filter(jobTitle => 
    jobTitle.title.toLowerCase().includes(lowercaseQuery) ||
    jobTitle.category.toLowerCase().includes(lowercaseQuery)
  );
};
