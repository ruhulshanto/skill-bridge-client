// Use Vercel backend URL for development
export const API_URL = process.env.NODE_ENV === 'development' 
  ? 'https://skill-bridge-server-five.vercel.app' // Replace with your actual Vercel URL
  : ''; // Empty string for production to use same-origin
