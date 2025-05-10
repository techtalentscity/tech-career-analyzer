// api/claude-proxy.js - Vercel Serverless Function
import axios from 'axios';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for proper request body
  if (!req.body || !req.body.messages || !req.body.model) {
    return res.status(400).json({ error: 'Invalid request format' });
  }

  try {
    // Call the Claude API with your secure API key
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    // Return the Claude API response to the client
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Claude API error:', error.response?.data || error.message);
    
    // Return a sanitized error message
    return res.status(error.response?.status || 500).json({ 
      error: 'Error calling Claude API',
      message: error.response?.data?.error?.message || error.message,
      type: error.response?.data?.error?.type || 'unknown'
    });
  }
}
