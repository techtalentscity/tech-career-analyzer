// api/gemini-proxy.js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Enhanced request validation
  if (!req.body) {
    return res.status(400).json({ 
      error: 'Missing request body' 
    });
  }
  
  if (!req.body.model) {
    return res.status(400).json({ 
      error: 'Missing model in request',
      details: 'Request must specify a valid Gemini model'
    });
  }
  
  if (!req.body.contents) {
    return res.status(400).json({
      error: 'Missing contents in request',
      details: 'Request must include a contents array with at least one item'
    });
  }
  
  try {
    // Log request details for debugging
    console.log('Gemini API Request:', {
      model: req.body.model,
      contentsLength: req.body.contents.length
    });
    
    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY environment variable is not set');
      return res.status(500).json({
        error: 'API configuration error',
        details: 'Gemini API key is not configured'
      });
    }
    
    // Prepare the request body
    const requestBody = {
      model: req.body.model,
      contents: req.body.contents,
      generationConfig: req.body.generationConfig || {
        temperature: 0.2,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: req.body.maxOutputTokens || 4096
      }
    };
    
    // Call the Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${requestBody.model}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      return res.status(response.status).json({
        error: 'Gemini API error',
        details: errorData.error?.message || response.statusText,
        status: response.status
      });
    }
    
    // Successfully received response from Gemini API
    const data = await response.json();
    
    // Log response structure for debugging
    console.log('Gemini API Response Structure:', {
      hasFinishReason: !!data.candidates?.[0]?.finishReason,
      contentType: data.candidates?.[0]?.content ? 'content' : 'undefined'
    });
    
    // Return the Gemini API response to the client
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Gemini API Request Error:', error);
    
    // Provide detailed error information
    return res.status(500).json({ 
      error: 'Error processing request',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
