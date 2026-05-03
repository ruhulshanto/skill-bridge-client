import { createAuthClient } from "better-auth/react";

// Use same-origin `/api/auth` (Next.js rewrites proxies to the backend).
// This avoids cross-domain cookies and CORS entirely in production.
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
  fetchOptions: {
    credentials: "include",
  },
});
