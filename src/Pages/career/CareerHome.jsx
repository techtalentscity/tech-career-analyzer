// src/Pages/career/CareerHome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CareerHome = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/career/test');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="relative mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl transform rotate-1 opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl transform -rotate-1 opacity-90"></div>
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-16 text-white shadow-2xl backdrop-blur-sm">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-indigo-100 uppercase tracking-wider text-sm font-medium">AI-Powered Career Intelligence</span>
              </div>
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Unlock Your Tech
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                  Career Potential
                </span>
              </h1>
              <p className="text-xl mb-10 text-indigo-100 max-w-2xl">
                Leverage cutting-edge AI technology to discover personalized tech career paths aligned with your unique skills, interests, and ambitions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartTest}
                  className="bg-white text-indigo-600 px-12 py-5 rounded-full font-bold text-lg hover:bg-gradient-to-r hover:from-white hover:to-indigo-50 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center group"
                >
                  Begin Your Journey
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-5 rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  View Sample Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mb-20">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800">50K+</div>
              <div className="text-gray-600">Professionals Assessed</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800">4.9★</div>
              <div className="text-gray-600">User Rating</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* How It Works */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 border border-indigo-100">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
              <span className="text-4xl mr-3">🚀</span>
              Your Journey to Success
            </h2>
            <div className="space-y-8">
              {[
                {
                  title: "Intelligent Assessment",
                  description: "Complete our scientifically-designed questionnaire that evaluates your interests, skills, and career aspirations.",
                  icon: "💡"
                },
                {
                  title: "Advanced AI Analysis",
                  description: "Our proprietary AI engine processes your responses using machine learning to identify optimal career matches.",
                  icon: "🧬"
                },
                {
                  title: "Personalized Roadmap",
                  description: "Receive a comprehensive career strategy including skill development plans and curated learning resources.",
                  icon: "🗺️"
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start group hover:transform hover:translate-x-2 transition-transform duration-200">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl w-14 h-14 flex items-center justify-center mr-5 flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-xl mb-2 text-gray-800">{step.title}</p>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  <div className="text-3xl ml-4 opacity-80">{step.icon}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Premium Features */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 border border-purple-100">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
              <span className="text-4xl mr-3">✨</span>
              Premium Features
            </h2>
            <ul className="space-y-6">
              {[
                {
                  title: "AI Career Matching",
                  description: "State-of-the-art algorithms match you with ideal tech roles",
                  icon: "🎯"
                },
                {
                  title: "Skill Gap Analysis",
                  description: "Identify exactly what skills you need for your target role",
                  icon: "📊"
                },
                {
                  title: "Learning Pathways",
                  description: "Curated courses and certifications for skill development",
                  icon: "🎓"
                },
                {
                  title: "Salary Insights",
                  description: "Market data on compensation for your target roles",
                  icon: "💰"
                },
                {
                  title: "Progress Tracking",
                  description: "Monitor your career development journey",
                  icon: "📈"
                }
              ].map((feature, index) => (
                <li key={index} className="flex items-start group hover:transform hover:translate-x-2 transition-transform duration-200">
                  <span className="text-3xl mr-4 transform group-hover:scale-110 transition-transform">{feature.icon}</span>
                  <div>
                    <span className="font-bold text-gray-800 text-lg">{feature.title}</span>
                    <p className="text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "From Marketing → Data Scientist",
                company: "Google",
                quote: "The AI assessment revealed my analytical strengths and guided me to data science. Best career decision ever!"
              },
              {
                name: "Michael Rodriguez",
                role: "From Finance → Product Manager",
                company: "Microsoft",
                quote: "The personalized roadmap helped me transition smoothly. Now leading product at a Fortune 500 company."
              },
              {
                name: "Priya Patel",
                role: "From Teaching → UX Designer",
                company: "Apple",
                quote: "Discovered my passion for design through the assessment. The learning path recommendations were invaluable."
              }
            ].map((story, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-200">
                <div className="text-5xl text-indigo-400 mb-4">"</div>
                <p className="text-gray-700 mb-6 italic">{story.quote}</p>
                <div className="border-t pt-4">
                  <div className="font-bold text-gray-800">{story.name}</div>
                  <div className="text-sm text-gray-600">{story.role}</div>
                  <div className="text-sm font-medium text-indigo-600">{story.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-70"></div>
          <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">Transform Your Tech Career Today</h2>
            <p className="mb-10 text-xl text-purple-100 max-w-3xl mx-auto">
              Join elite professionals who've accelerated their careers with our AI-powered insights. Your perfect tech role awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleStartTest}
                className="bg-white text-purple-600 px-12 py-5 rounded-full font-bold text-lg hover:bg-gradient-to-r hover:from-white hover:to-purple-50 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Start Your Assessment
              </button>
              <button className="border-2 border-white text-white px-8 py-5 rounded-full font-medium text-lg hover:bg-white/20 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
            <p className="mt-8 text-sm text-purple-200">
              Trusted by professionals at Google, Microsoft, Amazon, and more
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerHome;
