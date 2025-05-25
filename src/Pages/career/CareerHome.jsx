// src/Pages/career/CareerHome.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Constants
const FEATURES = [
  {
    title: "AI Career Recommendations",
    description: "Get personalized career paths with match percentages based on Claude AI analysis of your complete profile",
    color: "from-lime-500 to-green-600",
    icon: "🤖"
  },
  {
    title: "Personalized Roadmaps",
    description: "AI-generated phase-by-phase career transition plans with specific timelines and milestones",
    color: "from-green-500 to-emerald-500",
    icon: "🗺️"
  },
  {
    title: "Market Intelligence",
    description: "Real-time salary data, job market trends, and demand analysis powered by AI for your target careers",
    color: "from-blue-500 to-purple-600",
    icon: "📊"
  },
  {
    title: "Learning Plans",
    description: "Comprehensive learning paths with specific courses, certifications, and practice projects",
    color: "from-purple-500 to-blue-600",
    icon: "📚"
  },
  {
    title: "Interview Preparation",
    description: "Career-specific interview questions with sample answers, including technical and behavioral questions",
    color: "from-emerald-500 to-green-600",
    icon: "💬"
  },
  {
    title: "Downloadable Reports",
    description: "Professional PDF downloads of all AI-generated content for offline reference and sharing",
    color: "from-gray-600 to-gray-800",
    icon: "📄"
  }
];

// Updated platform features to match actual sections
const PLATFORM_FEATURES = [
  {
    title: "AI-Powered Dashboard",
    description: "Comprehensive overview with AI-generated career recommendations, personalized roadmaps, and market insights",
    color: "bg-lime-100 text-lime-700",
    features: ["Career match percentages", "Timeline tracking", "Progress monitoring", "AI insights"]
  },
  {
    title: "Learning Resources Hub",
    description: "Curated courses, certifications, and practice projects specifically matched to your career transition goals",
    color: "bg-green-100 text-green-700",
    features: ["Skill-specific courses", "Certification paths", "Practice projects", "Community resources"]
  },
  {
    title: "Interview Mastery Suite",
    description: "Complete interview preparation with technical, behavioral, and career-transition specific questions",
    color: "bg-emerald-100 text-emerald-700",
    features: ["Technical questions", "Behavioral prep", "Sample answers", "Common mistakes guide"]
  },
  {
    title: "Career Development Guide",
    description: "Expert guidance on learning to code, skill development, networking strategies, and career planning",
    color: "bg-yellow-100 text-yellow-700",
    features: ["Learning strategies", "Networking tips", "Portfolio guidance", "Mentorship resources"]
  }
];

// Updated process steps to reflect AI-powered analysis
const PROCESS_STEPS = [
  {
    step: "1",
    title: "Complete Assessment",
    description: "Comprehensive questionnaire covering your education, experience, skills, and career aspirations",
    animationDelay: "delay-0",
    icon: "📝"
  },
  {
    step: "2",
    title: "AI Analysis",
    description: "Claude AI analyzes 50+ factors from your profile to identify optimal career matches and transition paths",
    animationDelay: "delay-100",
    icon: "🤖"
  },
  {
    step: "3",
    title: "Personalized Results",
    description: "Receive detailed recommendations with match scores, learning plans, and market insights",
    animationDelay: "delay-200",
    icon: "📊"
  },
  {
    step: "4",
    title: "Full Platform Access",
    description: "Access comprehensive resources including learning materials, interview prep, and career guidance",
    animationDelay: "delay-300",
    icon: "🚀"
  }
];

const FAQs = [
  {
    question: "How does the AI analysis work?",
    answer: "Our system uses Claude AI to analyze your complete profile including education, experience, skills, and goals. It compares this against thousands of successful career transitions to provide personalized recommendations with match scores."
  },
  {
    question: "What makes this different from other career assessments?",
    answer: "Unlike generic tests, our AI creates fully personalized content including specific learning plans, interview questions for your target role, market salary data, and downloadable PDF reports. You get actionable next steps, not just general advice."
  },
  {
    question: "How long does the assessment take?",
    answer: "The initial assessment takes 15-20 minutes, but the AI continues generating personalized content throughout your 30-day access period, including roadmaps, learning plans, and interview preparation materials."
  },
  {
    question: "What if I don't have any tech experience?",
    answer: "Perfect! Our AI specializes in identifying transferable skills from any background. Many successful users started with zero tech experience and used our personalized transition plans to break into the industry."
  },
  {
    question: "Can I download my results?",
    answer: "Yes! All AI-generated content can be downloaded as professional PDF reports, including your career recommendations, learning plan, interview questions, and market insights."
  },
  {
    question: "What ongoing support do I get?",
    answer: "During your 30-day access, you can generate new AI content, access our comprehensive learning resources, interview preparation tools, career development guides, and mentorship resources."
  }
];

// Updated testimonials to reflect AI-powered features
const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Marketing → Data Analyst",
    initial: "SM",
    color: "lime",
    quote: "The AI-generated learning plan was incredible. It identified exactly which Python courses I needed and even suggested specific projects to build my portfolio. I landed my first data analyst role in 8 months!"
  },
  {
    name: "Michael R.",
    role: "Teacher → Software Developer",
    initial: "MR",
    color: "green",
    quote: "The interview preparation was game-changing. The AI generated technical questions specific to frontend development roles, complete with sample answers. I felt confident in every interview."
  },
  {
    name: "Jennifer L.",
    role: "Finance → Product Manager",
    initial: "JL",
    color: "emerald",
    quote: "What impressed me most was the market insights. The AI showed me exactly which PM skills were in highest demand and the salary ranges I could expect. The roadmap was spot-on."
  }
];

// Component
const CareerHome = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/Images/512X512.png" 
                  alt="Favored Online Logo" 
                  className="w-8 h-8 mr-2"
                />
                <span className="text-xl font-bold text-gray-800">Favored Online</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-lime-600 font-medium transition-colors border-b-2 border-lime-600">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-lime-600 font-medium transition-colors">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-lime-600 font-medium transition-colors">Contact</Link>
              
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {currentUser.photoURL && (
                      <img src={currentUser.photoURL} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                    )}
                    <span className="text-sm text-gray-600">{currentUser.displayName || currentUser.email}</span>
                  </div>
                  {isAuthorized && (
                    <Link 
                      to="/career/dashboard" 
                      className="bg-lime-100 hover:bg-lime-200 text-lime-800 px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => navigate('/logout')} 
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => navigate('/login')} 
                  className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center"
                >
                  <span className="mr-2">G</span>
                  Login with Google
                </button>
              )}
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="text-gray-700 hover:text-lime-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 pb-3 border-t border-gray-200">
              <div className="flex flex-col space-y-3 mt-3">
                <Link to="/" className="text-lime-600 font-medium transition-colors">Home</Link>
                <Link to="/about" className="text-gray-700 hover:text-lime-600 font-medium transition-colors">About</Link>
                <Link to="/contact" className="text-gray-700 hover:text-lime-600 font-medium transition-colors">Contact</Link>
                
                {currentUser ? (
                  <div className="flex flex-col space-y-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center">
                      {currentUser.photoURL && (
                        <img src={currentUser.photoURL} alt="Profile" className="w-6 h-6 rounded-full mr-2" />
                      )}
                      <span className="text-sm text-gray-600">{currentUser.displayName || currentUser.email}</span>
                    </div>
                    {isAuthorized && (
                      <Link 
                        to="/career/dashboard" 
                        className="bg-lime-100 hover:bg-lime-200 text-lime-800 px-4 py-2 rounded-lg text-sm transition-colors text-center"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={() => navigate('/logout')} 
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm transition-colors w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => navigate('/login')} 
                    className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center"
                  >
                    <span className="mr-2">G</span>
                    Login with Google
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Hero Section */}
        <section 
          className={`relative mb-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          aria-label="Hero section"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-green-600 rounded-3xl transform rotate-1 opacity-90 animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-lime-500 rounded-3xl transform -rotate-1 opacity-90 animate-pulse-slow"></div>
          <div className="relative bg-gradient-to-r from-lime-500 via-green-500 to-emerald-600 rounded-3xl p-8 md:p-16 text-white shadow-2xl backdrop-blur-sm">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-lime-100 uppercase tracking-wider text-sm font-medium">🤖 Claude AI-Powered Career Intelligence</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Discover Your Perfect
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-lime-200">
                  Tech Career Path
                </span>
              </h1>
              <p className="text-lg md:text-xl mb-10 text-lime-100 max-w-3xl">
                Get comprehensive AI analysis with personalized career recommendations, learning roadmaps, 
                interview preparation, and downloadable reports - all powered by advanced AI technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartTest}
                  className="bg-white text-lime-600 px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg hover:bg-gradient-to-r hover:from-white hover:to-lime-50 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center group"
                  aria-label="Start your AI career assessment"
                >
                  {currentUser ? "Continue AI Assessment" : "Start AI Assessment"}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button
                  onClick={handleViewPlatformFeatures}
                  className="bg-transparent border-2 border-white text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg hover:bg-white hover:text-lime-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
                  aria-label="Explore AI-powered features"
                >
                  Explore AI Features
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="mb-16 text-center">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <span className="text-gray-600">AI-Powered Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📄</span>
              <span className="text-gray-600">PDF Downloads</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💬</span>
              <span className="text-gray-600">Interview Prep</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📚</span>
              <span className="text-gray-600">Learning Resources</span>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="mb-20" aria-label="AI-powered features">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">AI-Powered Career Analysis</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
            Our Claude AI technology provides comprehensive career analysis with personalized recommendations and actionable insights
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
        <section ref={sampleResultsRef} className="mb-20" aria-label="AI-generated sample results">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">AI-Generated Results Preview</h2>
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-4 text-lime-600 flex items-center">
                  <span className="mr-2">🤖</span>AI Career Matches
                </h3>
                <div className="space-y-3">
                  {[
                    { title: "Data Analyst", match: 92, color: "green", salary: "$75k - $120k", timeline: "6-9 months" },
                    { title: "Frontend Developer", match: 85, color: "lime", salary: "$80k - $130k", timeline: "8-12 months" },
                    { title: "Product Manager", match: 78, color: "yellow", salary: "$90k - $150k", timeline: "10-14 months" }
                  ].map((career, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold">{career.title}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 bg-${career.color}-500 rounded-full transition-all duration-1000`} 
                              style={{ width: `${career.match}%` }}
                            ></div>
                          </div>
                          <span className={`font-bold text-${career.color}-600`}>{career.match}%</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 grid grid-cols-2 gap-2">
                        <span>💰 {career.salary}</span>
                        <span>⏱️ {career.timeline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-4 text-lime-600 flex items-center">
                  <span className="mr-2">📋</span>AI Learning Plan
                </h3>
                <div className="space-y-3">
                  {[
                    { phase: "Phase 1: Foundation", duration: "Month 1-2", skills: "Python basics, SQL fundamentals" },
                    { phase: "Phase 2: Core Skills", duration: "Month 3-4", skills: "Data analysis, Pandas, NumPy" },
                    { phase: "Phase 3: Advanced", duration: "Month 5-6", skills: "Machine Learning, Visualization" },
                    { phase: "Phase 4: Portfolio", duration: "Month 7-8", skills: "Real projects, GitHub portfolio" }
                  ].map((phase, index) => (
                    <div key={index} className="p-3 bg-gradient-to-r from-green-50 to-lime-50 rounded-lg border-l-4 border-green-500">
                      <div className="font-semibold text-gray-800">{phase.phase}</div>
                      <div className="text-sm text-green-600 font-medium">{phase.duration}</div>
                      <div className="text-sm text-gray-600">{phase.skills}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-700 font-medium flex items-center">
                <span className="text-lg mr-2">🤖</span>
                <span><strong>AI-Generated:</strong> Complete assessment to get your personalized career roadmap with downloadable PDF reports</span>
              </p>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section ref={platformFeaturesRef} className="mb-20" aria-label="Platform features">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Complete Career Transition Platform</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {PLATFORM_FEATURES.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${feature.color}`}>
                  AI-Powered
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section - Updated */}
        <section className="mb-20 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-lime-400 to-green-500 text-white px-8 py-2 transform rotate-45 translate-x-10 translate-y-3">
              🤖 AI-Powered
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Complete AI Career Analysis</h2>
            <p className="text-gray-600 mb-8">Comprehensive AI-powered career transition platform with 30-day access</p>
            
            <div className="flex justify-center items-center mb-6">
              <span className="text-gray-400 line-through text-2xl mr-4">$99</span>
              <span className="text-4xl font-bold text-lime-600">$60</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-bold text-lg mb-3 text-gray-800">🤖 AI-Generated Content</h4>
                <ul className="text-left space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Personalized career recommendations with match scores</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Custom learning roadmaps with specific timelines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Market insights with salary data and trends</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Career-specific interview questions with answers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Professional PDF downloads of all content</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3 text-gray-800">📚 Platform Resources</h4>
                <ul className="text-left space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Comprehensive learning resource library</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Interview preparation tools and guides</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Career development strategy guides</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Portfolio building and project guidance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Mentorship and networking resources</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <button
              onClick={handleStartTest}
              className="bg-gradient-to-r from-lime-500 to-green-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:from-lime-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
              aria-label="Begin your AI career assessment"
            >
              {currentUser ? "Continue AI Assessment" : "Start AI Assessment"}
            </button>
            
            <p className="mt-4 text-sm text-gray-500">🛡️ 7-day satisfaction guarantee</p>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20" aria-label="How our AI process works">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">How Our AI Analysis Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {PROCESS_STEPS.map((item, index) => (
                <article 
                  key={index} 
                  className={`text-center transition-all duration-700 ${isVisible ? 'animate-fade-up' : 'opacity-0'} ${item.animationDelay}`}
                >
                  <div className="bg-gradient-to-br from-lime-500 to-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold transform hover:rotate-12 transition-transform">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="text-3xl transform hover:scale-110 transition-transform">{item.icon}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories - Updated */}
        <section className="mb-20 bg-gray-50 py-12 rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">AI-Powered Success Stories</h2>
          <p className="text-center text-gray-600 mb-10">Real career transitions powered by our AI recommendations</p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-${testimonial.color}-100 rounded-full flex items-center justify-center text-${testimonial.color}-600 font-bold`}>
                    {testimonial.initial}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700">"{testimonial.quote}"</p>
                <div className="mt-3 flex items-center text-sm text-purple-600">
                  <span className="mr-1">🤖</span>
                  <span>AI-Powered Results</span>
                </div>
              </div>
            ))}
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
        <section className="relative" aria-label="Final call to action">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-lime-500 rounded-3xl blur-xl opacity-70"></div>
          <div className="relative bg-gradient-to-r from-green-500 to-lime-500 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
            <div className="text-4xl mb-4">🤖</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for AI-Powered Career Analysis?</h2>
            <p className="mb-10 text-lg md:text-xl text-green-100 max-w-3xl mx-auto">
              Get comprehensive AI analysis with personalized recommendations, learning plans, interview prep, and downloadable reports.
            </p>
            <button
              onClick={handleStartTest}
              className="bg-white text-green-600 px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg hover:bg-gradient-to-r hover:from-white hover:to-green-50 transform hover:scale-105 transition-all duration-300 shadow-xl"
              aria-label="Begin your AI career assessment"
            >
              {currentUser ? "Continue AI Assessment" : "Start AI Assessment"}
            </button>
            <p className="mt-8 text-sm text-green-200">
              Join professionals who've successfully transitioned with AI-powered insights
            </p>
          </div>
        </section>
      </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <img 
              src="/Images/512X512.png" 
              alt="Favored Online Logo" 
              className="w-8 h-8 mr-2"
            />
            <span className="text-xl font-bold">Favored Online</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Favored Online. All rights reserved. Powered by Claude AI.
          </p>
        </div>
      </footer>

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
