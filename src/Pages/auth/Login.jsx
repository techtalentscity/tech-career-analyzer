// src/Pages/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { currentUser, signInWithGoogle, isAuthorized } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in
    if (currentUser) {
      // If authorized (has paid), redirect to career test
      if (isAuthorized) {
        navigate('/career/test');
      } else {
        // If not authorized, redirect to payment
        navigate('/payment');
      }
    }
  }, [currentUser, isAuthorized, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signInWithGoogle();
      // The useEffect above will handle redirects after successful login
    } catch (error) {
      console.error("Login failed", error);
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

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
              <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">About</Link>
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
                <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">About</Link>
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
      <main className="flex-grow pt-16 flex items-center justify-center px-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-10 w-full max-w-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
            <p className="text-gray-600 mb-6">Access your career assessment and personalized recommendations.</p>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <button 
                onClick={handleGoogleSignIn} 
                disabled={isLoading}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg shadow hover:shadow-md flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>
                  {isLoading ? "Signing in..." : "Sign in with Google"}
                </span>
              </button>

              <div className="relative my-6">
                <hr className="border-gray-300" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-500 text-sm">
                  OR
                </span>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Need access to our career assessment?</p>
                <button 
                  onClick={() => navigate('/payment')} 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-lg"
                >
                  Subscribe Now
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <button
                onClick={() => navigate('/career')}
                className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
              >
                ← Back to Home
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6">
              <p className="text-xs text-gray-500">
                Secure login powered by Google
              </p>
            </div>
          </div>
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

export default Login;
