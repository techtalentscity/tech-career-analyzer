// src/Pages/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { currentUser, signInWithGoogle, isAuthorized } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    <div style={{ 
      maxWidth: '400px', 
      margin: '100px auto', 
      padding: '20px', 
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderRadius: '8px'
    }}>
      <h1>Sign In</h1>
      <p>Access your career assessment and personalized recommendations.</p>
      
      {error && (
        <div style={{
          color: 'red',
          backgroundColor: '#ffebee',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleGoogleSignIn} 
          disabled={isLoading}
          style={{
            backgroundColor: '#4285f4',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            width: '100%',
            marginBottom: '20px'
          }}
        >
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </button>

        <div style={{ 
          margin: '20px 0', 
          position: 'relative',
          textAlign: 'center'
        }}>
          <hr style={{ border: '1px solid #ddd' }} />
          <span style={{ 
            position: 'absolute', 
            top: '-12px', 
            left: '50%', 
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            padding: '0 10px',
            color: '#666'
          }}>
            OR
          </span>
        </div>

        <div>
          <p style={{ marginBottom: '10px' }}>Need access to our career assessment?</p>
          <button 
            onClick={() => navigate('/payment')} 
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              width: '100%'
            }}
          >
            Subscribe Now
          </button>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => navigate('/career')}
          style={{
            backgroundColor: 'transparent',
            color: '#007bff',
            border: '1px solid #007bff',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Login;
