// Use Vercel backend URL for development
export const API_URL = process.env.NODE_ENV === 'development' 
  ? 'https://skill-bridge-server-five.vercel.app' // its deployment URL
  : ''; // Empty string for production to use same-origin
