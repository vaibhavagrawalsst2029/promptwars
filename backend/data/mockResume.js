/**
 * Mock resume data for demo mode.
 * Used when no Gemini API key is available.
 */

export const getMockStructuredData = () => ({
  name: "Alex Johnson",
  role: "Frontend Developer",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  linkedin: "linkedin.com/in/alexjohnson",
  github: "github.com/alexjohnson",
  summary: "Passionate frontend developer skilled in React and Node.js.",
  skills: ["React", "JavaScript", "Node.js", "Tailwind CSS"],
  projects: [
    {
      name: "E-commerce Platform",
      description: "Built full-stack ecommerce platform with authentication and payments.",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "github.com/alexjohnson/ecommerce"
    }
  ],
  experience: [
    {
      company: "Tech Solutions",
      role: "Web Developer Intern",
      duration: "2023 - Present",
      highlights: ["Assisted in building responsive web applications using React and Tailwind."]
    }
  ],
  education: [
    {
      institution: "University",
      degree: "B.Tech Computer Science",
      year: "2024",
      gpa: "3.8/4.0"
    }
  ],
  certifications: ["React Developer Certificate"]
});

export const getMockEnhancedData = () => ({
  name: "Alex Johnson",
  role: "Frontend Developer",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  linkedin: "linkedin.com/in/alexjohnson",
  github: "github.com/alexjohnson",
  summary: "Highly passionate and detail-oriented frontend developer skilled in React and Node.js. Dedicated to building responsive, user-centric web applications and delivering seamless digital experiences.",
  skills: ["React", "JavaScript", "Node.js", "Tailwind CSS"],
  projects: [
    {
      name: "E-commerce Platform",
      description: "Architected and built a full-stack ecommerce platform with secure JWT authentication and Stripe payments, increasing user engagement.",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "github.com/alexjohnson/ecommerce"
    }
  ],
  experience: [
    {
      company: "Tech Solutions",
      role: "Web Developer Intern",
      duration: "2023 - Present",
      highlights: ["Assisted in building responsive web applications using React and Tailwind, improving page load speed by 20%."]
    }
  ],
  education: [
    {
      institution: "University",
      degree: "B.Tech Computer Science",
      year: "2024",
      gpa: "3.8/4.0"
    }
  ],
  certifications: ["React Developer Certificate"]
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
