import { createAuthClient } from "better-auth/react";

// Use same-origin `/api/auth` (Next.js rewrites proxies to the backend).
// This avoids cross-domain cookies and CORS entirely in production.
export const authClient = createAuthClient({
  // No baseURL => Better Auth will call `/api/auth/...` on the current origin.
  // On Vercel, `next.config.ts` rewrites this to your backend.
  fetchOptions: {
    credentials: "include",
  },
});
