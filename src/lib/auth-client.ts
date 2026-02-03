import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Better Auth server base URL (where /api/auth is mounted)
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
  // Ensure cookies are sent on cross-origin requests (Vercel client -> Vercel server)
  fetchOptions: {
    credentials: "include",
  },
});
