// src/Pages/payment/PaymentPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PaymentPage = () => {
  const [isPaid, setIsPaid] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load the PayPal SDK
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
              plan_id: 'P-8M416101G0045512RNAV4AIY'
            });
          },
          onApprove: function(data, actions) {
            // Payment was successful
            setIsPaid(true);
            setSubscriptionId(data.subscriptionID);
          }
        }).render('#paypal-button-container');
      }
    };
    
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();
    
    try {
      // Call your Cloud Function to register the user
      const response = await fetch('https://us-central1-techtalents-city.cloudfunctions.net/registerPaidUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          subscriptionId: subscriptionId
        }),
      });
      
      if (response.ok) {
        // Redirect to login page after successful registration
        navigate('/login');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please contact support.');
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
                  <span className="font-bold">$60</span> - 30-day access
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
              
              <div id="paypal-button-container"></div>
            </>
          ) : (
            <div>
              <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                <p className="font-bold">Payment Successful!</p>
                <p>Please complete your registration below to access your career analysis.</p>
              </div>
              
              <form onSubmit={handleRegistration} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1 text-left">
                    Use the same email you'll use to sign in with Google
                  </p>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Complete Registration
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
