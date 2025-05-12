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
                Discover Your Tech
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                  Career Path
                </span>
              </h1>
              <p className="text-xl mb-10 text-indigo-100 max-w-2xl">
                Get comprehensive AI-powered analysis of your career options with personalized recommendations, skills gap analysis, and learning roadmap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartTest}
                  className="bg-white text-indigo-600 px-12 py-5 rounded-full font-bold text-lg hover:bg-gradient-to-r hover:from-white hover:to-indigo-50 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center group"
                >
                  Start Your Assessment
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-5 rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  View Sample Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">What You Get</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
            Our comprehensive career assessment provides everything you need to make an informed career transition
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Career Path Recommendations",
                description: "Get matched with ideal tech careers based on your profile, with match percentages and timeline estimates",
                icon: "🎯"
              },
              {
                title: "Strengths Analysis",
                description: "Detailed breakdown of your transferable skills and how they apply to tech roles",
                icon: "💪"
              },
              {
                title: "Skills Gap Analysis",
                description: "Identify exact technical skills you need to develop for your target career path",
                icon: "📊"
              },
              {
                title: "Learning Roadmap",
                description: "Month-by-month plan with specific courses and projects to build your skills",
                icon: "🗺️"
              },
              {
                title: "Transition Strategy",
                description: "Practical steps to move from your current role to your target tech position",
                icon: "🚀"
              },
              {
                title: "Export Results",
                description: "Download your complete career analysis as a PDF for future reference",
                icon: "📄"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Complete Assessment",
                  description: "Answer questions about your education, experience, skills, and career goals",
                  icon: "📝"
                },
                {
                  step: "2",
                  title: "AI Analysis",
                  description: "Our AI analyzes your profile to identify the best career matches and learning paths",
                  icon: "🤖"
                },
                {
                  step: "3",
                  title: "Get Your Results",
                  description: "Receive comprehensive career recommendations with actionable next steps",
                  icon: "📊"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <div className="text-3xl mt-4">{item.icon}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sample Results Preview */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Your Results Look Like</h2>
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-4 text-indigo-600">Career Matches</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Data Analyst</span>
                    <span className="font-bold text-green-600">85% match</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>AI Research Assistant</span>
                    <span className="font-bold text-blue-600">70% match</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-4 text-indigo-600">Your Strengths</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Strong analytical skills
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Computer Science background
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Project management experience
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Thompson",
                transition: "Marketing → Data Analyst",
                quote: "The assessment gave me a clear roadmap. Within 8 months, I successfully transitioned to a data analyst role."
              },
              {
                name: "Maria Garcia",
                transition: "Teacher → UX Designer",
                quote: "The skills gap analysis showed exactly what I needed to learn. Now I'm designing products I love."
              },
              {
                name: "David Kim",
                transition: "Finance → Software Engineer",
                quote: "The learning roadmap was invaluable. It helped me focus on the right skills for my career change."
              }
            ].map((story, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-8 shadow-lg">
                <div className="text-4xl text-indigo-400 mb-4">"</div>
                <p className="text-gray-700 mb-6 italic">{story.quote}</p>
                <div className="border-t pt-4">
                  <div className="font-bold text-gray-800">{story.name}</div>
                  <div className="text-sm text-indigo-600">{story.transition}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-70"></div>
          <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">Ready to Find Your Tech Career Path?</h2>
            <p className="mb-10 text-xl text-purple-100 max-w-3xl mx-auto">
              Take our comprehensive assessment and get personalized recommendations for your tech career transition.
            </p>
            <button
              onClick={handleStartTest}
              className="bg-white text-purple-600 px-12 py-5 rounded-full font-bold text-lg hover:bg-gradient-to-r hover:from-white hover:to-purple-50 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Begin Your Assessment
            </button>
            <p className="mt-8 text-sm text-purple-200">
              Join thousands who've successfully transitioned to tech careers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerHome;
