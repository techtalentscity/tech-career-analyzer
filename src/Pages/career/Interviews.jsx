// src/Pages/career/Interviews.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Interviews = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Define interview categories
  const categories = [
    { id: 'all', name: 'All Types' },
    { id: 'technical', name: 'Technical Interviews' },
    { id: 'behavioral', name: 'Behavioral Interviews' },
    { id: 'coding', name: 'Coding Challenges' },
    { id: 'system-design', name: 'System Design' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'product', name: 'Product Management' },
    { id: 'non-technical', name: 'Non-Technical Roles' }
  ];

  // Define interview resources data
  const interviewResources = [
    // Technical Interview Resources
    {
      id: 1,
      title: "Cracking the Coding Interview",
      author: "Gayle Laakmann McDowell",
      category: "coding",
      description: "Comprehensive guide with 189 programming questions and solutions. Contains strategies for tackling algorithm questions and tips on interview preparation.",
      link: "https://www.crackingthecodinginterview.com/",
      type: "Book",
      tags: ["algorithms", "data structures", "problem solving", "interview preparation"],
      difficulty: "All Levels",
      popularity: "Very High",
      isFree: false,
      language: ["All Languages"],
      lastUpdated: "Latest Edition (6th)"
    },
    {
      id: 2,
      title: "LeetCode",
      author: "LeetCode Team",
      category: "coding",
      description: "Platform with over 2,000 coding problems, community discussions, contests, and interview preparation resources. Used by many tech companies for interview screening.",
      link: "https://leetcode.com/",
      type: "Platform",
      tags: ["algorithms", "data structures", "problem solving", "coding practice"],
      difficulty: "All Levels",
      popularity: "Very High",
      isFree: "Freemium",
      language: ["Multiple Programming Languages"],
      lastUpdated: "Regularly"
    },
    {
      id: 3,
      title: "System Design Interview – An Insider's Guide",
      author: "Alex Xu",
      category: "system-design",
      description: "Guide on how to approach system design interviews, with detailed examples like designing a URL shortener, news feed, chat messenger, and more.",
      link: "https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF",
      type: "Book",
      tags: ["system design", "architecture", "scalability", "distributed systems"],
      difficulty: "Intermediate to Advanced",
      popularity: "High",
      isFree: false,
      language: ["Concept-based"],
      lastUpdated: "2nd Edition"
    },
    {
      id: 4,
      title: "HackerRank",
      author: "HackerRank Team",
      category: "coding",
      description: "Platform for coding practice, contests, and company-specific coding challenges. Many companies use HackerRank for technical assessments in their hiring process.",
      link: "https://www.hackerrank.com/",
      type: "Platform",
      tags: ["algorithms", "data structures", "problem solving", "coding challenges"],
      difficulty: "All Levels",
      popularity: "High",
      isFree: "Freemium",
      language: ["Multiple Programming Languages"],
      lastUpdated: "Regularly"
    },
    {
      id: 5,
      title: "System Design Primer",
      author: "Donne Martin (GitHub)",
      category: "system-design",
      description: "Open-source GitHub repository with comprehensive resources for learning and practicing system design for tech interviews, including how to scale a system and object-oriented design.",
      link: "https://github.com/donnemartin/system-design-primer",
      type: "Resource",
      tags: ["system design", "architecture", "scalability", "object-oriented design"],
      difficulty: "Intermediate to Advanced",
      popularity: "Very High",
      isFree: true,
      language: ["Concept-based"],
      lastUpdated: "Regularly"
    },
    {
      id: 6,
      title: "The Complete Coding Interview Guide in Java",
      author: "Anghel Leonard",
      category: "coding",
      description: "Comprehensive guide for Java developers preparing for coding interviews, covering algorithms, data structures, and common interview patterns.",
      link: "https://www.packtpub.com/product/the-complete-coding-interview-guide-in-java/9781839212062",
      type: "Book",
      tags: ["java", "algorithms", "data structures", "interview preparation"],
      difficulty: "Intermediate",
      popularity: "Medium",
      isFree: false,
      language: ["Java"],
      lastUpdated: "2020"
    },
    {
      id: 7,
      title: "Grokking the System Design Interview",
      author: "Design Gurus",
      category: "system-design",
      description: "Interactive course that teaches how to tackle system design questions, with step-by-step approaches to design problems like TinyURL, Instagram, and Twitter.",
      link: "https://www.educative.io/courses/grokking-the-system-design-interview",
      type: "Course",
      tags: ["system design", "architecture", "scalability", "distributed systems"],
      difficulty: "Intermediate to Advanced",
      popularity: "High",
      isFree: false,
      language: ["Concept-based"],
      lastUpdated: "Regularly"
    },
    {
      id: 8,
      title: "CodeSignal",
      author: "CodeSignal Team",
      category: "coding",
      description: "Platform offering coding challenges, assessments, and interview practice with a focus on standardized assessments used by companies for technical screening.",
      link: "https://codesignal.com/",
      type: "Platform",
      tags: ["algorithms", "data structures", "coding challenges", "technical assessments"],
      difficulty: "All Levels",
      popularity: "Medium",
      isFree: "Freemium",
      language: ["Multiple Programming Languages"],
      lastUpdated: "Regularly"
    },
    {
      id: 9,
      title: "Elements of Programming Interviews",
      author: "Adnan Aziz, Tsung-Hsien Lee, Amit Prakash",
      category: "coding",
      description: "Comprehensive book of coding problems with detailed solutions in C++, Java, or Python editions. Problems are organized by data structure and algorithm topics.",
      link: "https://elementsofprogramminginterviews.com/",
      type: "Book",
      tags: ["algorithms", "data structures", "problem solving", "interview preparation"],
      difficulty: "Intermediate to Advanced",
      popularity: "High",
      isFree: false,
      language: ["C++", "Java", "Python"],
      lastUpdated: "Latest Edition"
    },
    {
      id: 10,
      title: "AlgoExpert",
      author: "AlgoExpert Team",
      category: "coding",
      description: "Platform with 190+ hand-picked coding interview questions with video explanations, code walkthroughs, and a built-in code execution environment.",
      link: "https://www.algoexpert.io/",
      type: "Platform",
      tags: ["algorithms", "data structures", "problem solving", "video explanations"],
      difficulty: "All Levels",
      popularity: "High",
      isFree: false,
      language: ["Python", "JavaScript", "Java", "C++", "Go"],
      lastUpdated: "Regularly"
    },

    // Data Science Interview Resources
    {
      id: 11,
      title: "Ace the Data Science Interview",
      author: "Nick Singh, Kevin Huo",
      category: "data-science",
      description: "Comprehensive guide for data science interviews, covering SQL, statistics, ML concepts, and 201 practice questions with solutions.",
      link: "https://www.acethedatascienceinterview.com/",
      type: "Book",
      tags: ["data science", "SQL", "statistics", "machine learning", "product analytics"],
      difficulty: "All Levels",
      popularity: "High",
      isFree: false,
      language: ["SQL", "Python"],
      lastUpdated: "2021"
    },
    {
      id: 12,
      title: "DataLemur",
      author: "Nick Singh",
      category: "data-science",
      description: "Platform with real SQL and data science interview questions from companies like Google, Facebook, and Amazon with step-by-step solutions.",
      link: "https://datalemur.com/",
      type: "Platform",
      tags: ["SQL", "data science", "interview questions", "case studies"],
      difficulty: "All Levels",
      popularity: "Medium",
      isFree: "Freemium",
      language: ["SQL", "Python"],
      lastUpdated: "Regularly"
    },
    {
      id: 13,
      title: "120 Data Science Interview Questions",
      author: "DataSciencePrep.com",
      category: "data-science",
      description: "Compilation of real data science interview questions from FAANG companies, covering statistics, ML, coding, and behavioral questions.",
      link: "https://datascienceprep.com/",
      type: "Resource",
      tags: ["data science", "statistics", "machine learning", "probability"],
      difficulty: "Intermediate to Advanced",
      popularity: "Medium",
      isFree: false,
      language: ["Python", "SQL"],
      lastUpdated: "Regularly"
    },
    {
      id: 14,
      title: "StrataScratch",
      author: "StrataScratch Team",
      category: "data-science",
      description: "Platform with over 1,000 real interview questions for data scientists and analysts, focusing on SQL, Python, and data analytics concepts.",
      link: "https://www.stratascratch.com/",
      type: "Platform",
      tags: ["SQL", "data science", "python", "analytics"],
      difficulty: "All Levels",
      popularity: "Medium",
      isFree: "Freemium",
      language: ["SQL", "Python"],
      lastUpdated: "Regularly"
    },
    {
      id: 15,
      title: "Machine Learning Interview Questions",
      author: "Chip Huyen",
      category: "data-science",
      description: "GitHub repository containing common machine learning interview questions with detailed answers, organized by topic and difficulty.",
      link: "https://github.com/chiphuyen/ml-interviews-book",
      type: "Resource",
      tags: ["machine learning", "deep learning", "statistics", "interview questions"],
      difficulty: "Intermediate to Advanced",
      popularity: "High",
      isFree: true,
      language: ["Concept-based"],
      lastUpdated: "Regularly"
    },

    // Behavioral Interview Resources
    {
      id: 16,
      title: "The STAR Method: The Secret to Acing Your Next Job Interview",
      author: "The Muse",
      category: "behavioral",
      description: "Comprehensive guide on using the STAR (Situation, Task, Action, Result) method for behavioral interviews, with examples and practice advice.",
      link: "https://www.themuse.com/advice/star-interview-method",
      type: "Guide",
      tags: ["behavioral interviews", "STAR method", "interview preparation", "soft skills"],
      difficulty: "All Levels",
      popularity: "High",
      isFree: true,
      language: ["Concept-based"],
      lastUpdated: "Regularly"
    },
    {
      id: 17,
      title: "Behavioral Interviews: The Ultimate Preparation Guide",
      author: "Jeff Sipes",
      category: "behavioral",
      description: "Comprehensive book on mastering behavioral interview questions with sample answers, STAR method explanation, and industry-specific examples.",
      link: "https://www.amazon.com/Behavioral-Interviews-Ultimate-Preparation-Guide-ebook/dp/B08HM3Q8KT",
      type: "Book",
      tags: ["behavioral interviews", "STAR method", "situational questions", "interview preparation"],
      difficulty: "All Levels",
      popularity: "Medium",
      isFree: false,
      language: ["Concept-based"],
      lastUpdated: "2020"
    },
    {
      id: 18,
      title: "Amazon Leadership Principles Interview Guide",
      author: "Amazon Career Team",
      category: "behavioral",
      description: "Official resource explaining Amazon's leadership principles and how to prepare for behavioral interviews based on these principles.",
      link: "https://www.amazon.jobs/en/principles",
      type: "Resource",
      tags: ["leadership principles", "behavioral interviews", "Amazon", "STAR method"],
      difficulty: "All Levels",
      popularity: "High",
      isFree: true,
      language: ["Concept-based"],
      lastUpdated: "Regularly"
    },
    {
      id: 19,
      title: "Big Tech Behavioral Interview Questions Database",
      author: "Tech Interview Pro",
      category: "behavioral",
      description: "Collection of real behavioral interview questions from companies like Google, Facebook, Amazon, and Microsoft with suggested answer frameworks.",
      link: "https://www.techseries.dev/",
      type: "Resource",
      tags: ["behavioral interviews", "big tech", "leadership", "STAR method"],
      difficulty: "All Levels",
      popularity: "Medium",
      isFree: false,
      language: ["Concept-based"],
      lastUpdated: "Regularly"
    },
    {
      id: 20,
      title: "Behavior-Based Interviewing with S.T.A.R. Examples",
      author: "Northwestern University",
      category: "behavioral",
      description: "University-created resource on behavioral interviewing with STAR method examples and comprehensive question list organized by competency.",
      link: "https://www.northwestern.edu/careers/documents/getting-started/how-to-prepare-for-a-behavioral-interview.pdf",
      type: "Guide",
      tags: ["behavioral interviews", "STAR method", "competency-based", "interview preparation"],
      difficulty: "All Levels",
      popularity: "Medium",
      isFree: true,
      language: ["Concept-based"],
      lastUpdated: "2021"
    },

    // Product Management Interview Resources
    {
      id: 21,
      title: "Cracking the PM Interview",
      author: "Gayle Laakmann McDowell, Jackie Bavaro",
      category: "product",
      description: "Comprehensive guide for product management interviews, covering all aspects from resume preparation to product questions, estimation, and behavioral interviews.",
      link: "https://www.crackingthepminterview.com/",
      type: "Book",
      tags: ["product management", "interview preparation", "case studies", "behavioral questions"],
      difficulty: "All Levels",
      popularity: "Very High",
      isFree: false,
      language: ["Concept-based"],
      lastUpdated: "Latest Edition"
    },
    {
      id: 22,
      title: "Product Management Exercises",
      author: "Lewis C. Lin",
      category: "product",
      description: "Collection of 150+ product management interview questions with detailed answers, covering product design, strategy, and execution.",
      link: "https://www.lewis-lin.com/pm-interview-questions",
      type: "Resource",
      tags: ["product management", "case studies", "product metrics", "product strategy"],
      difficulty: "Intermediate to Advanced",
      popularity: "High",
      isFree: false,
      language: ["Concept-based"],
      lastUpdated: "2021"
    },
    {
      id: 23,
      title: "The Product Manager Interview: 167 Actual Questions and Answers",
      author: "Lewis C. Lin, Teng Lu",
      category: "product",
      description: "Comprehensive preparation guide with real interview questions from major tech companies and detailed answers focused on product management roles.",
      link: "https://www.amazon.com/Product-Manager-Interview-Questions-Answers/dp/0998120448",
      type: "Book",
      tags: ["product management", "interview questions", "case studies", "product design"],
      difficulty: "Intermediate",
      popularity: "High",
      isFree: false,
      language: ["Concept-based"],
      lastUpdated: "4th Edition"
    },
    {
      id: 24,
      title: "Exponent - Product Manager Interview Preparation",
      author: "Exponent Team",
      category: "product",
      description: "Platform offering video lessons, mock interviews, and community forums specifically focused on product management interview preparation.",
      link: "https://www.tryexponent.com/",
      type: "Platform",
      tags: ["product management", "interview preparation", "mock interviews", "video lessons"],
      difficulty: "All Levels",
      popularity: "High",
      isFree: "Freemium",
      language: ["Concept-based"],
      lastUpdated: "Regularly"
    },
    {
      id: 25,
      title: "Decode and Conquer: Answers to Product Management Interviews",
      author: "Lewis C. Lin",
      category: "product",
      description: "Guide focusing on product design and analytical questions in product management interviews, with frameworks like CIRCLES Method for product design questions.",
      link: "https://www.amazon.com/Decode-Conquer-Answers-Management-Interviews/dp/0615930417",
      type: "Book",
      tags: ["product management", "frameworks", "product design", "analytical questions"],
      difficulty: "Intermediate",
      popularity: "Very High",
      isFree: false,
      language: ["Concept-based"],
      lastUpdated: "3rd Edition"
    },

    // Non-Technical Role Resources
    {
      id: 26,
      title: "The Interview Guys - Job Interview Questions",
      author: "Mike Simpson, Jeff Gillis",
      category: "non-technical",
      description: "Comprehensive resource covering common interview questions for non-technical roles, with detailed answer strategies and examples.",
      link: "https://theinterviewguys.com/job-interview-questions-and-answers/",
      type: "Resource",
      tags: ["interview preparation", "common questions", "answer strategies", "non-technical roles"],
      difficulty: "All Levels",
      popularity: "High",
      isFree: true,
      language: ["Concept-based"],
      lastUpdated: "Regularly"
    },
    {
      id: 27,
      title: "Sales Interview Questions and Answers",
      author: "SalesInterviewQuestions.com",
      category: "non-technical",
      description: "Compilation of common sales interview questions with detailed answer examples, covering behavioral questions, sales scenarios, and objection handling.",
      link: "https://salesinterviewquestions.com/",
      type: "Resource",
      tags: ["sales interviews", "objection handling", "sales scenarios", "sales techniques"],
      difficulty: "All Levels",
      popularity: "Medium",
      isFree: true,
      language: ["Concept-based"],
      lastUpdated: "Regularly"
    },
    {
      id: 28,
      title: "Marketing Interview Questions and Answers",
      author: "MarketingInterviewHQ",
      category: "non-technical",
      description: "Resource for marketing professionals with industry-specific interview questions, case studies, and answers covering various marketing disciplines.",
      link: "https://www.marketinginterview.com/",
      type: "Resource",
      tags: ["marketing interviews", "marketing strategy", "campaign analysis", "market research"],
      difficulty: "All Levels",
      popularity: "Medium",
      isFree: "Freemium",
      language: ["Concept-based"],
      lastUpdated: "Regularly"
    },
    {
      id: 29,
      title: "96 Great Interview Questions to Ask Before You Hire",
      author: "Paul Falcone",
      category: "non-technical",
      description: "Book covering effective interview questions for hiring managers, useful for candidates to prepare for common questions in various non-technical roles.",
      link: "https://www.amazon.com/Great-Interview-Questions-Before-Hire/dp/0814439160",
      type: "Book",
      tags: ["interview questions", "hr perspective", "candidate preparation", "hiring process"],
      difficulty: "All Levels",
      popularity: "Medium",
      isFree: false,
      language: ["Concept-based"],
      lastUpdated: "3rd Edition"
    },
    {
      id: 30,
      title: "The Ultimate Guide to Graphic Design Interviews",
      author: "Shillington Education",
      category: "non-technical",
      description: "Comprehensive guide specifically for graphic designers, covering portfolio presentation, technical questions, and creative problem-solving scenarios.",
      link: "https://www.shillingtoneducation.com/blog/graphic-design-interview-guide/",
      type: "Guide",
      tags: ["graphic design", "portfolio presentation", "design process", "creative assessment"],
      difficulty: "All Levels",
      popularity: "Medium",
      isFree: true,
      language: ["Concept-based"],
      lastUpdated: "Regularly"
    },

    // Additional Technical Resources
    {
      id: 31,
      title: "InterviewBit",
      author: "InterviewBit Team",
      category: "coding",
      description: "Platform with curated coding problems, company-specific preparation guides, and a mock interview system with peer feedback.",
      link: "https://www.interviewbit.com/",
      type: "Platform",
      tags: ["algorithms", "data structures", "programming interviews", "company-specific prep"],
      difficulty: "All Levels",
      popularity: "High",
      isFree: "Freemium",
      language: ["Multiple Programming Languages"],
      lastUpdated: "Regularly"
    },
    {
      id: 32,
      title: "System Design: Instagram",
      author: "Grokking the System Design Interview",
      category: "system-design",
      description: "Detailed breakdown of how to approach a system design interview for building Instagram-like photo sharing service, covering scaling, storage, and CDN strategies.",
      link: "https://www.educative.io/courses/grokking-the-system-design-interview/m2yDVZnQ8lG",
      type: "Course",
      tags: ["system design", "scalability", "storage", "media sharing"],
      difficulty: "Intermediate to Advanced",
      popularity: "High",
      isFree: false,
      language: ["Concept-based"],
      lastUpdated: "Regularly"
    },
    {
      id: 33,
      title: "Frontend Interview Handbook",
      author: "Yangshun Tay",
      category: "technical",
      description: "Comprehensive GitHub resource focusing specifically on front-end development interview questions and topics, covering JavaScript, CSS, HTML, and more.",
      link: "https://github.com/yangshun/front-end-interview-handbook",
      type: "Resource",
      tags: ["frontend", "javascript", "css", "html", "coding questions"],
      difficulty: "All Levels",
      popularity: "Very High",
      isFree: true,
      language: ["JavaScript", "HTML", "CSS"],
      lastUpdated: "Regularly"
    },
    {
      id: 34,
      title: "Pramp - Practice Technical Interviews",
      author: "Pramp Team",
      category: "technical",
      description: "Platform that pairs you with other engineers for mock interviews, focusing on technical interviews with peer feedback. Covers coding and system design.",
      link: "https://www.pramp.com/",
      type: "Platform",
      tags: ["mock interviews", "peer feedback", "coding", "system design"],
      difficulty: "All Levels",
      popularity: "High",
      isFree: true,
      language: ["Multiple Programming Languages"],
      lastUpdated: "Regularly"
    },
    {
      id: 35,
      title: "Tech Interview Pro",
      author: "TechLead (Patrick Shyu)",
      category: "technical",
      description: "Comprehensive course covering all aspects of tech interviews, from coding challenges to system design, and behavioral questions. Created by ex-Google/Facebook engineer.",
      link: "https://www.techseries.dev/",
      type: "Course",
      tags: ["coding", "system design", "behavioral", "comprehensive prep"],
      difficulty: "All Levels",
      popularity: "Medium",
      isFree: false,
      language: ["Multiple Programming Languages"],
      lastUpdated: "Regularly"
    },

    // Mock Interview Resources
    {
      id: 36,
      title: "Interviewing.io",
      author: "Interviewing.io Team",
      category: "technical",
      description: "Platform offering mock interviews with engineers from top companies, with real-time feedback and recordings. Covers coding and system design interviews.",
      link: "https://interviewing.io/",
      type: "Platform",
      tags: ["mock interviews", "expert feedback", "anonymous practice", "interview recordings"],
      difficulty: "Intermediate to Advanced",
      popularity: "High",
      isFree: false,
      language: ["Multiple Programming Languages"],
      lastUpdated: "Regularly"
    },
    {
      id: 37,
      title: "Interview Kickstart",
      author: "Interview Kickstart Team",
      category: "technical",
      description: "Comprehensive interview preparation program with structured curriculum, mock interviews, and coaching from FAANG engineers.",
      link: "https://www.interviewkickstart.com/",
      type: "Course",
      tags: ["structured preparation", "mock interviews", "comprehensive curriculum", "FAANG coaches"],
      difficulty: "Intermediate to Advanced",
      popularity: "High",
      isFree: false,
      language: ["Multiple Programming Languages"],
      lastUpdated: "Regularly"
    },
    {
      id: 38,
      title: "Big Interview",
      author: "Big Interview Team",
      category: "behavioral",
      description: "AI-powered interview preparation platform with customized practice interviews, answer analysis, and video recording for self-evaluation.",
      link: "https://biginterview.com/",
      type: "Platform",
      tags: ["AI practice", "answer evaluation", "video recording", "personalized feedback"],
      difficulty: "All Levels",
      popularity: "Medium",
      isFree: false,
      language: ["Concept-based"],
      lastUpdated: "Regularly"
    },
    {
      id: 39,
      title: "CodeInterview",
      author: "CodeInterview Team",
      category: "technical",
      description: "Platform for conducting live coding interviews with shared editor, video, and collaborative whiteboard. Useful for practice with peers.",
      link: "https://codeinterview.io/",
      type: "Platform",
      tags: ["collaborative coding", "whiteboarding", "peer practice", "interview simulation"],
      difficulty: "All Levels",
      popularity: "Medium",
      isFree: "Freemium",
      language: ["Multiple Programming Languages"],
      lastUpdated: "Regularly"
    },
    {
      id: 40,
      title: "Mock-It",
      author: "Mock-It Team",
      category: "technical",
      description: "Community platform for tech interview preparation, matching engineers for mock interviews in various technical domains.",
      link: "https://www.mock-it.com/",
      type: "Platform",
      tags: ["peer practice", "community feedback", "interview simulation", "technical preparation"],
      difficulty: "All Levels",
      popularity: "Low",
      isFree: true,
      language: ["Multiple Programming Languages"],
      lastUpdated: "Regularly"
    }
  ];

  // Filter resources based on active tab and search term
  const filteredResources = interviewResources.filter(resource => {
    const matchesCategory = activeTab === 'all' || resource.category === activeTab;
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Interview Preparation</h1>
          <p className="text-lg mt-2 opacity-90">
            Resources for technical and non-technical interview preparation
          </p>
        </div>
      </div>
      
      {/* Navigation Bar */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-purple-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search interview resources..."
                className="w-64 py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Interview Resources Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Interview Resources & Practice</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex-1">{resource.title}</h3>
                    <span className={`text-xs font-semibold py-1 px-2 rounded-full ${
                      resource.popularity === 'Very High' ? 'bg-purple-100 text-purple-800' :
                      resource.popularity === 'High' ? 'bg-blue-100 text-blue-800' :
                      resource.popularity === 'Medium' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {resource.popularity}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <span>{resource.author}</span>
                    <span className="mx-2">•</span>
                    <span className={`${
                      resource.type === 'Book' ? 'text-red-600' :
                      resource.type === 'Platform' ? 'text-blue-600' :
                      resource.type === 'Course' ? 'text-green-600' :
                      'text-purple-600'
                    } font-medium`}>
                      {resource.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 text-sm line-clamp-3">{resource.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags && resource.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs py-1 px-2 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-sm">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-gray-600">Difficulty: {resource.difficulty}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">
                        {typeof resource.isFree === 'boolean'
                          ? resource.isFree ? 'Free' : 'Paid'
                          : resource.isFree}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      <span className="text-gray-600">
                        {Array.isArray(resource.language)
                          ? resource.language.length > 1
                            ? `${resource.language[0]} & more`
                            : resource.language[0]
                          : resource.language}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">Updated: {resource.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
                  >
                    View Resource
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {filteredResources.length === 0 && (
            <div className="text-center py-10">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No resources found</h3>
              <p className="mt-1 text-sm text-gray-500">Try changing your search or category filter.</p>
            </div>
          )}
        </div>
        
        {/* Interview Tips Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Interview Success Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-700">For Technical Interviews</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Think aloud:</strong> Verbalize your thought process when solving problems. Interviewers value your approach as much as the solution.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Ask clarifying questions:</strong> Don't jump into coding immediately. Clarify requirements, constraints, and edge cases first.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Plan before coding:</strong> Sketch your approach, discuss trade-offs, and get interviewer validation before implementing.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Test your code:</strong> Don't wait for the interviewer to find bugs. Trace through your code with examples and edge cases.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Know your fundamentals:</strong> Be solid on data structures, algorithms, time/space complexity, and system design principles.</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-700">For Behavioral Interviews</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Use the STAR method:</strong> Structure answers with Situation, Task, Action, and Result to give complete, concise responses.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Prepare stories:</strong> Have 5-7 detailed examples ready that showcase different skills and situations from your experience.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Quantify impact:</strong> Use metrics and specific results whenever possible to demonstrate your contributions.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Research company values:</strong> Align your examples with the company's culture and core principles when possible.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Show growth mindset:</strong> Demonstrate how you've learned from failures and continuously improved.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3 text-purple-700">General Interview Preparation</h3>
            <div className="bg-purple-50 rounded-lg p-4">
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Research the company</strong> - Understand the business, products, culture, and recent news</li>
                <li><strong>Practice common questions</strong> - Both technical and behavioral, using mock interviews when possible</li>
                <li><strong>Prepare thoughtful questions</strong> - Have 3-5 insightful questions ready for interviewers</li>
                <li><strong>Test your tech setup</strong> - For virtual interviews, check audio, video, and required software</li>
                <li><strong>Review your resume</strong> - Be ready to discuss any item listed in detail</li>
                <li><strong>Dress appropriately</strong> - Match or slightly exceed the company's dress code</li>
                <li><strong>Plan your arrival</strong> - Map the route, arrive 10-15 minutes early</li>
                <li><strong>Practice your introduction</strong> - Have a clear, concise "tell me about yourself" response</li>
                <li><strong>Follow up</strong> - Send a thank-you email within 24 hours</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interviews;
