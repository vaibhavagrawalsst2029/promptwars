/**
 * Mock resume data for demo mode.
 * Used when no Gemini API key is available.
 */

export const getMockStructuredData = () => ({
  name: 'Alex Chen',
  role: 'Full Stack Developer',
  email: 'alex.chen@email.com',
  phone: '+1 (555) 123-4567',
  linkedin: 'linkedin.com/in/alexchen',
  github: 'github.com/alexchen',
  summary:
    'Innovative full-stack developer with 4+ years of experience building scalable web applications and cloud-native solutions.',
  skills: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'AWS',
    'MongoDB',
    'PostgreSQL',
    'Docker',
    'GraphQL',
    'Redis',
    'Tailwind CSS',
  ],
  projects: [
    {
      name: 'CloudSync Pro',
      description: 'Built a real-time cloud collaboration platform with live document editing.',
      technologies: ['React', 'Node.js', 'WebSocket', 'AWS S3'],
      link: 'github.com/alexchen/cloudsync',
    },
    {
      name: 'AI Task Manager',
      description: 'Developed an intelligent task management app using NLP for auto-categorization.',
      technologies: ['Next.js', 'Python', 'OpenAI API', 'MongoDB'],
      link: 'github.com/alexchen/aitask',
    },
    {
      name: 'FinTrack Dashboard',
      description: 'Created a personal finance dashboard with real-time stock tracking.',
      technologies: ['React', 'D3.js', 'Express', 'PostgreSQL'],
      link: 'github.com/alexchen/fintrack',
    },
  ],
  experience: [
    {
      role: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      duration: '2022 - Present',
      highlights: [
        'Led migration of legacy jQuery application to React, reducing load time by 60%.',
        'Architected micro-frontend system serving 2M+ monthly active users.',
        'Mentored team of 5 junior developers through code reviews and pair programming.',
      ],
    },
    {
      role: 'Full Stack Developer',
      company: 'StartupHub',
      duration: '2020 - 2022',
      highlights: [
        'Built RESTful APIs handling 10K+ requests/minute with Node.js and Express.',
        'Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes.',
        'Designed and launched the company\'s flagship SaaS product from scratch.',
      ],
    },
  ],
  education: [
    {
      degree: 'B.S. Computer Science',
      institution: 'Stanford University',
      year: '2020',
      gpa: '3.8/4.0',
    },
  ],
  certifications: [
    'AWS Solutions Architect – Associate',
    'Google Cloud Professional Developer',
    'Meta Frontend Developer Certificate',
  ],
});

export const getMockEnhancedData = () => ({
  name: 'Alex Chen',
  role: 'Full Stack Developer',
  email: 'alex.chen@email.com',
  phone: '+1 (555) 123-4567',
  linkedin: 'linkedin.com/in/alexchen',
  github: 'github.com/alexchen',
  summary:
    'Innovative and results-driven Full Stack Developer with 4+ years of experience engineering scalable, high-performance web applications and cloud-native solutions. Proven expertise in React, Node.js, and AWS, with a passion for building products that delight users and drive business growth. Adept at leading teams, optimizing systems, and shipping code that scales to millions.',
  skills: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'AWS',
    'MongoDB',
    'PostgreSQL',
    'Docker',
    'GraphQL',
    'Redis',
    'Tailwind CSS',
  ],
  projects: [
    {
      name: 'CloudSync Pro',
      description:
        'Engineered a real-time cloud collaboration platform enabling live document co-editing with conflict resolution, supporting 500+ concurrent users with sub-100ms latency via WebSocket architecture and AWS S3 integration.',
      technologies: ['React', 'Node.js', 'WebSocket', 'AWS S3'],
      link: 'github.com/alexchen/cloudsync',
    },
    {
      name: 'AI Task Manager',
      description:
        'Developed an intelligent task management application leveraging NLP-powered auto-categorization and priority scoring, achieving 94% classification accuracy and reducing manual task organization time by 75%.',
      technologies: ['Next.js', 'Python', 'OpenAI API', 'MongoDB'],
      link: 'github.com/alexchen/aitask',
    },
    {
      name: 'FinTrack Dashboard',
      description:
        'Created a comprehensive personal finance dashboard featuring real-time stock tracking, interactive D3.js data visualizations, and automated budget analytics, serving 2,000+ active users.',
      technologies: ['React', 'D3.js', 'Express', 'PostgreSQL'],
      link: 'github.com/alexchen/fintrack',
    },
  ],
  experience: [
    {
      role: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      duration: '2022 - Present',
      highlights: [
        'Spearheaded the complete migration of a legacy jQuery monolith to a modern React architecture, achieving a 60% reduction in page load times and 45% improvement in Core Web Vitals scores.',
        'Architected and implemented a micro-frontend system leveraging Module Federation, successfully serving 2M+ monthly active users with 99.9% uptime.',
        'Established engineering best practices and mentored a team of 5 junior developers through structured code reviews, pair programming sessions, and weekly tech talks.',
      ],
    },
    {
      role: 'Full Stack Developer',
      company: 'StartupHub',
      duration: '2020 - 2022',
      highlights: [
        'Designed and built high-throughput RESTful APIs with Node.js and Express, handling 10K+ requests/minute with P99 latency under 200ms.',
        'Implemented a comprehensive CI/CD pipeline using GitHub Actions and Docker, reducing deployment time from 2 hours to 15 minutes and eliminating manual deployment errors.',
        'Led the end-to-end design and development of the company\'s flagship SaaS product, contributing to $500K ARR within the first year of launch.',
      ],
    },
  ],
  education: [
    {
      degree: 'B.S. Computer Science',
      institution: 'Stanford University',
      year: '2020',
      gpa: '3.8/4.0',
    },
  ],
  certifications: [
    'AWS Solutions Architect – Associate',
    'Google Cloud Professional Developer',
    'Meta Frontend Developer Certificate',
  ],
});

export const getMockScore = () => ({
  recruiterAppeal: 9.2,
  contentStrength: 8.8,
  completeness: 9.5,
  technicalDepth: 9.0,
  overallScore: 9.1,
  suggestions: [
    'Add links to live deployed projects for instant recruiter demos',
    'Include a portfolio website or personal blog link',
    'Add specific revenue or user impact metrics to experience section',
  ],
  strengths: [
    'Excellent technical breadth across frontend, backend, and cloud',
    'Strong quantified achievements that demonstrate real impact',
    'Well-rounded profile with certifications, projects, and experience',
  ],
});

export default { getMockStructuredData, getMockEnhancedData, getMockScore };
