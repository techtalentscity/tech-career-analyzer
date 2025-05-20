// src/Pages/auth/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { currentUser, signInWithGoogle, isAuthorized, logout } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if user is both logged in AND authorized
    if (currentUser && isAuthorized) {
      navigate('/career/test');
    }
  }, [currentUser, isAuthorized, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setError(""); // Clear any previous errors
      await signInWithGoogle();
      // Navigation happens in the useEffect if authorized
    } catch (error) {
      console.error("Login failed", error);
      setError("Failed to sign in. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
      setError("Failed to sign out. Please try again.");
    }
  };

  const goToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to access your career assessment</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* Unauthorized message - IMPROVED */}
        {currentUser && !isAuthorized && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium">Unauthorized Access</h3>
                <div className="mt-2">
                  <p>Your account ({currentUser.email}) is not authorized to access this application.</p>
                  <p className="mt-1">You need to purchase a subscription to continue.</p>
                </div>
                <div className="mt-4">
                  <button 
                    onClick={goToPayment}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors w-full mb-3"
                  >
                    Go to Payment Page
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors w-full"
                  >
                    Sign Out and Try Another Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Only show sign in button if not already signed in */}
        {!currentUser && (
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2 mb-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="ml-2">Sign in with Google</span>
          </button>
        )}

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
