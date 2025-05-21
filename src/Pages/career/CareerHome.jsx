// src/Pages/career/CareerHome.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Constants
const FEATURES = [
  {
    title: "Career Path Recommendations",
    description: "Get matched with ideal tech careers based on your profile, with match percentages and timeline estimates",
    icon: "🎯",
    color: "from-red-500 to-orange-500"
  },
  {
    title: "Strengths Analysis",
    description: "Detailed breakdown of your transferable skills and how they apply to tech roles",
    icon: "💪",
    color: "from-green-500 to-teal-500"
  },
  {
    title: "Skills Gap Analysis",
    description: "Identify exact technical skills you need to develop for your target career path",
    icon: "📊",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Learning Roadmap",
    description: "Month-by-month plan with specific courses and projects to build your skills",
    icon: "🗺️",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Transition Strategy",
    description: "Practical steps to move from your current role to your target tech position",
    icon: "🚀",
    color: "from-indigo-500 to-purple-500"
  },
  {
    title: "Export Results",
    description: "Download your complete career analysis as a PDF for future reference",
    icon: "📄",
    color: "from-gray-600 to-gray-800"
  }
];

// New section to showcase platform features
const PLATFORM_FEATURES = [
  {
    title: "Personalized Dashboard",
    description: "Track your tech career journey with a comprehensive overview of your profile, skills, and recommended next steps",
    icon: "📊",
    color: "bg-blue-100 text-blue-600",
    image: "/images/dashboard-preview.png",
    path: "/career/dashboard"
  },
  {
    title: "Curated Learning Resources",
    description: "Access top-rated courses and certifications matched to your specific career path and skill gaps",
    icon: "📚",
    color: "bg-green-100 text-green-600",
    image: "/images/learning-preview.png",
    path: "/career/learning"
  },
  {
    title: "Interview Preparation",
    description: "Prepare for technical, behavioral, and coding interviews with our comprehensive resources and practice tools",
    icon: "💬",
    color: "bg-purple-100 text-purple-600",
    image: "/images/interviews-preview.png",
    path: "/career/interviews"
  },
  {
    title: "Career Development Guide",
    description: "Navigate your tech career with expert advice on learning to code, becoming an expert, and strategic career planning",
    icon: "📋",
    color: "bg-teal-100 text-teal-600",
    image: "/images/guide-preview.png",
    path: "/career/guide"
  }
];

// Top courses showcase section
const TOP_COURSES = [
  {
    title: "The Web Developer Bootcamp",
    provider: "Udemy",
    instructor: "Colt Steele",
    rating: "4.7",
    image: "/images/web-dev-bootcamp.jpg"
  },
  {
    title: "The Complete JavaScript Course",
    provider: "Udemy",
    instructor: "Jonas Schmedtmann",
    rating: "4.8",
    image: "/images/js-course.jpg"
  },
  {
    title: "CS50: Introduction to Computer Science",
    provider: "Harvard (edX)",
    instructor: "David J. Malan",
    rating: "4.9",
    image: "/images/cs50-course.jpg"
  }
];

const PROCESS_STEPS = [
  {
    step: "1",
    title: "Complete Assessment",
    description: "Answer questions about your education, experience, skills, and career goals",
    icon: "📝",
    animationDelay: "delay-0"
  },
  {
    step: "2",
    title: "AI Analysis",
    description: "Our AI analyzes your profile to identify the best career matches and learning paths",
    icon: "🤖",
    animationDelay: "delay-100"
  },
  {
    step: "3",
    title: "Get Your Results",
    description: "Receive comprehensive career recommendations with actionable next steps",
    icon: "📊",
    animationDelay: "delay-200"
  },
  {
    step: "4",
    title: "Access Platform Tools",
    description: "Explore learning resources, interview prep, and our comprehensive career guide",
    icon: "🛠️",
    animationDelay: "delay-300"
  }
];

const FAQs = [
  {
    question: "How long does the assessment take?",
    answer: "The assessment typically takes 15-20 minutes to complete. We recommend setting aside uninterrupted time to thoughtfully answer each question."
  },
  {
    question: "What if I don't have any tech experience?",
    answer: "That's perfectly fine! Our AI is designed to identify transferable skills from any background and recommend career paths with realistic transition plans."
  },
  {
    question: "How accurate are the recommendations?",
    answer: "Our recommendations are based on analysis of thousands of successful career transitions. While individual results vary, most users find our suggestions highly relevant."
  },
  {
    question: "Can I retake the assessment?",
    answer: "Yes, you can retake the assessment anytime to update your profile or explore different career options."
  },
  {
    question: "What resources are available after I get my results?",
    answer: "You'll gain access to our full platform which includes a comprehensive dashboard, curated learning resources, interview preparation tools, and a detailed career development guide."
  }
];

// Component
const CareerHome = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const sampleResultsRef = useRef(null);
  const platformFeaturesRef = useRef(null);
  const { currentUser, isAuthorized } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStartTest = () => {
    if (currentUser) {
      if (isAuthorized) {
        navigate('/career/test');
      } else {
        navigate('/payment');
      }
    } else {
      navigate('/payment');
    }
  };

  const handleViewSampleResults = () => {
    sampleResultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleViewPlatformFeatures = () => {
    platformFeaturesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navigateToFeature = (path) => {
    if (currentUser && isAuthorized) {
      navigate(path);
    } else {
      navigate('/payment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Optional: You can add a small auth status indicator here */}
      {currentUser && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md text-sm flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span>Signed in as {currentUser.displayName || currentUser.email}</span>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Hero Section */}
        <section 
          className={`relative mb-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          aria-label="Hero section"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl transform rotate-1 opacity-90 animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl transform -rotate-1 opacity-90 animate-pulse-slow"></div>
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-16 text-white shadow-2xl backdrop-blur-sm">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-indigo-100 uppercase tracking-wider text-sm font-medium">AI-Powered Career Intelligence</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Discover Your Tech
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                  Career Path
                </span>
              </h1>
              <p className="text-lg md:text-xl mb-10 text-indigo-100 max-w-2xl">
                Get comprehensive AI-powered analysis of your career options with personalized recommendations, skills gap analysis, and learning roadmap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartTest}
                  className="bg-white text-indigo-600 px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg hover:bg-gradient-to-r hover:from-white hover:to-indigo-50 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center group"
                  aria-label="Start your career assessment"
                >
                  {currentUser ? "Continue Your Assessment" : "Start Your Assessment"}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button
                  onClick={handleViewPlatformFeatures}
                  className="bg-transparent border-2 border-white text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
                  aria-label="Explore platform features"
                >
                  Explore Platform Features
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="mb-16 text-center">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔒</span>
              <span className="text-gray-600">Privacy Protected</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <span className="text-gray-600">Instant Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span className="text-gray-600">Science-Based</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💯</span>
              <span className="text-gray-600">Comprehensive Platform</span>
            </div>
          </div>
        </section>

        {/* Platform Features Section */}
        <section ref={platformFeaturesRef} className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">Complete Career Development Platform</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
            Beyond assessment results, access our comprehensive suite of tools designed to support every aspect of your tech career journey
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {PLATFORM_FEATURES.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => navigateToFeature(feature.path)}
              >
                <div className="relative h-44 bg-gradient-to-r from-indigo-50 to-purple-50 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center text-3xl`}>
                    {feature.icon}
                  </div>
                  
                  {/* We'll use placeholder design elements instead of actual images */}
                  <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                      <div className={`text-8xl opacity-20 ${feature.color}`}>{feature.icon}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex justify-end">
                    <span className="text-indigo-600 font-medium flex items-center">
                      Explore 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Learning Resources Preview */}
        <section className="mb-20 bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">Featured Learning Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {TOP_COURSES.map((course, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
                  <div className="text-4xl">{index === 0 ? "💻" : index === 1 ? "🔄" : "🎓"}</div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{course.title}</h3>
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">{course.rating} ★</span>
                  </div>
                  <div className="text-gray-500 text-sm mb-3">{course.provider} • {course.instructor}</div>
                  <button 
                    onClick={() => navigateToFeature('/career/learning')}
                    className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium py-2 rounded-lg transition-colors text-sm"
                  >
                    View in Learning Resources →
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => navigateToFeature('/career/learning')}
              className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center justify-center mx-auto"
            >
              View All Learning Resources
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </section>

        {/* Success Stats */}
        <section className="mb-20 py-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl font-bold text-indigo-600 mb-2">35%</div>
              <p className="text-gray-700">Faster transition to tech roles compared to self-guided paths</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                <span className="text-2xl">$</span>65K-160K
              </div>
              <p className="text-gray-700">Salary range of recommended career paths</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl font-bold text-indigo-600 mb-2">0.1%</div>
              <p className="text-gray-700">Investment of your potential first-year tech salary</p>
            </div>
          </div>
        </section>

        {/* Interview Resources Preview */}
        <section className="mb-20 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-8 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Ace Your Technical Interviews</h2>
              <p className="text-gray-600 max-w-2xl">Comprehensive resources and practice tools for technical, behavioral, and coding interviews</p>
            </div>
            <button 
              onClick={() => navigateToFeature('/career/interviews')}
              className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium flex items-center shadow-md"
            >
              <span>Explore Interview Resources</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold mr-3">LC</div>
                <h3 className="font-bold">LeetCode</h3>
                <span className="ml-auto text-xs font-medium text-purple-600 px-2 py-1 bg-purple-50 rounded-full">Very High</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Platform with over 2,000 coding problems, community discussions, and interview preparation resources.</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-gray-100 rounded-full">Algorithms</span>
                <span className="px-2 py-1 bg-gray-100 rounded-full">Data Structures</span>
                <span className="px-2 py-1 bg-gray-100 rounded-full">Problem Solving</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">SD</div>
                <h3 className="font-bold">System Design</h3>
                <span className="ml-auto text-xs font-medium text-blue-600 px-2 py-1 bg-blue-50 rounded-full">High</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Guide on how to approach system design interviews, with detailed examples and best practices.</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-gray-100 rounded-full">System Design</span>
                <span className="px-2 py-1 bg-gray-100 rounded-full">Architecture</span>
                <span className="px-2 py-1 bg-gray-100 rounded-full">Scalability</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold mr-3">BI</div>
                <h3 className="font-bold">Behavioral Interviews</h3>
                <span className="ml-auto text-xs font-medium text-green-600 px-2 py-1 bg-green-50 rounded-full">Medium</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Comprehensive preparation guide for behavioral questions, with STAR method examples and practice scenarios.</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-gray-100 rounded-full">Soft Skills</span>
                <span className="px-2 py-1 bg-gray-100 rounded-full">STAR Method</span>
                <span className="px-2 py-1 bg-gray-100 rounded-full">Communication</span>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="mb-20 bg-gray-50 py-12 rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">Success Stories</h2>
          <p className="text-center text-gray-600 mb-10">Join thousands who have successfully transitioned to tech careers</p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">IO</div>
                <div className="ml-4">
                  <div className="font-bold">Isaac O.</div>
                  <div className="text-sm text-gray-500">Design & Tech Ops Coordinator</div>
                </div>
              </div>
              <p className="text-gray-700">"The personalized learning roadmap was incredibly detailed. It broke down complex tech concepts into manageable monthly goals that fit my schedule."</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">TA</div>
                <div className="ml-4">
                  <div className="font-bold">Temitope A.</div>
                  <div className="text-sm text-gray-500">Project Manager</div>
                </div>
              </div>
              <p className="text-gray-700">"The skills gap analysis was eye-opening. It identified exactly which technical skills I needed to focus on and which of my existing abilities were most valuable."</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">OO</div>
                <div className="ml-4">
                  <div className="font-bold">Oyebolade O.</div>
                  <div className="text-sm text-gray-500">Technical Program Manager</div>
                </div>
              </div>
              <p className="text-gray-700">"What impressed me most was the networking strategy and personal branding sections. The actionable advice helped me position my experience for tech roles effectively."</p>
            </div>
          </div>
        </section>

        {/* Career Guide Preview */}
        <section className="mb-20 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Comprehensive Career Development Guide</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">Navigate your career in technology with expert advice on learning, growth, and strategic career planning.</p>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
              <div className="text-2xl mb-2">👨‍💻</div>
              <h3 className="font-medium text-sm">Learning to Code</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
              <div className="text-2xl mb-2">⭐</div>
              <h3 className="font-medium text-sm">Becoming an Expert</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-medium text-sm">Career Development</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="font-medium text-sm">Tech Companies</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="font-medium text-sm">Staying Relevant</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-medium text-sm">Company Choice Impact</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="text-4xl mr-4 opacity-50">❝</div>
              <div>
                <p className="italic text-gray-700 mb-4">
                  "Don't compare yourself with others. The only person you should try to be better than is who you were yesterday."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold mr-3">QL</div>
                  <div>
                    <div className="font-medium">Quincy Larson</div>
                    <div className="text-sm text-gray-500">Founder, freeCodeCamp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => navigateToFeature('/career/guide')}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-bold shadow-md transition-colors"
            >
              Explore Career Guide
            </button>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="mb-20" aria-label="Features">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">What You Get</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
            Our comprehensive career assessment provides everything you need to make an informed career transition
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((feature, index) => (
              <article 
                key={index} 
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`text-4xl mb-4 transform group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.color} transition-all duration-500 mt-4 rounded-full`}></div>
              </article>
            ))}
          </div>
        </section>

        {/* Sample Results Preview */}
        <section ref={sampleResultsRef} className="mb-20" aria-label="Sample results">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">What Your Results Look Like</h2>
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-4 text-indigo-600">Career Matches</h3>
                <div className="space-y-3">
                  {[
                    { title: "Data Analyst", match: 85, color: "green" },
                    { title: "AI Research Assistant", match: 70, color: "blue" },
                    { title: "Technical Writer", match: 65, color: "yellow" }
                  ].map((career, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <span>{career.title}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 bg-${career.color}-500 rounded-full transition-all duration-1000`} 
                            style={{ width: `${career.match}%` }}
                          ></div>
                        </div>
                        <span className={`font-bold text-${career.color}-600`}>{career.match}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-4 text-indigo-600">Your Strengths</h3>
                <ul className="space-y-2">
                  {[
                    "Strong analytical skills",
                    "Computer Science background",
                    "Project management experience",
                    "Excellent communication abilities",
                    "Problem-solving mindset"
                  ].map((strength, index) => (
                    <li key={index} className="flex items-center group">
                      <span className="text-green-500 mr-2 transform group-hover:scale-110 transition-transform">✓</span>
                      <span className="group-hover:text-indigo-600 transition-colors">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-700 font-medium">
                <span className="font-bold">Next Step:</span> Complete the full assessment to get your personalized career roadmap
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-20 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-2 transform rotate-45 translate-x-10 translate-y-3">
              Limited Time Offer
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Career Transition Analysis</h2>
            <p className="text-gray-600 mb-8">Complete access to your personalized career roadmap for 30 days</p>
            
            <div className="flex justify-center items-center mb-6">
              <span className="text-gray-400 line-through text-2xl mr-4">$79</span>
              <span className="text-4xl font-bold text-indigo-600">$60</span>
            </div>
            
            <ul className="text-left max-w-md mx-auto mb-8 space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Complete career path recommendations</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Personalized skills gap analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Custom learning roadmap</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Networking & interview preparation strategies</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Downloadable PDF report</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Full access to learning resources & guides</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Interview preparation tools & resources</span>
              </li>
            </ul>
            
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-2">Special offer ends in:</div>
              <div className="flex justify-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg w-16">
                  <div className="text-xl font-bold">13</div>
                  <div className="text-xs text-gray-500">Days</div>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg w-16">
                  <div className="text-xl font-bold">07</div>
                  <div className="text-xs text-gray-500">Hours</div>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg w-16">
                  <div className="text-xl font-bold">32</div>
                  <div className="text-xs text-gray-500">Minutes</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleStartTest}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
              aria-label="Begin your career assessment"
            >
              {currentUser ? "Continue Your Assessment" : "Start Your Assessment"}
            </button>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20" aria-label="Process">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {PROCESS_STEPS.map((item, index) => (
                <article 
                  key={index} 
                  className={`text-center transition-all duration-700 ${isVisible ? 'animate-fade-up' : 'opacity-0'} ${item.animationDelay}`}
                >
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold transform hover:rotate-12 transition-transform">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <div className="text-3xl mt-4 transform hover:scale-110 transition-transform">{item.icon}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Value Comparison */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Why Choose Our Analysis</h2>
          
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-3">
              <div className="p-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
                <h3 className="text-xl font-bold mb-4">Our AI Career Analysis</h3>
                <div className="text-3xl font-bold mb-4">$60</div>
                <p className="mb-6 text-indigo-100">One-time payment for 30-day access</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-300 mr-2">✓</span>
                    <span>Personalized to your skills & background</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-300 mr-2">✓</span>
                    <span>Specific learning roadmap with timeline</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-300 mr-2">✓</span>
                    <span>Current market data on salary & demand</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-300 mr-2">✓</span>
                    <span>Complete transition strategy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-300 mr-2">✓</span>
                    <span>Downloadable PDF report</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-300 mr-2">✓</span>
                    <span>Full platform access with learning resources</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-300 mr-2">✓</span>
                    <span>Interview preparation tools & guides</span>
                  </li>
                </ul>
              </div>
              
              <div className="col-span-2 grid grid-cols-2">
                <div className="p-8 border-b md:border-r">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Career Coach</h3>
                  <div className="text-3xl font-bold mb-4 text-gray-700">$150-300</div>
                  <p className="mb-6 text-gray-500">Per hour session</p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">✓</span>
                      <span>Personalized advice</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      <span>No detailed learning paths</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      <span>Limited market data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      <span>Multiple sessions needed ($$$)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      <span>No integrated learning resources</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-8 border-b">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Generic Assessments</h3>
                  <div className="text-3xl font-bold mb-4 text-gray-700">$0-30</div>
                  <p className="mb-6 text-gray-500">Basic assessment</p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      <span>Generic recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      <span>No specific learning path</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      <span>No skills gap analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      <span>No transition strategy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      <span>No additional career resources</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Reversal */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="text-4xl mr-6 text-green-500 mb-4 md:mb-0">🛡️</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Satisfaction Guarantee</h3>
                <p className="text-gray-700">
                  If you don't feel our analysis provides actionable insights for your career transition, 
                  contact us within 7 days for a full refund. We're confident our assessment will 
                  deliver significant value to your career planning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Credentials */}
        <section className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">The Science Behind Our Analysis</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4 text-indigo-600">💾</div>
                <h3 className="font-bold mb-2">Data-Driven</h3>
                <p className="text-gray-600">Trained on thousands of successful tech career transitions</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4 text-indigo-600">👨‍💼</div>
                <h3 className="font-bold mb-2">Expert Developed</h3>
                <p className="text-gray-600">Created by tech industry leaders and career coaches</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4 text-indigo-600">🔄</div>
                <h3 className="font-bold mb-2">Regularly Updated</h3>
                <p className="text-gray-600">Constantly refreshed with latest market trends and salary data</p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-700 text-center">
                Our AI analyzes 50+ factors from your background to create a truly personalized transition plan
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20" aria-label="Frequently asked questions">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {FAQs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className="w-full text-left p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  aria-expanded={expandedFAQ === index}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-800">{faq.question}</h3>
                    <span className={`transform transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`}>
                      ⌄
                    </span>
                  </div>
                  {expandedFAQ === index && (
                    <p className="mt-4 text-gray-600">{faq.answer}</p>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative" aria-label="Call to action">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-70"></div>
          <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Tech Career Path?</h2>
            <p className="mb-10 text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Take our comprehensive assessment and get personalized recommendations for your tech career transition.
            </p>
            <button
              onClick={handleStartTest}
              className="bg-white text-purple-600 px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg hover:bg-gradient-to-r hover:from-white hover:to-purple-50 transform hover:scale-105 transition-all duration-300 shadow-xl"
              aria-label="Begin your career assessment"
            >
              {currentUser ? "Continue Your Assessment" : "Begin Your Assessment"}
            </button>
            <p className="mt-8 text-sm text-purple-200">
              Join the professionals who've successfully transitioned to tech careers
            </p>
          </div>
        </section>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-up {
          animation: fade-up 0.6s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .delay-0 {
          animation-delay: 0ms;
        }
        
        .delay-100 {
          animation-delay: 100ms;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
};

export default CareerHome;
