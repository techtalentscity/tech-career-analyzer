import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';

const PaymentPage = () => {
  const [isPaid, setIsPaid] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser, signInWithGoogle, isAuthorized } = useAuth();
  const navigate = useNavigate();

  // Updated PayPal Plan ID - matches your new plan
  const PAYPAL_PLAN_ID = 'P-1SU68871116170414NAXHKDA';

  useEffect(() => {
    // If user is already authenticated and authorized, redirect to career test
    if (currentUser && isAuthorized) {
      navigate('/career/test');
      return;
    }
    
    // Inject PayPal script only once
    const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
    if (existingScript) return;
    
    const script = document.createElement('script');
    // Updated with your client ID - verify this is correct
    script.src = `https://www.paypal.com/sdk/js?client-id=AVwbq-J1IvhiWpiIyMuHMP46iLeiiMe2reeKPCQ6jtKo9I70oEZnVNbpGUZNd_dgDr_6Quf_LjBOX9UJ&vault=true&intent=subscription`;
    script.addEventListener('load', initializePayPal);
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      const paypalScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
      if (paypalScript) {
        document.body.removeChild(paypalScript);
      }
    };
  }, [currentUser, isAuthorized, navigate]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
    setError(''); // Clear any previous errors
  };

  const initializePayPal = () => {
    if (window.paypal) {
      window.paypal.Buttons({
        style: {
          shape: 'pill',
          color: 'silver',
          layout: 'horizontal',
          label: 'subscribe'
        },
        createSubscription: function(data, actions) {
          if (!isEmailValid) {
            setError('Please enter a valid email address before proceeding with payment');
            return Promise.reject(new Error('Email validation failed'));
          }
          
          return actions.subscription.create({
            'plan_id': PAYPAL_PLAN_ID
          });
        },
        onApprove: function(data, actions) {
          setIsLoading(true);
          setSubscriptionId(data.subscriptionID);
          
          // Save payment info to Firestore using the paidUsers collection
          savePaymentInfo(email, data.subscriptionID)
            .then(() => {
              setIsPaid(true);
              setIsLoading(false);
              setError('');
            })
            .catch(err => {
              setError('Payment recorded but there was an error updating your account. Please contact support.');
              console.error('Error saving payment info:', err);
              setIsLoading(false);
            });
        },
        onError: function(err) {
          setError('There was an error processing your payment. Please try again.');
          console.error('PayPal Error:', err);
        }
              }).render('#paypal-button-container-P-1SU68871116170414NAXHKDA');
    }
  };

  const savePaymentInfo = async (email, subscriptionId) => {
    try {
      // Save to paidUsers collection using email as document ID
      await setDoc(doc(db, "paidUsers", email), {
        email: email,
        subscriptionId: subscriptionId,
        isPaid: true,
        paymentDate: new Date().toISOString(),
        planType: "monthly", // or whatever plan type this is
      });
      return true;
    } catch (error) {
      console.error("Error saving payment info:", error);
      throw error;
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isPaid) {
      setError('Please complete payment before signing in');
      return;
    }

    try {
      setIsLoading(true);
      const user = await signInWithGoogle();
      
      // Verify the email matches
      if (user.user.email.toLowerCase() !== email.toLowerCase()) {
        setError('Please sign in with the same email you used for payment: ' + email);
        setIsLoading(false);
        return;
      }
      
      // Successful login with correct email - the AuthContext will handle authorization
      navigate('/career/test');
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-10 w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Tech Career Analysis</h2>
          <p className="text-gray-600 mb-6">Get your personalized career roadmap</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {!isPaid ? (
            <>
              {/* Email Input Section */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-2">
                  Email address (will be used for login):
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="your.email@example.com"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEmailValid && email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {!isEmailValid && email && (
                  <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
                )}
              </div>

              <div className="bg-indigo-50 rounded-lg p-4 mb-6 text-left">
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">$60</span> - 30-day access
                </p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Complete career path recommendations
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Personalized learning roadmap
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    PDF report download
                  </li>
                </ul>
              </div>

              <div id="paypal-button-container-P-1SU68871116170414NAXHKDA" className="w-full flex justify-center" />
              
              {!isEmailValid && (
                <p className="text-gray-500 text-sm mt-2">
                  Please enter a valid email address to enable payment
                </p>
              )}
            </>
          ) : (
            <div>
              <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                <p className="font-bold">Payment Successful!</p>
                <p>Subscription ID: {subscriptionId}</p>
                <p className="mt-2">Please sign in with Google using: <strong>{email}</strong></p>
              </div>

              {!currentUser ? (
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg shadow hover:shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="ml-2">
                    {isLoading ? "Signing in..." : "Sign in with Google"}
                  </span>
                </button>
              ) : (
                <div className="flex items-center justify-center bg-blue-100 p-4 rounded-lg">
                  <div className="animate-spin mr-3 h-5 w-5 border-b-2 border-blue-500 rounded-full"></div>
                  <p>Completing registration...</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Links */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => navigate('/career')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
