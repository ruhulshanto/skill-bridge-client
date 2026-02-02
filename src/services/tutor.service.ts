import { API_URL } from '@/config/api';

export interface TutorStats {
  totalSessions: number;
  completedSessions: number;
  totalEarnings: number;
  rating: number;
  totalReviews: number;
}

export interface TutorBooking {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  totalAmount: number;
  notes?: string;
  meetingLink?: string;
  createdAt: string;
  student: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  review?: {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
  };
}

export interface TutorProfile {
  id: string;
  userId: string;
  bio: string;
  hourlyRate: number;
  experience: number;
  education?: string;
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  subjects?: Array<{
    id: string;
    subject: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
  availability?: Array<{
    id: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }>;
}

export interface UpdateProfileRequest {
  bio?: string;
  subjects?: string[];
  hourlyRate?: number;
  education?: string;
  availability?: Array<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable?: boolean;
  }>;
}

export interface TutorStudent {
  id: string;
  name: string;
  email: string;
  image?: string;
  subject: string;
  totalSessions: number;
  completedSessions: number;
  upcomingSessions: number;
  lastSession: string;
  rating?: number;
}

// Public tutor service for browsing tutors
export interface PublicTutor {
  id: string;
  name: string;
  email: string;
  role: "TUTOR";
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  tutorProfile?: TutorProfile;
}

const tutorService = {
  // Get tutor dashboard stats
  async getStats(): Promise<TutorStats> {
    try {
      const response = await fetch(`${API_URL}/api/tutor/stats`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tutor stats');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      // Return minimal fallback stats if API is not available
      console.warn("API not available, returning minimal stats:", error);
      return {
        totalSessions: 0,
        completedSessions: 0,
        totalEarnings: 0,
        rating: 0,
        totalReviews: 0,
      };
    }
  },

  // Get tutor students
  async getStudents(): Promise<TutorStudent[]> {
    try {
      const response = await fetch(`${API_URL}/api/tutor/students`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tutor students');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      // Return empty array if API is not available
      console.warn("API not available, returning empty students:", error);
      return [];
    }
  },

  // Get tutor bookings/sessions
  async getBookings(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: TutorBooking[]; pagination: any }> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.status) searchParams.append('status', params.status);
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());

      const response = await fetch(`${API_URL}/api/tutor/bookings?${searchParams}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tutor bookings');
      }

      return await response.json();
    } catch (error) {
      // Return empty bookings if API is not available
      console.warn("API not available, returning empty bookings:", error);
      return {
        data: [],
        pagination: { page: 1, limit: 10, total: 0 }
      };
    }
  },

  // Get tutor profile
  async getProfile(): Promise<TutorProfile> {
    try {
      const response = await fetch(`${API_URL}/api/tutor/profile`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // Profile doesn't exist yet, create a default one
          throw new Error('PROFILE_NOT_FOUND');
        }
        throw new Error('Failed to fetch tutor profile');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      if (error instanceof Error && error.message === 'PROFILE_NOT_FOUND') {
        // Return a default profile for new tutors
        return {
          id: '',
          userId: '',
          bio: '',
          hourlyRate: 0,
          experience: 0,
          education: '',
          rating: 0,
          totalReviews: 0,
          isVerified: false,
          subjects: [],
          availability: [],
        };
      }
      console.error("Failed to fetch tutor profile:", error);
      throw new Error('Tutor profile not available');
    }
  },

  // Update tutor profile
  async updateProfile(profile: UpdateProfileRequest): Promise<TutorProfile> {
    try {
      const response = await fetch(`${API_URL}/api/tutor/profile`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to update profile');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  },

  // Update availability
  async updateAvailability(availability: Array<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable?: boolean;
  }>): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/api/tutor/availability`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availability }),
      });

      if (!response.ok) {
        throw new Error('Failed to update availability');
      }
    } catch (error) {
      console.error("Failed to update availability:", error);
      throw error;
    }
  },

  // Get availability
  async getAvailability(): Promise<TutorProfile['availability']> {
    try {
      const response = await fetch(`${API_URL}/api/tutor/availability`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch availability');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.warn("API not available, returning empty availability:", error);
      return [];
    }
  },
};

// Public tutor service for browsing
export const publicTutorService = {
  // Get all available tutors (for public browsing)
  async getTutors(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
    minRating?: string;
    maxRate?: string;
  }): Promise<{ data: PublicTutor[], meta: any }> {
    try {
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
      }

      const query = searchParams.toString();
      const response = await fetch(`${API_URL}/api/public/tutors${query ? `?${query}` : ''}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tutors');
      }

      return await response.json();
    } catch (error) {
      // Return empty result if API is not available
      console.warn("API not available, returning empty tutors:", error);
      return {
        data: [],
        meta: { total: 0, page: 1, limit: 10 }
      };
    }
  },

  // Get tutor by ID (for public profiles)
  async getTutorById(id: string): Promise<PublicTutor | null> {
    try {
      const response = await fetch(`${API_URL}/api/public/tutors/${id}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tutor');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.warn("API not available, returning null for tutor:", error);
      return null;
    }
  },
};

export default tutorService;
