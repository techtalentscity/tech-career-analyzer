import React from 'react';

const MentorshipSection = () => {
  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back to Dashboard Button */}
        <div className="mb-6">
          <button
            onClick={() => window.location.href = '/career/dashboard'}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>

        {/* Section Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">🤝</span>
            1-on-1 CAREER MENTORSHIP
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">👨‍💼</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Ready to Accelerate Your Tech Career?
            </h2>
            <p className="text-gray-600">
              Get personalized guidance from an experienced tech career mentor
            </p>
          </div>

          {/* Two Column Layout - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* What You'll Get */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What You'll Get:</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Personalized career roadmap review</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Skills gap analysis and learning strategy</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Industry insights and market trends</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Interview preparation and portfolio review</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Job search strategies and networking tips</span>
                </div>
              </div>
            </div>

            {/* Session Details */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Details:</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-xl mr-3">🕐</span>
                  <span className="text-gray-700">30-minute focused session</span>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">💻</span>
                  <span className="text-gray-700">Virtual meeting (Zoom/Google Meet)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">📋</span>
                  <span className="text-gray-700">Actionable next steps and resources</span>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">📧</span>
                  <span className="text-gray-700">Follow-up summary with recommendations</span>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">🎯</span>
                  <span className="text-gray-700">Tailored to your AI career recommendations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Perfect For Section */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <p className="text-gray-700">
              <span className="font-semibold text-green-800">Perfect for:</span> Career changers, recent graduates, and professionals looking to advance in tech
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Book now to get personalized insights based on your AI-generated career recommendations
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a
              href="https://calendly.com/info-favoredonline/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Your 30-Minute Session
            </a>
            <p className="text-sm text-gray-500 mt-3">
              Secure booking through Calendly • Choose your preferred time slot
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipSection;
