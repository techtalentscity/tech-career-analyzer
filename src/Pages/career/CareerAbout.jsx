// src/Pages/career/CareerAbout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CareerAbout = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { currentUser, isAuthorized } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 overflow-hidden flex flex-col">
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
              <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Home</Link>
              <Link to="/about" className="text-indigo-600 font-medium transition-colors border-b-2 border-indigo-600">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Contact</Link>
              
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
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg text-sm transition-colors"
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
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center"
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
                className="text-gray-700 hover:text-indigo-600 focus:outline-none"
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
                <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Home</Link>
                <Link to="/about" className="text-indigo-600 font-medium transition-colors">About</Link>
                <Link to="/contact" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Contact</Link>
                
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
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg text-sm transition-colors text-center"
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
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center"
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
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          {/* Page Title */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About Favored Online</h1>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Company History */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-4">
                  Favored Online began as an online learning platform offering both tech and vocational skills. Over time, it has evolved to focus primarily on technology education and empowerment.
                </p>
                <p className="text-lg text-gray-700">
                  This shift led to the launch of initiatives such as <em className="text-indigo-600 font-medium">Career Path in Tech</em>, which helps individuals start or transition into tech careers, and <em className="text-indigo-600 font-medium">Grow Your Career in Tech</em>, which offers targeted, self-paced learning tailored to specific interests and skill development. These programs have empowered many to gain in-demand skills and build successful careers in the tech industry.
                </p>
              </div>
            </div>
          </section>

          {/* Mission and Vision */}
          <section className="mb-16 grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-md p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>To help people successfully start and grow a career in tech</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>To guide individuals in discovering their niche within the tech industry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>To equip people with the right resources needed to land their dream job in tech</span>
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-md p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-700">
                  To become the leading platform for empowering individuals to build successful careers in technology.
                </p>
              </div>
              <div className="mt-6 bg-white/50 p-4 rounded-lg border border-purple-100">
                <p className="italic text-gray-600 text-center">
                  "We envision a world where everyone has access to the tools, knowledge, and support needed to thrive in the digital economy."
                </p>
              </div>
            </div>
          </section>

          {/* Our Product */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 md:p-10 text-white">
                <h2 className="text-3xl font-bold mb-4">Our Product</h2>
                <p className="text-lg text-indigo-100">
                  We have developed an AI-powered platform designed to fulfill our mission and vision. The platform offers:
                </p>
              </div>

              <div className="p-6 md:p-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-indigo-50 p-6 rounded-xl">
                    <div className="text-3xl text-indigo-600 mb-3"></div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Driven Analysis</h3>
                    <p className="text-gray-700">
                      Comprehensive AI-driven career analysis tailored to your background and goals
                    </p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl">
                    <div className="text-3xl text-purple-600 mb-3"></div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Career Recommendations</h3>
                    <p className="text-gray-700">
                      Personalized career recommendations aligned with your interests and industry trends
                    </p>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-xl">
                    <div className="text-3xl text-indigo-600 mb-3">📊</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Skills Gap Analysis</h3>
                    <p className="text-gray-700">
                      Skills gap analysis to identify what you need to learn for your target role
                    </p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl">
                    <div className="text-3xl text-purple-600 mb-3"></div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Learning Roadmap</h3>
                    <p className="text-gray-700">
                      A custom learning roadmap to guide your upskilling journey
                    </p>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-xl">
                    <div className="text-3xl text-indigo-600 mb-3"></div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Learning Resources</h3>
                    <p className="text-gray-700">
                      Curated learning resources to help you grow in your chosen tech path
                    </p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl">
                    <div className="text-3xl text-purple-600 mb-3"></div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Interview Preparation</h3>
                    <p className="text-gray-700">
                      Interview preparation tools to build your confidence and readiness
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
                  <div className="text-3xl mb-3"></div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Complete Career Transition Guide</h3>
                  <p className="text-gray-700">
                    A complete career transition guide that brings everything together in one place
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-lg text-gray-700 md:text-xl font-medium">
                    Our all-in-one platform equips you with the clarity, tools, and support needed to confidently transition into a successful tech career.
                  </p>
                  <Link to="/" className="mt-6 inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                    Start Your Tech Journey Today
                  </Link>
                </div>
              </div>
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
            © {new Date().getFullYear()} Favored Online. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CareerAbout;
