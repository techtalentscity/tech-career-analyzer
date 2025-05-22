// src/Pages/auth/Logout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Logout = () => {
  const { currentUser, logout, isAuthorized } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Auto logout when component mounts if user is logged in
  useEffect(() => {
    if (currentUser && !isLoggedOut) {
      handleLogout();
    } else if (!currentUser) {
      setIsLoggedOut(true);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setError('');
      
      await logout();
      
      setIsLoggingOut(false);
      setIsLoggedOut(true);
      
      // Auto redirect to home after 3 seconds
      setTimeout(() => {
        navigate('/career');
      }, 3000);
      
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Failed to log out. Please try again.');
      setIsLoggingOut(false);
    }
  };

  const handleManualLogout = () => {
    if (!isLoggingOut) {
      handleLogout();
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
            
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {isLoggedOut ? 'Logged Out' : 'Logging Out'}
              </h2>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {isLoggingOut && (
              <div className="mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full"></div>
                </div>
                <p className="text-gray-600">Signing you out...</p>
              </div>
            )}

            {/* Success State */}
            {isLoggedOut && !error && (
              <div className="mb-6">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-semibold">Successfully logged out!</p>
                  <p className="text-sm mt-1">Thank you for using Favored Online</p>
                </div>
                <p className="text-gray-500 text-sm">
                  Redirecting to home page in 3 seconds...
                </p>
              </div>
            )}

            {/* Manual Logout for Not Logged In Users */}
            {!currentUser && !isLoggedOut && (
              <div className="mb-6">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                  <p className="font-semibold">Not currently logged in</p>
                  <p className="text-sm">You are already signed out</p>
                </div>
              </div>
            )}

            {/* Logout Button (for error state) */}
            {error && (
              <button
                onClick={handleManualLogout}
                disabled={isLoggingOut}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 mb-4"
              >
                {isLoggingOut ? 'Logging out...' : 'Try Again'}
              </button>
            )}

            {/* Navigation Options */}
            <div className="space-y-3">
              <button
                onClick={() => navigate('/career')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                Go to Home
              </button>
              
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                Sign In Again
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Your session has been securely terminated
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

export default Logout;
