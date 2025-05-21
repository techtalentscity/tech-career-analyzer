// src/Pages/career/Learning.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Learning = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Define tech roles categories
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'software-dev', name: 'Software Development' },
    { id: 'data', name: 'Data Science & Analytics' },
    { id: 'design', name: 'UX/UI Design' },
    { id: 'product', name: 'Product Management' },
    { id: 'devops', name: 'DevOps & Cloud' },
    { id: 'cybersecurity', name: 'Cybersecurity' },
    { id: 'ai-ml', name: 'AI & Machine Learning' },
    { id: 'project', name: 'Project Management' },
    { id: 'non-technical', name: 'Non-Technical Roles' }
  ];

  // Define courses data
  const courses = [
    // Software Development
    {
      id: 1,
      title: 'The Web Developer Bootcamp',
      provider: 'Udemy',
      instructor: 'Colt Steele',
      category: 'software-dev',
      level: 'Beginner',
      rating: 4.7,
      students: '800,000+',
      description: 'A comprehensive course covering HTML, CSS, JavaScript, Node.js, and more to become a full-stack web developer.',
      link: 'https://www.udemy.com/course/the-web-developer-bootcamp/',
      isFree: false,
      price: '$19.99',
      duration: '63.5 hours',
      certificate: true,
      tags: ['web development', 'javascript', 'html', 'css', 'node.js']
    },
    {
      id: 2,
      title: 'The Complete JavaScript Course 2023: From Zero to Expert!',
      provider: 'Udemy',
      instructor: 'Jonas Schmedtmann',
      category: 'software-dev',
      level: 'All Levels',
      rating: 4.8,
      students: '700,000+',
      description: 'The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory.',
      link: 'https://www.udemy.com/course/the-complete-javascript-course/',
      isFree: false,
      price: '$19.99',
      duration: '69 hours',
      certificate: true,
      tags: ['javascript', 'web development', 'front-end']
    },
    {
      id: 3,
      title: 'CS50: Introduction to Computer Science',
      provider: 'Harvard (edX)',
      instructor: 'David J. Malan',
      category: 'software-dev',
      level: 'Beginner',
      rating: 4.9,
      students: '3,000,000+',
      description: 'Harvard University\'s introduction to the intellectual enterprises of computer science and the art of programming.',
      link: 'https://www.edx.org/course/introduction-computer-science-harvardx-cs50x',
      isFree: true,
      price: 'Free (Certificate: $199)',
      duration: '10-20 hours/week for 12 weeks',
      certificate: true,
      tags: ['computer science', 'C', 'Python', 'SQL', 'algorithms']
    },
    {
      id: 4,
      title: 'React - The Complete Guide 2023',
      provider: 'Udemy',
      instructor: 'Maximilian Schwarzmüller',
      category: 'software-dev',
      level: 'Intermediate',
      rating: 4.7,
      students: '600,000+',
      description: 'Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js and more!',
      link: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
      isFree: false,
      price: '$19.99',
      duration: '48 hours',
      certificate: true,
      tags: ['react', 'javascript', 'web development', 'front-end']
    },
    {
      id: 5,
      title: 'The Complete 2023 Software Engineering Bootcamp',
      provider: 'App Academy',
      instructor: 'App Academy Team',
      category: 'software-dev',
      level: 'Beginner to Advanced',
      rating: 4.8,
      students: '100,000+',
      description: 'Learn to code and become a software engineer with a curriculum used by top tech companies.',
      link: 'https://www.appacademy.io/course/software-engineer-online',
      isFree: false,
      price: 'Free prep, paid program',
      duration: '24 weeks',
      certificate: true,
      tags: ['full-stack', 'ruby', 'javascript', 'react', 'sql']
    },

    // Data Science & Analytics
    {
      id: 6,
      title: 'Data Science Specialization',
      provider: 'Coursera (Johns Hopkins University)',
      instructor: 'Jeff Leek, Roger D. Peng, Brian Caffo',
      category: 'data',
      level: 'Intermediate',
      rating: 4.6,
      students: '500,000+',
      description: 'A ten-course introduction to data science, covering the entire data science process.',
      link: 'https://www.coursera.org/specializations/jhu-data-science',
      isFree: false,
      price: '$49/month subscription',
      duration: '11 months at 4 hours/week',
      certificate: true,
      tags: ['data science', 'R programming', 'statistics', 'machine learning']
    },
    {
      id: 7,
      title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',
      provider: 'Udemy',
      instructor: 'Kirill Eremenko, Hadelin de Ponteves',
      category: 'data',
      level: 'All Levels',
      rating: 4.5,
      students: '950,000+',
      description: 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.',
      link: 'https://www.udemy.com/course/machinelearning/',
      isFree: false,
      price: '$19.99',
      duration: '44 hours',
      certificate: true,
      tags: ['machine learning', 'data science', 'python', 'R']
    },
    {
      id: 8,
      title: 'SQL for Data Analysis',
      provider: 'Udacity',
      instructor: 'Udacity Team',
      category: 'data',
      level: 'Beginner',
      rating: 4.6,
      students: '200,000+',
      description: 'Learn to use SQL to access, create, and update data stored in databases.',
      link: 'https://www.udacity.com/course/sql-for-data-analysis--ud198',
      isFree: true,
      price: 'Free',
      duration: '4 weeks at 10 hours/week',
      certificate: false,
      tags: ['SQL', 'database', 'data analysis']
    },
    {
      id: 9,
      title: 'IBM Data Science Professional Certificate',
      provider: 'Coursera (IBM)',
      instructor: 'IBM Team',
      category: 'data',
      level: 'Beginner to Intermediate',
      rating: 4.6,
      students: '250,000+',
      description: 'Kick-start your career in data science & ML. Build job-ready skills for an in-demand career.',
      link: 'https://www.coursera.org/professional-certificates/ibm-data-science',
      isFree: false,
      price: '$39/month subscription',
      duration: '11 months at 4 hours/week',
      certificate: true,
      tags: ['data science', 'python', 'machine learning', 'data visualization']
    },
    {
      id: 10,
      title: 'Google Data Analytics Professional Certificate',
      provider: 'Coursera (Google)',
      instructor: 'Google Team',
      category: 'data',
      level: 'Beginner',
      rating: 4.8,
      students: '500,000+',
      description: 'This program includes over 180 hours of instruction and hundreds of practice-based assessments.',
      link: 'https://www.coursera.org/professional-certificates/google-data-analytics',
      isFree: false,
      price: '$39/month subscription',
      duration: '6 months at 10 hours/week',
      certificate: true,
      tags: ['data analytics', 'tableau', 'R programming', 'SQL']
    },

    // UX/UI Design
    {
      id: 11,
      title: 'Google UX Design Professional Certificate',
      provider: 'Coursera (Google)',
      instructor: 'Google Team',
      category: 'design',
      level: 'Beginner',
      rating: 4.8,
      students: '300,000+',
      description: 'Prepare for an entry-level job as a UX designer with no previous experience required.',
      link: 'https://www.coursera.org/professional-certificates/google-ux-design',
      isFree: false,
      price: '$39/month subscription',
      duration: '6 months at 10 hours/week',
      certificate: true,
      tags: ['UX design', 'UI design', 'prototyping', 'wireframing', 'figma']
    },
    {
      id: 12,
      title: 'UI / UX Design Specialization',
      provider: 'Coursera (California Institute of the Arts)',
      instructor: 'Michael Worthington, Roman Jaster',
      category: 'design',
      level: 'Intermediate',
      rating: 4.7,
      students: '100,000+',
      description: 'Design High-Impact User Experiences. Research, design, and prototype effective user experiences.',
      link: 'https://www.coursera.org/specializations/ui-ux-design',
      isFree: false,
      price: '$49/month subscription',
      duration: '3 months at 4 hours/week',
      certificate: true,
      tags: ['UI design', 'UX design', 'visual design', 'web design']
    },
    {
      id: 13,
      title: 'User Experience Design Essentials - Adobe XD UI UX Design',
      provider: 'Udemy',
      instructor: 'Daniel Walter Scott',
      category: 'design',
      level: 'Beginner',
      rating: 4.7,
      students: '200,000+',
      description: 'Use XD to get a job in UI Design, User Interface, User Experience design, UX design & Web Design.',
      link: 'https://www.udemy.com/course/ui-ux-web-design-using-adobe-xd/',
      isFree: false,
      price: '$19.99',
      duration: '12.5 hours',
      certificate: true,
      tags: ['Adobe XD', 'UI design', 'UX design', 'web design']
    },
    {
      id: 14,
      title: 'Learn UI Design',
      provider: 'Learn UI Design',
      instructor: 'Erik Kennedy',
      category: 'design',
      level: 'Beginner to Advanced',
      rating: 4.9,
      students: '5,000+',
      description: 'A complete online video course on user interface design: color, typography, layout, and more.',
      link: 'https://www.learnui.design/',
      isFree: false,
      price: '$997',
      duration: 'Self-paced, 40+ hours',
      certificate: true,
      tags: ['UI design', 'typography', 'color theory', 'visual design']
    },
    {
      id: 15,
      title: 'Design Thinking Specialization',
      provider: 'Coursera (University of Virginia)',
      instructor: 'Jeanne M. Liedtka',
      category: 'design',
      level: 'Beginner',
      rating: 4.7,
      students: '150,000+',
      description: 'Master innovation through design thinking methodology, a powerful approach to problem-solving.',
      link: 'https://www.coursera.org/specializations/uva-darden-design-thinking',
      isFree: false,
      price: '$49/month subscription',
      duration: '3 months at 3 hours/week',
      certificate: true,
      tags: ['design thinking', 'innovation', 'problem-solving', 'business design']
    },

    // Product Management
    {
      id: 16,
      title: 'Become a Product Manager | Learn the Skills & Get the Job',
      provider: 'Udemy',
      instructor: 'Cole Mercer, Evan Kimbrell',
      category: 'product',
      level: 'All Levels',
      rating: 4.5,
      students: '300,000+',
      description: 'The complete product management course covering product discovery, Agile, Scrum, analytics, and more.',
      link: 'https://www.udemy.com/course/become-a-product-manager-learn-the-skills-get-a-job/',
      isFree: false,
      price: '$19.99',
      duration: '13 hours',
      certificate: true,
      tags: ['product management', 'agile', 'scrum', 'product strategy']
    },
    {
      id: 17,
      title: 'Digital Product Management Specialization',
      provider: 'Coursera (University of Virginia)',
      instructor: 'Alex Cowan',
      category: 'product',
      level: 'Intermediate',
      rating: 4.7,
      students: '100,000+',
      description: 'Create better products by learning to apply customer-centered principles to your software development.',
      link: 'https://www.coursera.org/specializations/product-management',
      isFree: false,
      price: '$49/month subscription',
      duration: '4 months at 6 hours/week',
      certificate: true,
      tags: ['product management', 'agile', 'design thinking', 'MVP']
    },
    {
      id: 18,
      title: 'Product Management 101',
      provider: 'Product School',
      instructor: 'Product School Team',
      category: 'product',
      level: 'Beginner',
      rating: 4.7,
      students: '50,000+',
      description: 'Learn fundamental product management skills from top industry experts.',
      link: 'https://productschool.com/product-management-certification/',
      isFree: false,
      price: '$4,499',
      duration: '8 weeks, part-time',
      certificate: true,
      tags: ['product management', 'roadmapping', 'product strategy', 'user research']
    },
    {
      id: 19,
      title: 'Product Management Fundamentals',
      provider: 'LinkedIn Learning',
      instructor: 'Doug Winnie',
      category: 'product',
      level: 'Beginner',
      rating: 4.6,
      students: '100,000+',
      description: 'Learn the fundamentals of product management and discover how to bring useful products to market.',
      link: 'https://www.linkedin.com/learning/product-management-fundamentals',
      isFree: false,
      price: 'LinkedIn Learning subscription',
      duration: '1 hour 14 minutes',
      certificate: true,
      tags: ['product management', 'product development', 'requirements']
    },
    {
      id: 20,
      title: 'The Complete Product Management Course',
      provider: 'Udemy',
      instructor: '365 Careers',
      category: 'product',
      level: 'All Levels',
      rating: 4.6,
      students: '80,000+',
      description: 'Learn Product Management from A to Z and prepare for a Product Manager job.',
      link: 'https://www.udemy.com/course/the-complete-product-management-course/',
      isFree: false,
      price: '$19.99',
      duration: '13 hours',
      certificate: true,
      tags: ['product management', 'product development', 'market analysis']
    },

    // DevOps & Cloud
    {
      id: 21,
      title: 'AWS Certified Solutions Architect - Associate',
      provider: 'A Cloud Guru',
      instructor: 'Ryan Kroonenburg',
      category: 'devops',
      level: 'Intermediate',
      rating: 4.8,
      students: '500,000+',
      description: 'Prepare for the AWS Solutions Architect Associate exam with this comprehensive course.',
      link: 'https://www.pluralsight.com/cloud-guru/courses/aws-certified-solutions-architect-associate',
      isFree: false,
      price: 'A Cloud Guru subscription',
      duration: '40 hours',
      certificate: true,
      tags: ['AWS', 'cloud', 'solutions architect', 'certification']
    },
    {
      id: 22,
      title: 'Docker and Kubernetes: The Complete Guide',
      provider: 'Udemy',
      instructor: 'Stephen Grider',
      category: 'devops',
      level: 'Intermediate',
      rating: 4.7,
      students: '200,000+',
      description: 'Build, test, and deploy Docker applications with Kubernetes while learning production-style development workflows.',
      link: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/',
      isFree: false,
      price: '$19.99',
      duration: '21.5 hours',
      certificate: true,
      tags: ['docker', 'kubernetes', 'containerization', 'devops']
    },
    {
      id: 23,
      title: 'DevOps Engineer Learning Path',
      provider: 'Microsoft Learn',
      instructor: 'Microsoft Team',
      category: 'devops',
      level: 'Intermediate to Advanced',
      rating: 4.7,
      students: '100,000+',
      description: 'Learn the skills needed to be a successful DevOps Engineer, including Azure DevOps.',
      link: 'https://docs.microsoft.com/en-us/learn/paths/devops-engineer/',
      isFree: true,
      price: 'Free',
      duration: '30+ hours',
      certificate: false,
      tags: ['devops', 'azure', 'CI/CD', 'automation']
    },
    {
      id: 24,
      title: 'Google Cloud Platform Fundamentals for AWS Professionals',
      provider: 'Coursera (Google Cloud)',
      instructor: 'Google Cloud Training',
      category: 'devops',
      level: 'Intermediate',
      rating: 4.7,
      students: '50,000+',
      description: 'This course provides AWS professionals with an introduction to the Google Cloud Platform.',
      link: 'https://www.coursera.org/learn/gcp-fundamentals-aws',
      isFree: false,
      price: '$49',
      duration: '13 hours',
      certificate: true,
      tags: ['GCP', 'cloud', 'AWS', 'infrastructure']
    },
    {
      id: 25,
      title: 'The Complete DevOps Engineer Course 2.0',
      provider: 'Udemy',
      instructor: 'Imran Afzal',
      category: 'devops',
      level: 'All Levels',
      rating: 4.4,
      students: '50,000+',
      description: 'Learn DevOps: Docker, Kubernetes, Terraform, Jenkins, AWS, and more to become a DevOps Engineer.',
      link: 'https://www.udemy.com/course/the-complete-devops-engineer-course/',
      isFree: false,
      price: '$19.99',
      duration: '17 hours',
      certificate: true,
      tags: ['devops', 'docker', 'jenkins', 'kubernetes', 'terraform']
    },

    // Cybersecurity
    {
      id: 26,
      title: 'Complete Cyber Security Course',
      provider: 'Udemy',
      instructor: 'Nathan House',
      category: 'cybersecurity',
      level: 'All Levels',
      rating: 4.6,
      students: '300,000+',
      description: 'Learn about network security, privacy, secure communications, anonymity, and hack prevention.',
      link: 'https://www.udemy.com/course/the-complete-internet-security-privacy-course-volume-1/',
      isFree: false,
      price: '$19.99',
      duration: '12 hours',
      certificate: true,
      tags: ['cybersecurity', 'network security', 'privacy', 'anonymity']
    },
    {
      id: 27,
      title: 'CompTIA Security+ Certification',
      provider: 'Coursera (IBM)',
      instructor: 'IBM Team',
      category: 'cybersecurity',
      level: 'Intermediate',
      rating: 4.7,
      students: '150,000+',
      description: 'Prepare for the CompTIA Security+ certification exam with this comprehensive course.',
      link: 'https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst',
      isFree: false,
      price: '$39/month subscription',
      duration: '8 months at 4 hours/week',
      certificate: true,
      tags: ['security+', 'certification', 'network security', 'threat management']
    },
    {
      id: 28,
      title: 'Ethical Hacking from Scratch',
      provider: 'Udemy',
      instructor: 'Zaid Sabih',
      category: 'cybersecurity',
      level: 'Beginner to Intermediate',
      rating: 4.6,
      students: '400,000+',
      description: 'Learn ethical hacking, penetration testing, web testing, and wifi hacking using Kali Linux.',
      link: 'https://www.udemy.com/course/learn-ethical-hacking-from-scratch/',
      isFree: false,
      price: '$19.99',
      duration: '15 hours',
      certificate: true,
      tags: ['ethical hacking', 'penetration testing', 'Kali Linux', 'network security']
    },
    {
      id: 29,
      title: 'Cybersecurity Specialization',
      provider: 'Coursera (University of Maryland)',
      instructor: 'Jonathan Katz, others',
      category: 'cybersecurity',
      level: 'Intermediate',
      rating: 4.7,
      students: '200,000+',
      description: 'Develop skills in cybersecurity including software and hardware security, cryptography, and more.',
      link: 'https://www.coursera.org/specializations/cyber-security',
      isFree: false,
      price: '$49/month subscription',
      duration: '8 months at 3 hours/week',
      certificate: true,
      tags: ['cybersecurity', 'cryptography', 'software security', 'hardware security']
    },
    {
      id: 30,
      title: 'The Complete Cyber Security Course: Hackers Exposed!',
      provider: 'Udemy',
      instructor: 'Nathan House',
      category: 'cybersecurity',
      level: 'All Levels',
      rating: 4.6,
      students: '200,000+',
      description: 'Volume 1: Become a Cyber Security Specialist, Learn How to Stop Hackers, Prevent Hacking, Learn IT Security & INFOSEC.',
      link: 'https://www.udemy.com/course/the-complete-internet-security-privacy-course-volume-1/',
      isFree: false,
      price: '$19.99',
      duration: '12 hours',
      certificate: true,
      tags: ['cybersecurity', 'hackers', 'security specialist', 'infosec']
    },

    // AI & Machine Learning
    {
      id: 31,
      title: 'Machine Learning',
      provider: 'Coursera (Stanford)',
      instructor: 'Andrew Ng',
      category: 'ai-ml',
      level: 'Intermediate',
      rating: 4.9,
      students: '4,000,000+',
      description: 'The classic machine learning course covering algorithms, supervision, neural networks, and best practices.',
      link: 'https://www.coursera.org/learn/machine-learning',
      isFree: false,
      price: '$79',
      duration: '60 hours',
      certificate: true,
      tags: ['machine learning', 'neural networks', 'supervised learning', 'algorithms']
    },
    {
      id: 32,
      title: 'Deep Learning Specialization',
      provider: 'Coursera (deeplearning.ai)',
      instructor: 'Andrew Ng',
      category: 'ai-ml',
      level: 'Intermediate to Advanced',
      rating: 4.9,
      students: '700,000+',
      description: 'Learn the foundations of Deep Learning, understand how to build neural networks, and lead successful ML projects.',
      link: 'https://www.coursera.org/specializations/deep-learning',
      isFree: false,
      price: '$49/month subscription',
      duration: '3 months at 11 hours/week',
      certificate: true,
      tags: ['deep learning', 'neural networks', 'machine learning', 'AI']
    },
    {
      id: 33,
      title: 'Artificial Intelligence A-Z™: Learn How To Build An AI',
      provider: 'Udemy',
      instructor: 'Hadelin de Ponteves, Kirill Eremenko',
      category: 'ai-ml',
      level: 'Intermediate',
      rating: 4.4,
      students: '200,000+',
      description: 'Learn key AI concepts and intuition training to get you quickly applying AI to real-world problems.',
      link: 'https://www.udemy.com/course/artificial-intelligence-az/',
      isFree: false,
      price: '$19.99',
      duration: '16.5 hours',
      certificate: true,
      tags: ['artificial intelligence', 'Q-learning', 'deep learning', 'deep reinforcement learning']
    },
    {
      id: 34,
      title: 'TensorFlow Developer Professional Certificate',
      provider: 'Coursera (deeplearning.ai)',
      instructor: 'Laurence Moroney',
      category: 'ai-ml',
      level: 'Intermediate',
      rating: 4.7,
      students: '150,000+',
      description: 'Learn how to build scalable AI-powered applications with TensorFlow.',
      link: 'https://www.coursera.org/professional-certificates/tensorflow-in-practice',
      isFree: false,
      price: '$39/month subscription',
      duration: '4 months at 5 hours/week',
      certificate: true,
      tags: ['TensorFlow', 'deep learning', 'machine learning', 'neural networks']
    },
    {
      id: 35,
      title: 'Practical Deep Learning for Coders',
      provider: 'fast.ai',
      instructor: 'Jeremy Howard',
      category: 'ai-ml',
      level: 'Intermediate',
      rating: 4.9,
      students: '200,000+',
      description: 'A hands-on, coding-focused introduction to deep learning using PyTorch.',
      link: 'https://course.fast.ai/',
      isFree: true,
      price: 'Free',
      duration: 'Self-paced, approx. 40 hours',
      certificate: false,
      tags: ['deep learning', 'PyTorch', 'computer vision', 'NLP']
    },

    // Project Management
    {
      id: 36,
      title: 'Google Project Management: Professional Certificate',
      provider: 'Coursera (Google)',
      instructor: 'Google Team',
      category: 'project',
      level: 'Beginner',
      rating: 4.8,
      students: '250,000+',
      description: 'Prepare for an entry-level job in project management with no experience required.',
      link: 'https://www.coursera.org/professional-certificates/google-project-management',
      isFree: false,
      price: '$39/month subscription',
      duration: '6 months at 10 hours/week',
      certificate: true,
      tags: ['project management', 'agile', 'scrum', 'risk management']
    },
    {
      id: 37,
      title: 'Project Management Professional (PMP) Certification',
      provider: 'Udemy',
      instructor: 'Joseph Phillips',
      category: 'project',
      level: 'Intermediate to Advanced',
      rating: 4.7,
      students: '300,000+',
      description: 'PMP Certification preparation with comprehensive coverage of the PMBOK 6th Edition.',
      link: 'https://www.udemy.com/course/pmp-pmbok6-35-pdus/',
      isFree: false,
      price: '$19.99',
      duration: '24.5 hours',
      certificate: true,
      tags: ['PMP', 'PMBOK', 'certification', 'project management']
    },
    {
      id: 38,
      title: 'Agile Project Management',
      provider: 'Coursera (Google)',
      instructor: 'Google Team',
      category: 'project',
      level: 'Beginner to Intermediate',
      rating: 4.7,
      students: '100,000+',
      description: 'Learn the foundations of Agile project management with Scrum, focusing on implementing Scrum practices.',
      link: 'https://www.coursera.org/learn/agile-project-management',
      isFree: false,
      price: '$39/month subscription',
      duration: '18 hours',
      certificate: true,
      tags: ['agile', 'scrum', 'sprint planning', 'project management']
    },
    {
      id: 39,
      title: 'PRINCE2® Foundation and Practitioner Certification Training',
      provider: 'Udemy',
      instructor: 'Knowledge Train',
      category: 'project',
      level: 'Intermediate',
      rating: 4.5,
      students: '50,000+',
      description: 'Learn PRINCE2 project management methodology to pass your PRINCE2 Foundation and Practitioner exams.',
      link: 'https://www.udemy.com/course/prince2-foundation-and-practitioner-certification-training/',
      isFree: false,
      price: '$19.99',
      duration: '14.5 hours',
      certificate: true,
      tags: ['PRINCE2', 'certification', 'project management', 'methodology']
    },
    {
      id: 40,
      title: 'The Complete Jira Course - From Beginner to Expert',
      provider: 'Udemy',
      instructor: 'Matt Bailey',
      category: 'project',
      level: 'All Levels',
      rating: 4.5,
      students: '60,000+',
      description: 'Complete guide to Jira including Agile project management, workflows, and best practices.',
      link: 'https://www.udemy.com/course/the-complete-guide-to-jira-with-real-world-examples/',
      isFree: false,
      price: '$19.99',
      duration: '8 hours',
      certificate: true,
      tags: ['Jira', 'Agile', 'project management', 'issue tracking']
    },

    // Non-Technical Roles
    {
      id: 41,
      title: 'Digital Marketing Specialization',
      provider: 'Coursera (University of Illinois)',
      instructor: 'Aric Rindfleisch, Mike Yao, others',
      category: 'non-technical',
      level: 'Beginner to Intermediate',
      rating: 4.6,
      students: '200,000+',
      description: 'Master strategic marketing concepts and tools to address brand communication in a digital world.',
      link: 'https://www.coursera.org/specializations/digital-marketing',
      isFree: false,
      price: '$49/month subscription',
      duration: '8 months at 5 hours/week',
      certificate: true,
      tags: ['digital marketing', 'SEO', 'social media', 'marketing analytics']
    },
    {
      id: 42,
      title: 'Technical Writing: How to Write Software Documentation',
      provider: 'Udemy',
      instructor: 'Jordan Stanchev',
      category: 'non-technical',
      level: 'Beginner',
      rating: 4.5,
      students: '30,000+',
      description: 'Learn the essentials of technical writing and how to create software documentation.',
      link: 'https://www.udemy.com/course/start-your-career-as-user-assistance-developer/',
      isFree: false,
      price: '$19.99',
      duration: '3 hours',
      certificate: true,
      tags: ['technical writing', 'documentation', 'user guides', 'help systems']
    },
    {
      id: 43,
      title: 'Business Analysis Fundamentals',
      provider: 'LinkedIn Learning',
      instructor: 'Haydn Thomas',
      category: 'non-technical',
      level: 'Beginner',
      rating: 4.7,
      students: '150,000+',
      description: 'Learn the fundamentals of business analysis and how to facilitate organizational change.',
      link: 'https://www.linkedin.com/learning/business-analysis-foundations',
      isFree: false,
      price: 'LinkedIn Learning subscription',
      duration: '2 hours 12 minutes',
      certificate: true,
      tags: ['business analysis', 'requirements', 'stakeholder management']
    },
    {
      id: 44,
      title: 'Salesforce Certified Administrator',
      provider: 'Trailhead',
      instructor: 'Salesforce Team',
      category: 'non-technical',
      level: 'Beginner to Intermediate',
      rating: 4.8,
      students: '500,000+',
      description: 'Prepare for the Salesforce Administrator certification with guided learning paths.',
      link: 'https://trailhead.salesforce.com/en/credentials/administrator',
      isFree: true,
      price: 'Free (Exam: $200)',
      duration: 'Self-paced, approx. 40-60 hours',
      certificate: true,
      tags: ['salesforce', 'CRM', 'administration', 'certification']
    },
    {
      id: 45,
      title: 'Agile Scrum Master',
      provider: 'Pluralsight',
      instructor: 'Kelley O\'Connell',
      category: 'non-technical',
      level: 'Intermediate',
      rating: 4.7,
      students: '100,000+',
      description: 'Learn Scrum methodologies and how to facilitate agile development as a Scrum Master.',
      link: 'https://www.pluralsight.com/paths/agile-scrum',
      isFree: false,
      price: 'Pluralsight subscription',
      duration: '12 hours',
      certificate: true,
      tags: ['scrum master', 'agile', 'facilitation', 'team management']
    }
  ];

  // Define certifications data
  const certifications = [
    // Software Development Certifications
    {
      id: 1,
      title: 'AWS Certified Developer - Associate',
      provider: 'Amazon Web Services',
      category: 'software-dev',
      level: 'Associate',
      cost: '$150',
      duration: '130 minutes',
      validity: '3 years',
      description: 'Validates technical expertise in developing and maintaining AWS-based applications. Focuses on core AWS services, uses, and best practices for building secure and reliable applications.',
      link: 'https://aws.amazon.com/certification/certified-developer-associate/',
      prepMaterials: [
        'AWS Official Study Guide',
        'Whitepapers and FAQs',
        'Practice Exams'
      ],
      popularity: 'High'
    },
    {
      id: 2,
      title: 'Microsoft Certified: Azure Developer Associate',
      provider: 'Microsoft',
      category: 'software-dev',
      level: 'Associate',
      cost: '$165',
      duration: '180 minutes',
      validity: '2 years',
      description: 'Validates skills in developing solutions on Microsoft Azure, including compute solutions, storage, and security implementation.',
      link: 'https://docs.microsoft.com/en-us/learn/certifications/azure-developer/',
      prepMaterials: [
        'Microsoft Learn Paths',
        'Official Practice Tests',
        'Instructor-led Training'
      ],
      popularity: 'High'
    },
    {
      id: 3,
      title: 'Oracle Certified Professional, Java SE 11 Developer',
      provider: 'Oracle',
      category: 'software-dev',
      level: 'Professional',
      cost: '$245',
      duration: '90 minutes',
      validity: 'Lifetime',
      description: 'Validates expertise in Java SE 11 programming, from fundamentals to advanced techniques. Covers language basics, collections, modular programming, and more.',
      link: 'https://education.oracle.com/oracle-certified-professional-java-se-11-developer/trackp_815',
      prepMaterials: [
        'Oracle University Courses',
        'Java Programming Books',
        'Practice Exams'
      ],
      popularity: 'Medium'
    },
    {
      id: 4,
      title: 'Professional Scrum Developer I (PSD I)',
      provider: 'Scrum.org',
      category: 'software-dev',
      level: 'Foundation',
      cost: '$200',
      duration: '60 minutes',
      validity: 'Lifetime',
      description: 'Validates knowledge of Scrum principles and how to build software following the Scrum framework. Covers development practices, tools, and techniques.',
      link: 'https://www.scrum.org/professional-scrum-developer-certification',
      prepMaterials: [
        'Scrum Guide',
        'Practice Assessments',
        'Scrum.org Courses'
      ],
      popularity: 'Medium'
    },
    {
      id: 5,
      title: 'Certified JavaScript Developer',
      provider: 'JavaScript Certification Institute',
      category: 'software-dev',
      level: 'Professional',
      cost: '$180',
      duration: '120 minutes',
      validity: 'Lifetime',
      description: 'Validates core JavaScript skills including ES6+, DOM manipulation, promises, async/await, and best practices.',
      link: 'https://www.w3schools.com/cert/cert_javascript.asp',
      prepMaterials: [
        'JavaScript Reference Material',
        'Practice Tests',
        'Sample Projects'
      ],
      popularity: 'Medium'
    },

    // Data Science & Analytics Certifications
    {
      id: 6,
      title: 'Microsoft Certified: Data Analyst Associate',
      provider: 'Microsoft',
      category: 'data',
      level: 'Associate',
      cost: '$165',
      duration: '180 minutes',
      validity: '2 years',
      description: 'Validates skills in preparing, modeling, visualizing, and analyzing data using Microsoft Power BI.',
      link: 'https://docs.microsoft.com/en-us/learn/certifications/data-analyst-associate/',
      prepMaterials: [
        'Microsoft Learn Paths',
        'Official Practice Tests',
        'DA-100 Exam Prep'
      ],
      popularity: 'High'
    },
    {
      id: 7,
      title: 'AWS Certified Data Analytics - Specialty',
      provider: 'Amazon Web Services',
      category: 'data',
      level: 'Specialty',
      cost: '$300',
      duration: '180 minutes',
      validity: '3 years',
      description: 'Validates expertise in AWS data analytics services, including collection, storage, processing, and visualization.',
      link: 'https://aws.amazon.com/certification/certified-data-analytics-specialty/',
      prepMaterials: [
        'AWS Official Study Guide',
        'Whitepapers',
        'Practice Exams'
      ],
      popularity: 'Medium'
    },
    {
      id: 8,
      title: 'SAS Certified Data Scientist',
      provider: 'SAS',
      category: 'data',
      level: 'Professional',
      cost: '$180 per exam (multiple exams required)',
      duration: 'Varies by exam',
      validity: '3 years',
      description: 'Validates advanced analytics and AI expertise using SAS. Covers machine learning, forecasting, experimentation, and deployment.',
      link: 'https://www.sas.com/en_us/certification/credentials/advanced-analytics/data-scientist.html',
      prepMaterials: [
        'SAS Training Courses',
        'Practice Exams',
        'Sample Data Sets'
      ],
      popularity: 'Medium'
    },
    {
      id: 9,
      title: 'Cloudera Certified Associate (CCA) Data Analyst',
      provider: 'Cloudera',
      category: 'data',
      level: 'Associate',
      cost: '$295',
      duration: '120 minutes',
      validity: '2 years',
      description: 'Validates skills in importing, querying, and analyzing data in Hadoop and Cloudera environments using SQL and other tools.',
      link: 'https://www.cloudera.com/about/training/certification/cca-data-analyst.html',
      prepMaterials: [
        'Cloudera Training Courses',
        'Hands-on Practice',
        'Sample Questions'
      ],
      popularity: 'Medium'
    },
    {
      id: 10,
      title: 'Tableau Desktop Certified Professional',
      provider: 'Tableau',
      category: 'data',
      level: 'Professional',
      cost: '$250',
      duration: '180 minutes',
      validity: '3 years',
      description: 'Validates advanced Tableau desktop skills, including complex calculations, advanced dashboard techniques, and visual best practices.',
      link: 'https://www.tableau.com/learn/certification/desktop-certified-professional',
      prepMaterials: [
        'Tableau eLearning',
        'Exam Guide',
        'Practice Exams'
      ],
      popularity: 'High'
    },

    // UX/UI Design Certifications
    {
      id: 11,
      title: 'Certified User Experience Professional (CUXP)',
      provider: 'UX Certification',
      category: 'design',
      level: 'Professional',
      cost: '$395',
      duration: '90 minutes',
      validity: '2 years',
      description: 'Validates expertise in UX principles, research methodologies, and design processes. Covers user research, prototyping, and usability testing.',
      link: 'https://uxcertification.com/',
      prepMaterials: [
        'UX Design Books',
        'Practice Exams',
        'Study Guide'
      ],
      popularity: 'Medium'
    },
    {
      id: 12,
      title: 'Adobe Certified Professional in UI/UX Design',
      provider: 'Adobe',
      category: 'design',
      level: 'Professional',
      cost: '$180',
      duration: '120 minutes',
      validity: '3 years',
      description: 'Validates skills in creating effective user interfaces using Adobe XD, including design systems, prototyping, and user testing.',
      link: 'https://www.adobe.com/products/xd/certification.html',
      prepMaterials: [
        'Adobe XD Training',
        'Practice Exams',
        'Study Guide'
      ],
      popularity: 'High'
    },
    {
      id: 13,
      title: 'Certified Professional in User Experience (CPUX)',
      provider: 'UXQB',
      category: 'design',
      level: 'Foundation to Advanced',
      cost: '€375 for Foundation',
      duration: '90 minutes',
      validity: 'Lifetime',
      description: 'Standardized certification for UX professionals. Multiple levels available from foundation to advanced specialist certifications.',
      link: 'https://uxqb.org/en/certification/',
      prepMaterials: [
        'CPUX Curriculum',
        'Sample Exams',
        'Training Courses'
      ],
      popularity: 'Medium'
    },
    {
      id: 14,
      title: 'Interaction Design Foundation (IDF) UX Certification',
      provider: 'Interaction Design Foundation',
      category: 'design',
      level: 'Varies by course',
      cost: 'IDF Membership ($14/month)',
      duration: 'Self-paced',
      validity: 'Lifetime',
      description: 'Course-based certifications covering various UX topics, from fundamentals to specialized areas like design thinking and UI patterns.',
      link: 'https://www.interaction-design.org/courses',
      prepMaterials: [
        'IDF Course Materials',
        'Industry Case Studies',
        'Exercises'
      ],
      popularity: 'High'
    },
    {
      id: 15,
      title: 'Google UX Design Certificate',
      provider: 'Google (via Coursera)',
      category: 'design',
      level: 'Entry-level',
      cost: '$39/month Coursera subscription',
      duration: '6 months (part-time)',
      validity: 'Lifetime',
      description: 'Job-ready skills in UX design, covering design process, wireframing, prototyping, and user research. No previous experience required.',
      link: 'https://www.coursera.org/professional-certificates/google-ux-design',
      prepMaterials: [
        'Course Content',
        'Hands-on Projects',
        'Portfolio Development'
      ],
      popularity: 'Very High'
    },

    // Product Management Certifications
    {
      id: 16,
      title: 'Certified Scrum Product Owner (CSPO)',
      provider: 'Scrum Alliance',
      category: 'product',
      level: 'Foundation',
      cost: '$995-$1,395 (including training)',
      duration: '2-day course',
      validity: '2 years',
      description: 'Validates understanding of the Product Owner role in Scrum, including backlog management, stakeholder communication, and value optimization.',
      link: 'https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner',
      prepMaterials: [
        '2-day Training Course',
        'Scrum Guide',
        'Product Owner Handbook'
      ],
      popularity: 'Very High'
    },
    {
      id: 17,
      title: 'Product Management Certification',
      provider: 'Product School',
      category: 'product',
      level: 'Professional',
      cost: '$3,999-$4,999',
      duration: '8 weeks part-time',
      validity: 'Lifetime',
      description: 'Hands-on training in product management fundamentals, including strategy, roadmapping, metrics, and market analysis. Taught by senior product managers.',
      link: 'https://productschool.com/product-management-certification/',
      prepMaterials: [
        'Live Online Classes',
        'Product Case Studies',
        'Mentorship'
      ],
      popularity: 'High'
    },
    {
      id: 18,
      title: 'Professional Scrum Product Owner II (PSPO II)',
      provider: 'Scrum.org',
      category: 'product',
      level: 'Advanced',
      cost: '$250',
      duration: '60 minutes',
      validity: 'Lifetime',
      description: 'Validates advanced knowledge and application of the Product Owner role, value creation, stakeholder management, and product strategy.',
      link: 'https://www.scrum.org/professional-scrum-product-owner-certifications',
      prepMaterials: [
        'Scrum Guide',
        'Practice Assessments',
        'Training Courses (optional)'
      ],
      popularity: 'Medium'
    },
    {
      id: 19,
      title: 'Certified Product Manager (CPM)',
      provider: 'Association of International Product Marketing & Management',
      category: 'product',
      level: 'Professional',
      cost: '$369 (exam only)',
      duration: '2 hours',
      validity: '2 years',
      description: 'Industry-recognized certification validating product management knowledge across the product lifecycle, including market research, strategy, and launch.',
      link: 'https://aipmm.com/cpm-certified-product-manager/',
      prepMaterials: [
        'Study Guide',
        'Training Courses (extra cost)',
        'Practice Questions'
      ],
      popularity: 'Medium'
    },
    {
      id: 20,
      title: 'Product Management Certification',
      provider: 'General Assembly',
      category: 'product',
      level: 'Professional',
      cost: '$3,950',
      duration: '10 weeks part-time',
      validity: 'Lifetime',
      description: 'Comprehensive product management training covering user research, roadmapping, agile methodologies, and product launches.',
      link: 'https://generalassemb.ly/education/product-management',
      prepMaterials: [
        'Course Materials',
        'Real-world Projects',
        'Mentorship'
      ],
      popularity: 'High'
    },

    // DevOps & Cloud Certifications
    {
      id: 21,
      title: 'AWS Certified DevOps Engineer - Professional',
      provider: 'Amazon Web Services',
      category: 'devops',
      level: 'Professional',
      cost: '$300',
      duration: '180 minutes',
      validity: '3 years',
      description: 'Validates advanced technical expertise in provisioning, operating, and managing distributed application systems on the AWS platform.',
      link: 'https://aws.amazon.com/certification/certified-devops-engineer-professional/',
      prepMaterials: [
        'AWS Official Study Guide',
        'Whitepapers',
        'Practice Exams'
      ],
      popularity: 'High'
    },
    {
      id: 22,
      title: 'Google Professional Cloud DevOps Engineer',
      provider: 'Google Cloud',
      category: 'devops',
      level: 'Professional',
      cost: '$200',
      duration: '120 minutes',
      validity: '2 years',
      description: 'Validates skills to use Google Cloud for implementing continuous integration pipelines, monitoring services, and managing service incident responses.',
      link: 'https://cloud.google.com/certification/cloud-devops-engineer',
      prepMaterials: [
        'Google Cloud Training',
        'Practice Exams',
        'Hands-on Labs'
      ],
      popularity: 'Medium'
    },
    {
      id: 23,
      title: 'Azure DevOps Engineer Expert',
      provider: 'Microsoft',
      category: 'devops',
      level: 'Expert',
      cost: '$165',
      duration: '180 minutes',
      validity: '2 years',
      description: 'Validates expertise in designing and implementing DevOps practices on Microsoft Azure, including source control, CI/CD, and infrastructure as code.',
      link: 'https://docs.microsoft.com/en-us/learn/certifications/devops-engineer/',
      prepMaterials: [
        'Microsoft Learn Paths',
        'Official Practice Tests',
        'Instructor-led Training'
      ],
      popularity: 'High'
    },
    {
      id: 24,
      title: 'Docker Certified Associate (DCA)',
      provider: 'Docker',
      category: 'devops',
      level: 'Associate',
      cost: '$195',
      duration: '90 minutes',
      validity: '2 years',
      description: 'Validates knowledge in Docker containerization, including installation, configuration, networking, security, and image management.',
      link: 'https://training.mirantis.com/certification/dca-certification-exam/',
      prepMaterials: [
        'Docker Documentation',
        'Practice Exams',
        'Hands-on Labs'
      ],
      popularity: 'Medium'
    },
    {
      id: 25,
      title: 'Certified Kubernetes Administrator (CKA)',
      provider: 'Cloud Native Computing Foundation',
      category: 'devops',
      level: 'Professional',
      cost: '$375',
      duration: '120 minutes',
      validity: '3 years',
      description: 'Performance-based certification that validates skills, knowledge, and competency to perform the responsibilities of Kubernetes administrators.',
      link: 'https://www.cncf.io/certification/cka/',
      prepMaterials: [
        'Kubernetes Documentation',
        'Practice Labs',
        'Training Courses'
      ],
      popularity: 'Very High'
    },

    // Cybersecurity Certifications
    {
      id: 26,
      title: 'CompTIA Security+',
      provider: 'CompTIA',
      category: 'cybersecurity',
      level: 'Entry to Intermediate',
      cost: '$381',
      duration: '90 minutes',
      validity: '3 years',
      description: 'Establishes the core knowledge required of any cybersecurity role and provides a springboard to intermediate-level cybersecurity jobs.',
      link: 'https://www.comptia.org/certifications/security',
      prepMaterials: [
        'Official Study Guide',
        'Practice Tests',
        'Training Courses'
      ],
      popularity: 'Very High'
    },
    {
      id: 27,
      title: 'Certified Information Systems Security Professional (CISSP)',
      provider: 'ISC²',
      category: 'cybersecurity',
      level: 'Advanced',
      cost: '$749',
      duration: '3 hours',
      validity: '3 years (with continuing education)',
      description: 'Globally recognized certification validating expertise in designing, implementing, and managing a best-in-class cybersecurity program.',
      link: 'https://www.isc2.org/Certifications/CISSP',
      prepMaterials: [
        'Official Study Guide',
        'Training Seminars',
        'Practice Exams'
      ],
      popularity: 'Very High'
    },
    {
      id: 28,
      title: 'Certified Ethical Hacker (CEH)',
      provider: 'EC-Council',
      category: 'cybersecurity',
      level: 'Intermediate',
      cost: '$1,199',
      duration: '4 hours',
      validity: '3 years',
      description: 'Validates skills in penetration testing, ethical hacking methodologies, and improving the security posture of organizations.',
      link: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/',
      prepMaterials: [
        'Official Courseware',
        'Practice Labs',
        'Exam Prep'
      ],
      popularity: 'High'
    },
    {
      id: 29,
      title: 'Offensive Security Certified Professional (OSCP)',
      provider: 'Offensive Security',
      category: 'cybersecurity',
      level: 'Advanced',
      cost: '$999-$1,499 (including training)',
      duration: '24-hour practical exam',
      validity: 'Lifetime',
      description: 'Rigorous certification validating hands-on penetration testing skills through a challenging practical exam.',
      link: 'https://www.offensive-security.com/pwk-oscp/',
      prepMaterials: [
        'Penetration Testing with Kali Linux Course',
        'Practice Labs',
        'Exercise Materials'
      ],
      popularity: 'Very High'
    },
    {
      id: 30,
      title: 'Certified Information Security Manager (CISM)',
      provider: 'ISACA',
      category: 'cybersecurity',
      level: 'Management',
      cost: '$575 (members), $760 (non-members)',
      duration: '4 hours',
      validity: '3 years (with continuing education)',
      description: 'Management-focused certification that validates ability to manage, design, and oversee enterprise information security programs.',
      link: 'https://www.isaca.org/credentialing/cism',
      prepMaterials: [
        'CISM Review Manual',
        'Question Database',
        'Training Courses'
      ],
      popularity: 'High'
    },

    // AI & Machine Learning Certifications
    {
      id: 31,
      title: 'TensorFlow Developer Certificate',
      provider: 'Google',
      category: 'ai-ml',
      level: 'Intermediate',
      cost: '$100',
      duration: '5 hours',
      validity: '3 years',
      description: 'Validates skills in using TensorFlow to build and train neural network models for a variety of applications.',
      link: 'https://www.tensorflow.org/certificate',
      prepMaterials: [
        'TensorFlow Documentation',
        'DeepLearning.AI TensorFlow Courses',
        'Practice Problems'
      ],
      popularity: 'High'
    },
    {
      id: 32,
      title: 'AWS Certified Machine Learning - Specialty',
      provider: 'Amazon Web Services',
      category: 'ai-ml',
      level: 'Specialty',
      cost: '$300',
      duration: '180 minutes',
      validity: '3 years',
      description: 'Validates expertise in designing, implementing, deploying, and maintaining machine learning solutions on AWS.',
      link: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/',
      prepMaterials: [
        'AWS Training and Certification',
        'Whitepapers',
        'Practice Exams'
      ],
      popularity: 'High'
    },
    {
      id: 33,
      title: 'Microsoft Certified: Azure AI Engineer Associate',
      provider: 'Microsoft',
      category: 'ai-ml',
      level: 'Associate',
      cost: '$165',
      duration: '180 minutes',
      validity: '2 years',
      description: 'Validates skills in using Azure Cognitive Services, Azure Bot Service, and Microsoft Bot Framework to create AI solutions.',
      link: 'https://docs.microsoft.com/en-us/learn/certifications/azure-ai-engineer/',
      prepMaterials: [
        'Microsoft Learn Paths',
        'Official Practice Tests',
        'Instructor-led Training'
      ],
      popularity: 'Medium'
    },
    {
      id: 34,
      title: 'IBM Data Science Professional Certificate',
      provider: 'IBM (via Coursera)',
      category: 'ai-ml',
      level: 'Professional',
      cost: '$39/month Coursera subscription',
      duration: 'Self-paced (approx. 11 months)',
      validity: 'Lifetime',
      description: 'Comprehensive program covering data science methodology, Python programming, databases, visualization, analysis, and machine learning.',
      link: 'https://www.coursera.org/professional-certificates/ibm-data-science',
      prepMaterials: [
        'Course Content',
        'Hands-on Labs',
        'Projects'
      ],
      popularity: 'High'
    },
    {
      id: 35,
      title: 'Deep Learning Specialization Certificate',
      provider: 'deeplearning.ai (via Coursera)',
      category: 'ai-ml',
      level: 'Intermediate to Advanced',
      cost: '$49/month Coursera subscription',
      duration: 'Self-paced (approx. 3 months)',
      validity: 'Lifetime',
      description: 'Comprehensive deep learning program covering neural networks, improving algorithms, structuring projects, CNNs, and sequence models.',
      link: 'https://www.coursera.org/specializations/deep-learning',
      prepMaterials: [
        'Course Videos',
        'Programming Assignments',
        'Quizzes'
      ],
      popularity: 'Very High'
    },

    // Project Management Certifications
    {
      id: 36,
      title: 'Project Management Professional (PMP)',
      provider: 'Project Management Institute',
      category: 'project',
      level: 'Professional',
      cost: '$405-$555',
      duration: '230 minutes',
      validity: '3 years (with PDUs)',
      description: 'Globally recognized certification validating expertise in leading and directing projects. Covers all aspects of project management.',
      link: 'https://www.pmi.org/certifications/project-management-pmp',
      prepMaterials: [
        'PMBOK Guide',
        'PMP Exam Prep Courses',
        'Practice Exams'
      ],
      popularity: 'Very High'
    },
    {
      id: 37,
      title: 'Certified ScrumMaster (CSM)',
      provider: 'Scrum Alliance',
      category: 'project',
      level: 'Foundation',
      cost: '$995-$1,395 (including training)',
      duration: '2-day course + 1-hour exam',
      validity: '2 years',
      description: 'Validates knowledge of Scrum principles, including the role of the ScrumMaster in facilitating the process and protecting the team.',
      link: 'https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster',
      prepMaterials: [
        '2-day Training Course',
        'Scrum Guide',
        'Practice Questions'
      ],
      popularity: 'Very High'
    },
    {
      id: 38,
      title: 'PRINCE2 Foundation and Practitioner',
      provider: 'AXELOS',
      category: 'project',
      level: 'Foundation to Practitioner',
      cost: '$400-$700 (varies by provider)',
      duration: '1 hour (Foundation), 2.5 hours (Practitioner)',
      validity: '3 years (Practitioner)',
      description: 'Validates knowledge of the PRINCE2 methodology, a structured project management approach used worldwide.',
      link: 'https://www.axelos.com/certifications/prince2/',
      prepMaterials: [
        'Official Manual',
        'Training Courses',
        'Practice Exams'
      ],
      popularity: 'High'
    },
    {
      id: 39,
      title: 'Professional Scrum Master I (PSM I)',
      provider: 'Scrum.org',
      category: 'project',
      level: 'Foundation',
      cost: '$150',
      duration: '60 minutes',
      validity: 'Lifetime',
      description: 'Validates fundamental knowledge of Scrum as described in the Scrum Guide, including roles, events, artifacts, and rules.',
      link: 'https://www.scrum.org/professional-scrum-master-i-certification',
      prepMaterials: [
        'Scrum Guide',
        'Open Assessments',
        'Training Courses (optional)'
      ],
      popularity: 'High'
    },
    {
      id: 40,
      title: 'Certified Associate in Project Management (CAPM)',
      provider: 'Project Management Institute',
      category: 'project',
      level: 'Entry-level',
      cost: '$225-$300',
      duration: '180 minutes',
      validity: '3 years',
      description: 'Entry-level certification for project practitioners who want to demonstrate their understanding of fundamental project management knowledge.',
      link: 'https://www.pmi.org/certifications/certified-associate-capm',
      prepMaterials: [
        'PMBOK Guide',
        'Training Courses',
        'Practice Questions'
      ],
      popularity: 'Medium'
    },

    // Non-Technical Role Certifications
    {
      id: 41,
      title: 'Certified Digital Marketing Professional',
      provider: 'Digital Marketing Institute',
      category: 'non-technical',
      level: 'Professional',
      cost: '$1,368',
      duration: '3 hours',
      validity: '3 years',
      description: 'Industry-recognized certification covering key digital marketing concepts, channels, and strategies.',
      link: 'https://digitalmarketinginstitute.com/students/courses/professional-diploma-in-digital-marketing',
      prepMaterials: [
        'Course Materials',
        'Practical Assignments',
        'Webinars'
      ],
      popularity: 'High'
    },
    {
      id: 42,
      title: 'Certified Business Analysis Professional (CBAP)',
      provider: 'International Institute of Business Analysis',
      category: 'non-technical',
      level: 'Professional',
      cost: '$325-$450',
      duration: '3.5 hours',
      validity: '3 years',
      description: 'Recognizes experienced business analysis professionals who have demonstrated knowledge and expertise in the field.',
      link: 'https://www.iiba.org/certification/core-business-analysis-certifications/cbap/',
      prepMaterials: [
        'BABOK Guide',
        'Study Groups',
        'Practice Exams'
      ],
      popularity: 'Medium'
    },
    {
      id: 43,
      title: 'Salesforce Certified Administrator',
      provider: 'Salesforce',
      category: 'non-technical',
      level: 'Administrator',
      cost: '$200',
      duration: '115 minutes',
      validity: 'Indefinite (with maintenance)',
      description: 'Validates expertise in managing and configuring Salesforce applications, including user management, security, reports, and automation.',
      link: 'https://trailhead.salesforce.com/en/credentials/administrator',
      prepMaterials: [
        'Trailhead Modules',
        'Practice Exams',
        'Study Guides'
      ],
      popularity: 'Very High'
    },
    {
      id: 44,
      title: 'Technical Writer Certification',
      provider: 'Society for Technical Communication',
      category: 'non-technical',
      level: 'Professional',
      cost: '$475 (members), $575 (non-members)',
      duration: 'Portfolio-based',
      validity: '3 years',
      description: 'Validates the knowledge, experience, and skills of technical communicators, from entry-level to advanced.',
      link: 'https://www.stc.org/certification/',
      prepMaterials: [
        'STC Resources',
        'Portfolio Development',
        'Workshops'
      ],
      popularity: 'Medium'
    },
    {
      id: 45,
      title: 'Certified Professional in Human Resources (PHR)',
      provider: 'HR Certification Institute',
      category: 'non-technical',
      level: 'Professional',
      cost: '$395-$495',
      duration: '175 minutes',
      validity: '3 years',
      description: 'Validates mastery of the technical and operational aspects of HR management, including U.S. laws and regulations.',
      link: 'https://www.hrci.org/our-programs/our-certifications/phr',
      prepMaterials: [
        'Study Guides',
        'Practice Exams',
        'Prep Courses'
      ],
      popularity: 'High'
    }
  ];

  // Filter courses based on active tab and search term
  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeTab === 'all' || course.category === activeTab;
    const matchesSearch = searchTerm === '' || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.tags && course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    return matchesCategory && matchesSearch;
  });

  // Filter certifications based on active tab and search term
  const filteredCertifications = certifications.filter(cert => {
    const matchesCategory = activeTab === 'all' || cert.category === activeTab;
    const matchesSearch = searchTerm === '' || 
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Learning Resources</h1>
          <p className="text-lg mt-2 opacity-90">
            Top-rated courses and certifications for tech careers
          </p>
        </div>
      </div>
      
      {/* Navigation Bar */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-blue-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses and certifications..."
                className="w-64 py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Courses Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Online Courses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex-1">{course.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold py-1 px-2 rounded-full">
                      {course.rating} ★
                    </span>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-4">{course.provider} • {course.instructor}</p>
                  
                  <p className="text-gray-700 mb-4 text-sm line-clamp-3">{course.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags && course.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs py-1 px-2 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mt-auto">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration}
                    </div>
                    <div>
                      {course.isFree ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        <span>{course.price}</span>
                      )}
                    </div>
                    <div>
                      {course.certificate && (
                        <span className="flex items-center">
                          <svg className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Certificate
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
                  <a 
                    href={course.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    View Course
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-10">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
              <p className="mt-1 text-sm text-gray-500">Try changing your search or category filter.</p>
            </div>
          )}
        </div>
        
        {/* Certifications Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Professional Certifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex-1">{cert.title}</h3>
                    <span className={`text-xs font-semibold py-1 px-2 rounded-full ${
                      cert.popularity === 'Very High' ? 'bg-purple-100 text-purple-800' :
                      cert.popularity === 'High' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {cert.popularity}
                    </span>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-4">{cert.provider} • {cert.level}</p>
                  
                  <p className="text-gray-700 mb-4 text-sm line-clamp-3">{cert.description}</p>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-sm">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">Cost: {cert.cost}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">Duration: {cert.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">Validity: {cert.validity}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Preparation Materials:</h4>
                    <ul className="text-xs text-gray-600 space-y-1 pl-4 list-disc">
                      {cert.prepMaterials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    View Certification
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCertifications.length === 0 && (
            <div className="text-center py-10">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No certifications found</h3>
              <p className="mt-1 text-sm text-gray-500">Try changing your search or category filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Learning;
