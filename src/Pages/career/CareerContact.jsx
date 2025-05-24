// src/Pages/career/CareerContact.jsx
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CareerContact = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState({
    message: '',
    isError: false,
    isSubmitting: false,
    isSuccess: false
  });
  const formRef = useRef(null);
  const { currentUser, isAuthorized } = useAuth();

  // Form field values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [message, setMessage] = useState('');

  // Google Form entry IDs - you'll need to replace these with the actual IDs from your form
  const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd3rlMMv45Bco1flqMeqet8hLzu4kxFMyBBrBaNQbXaHW4ANg/formResponse';
  const FIRST_NAME_ID = 'entry.1967055698';
  const LAST_NAME_ID = 'entry.505850385';
  const EMAIL_ID = 'entry.1357128031';
  const CONTACT_NO_ID = 'entry.1028687531';
  const MESSAGE_ID = 'entry.474983796';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({
      message: '',
      isError: false,
      isSubmitting: true,
      isSuccess: false
    });

    // Create form data for submission
    const formData = new FormData();
    formData.append(FIRST_NAME_ID, firstName);
    formData.append(LAST_NAME_ID, lastName);
    formData.append(EMAIL_ID, email);
    formData.append(CONTACT_NO_ID, contactNo);
    formData.append(MESSAGE_ID, message);

    // Submit the form using an iframe to avoid CORS issues
    try {
      // Create a hidden iframe for submission
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Wait for iframe to load
      await new Promise(resolve => {
        iframe.onload = resolve;
        // Set up the form within the iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const iframeForm = iframeDoc.createElement('form');
        iframeForm.action = FORM_URL;
        iframeForm.method = 'POST';
        
        // Add form fields
        Object.entries({
          [FIRST_NAME_ID]: firstName,
          [LAST_NAME_ID]: lastName,
          [EMAIL_ID]: email,
          [CONTACT_NO_ID]: contactNo,
          [MESSAGE_ID]: message
        }).forEach(([name, value]) => {
          const input = iframeDoc.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          iframeForm.appendChild(input);
        });
        
        iframeDoc.body.appendChild(iframeForm);
        iframeForm.submit();
      });
      
      // Success state
      setFormStatus({
        message: 'Your message has been sent successfully. We will get back to you soon!',
        isError: false,
        isSubmitting: false,
        isSuccess: true
      });
      
      // Reset form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setContactNo('');
      setMessage('');
      
      // Remove iframe after submission
      document.body.removeChild(iframe);
    } catch (error) {
      setFormStatus({
        message: 'There was an error sending your message. Please try again later.',
        isError: true,
        isSubmitting: false,
        isSuccess: false
      });
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 overflow-hidden flex flex-col">
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
              <Link to="/" className="text-gray-700 hover:text-lime-600 font-medium transition-colors">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-lime-600 font-medium transition-colors">About</Link>
              <Link to="/contact" className="text-lime-600 font-medium transition-colors border-b-2 border-lime-600">Contact</Link>
              
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
                      className="bg-lime-100 hover:bg-lime-200 text-lime-800 px-4 py-2 rounded-lg text-sm transition-colors"
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
                  className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center"
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
                className="text-gray-700 hover:text-lime-600 focus:outline-none"
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
                <Link to="/" className="text-gray-700 hover:text-lime-600 font-medium transition-colors">Home</Link>
                <Link to="/about" className="text-gray-700 hover:text-lime-600 font-medium transition-colors">About</Link>
                <Link to="/contact" className="text-lime-600 font-medium transition-colors">Contact</Link>
                
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
                        className="bg-lime-100 hover:bg-lime-200 text-lime-800 px-4 py-2 rounded-lg text-sm transition-colors text-center"
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
                    className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center"
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
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Contact Us</h1>
            <div className="h-1 w-24 bg-gradient-to-r from-lime-500 to-green-600 mx-auto rounded-full"></div>
          </div>

          {/* Contact Information Section */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-lime-500 to-green-600 p-6 md:p-10 text-white">
                <h2 className="text-3xl font-bold mb-4">Need immediate assistance?</h2>
                <p className="text-lg text-lime-100 max-w-3xl">
                  For urgent issues, you can reach our support team at:
                </p>
              </div>

              <div className="p-6 md:p-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-lime-50 p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center text-lime-600 text-2xl mr-4">
                        📧
                      </div>
                      <h3 className="text-xl font-bold">Email Support</h3>
                    </div>
                    <p className="text-gray-700 mb-3">
                      Send us an email and we'll get back to you as soon as possible.
                    </p>
                    <a 
                      href="mailto:info.favoredonline@gmail.com" 
                      className="text-lime-600 font-medium text-lg hover:text-lime-800 transition-colors"
                    >
                      info.favoredonline@gmail.com
                    </a>
                    <p className="mt-3 text-gray-600 text-sm">
                      <span className="font-semibold">Response time:</span> We aim to respond to all queries within 5 business days
                    </p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mr-4">
                        ⏱️
                      </div>
                      <h3 className="text-xl font-bold">Office Hours</h3>
                    </div>
                    <p className="text-gray-700 mb-3">
                      Our team is available during the following hours:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span><span className="font-medium">Monday - Friday:</span> 9:00 AM - 5:00 PM</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span><span className="font-medium">Saturday:</span> 10:00 AM - 2:00 PM</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span><span className="font-medium">Sunday:</span> Closed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
                
                {formStatus.message && (
                  <div className={`mb-6 p-4 rounded-lg ${formStatus.isError ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
                    <p>{formStatus.message}</p>
                  </div>
                )}
                
                <form ref={formRef} onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                        placeholder="Your first name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                        placeholder="Your last name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                        placeholder="Your email address"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactNo" className="block text-gray-700 font-medium mb-2">Contact Number</label>
                      <input
                        type="tel"
                        id="contactNo"
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                        placeholder="Your contact number (optional)"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-full">
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message <span className="text-red-500">*</span></label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full h-[calc(100%-40px)] min-h-[150px] px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                        placeholder="How can we help you?"
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={formStatus.isSubmitting}
                      className={`bg-gradient-to-r from-lime-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-lime-600 hover:to-green-700 transition-all duration-300 shadow-lg ${formStatus.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">Frequently Asked Questions</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-800">How do I get started with Favored Online?</h3>
                <p className="text-gray-700">
                  You can get started by creating an account and taking our comprehensive career assessment. This will provide you with personalized recommendations tailored to your skills and career goals.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-800">What payment methods do you accept?</h3>
                <p className="text-gray-700">
                  We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment gateway.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Do you offer refunds?</h3>
                <p className="text-gray-700">
                  Yes, we offer a 7-day satisfaction guarantee. If you're not satisfied with our service, contact us within 7 days of purchase for a full refund.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-800">How long do I have access to the platform?</h3>
                <p className="text-gray-700">
                  Upon purchasing our service, you will have 30 days of full access to all features and resources on our platform.
                </p>
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

export default CareerContact;
