// src/Pages/payment/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';

const PaymentPage = () => {
  const [isPaid, setIsPaid] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState('');
  const { currentUser, signInWithGoogle, isAuthorized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authorized and redirect if needed
    if (currentUser && isAuthorized) {
      navigate('/career/test');
      return;
    }
    
    // Load PayPal script
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=AVwbq-J1IvhiWpiIyMuHMP46iLeiiMe2reeKPCQ6jtKo9I70oEZnVNbpGUZNd_dgDr_6Quf_LjBOX9UJ&vault=true&intent=subscription";
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    script.async = true;
    
    script.onload = () => {
      if (window.paypal) {
        window.paypal.Buttons({
          style: {
            shape: 'pill',
            color: 'silver',
            layout: 'horizontal',
            label: 'subscribe'
          },
          createSubscription: function(data, actions) {
            return actions.subscription.create({
              /* Creates the subscription */
              plan_id: 'P-9PC51909K3266754PNAV5OZA'
            });
          },
          onApprove: function(data, actions) {
            // Payment successful
            setIsPaid(true);
            setSubscriptionId(data.subscriptionID);
            // Optional success message for the subscriber
            // alert(data.subscriptionID);
          }
        }).render('#paypal-button-container-P-9PC51909K3266754PNAV5OZA');
      }
    };
    
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [currentUser, isAuthorized, navigate]);

  // Register the user after payment and sign-in
  useEffect(() => {
    const registerUser = async () => {
      if (isPaid && subscriptionId && currentUser) {
        try {
          // Add the user to the authorizedUsers collection
          await setDoc(doc(db, "authorizedUsers", currentUser.email), {
            authorized: true,
            subscriptionId: subscriptionId,
            createdAt: new Date()
          });
          
          // Redirect to the protected area
          navigate('/career/test');
        } catch (error) {
          console.error("Error registering user:", error);
          alert("Registration failed. Please contact support.");
        }
      }
    };
    
    registerUser();
  }, [isPaid, subscriptionId, currentUser, navigate]);

  // Handle Google Sign In
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      // The registration will happen in the useEffect above
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Tech Career Analysis</h2>
          <p className="text-gray-600 mb-6">Get your personalized career roadmap</p>
          
          {!isPaid ? (
            <>
              <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700">
                  <span className="font-bold">$100</span> - 30-day access
                </p>
                <ul className="text-left mt-2">
                  <li className="flex items-start text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Complete career path recommendations</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Personalized learning roadmap</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>PDF report download</span>
                  </li>
                </ul>
              </div>
              
              <div id="paypal-button-container-P-9PC51909K3266754PNAV5OZA"></div>
            </>
          ) : (
            <div>
              <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                <p className="font-bold">Payment Successful!</p>
                <p>Please sign in with Google to access your career analysis.</p>
              </div>
              
              {!currentUser ? (
                <button
                  onClick={handleSignIn}
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
              ) : (
                <div className="flex items-center justify-center bg-blue-100 p-4 rounded-lg">
                  <div className="animate-spin mr-3 h-5 w-5 border-b-2 border-blue-500 rounded-full"></div>
                  <p>Registering your account...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
