// Use same-origin for API calls to leverage Next.js rewrites and authentication
export const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000' 
  : ''; // Empty string for production to use same-origin
