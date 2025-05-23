// api/claude-proxy-fetch.js
/**
 * Enhanced Claude API Proxy for Career Recommendation System
 * Handles structured UserProfile data and generates RecommendationResponse objects
 */

// Career recommendation system prompts
const SYSTEM_PROMPTS = {
  careerRecommendation: `You are an expert career counselor and tech industry analyst. Your role is to provide personalized career recommendations based on user profiles.

IMPORTANT: You must respond with a valid JSON object that matches the RecommendationResponse schema exactly. Do not include any text before or after the JSON.

Generate exactly 3 recommendations using these types:
1. "tech-interest-based" - Focus on technical interests, current role, and job technologies
2. "research-development" - Focus on publications, research tools, and time commitment  
3. "lifestyle-market" - Focus on work preferences, education level, and target salary

For each recommendation, consider:
- The 4 constant variables: yearsExperience, studyField, interests, transferableSkills
- Type-specific criteria as defined in the technical documentation
- Market demand and salary realism
- Required skills and suggested actions
- Confidence scoring based on data completeness

Use dynamic weighting: prioritize available data and apply fallback logic for missing information.`,

  dataValidation: `You are a data validation assistant for a career recommendation system. Analyze the provided UserProfile data and return a validation report in JSON format.`,
  
  generic: `You are Claude, a helpful AI assistant created by Anthropic.`
};

// Rate limiting configuration
const RATE_LIMITS = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 50, // per window per IP
  careerRecommendationLimit: 10 // career recommendations per window per IP
};

// Simple in-memory rate limiting (consider Redis for production)
const rateLimitStore = new Map();

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Request-Type'
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

  try {
    // Rate limiting
    const rateLimitResult = await checkRateLimit(req, res);
    if (!rateLimitResult.allowed) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        details: `Too many requests. Try again in ${Math.ceil(rateLimitResult.resetTime / 1000)} seconds.`,
        retryAfter: rateLimitResult.resetTime
      });
    }

    // Enhanced request validation
    const validation = validateRequest(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Invalid request format',
        details: validation.errors,
        example: getRequestExample(req.body.requestType)
      });
    }

    // Determine request type and handle accordingly
    const requestType = req.body.requestType || 'generic';
    
    switch (requestType) {
      case 'career-recommendation':
        return await handleCareerRecommendation(req, res);
      case 'data-validation':
        return await handleDataValidation(req, res);
      default:
        return await handleGenericRequest(req, res);
    }

  } catch (error) {
    console.error('Proxy Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString(),
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

/**
 * Handle career recommendation requests
 */
async function handleCareerRecommendation(req, res) {
  try {
    const { userProfile, options = {} } = req.body;
    
    // Validate UserProfile schema
    const profileValidation = validateUserProfile(userProfile);
    if (!profileValidation.isValid) {
      return res.status(400).json({
        error: 'Invalid UserProfile data',
        validation: profileValidation,
        details: 'UserProfile must contain valid data according to schema'
      });
    }

    // Sanitize user input
    const sanitizedProfile = sanitizeUserProfile(userProfile);
    
    // Create specialized prompt for career recommendations
    const prompt = createCareerRecommendationPrompt(sanitizedProfile, options);
    
    // Prepare Claude request
    const claudeRequest = {
      model: options.model || 'claude-3-sonnet-20240229',
      max_tokens: options.maxTokens || 4096,
      temperature: options.temperature || 0.3, // Lower for more consistent recommendations
      system: SYSTEM_PROMPTS.careerRecommendation,
      messages: [{
        role: 'user',
        content: prompt
      }]
    };

    // Log request for analytics
    console.log('Career Recommendation Request:', {
      userId: userProfile.email,
      dataCompleteness: profileValidation.dataCompleteness,
      constantsPresent: profileValidation.constantsPresent,
      timestamp: new Date().toISOString()
    });

    // Call Claude API
    const claudeResponse = await callClaudeAPI(claudeRequest);
    
    // Parse and validate response
    const recommendationResponse = parseRecommendationResponse(claudeResponse);
    
    // Add metadata
    const enhancedResponse = {
      ...recommendationResponse,
      metadata: {
        requestId: generateRequestId(),
        processedAt: new Date().toISOString(),
        userProfileValidation: profileValidation,
        model: claudeRequest.model,
        temperature: claudeRequest.temperature
      }
    };

    return res.status(200).json(enhancedResponse);

  } catch (error) {
    console.error('Career Recommendation Error:', error);
    return res.status(500).json({
      error: 'Failed to generate career recommendations',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

/**
 * Handle data validation requests
 */
async function handleDataValidation(req, res) {
  try {
    const { userProfile } = req.body;
    
    const validation = validateUserProfile(userProfile);
    
    return res.status(200).json({
      validation: validation,
      suggestions: generateDataImprovementSuggestions(validation),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Data Validation Error:', error);
    return res.status(500).json({
      error: 'Failed to validate data',
      details: error.message
    });
  }
}

/**
 * Handle generic Claude requests (legacy support)
 */
async function handleGenericRequest(req, res) {
  try {
    const requestBody = {
      model: req.body.model || 'claude-3-sonnet-20240229',
      messages: req.body.messages,
      max_tokens: req.body.max_tokens || 4096,
      temperature: req.body.temperature !== undefined ? req.body.temperature : 0.7,
      system: req.body.system || SYSTEM_PROMPTS.generic
    };

    const response = await callClaudeAPI(requestBody);
    return res.status(200).json(response);

  } catch (error) {
    console.error('Generic Request Error:', error);
    return res.status(500).json({
      error: 'Failed to process request',
      details: error.message
    });
  }
}

/**
 * Call Claude API with error handling and retries
 */
async function callClaudeAPI(requestBody, retries = 2) {
  if (!process.env.CLAUDE_API_KEY) {
    throw new Error('Claude API key is not configured');
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Don't retry client errors (4xx)
        if (response.status >= 400 && response.status < 500) {
          throw new Error(`Claude API error: ${errorData.error?.message || response.statusText}`);
        }
        
        // Retry server errors (5xx) if we have attempts left
        if (attempt < retries) {
          console.log(`Retrying Claude API call (attempt ${attempt + 1}/${retries + 1})`);
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1))); // Exponential backoff
          continue;
        }
        
        throw new Error(`Claude API error after ${retries + 1} attempts: ${errorData.error?.message || response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      if (attempt < retries && !error.message.includes('Claude API error:')) {
        console.log(`Retrying due to network error (attempt ${attempt + 1}/${retries + 1}):`, error.message);
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }
      throw error;
    }
  }
}

/**
 * Rate limiting check
 */
async function checkRateLimit(req, res) {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const windowStart = now - RATE_LIMITS.windowMs;
  
  // Clean old entries
  for (const [key, data] of rateLimitStore.entries()) {
    if (data.windowStart < windowStart) {
      rateLimitStore.delete(key);
    }
  }
  
  const key = `${clientIP}:${req.body.requestType || 'generic'}`;
  const currentData = rateLimitStore.get(key) || { count: 0, windowStart: now };
  
  if (currentData.windowStart < windowStart) {
    currentData.count = 0;
    currentData.windowStart = now;
  }
  
  const limit = req.body.requestType === 'career-recommendation' 
    ? RATE_LIMITS.careerRecommendationLimit 
    : RATE_LIMITS.maxRequests;
  
  if (currentData.count >= limit) {
    return {
      allowed: false,
      resetTime: RATE_LIMITS.windowMs - (now - currentData.windowStart)
    };
  }
  
  currentData.count++;
  rateLimitStore.set(key, currentData);
  
  return { allowed: true };
}

/**
 * Validate request format
 */
function validateRequest(body) {
  const errors = [];
  
  if (!body) {
    errors.push('Request body is required');
    return { isValid: false, errors };
  }
  
  const requestType = body.requestType || 'generic';
  
  if (requestType === 'career-recommendation') {
    if (!body.userProfile) {
      errors.push('userProfile is required for career recommendations');
    }
  } else if (requestType === 'data-validation') {
    if (!body.userProfile) {
      errors.push('userProfile is required for data validation');
    }
  } else {
    // Generic request validation
    if (!body.messages) {
      errors.push('messages array is required');
    } else if (!Array.isArray(body.messages) || body.messages.length === 0) {
      errors.push('messages must be a non-empty array');
    }
  }
  
  return { isValid: errors.length === 0, errors, requestType };
}

/**
 * Validate UserProfile against schema
 */
function validateUserProfile(profile) {
  if (!profile) {
    return { isValid: false, error: 'UserProfile is required' };
  }

  const constants = ['yearsExperience', 'studyField', 'interests', 'transferableSkills'];
  const validConstants = constants.filter(key => isValid(profile[key]));
  
  const requiredFields = ['email'];
  const missingRequired = requiredFields.filter(field => !profile[field]);
  
  const allFields = [
    'email', 'fullName',
    'yearsExperience', 'studyField', 'interests', 'transferableSkills',
    'techInterests', 'currentRole', 'jobTechnologies',
    'publications', 'toolsUsed', 'timeCommitment',
    'workPreference', 'educationLevel', 'targetSalary',
    'experienceLevel', 'jobResponsibilities', 'jobProjects'
  ];
  
  const validFields = allFields.filter(field => isValid(profile[field]));
  const dataCompleteness = Math.round((validFields.length / allFields.length) * 100);
  
  return {
    isValid: missingRequired.length === 0 && validConstants.length >= 1,
    constantsPresent: validConstants.length,
    constantsValid: validConstants,
    missingRequired: missingRequired,
    requiresFallback: validConstants.length < 2,
    dataCompleteness: dataCompleteness,
    validFields: validFields,
    totalFields: allFields.length
  };
}

/**
 * Check if value is valid per system specifications
 */
function isValid(value) {
  if (!value) return false;
  
  if (typeof value === 'string') {
    const invalid = ['', 'none', 'not sure', 'unclear', 'n/a', 'unknown', 'unsure'];
    const trimmed = value.toLowerCase().trim();
    return !invalid.includes(trimmed) && trimmed.length > 0;
  }
  
  if (Array.isArray(value)) {
    return value.length > 0 && 
           !value.some(v => ['not sure', 'unclear', 'unknown'].includes(v?.toLowerCase?.()));
  }
  
  return true;
}

/**
 * Sanitize user input
 */
function sanitizeUserProfile(profile) {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(profile)) {
    if (typeof value === 'string') {
      // Basic sanitization
      sanitized[key] = value.trim().substring(0, 1000); // Limit length
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(v => 
        typeof v === 'string' ? v.trim().substring(0, 100) : v
      ).slice(0, 20); // Limit array size
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Create specialized prompt for career recommendations
 */
function createCareerRecommendationPrompt(userProfile, options) {
  const validation = validateUserProfile(userProfile);
  
  return `Please analyze this user profile and generate career recommendations following the RecommendationResponse schema:

USER PROFILE:
${JSON.stringify(userProfile, null, 2)}

PROFILE ANALYSIS:
- Data Completeness: ${validation.dataCompleteness}%
- Constants Present: ${validation.constantsPresent}/4
- Requires Fallback: ${validation.requiresFallback}
- Valid Fields: ${validation.validFields.join(', ')}

INSTRUCTIONS:
1. Generate exactly 3 recommendations (tech-interest-based, research-development, lifestyle-market)
2. Use dynamic weighting based on available data
3. Apply fallback logic for missing constants
4. Provide realistic salary ranges and market demand assessments
5. Include specific, actionable suggested actions
6. Calculate confidence scores based on data availability

Return only valid JSON matching the RecommendationResponse schema.`;
}

/**
 * Parse and validate Claude's recommendation response
 */
function parseRecommendationResponse(claudeResponse) {
  try {
    // Extract text content from Claude's response
    let responseText = '';
    if (claudeResponse.content && Array.isArray(claudeResponse.content)) {
      responseText = claudeResponse.content
        .filter(item => item.type === 'text')
        .map(item => item.text)
        .join('');
    } else if (claudeResponse.completion) {
      responseText = claudeResponse.completion;
    }
    
    // Try to parse as JSON
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in Claude response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    // Basic validation of response structure
    if (!parsed.recommendations || !Array.isArray(parsed.recommendations)) {
      throw new Error('Invalid recommendation response structure');
    }
    
    return parsed;
    
  } catch (error) {
    console.error('Failed to parse recommendation response:', error);
    throw new Error(`Invalid recommendation response: ${error.message}`);
  }
}

/**
 * Generate data improvement suggestions
 */
function generateDataImprovementSuggestions(validation) {
  const suggestions = [];
  
  if (validation.constantsPresent < 4) {
    suggestions.push('Complete all 4 constant variables (yearsExperience, studyField, interests, transferableSkills) for better recommendations');
  }
  
  if (validation.dataCompleteness < 50) {
    suggestions.push('Provide more detailed information about your background and preferences');
  }
  
  if (validation.missingRequired.length > 0) {
    suggestions.push(`Please provide: ${validation.missingRequired.join(', ')}`);
  }
  
  return suggestions;
}

/**
 * Get request example for different types
 */
function getRequestExample(requestType) {
  const examples = {
    'career-recommendation': {
      requestType: 'career-recommendation',
      userProfile: {
        email: 'user@example.com',
        yearsExperience: '3-5',
        studyField: 'Computer Science',
        interests: ['AI', 'problem-solving'],
        transferableSkills: 'communication, analytical thinking'
      },
      options: {
        model: 'claude-3-sonnet-20240229',
        temperature: 0.3
      }
    },
    'data-validation': {
      requestType: 'data-validation',
      userProfile: {
        email: 'user@example.com',
        yearsExperience: '3-5'
      }
    }
  };
  
  return examples[requestType] || examples['career-recommendation'];
}

/**
 * Generate unique request ID
 */
function generateRequestId() {
  return `cr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
