// API configuration for different environments
export const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : (process.env.NEXT_PUBLIC_API_URL || '');

export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
};