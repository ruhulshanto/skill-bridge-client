// Use Vercel backend URL for development
export const API_URL = process.env.NODE_ENV === 'development' 
  ? 'https://skill-bridge-server-nndvym0uf-ruhul-amin-shantos-projects.vercel.app' // Updated to new server URL
  : ''; // Empty string for production to use same-origin
