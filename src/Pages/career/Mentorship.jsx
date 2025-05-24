import { useState } from 'react';

const MentorshipPage = () => {
  const [showTestimonials, setShowTestimonials] = useState(false);

  // Sample testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      text: "The mentorship session helped me identify key skills I was missing and provided a clear roadmap for my career transition. Highly recommended!",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Data Scientist at Microsoft",
      text: "Great insights into the tech industry and practical advice on how to improve my portfolio. The personalized approach made all the difference.",
      avatar: "MC"
    },
    {
      name: "Amara Okafor",
      role: "Frontend Developer at Stripe",
      text: "The session gave me confidence and direction. The mentor's experience in the industry was invaluable for my career planning.",
      avatar: "AO"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back to Dashboard Button */}
        <div className="mb-8">
          <button
            onClick={() => window.location.href = '/career/dashboard'}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">👨‍💼</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Accelerate Your Tech Career?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized guidance from an experienced tech career mentor
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* What You'll Get */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Get:</h2>
            <div className="space-y-4">
              {[
                "Personalized career roadmap review",
                "Skills gap analysis and learning strategy", 
                "Industry insights and market trends",
                "Interview preparation and portfolio review",
                "Job search strategies and networking tips"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Session Details */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Session Details:</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">⏰</span>
                <p className="text-gray-700 text-lg">30-minute focused session</p>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">💻</span>
                <p className="text-gray-700 text-lg">Virtual meeting (Zoom/Google Meet)</p>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">📋</span>
                <p className="text-gray-700 text-lg">Actionable next steps and resources</p>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">📧</span>
                <p className="text-gray-700 text-lg">Follow-up summary with recommendations</p>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                <p className="text-gray-700 text-lg">Tailored to your AI career recommendations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Perfect For Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Perfect for:</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Career Changers</h3>
              <p className="text-gray-600">Transitioning into tech from other industries</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Recent Graduates</h3>
              <p className="text-gray-600">Starting your tech career journey</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Tech Professionals</h3>
              <p className="text-gray-600">Looking to advance and grow in tech</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Book now to get personalized insights based on your AI-generated career recommendations
          </h2>
          <div className="mb-6">
            <span className="text-3xl">🗓️</span>
          </div>
          <h3 className="text-xl font-semibold text-green-600 mb-4">Book Your 30-Minute Session</h3>
          <p className="text-gray-600 mb-6">Secure booking through Calendly • Choose your preferred time slot</p>
          
          <a
            href="https://calendly.com/info-favoredonline/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Schedule Your Session Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">What Our Mentees Say</h2>
            <button
              onClick={() => setShowTestimonials(!showTestimonials)}
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              {showTestimonials ? 'Hide' : 'Show'} Testimonials
              <svg className={`w-5 h-5 ml-1 transform transition-transform ${showTestimonials ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {showTestimonials && (
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Questions? Contact us at{' '}
            <a href="mailto:info@favoredonline.com" className="text-green-600 hover:text-green-700 font-medium">
              info@favoredonline.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorshipPage;
