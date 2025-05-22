import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const [loadAttempts, setLoadAttempts] = useState(0);
  const { currentUser, signInWithGoogle, isAuthorized } = useAuth();
  const navigate = useNavigate();

  // PayPal Configuration - EXACT as provided
  const PAYPAL_PLAN_ID = 'P-5C894909UL250092PNAXH4YQ';
  const PAYPAL_CLIENT_ID = 'ARzy2f1cC_tYmAvWKXfF3jR1TXj-6eKH5f2SVUHIziG2ip1lc7pdLCSB_jEnPwt0tKhN-9SuCgO8EXcx';
  const CONTAINER_ID = 'paypal-button-container-P-5C894909UL250092PNAXH4YQ'; // Exact container ID

  useEffect(() => {
    if (currentUser && isAuthorized) {
      navigate('/career/test');
      return;
    }
    
    loadPayPalScript();
  }, [currentUser, isAuthorized, navigate]);

  useEffect(() => {
    if (paypalLoaded && isEmailValid) {
      initializePayPal();
    }
  }, [paypalLoaded, isEmailValid]);

  const loadPayPalScript = () => {
    // Check if already loaded
    if (window.paypal) {
      setPaypalLoaded(true);
      setDebugInfo('PayPal SDK already available');
      return;
    }

    // Remove any existing scripts first
    const existingScripts = document.querySelectorAll('script[src*="paypal.com"]');
    existingScripts.forEach(script => script.remove());

    setDebugInfo(`Attempting to load PayPal SDK... Attempt ${loadAttempts + 1}`);
    setLoadAttempts(prev => prev + 1);

    const script = document.createElement('script');
    
    // EXACT SDK URL as provided
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    script.async = true;

    // Set up timeout
    const timeout = setTimeout(() => {
      setError('PayPal SDK loading timeout. Please try the manual subscription option below.');
      setDebugInfo(`PayPal script load error. Attempt ${loadAttempts}`);
    }, 15000);

    script.onload = () => {
      clearTimeout(timeout);
      if (window.paypal) {
        setPaypalLoaded(true);
        setDebugInfo('PayPal SDK loaded successfully');
        setError('');
      } else {
        setError('PayPal SDK loaded but not available');
        setDebugInfo('PayPal SDK loaded but window.paypal not found');
      }
    };

    script.onerror = (e) => {
      clearTimeout(timeout);
      console.error('PayPal script loading error:', e);
      setError('Failed to load PayPal SDK. Please use the manual subscription option below.');
      setDebugInfo(`PayPal script load error. Attempt ${loadAttempts}`);
      
      // Retry logic (up to 2 retries)
      if (loadAttempts < 2) {
        setTimeout(() => {
          setDebugInfo('Retrying PayPal SDK load...');
          loadPayPalScript();
        }, 3000);
      }
    };

    document.head.appendChild(script);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const valid = validateEmail(newEmail);
    setIsEmailValid(valid);
    setError('');
    
    if (valid && paypalLoaded) {
      setDebugInfo('Email valid, initializing PayPal...');
    }
  };

  const initializePayPal = () => {
    if (!window.paypal) {
      setError('PayPal SDK not available');
      setDebugInfo('PayPal SDK not available for initialization');
      return;
    }

    if (!isEmailValid) {
      setDebugInfo('Email not valid, skipping PayPal initialization');
      return;
    }

    const container = document.getElementById(CONTAINER_ID);
    if (container) {
      container.innerHTML = '';
    }

    setDebugInfo('Initializing PayPal Buttons...');

    try {
      // EXACT PayPal configuration as provided
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
            plan_id: PAYPAL_PLAN_ID
          });
        },
        onApprove: function(data, actions) {
          // Modified to save to Firestore instead of just alert
          console.log('Subscription approved:', data);
          setDebugInfo('Payment approved, processing...');
          setIsLoading(true);
          setSubscriptionId(data.subscriptionID);
          
          savePaymentInfo(email, data.subscriptionID)
            .then(() => {
              setIsPaid(true);
              setIsLoading(false);
              setError('');
              setDebugInfo('Payment processed successfully');
            })
            .catch(err => {
              setError('Payment recorded but there was an error updating your account. Please contact support.');
              console.error('Error saving payment info:', err);
              setIsLoading(false);
            });
        },
        onCancel: function(data) {
          console.log('Payment cancelled:', data);
          setDebugInfo('Payment was cancelled');
        },
        onError: function(err) {
          console.error('PayPal error:', err);
          setError('There was an error processing your payment. Please try again.');
          setDebugInfo('PayPal payment error: ' + (err.message || 'Unknown error'));
        }
      }).render(`#${CONTAINER_ID}`) // Renders the PayPal button
      .then(() => {
        setDebugInfo('PayPal button rendered successfully');
        setError('');
      })
      .catch(err => {
        console.error('PayPal render error:', err);
        setError('Failed to render PayPal button');
        setDebugInfo('PayPal render error: ' + (err.message || 'Unknown error'));
      });
    } catch (err) {
      console.error('PayPal initialization error:', err);
      setError('Failed to initialize PayPal');
      setDebugInfo('PayPal initialization error: ' + (err.message || 'Unknown error'));
    }
  };

  const savePaymentInfo = async (email, subscriptionId) => {
    try {
      await setDoc(doc(db, "paidUsers", email), {
        email: email,
        subscriptionId: subscriptionId,
        isPaid: true,
        paymentDate: new Date().toISOString(),
        planType: "subscription", // Updated to reflect it's a subscription
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
      
      if (user.user.email.toLowerCase() !== email.toLowerCase()) {
        setError('Please sign in with the same email you used for payment: ' + email);
        setIsLoading(false);
        return;
      }
      
      navigate('/career/test');
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  // Manual subscription redirect for backup
  const handleManualSubscription = () => {
    // Direct link to subscribe to the specific plan
    const subscriptionUrl = `https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=${PAYPAL_PLAN_ID}`;
    window.open(subscriptionUrl, '_blank');
    setDebugInfo('Redirected to PayPal manual subscription');
    
    // Show instructions for returning
    setError('After completing payment on PayPal, return to this page and refresh to continue setup.');
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
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16 flex items-center justify-center px-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-10 w-full max-w-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Tech Career Analysis</h2>
            <p className="text-gray-600 mb-6">Get your personalized career roadmap</p>

            {/* Debug Info */}
            {debugInfo && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-2 rounded text-xs mb-4">
                Debug: {debugInfo}
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {!isPaid ? (
              <>
                {/* Email Input */}
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
                  {isEmailValid && (
                    <p className="text-green-500 text-sm mt-1">✓ Valid email address</p>
                  )}
                </div>

                {/* Pricing */}
                <div className="bg-indigo-50 rounded-lg p-4 mb-6 text-left">
                  <p className="text-gray-700 mb-2">
                    <span className="font-bold">$60</span> - Monthly Subscription
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
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Skills gap analysis
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Interview preparation tools
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Full platform access
                    </li>
                  </ul>
                </div>

                {/* PayPal Button Container - EXACT container ID */}
                <div className="mb-4">
                  {isEmailValid ? (
                    <>
                      <div id={CONTAINER_ID} className="w-full min-h-[50px] flex justify-center items-center mb-4">
                        {!paypalLoaded && (
                          <p className="text-gray-500 text-sm">Loading PayPal...</p>
                        )}
                      </div>
                      
                      {/* Backup Manual Subscription Button */}
                      {(!paypalLoaded || error) && (
                        <div className="space-y-3">
                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-sm text-gray-600 mb-3">Alternative payment method:</p>
                            <button
                              onClick={handleManualSubscription}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                            >
                              Subscribe via PayPal Website
                            </button>
                            <p className="text-xs text-gray-500 mt-2">
                              This will open PayPal in a new window for monthly subscription setup.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* Retry Button */}
                      {error && loadAttempts < 3 && (
                        <button
                          onClick={() => {
                            setError('');
                            setDebugInfo('');
                            loadPayPalScript();
                          }}
                          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded text-sm mt-2"
                        >
                          Retry Loading PayPal
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
                      <p className="text-gray-500 text-sm">Enter a valid email address to enable payment</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div>
                <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                  <p className="font-bold">Subscription Successful!</p>
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
                    <span>
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

            {/* Navigation */}
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

export default PaymentPage;
