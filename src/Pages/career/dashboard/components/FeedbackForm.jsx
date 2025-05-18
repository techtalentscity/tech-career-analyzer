import React, { useState } from 'react';
import { toast } from 'react-toastify';

const FeedbackForm = ({ setShowFeedbackForm, GOOGLE_FORM_URL }) => {
  const [feedbackData, setFeedbackData] = useState({
    rating: '',
    improvements: ''
  });
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  
  // Handle feedback form changes
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit feedback to Google Form
  const submitFeedback = async (e) => {
    e.preventDefault();
    setSubmittingFeedback(true);
    
    try {
      // Create FormData and append the feedback entries
      const formData = new FormData();
      
      // Use the actual entry IDs from your Google Form
      formData.append('entry.162050771', feedbackData.rating); // Rating question
      formData.append('entry.2083196363', feedbackData.improvements); // Improvement suggestions
      
      // Submit to Google Form
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Google Forms requires no-cors
      });
      
      // Show success message
      toast.success('Thank you for your feedback!');
      setShowFeedbackForm(false);
      setFeedbackData({
        rating: '',
        improvements: ''
      });
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setSubmittingFeedback(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Feedback</h2>
            <button
              onClick={() => setShowFeedbackForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={submitFeedback} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate your experience on our platform on a scale of 1 to 5, with 5 being excellent and 1 being poor?
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleFeedbackChange({ target: { name: 'rating', value: value.toString() } })}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      feedbackData.rating === value.toString()
                        ? 'bg-red-600 text-white border-red-600'
                        : 'border-gray-300 hover:border-red-500'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Improvements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Share any improvement suggestions you have
              </label>
              <textarea
                name="improvements"
                value={feedbackData.improvements}
                onChange={handleFeedbackChange}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                placeholder="Tell us how we can make this better..."
                required
              />
            </div>
            
            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={submittingFeedback || !feedbackData.rating || !feedbackData.improvements}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition disabled:bg-gray-400"
              >
                {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
              </button>
              <button
                type="button"
                onClick={() => setShowFeedbackForm(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
