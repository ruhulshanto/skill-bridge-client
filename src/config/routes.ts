// Public routes
export const publicRoutes = {
  home: "/",
  tutors: "/tutors",
  tutorDetail: (id: string) => `/tutors/${id}`,
  about: "/about",
  contact: "/contact",
};

// Auth routes
export const authRoutes = {
  login: "/login",
  register: "/register",
};

// Student routes
export const studentRoutes = {
  dashboard: "/dashboard",
  bookings: "/dashboard/bookings",
  bookingDetail: (id: string) => `/dashboard/bookings/${id}`,
  profile: "/dashboard/profile",
};

// Tutor routes
export const tutorRoutes = {
  dashboard: "/tutor/dashboard",
  availability: "/tutor/availability",
  sessions: "/tutor/sessions",
  sessionDetail: (id: string) => `/tutor/sessions/${id}`,
  profile: "/tutor/profile",
};

// Admin routes
export const adminRoutes = {
  dashboard: "/admin",
  users: "/admin/users",
  userDetail: (id: string) => `/admin/users/${id}`,
  bookings: "/admin/bookings",
  categories: "/admin/categories",
};
