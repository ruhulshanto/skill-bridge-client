import { API_URL } from '@/config/api';
import { apiClient } from '@/lib/api';

export interface StudentBooking {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  totalAmount: number;
  notes?: string;
  meetingLink?: string;
  createdAt: string;
  tutor: {
    id: string;
    hourlyRate: number;
    rating: number;
    totalReviews: number;
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  };
  review?: {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
  };
}

export interface StudentStats {
  totalBookings: number;
  completedBookings: number;
  upcomingBookings: number;
  totalSpent: number;
  averageRating: number;
}

export interface CreateBookingRequest {
  tutorId: string;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  timezone?: string;
  language?: string;
  notifications?: boolean;
  twoFactor?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  category: 'sessions' | 'subjects' | 'rating' | 'streak';
  isActive: boolean;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  totalRequired: number;
  category: string;
}

export interface RecentActivity {
  id: string;
  type: 'booking' | 'review' | 'achievement' | 'goal';
  title: string;
  description: string;
  date: string;
  tutor?: {
    id: string;
    name: string;
    image?: string;
  };
  rating?: number;
}

// Shared mock data source - REMOVED - Use real database data only

const studentService = {
  // Get student dashboard stats
  async getStats(): Promise<StudentStats> {
    // Calculate stats from bookings (dedicated endpoint doesn't exist)
    try {
      const bookingsResponse = await fetch(`${API_URL}/api/bookings`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (bookingsResponse.ok) {
        const bookingsData = await bookingsResponse.json();
        const bookings = bookingsData.data || [];
        
        // Calculate stats from bookings
        const totalBookings = bookings.length;
        const completedBookings = bookings.filter((b: any) => b.status === 'COMPLETED').length;
        const upcomingBookings = bookings.filter((b: any) => b.status === 'CONFIRMED').length;
        const totalSpent = bookings.reduce((sum: number, b: any) => sum + (b.totalAmount || 0), 0);
        const reviews = bookings
          .filter((b: any) => b.review)
          .map((b: any) => b.review!.rating);
        const averageRating = reviews.length > 0
          ? reviews.reduce((sum: number, r: number) => sum + r, 0) / reviews.length
          : 0;

        return {
          totalBookings,
          completedBookings,
          upcomingBookings,
          totalSpent: Math.round(totalSpent / 100),
          averageRating: Math.round(averageRating * 10) / 10,
        };
      }
    } catch (error) {
      console.error("Failed to fetch bookings for stats calculation:", error);
    }

    // Return default values if everything fails
    return {
      totalBookings: 0,
      completedBookings: 0,
      upcomingBookings: 0,
      totalSpent: 0,
      averageRating: 0,
    };
  },

  // Get student bookings
  async getBookings(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: StudentBooking[]; pagination: any }> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.status) searchParams.append('status', params.status);
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());

      const response = await fetch(`${API_URL}/api/bookings?${searchParams}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch student bookings');
      }

      return await response.json();
    } catch (error) {
      // Return empty bookings if API is not available - NO HARDCODED DATA
      console.warn("API not available, returning empty bookings:", error);
      
      return {
        data: [],
        pagination: { page: params?.page || 1, limit: params?.limit || 10, total: 0 }
      };
    }
  },

  // Get recent activity
  async getRecentActivity(limit: number = 5): Promise<RecentActivity[]> {
    try {
      const response = await fetch(`${API_URL}/api/student/activity?limit=${limit}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recent activity');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      // Return empty activity if API is not available - NO HARDCODED DATA
      console.warn("API not available, returning empty activity:", error);
      return [];
    }
  },

  // Get learning goals
  async getLearningGoals(): Promise<LearningGoal[]> {
    try {
      const response = await fetch(`${API_URL}/api/student/goals`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch learning goals');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      // Return empty goals if API is not available - NO HARDCODED DATA
      console.warn("API not available, returning empty goals:", error);
      return [];
    }
  },

  // Get achievements
  async getAchievements(): Promise<Achievement[]> {
    try {
      const response = await fetch(`${API_URL}/api/student/achievements`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch achievements');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      // Return empty achievements if API is not available - NO HARDCODED DATA
      console.warn("API not available, returning empty achievements:", error);
      return [];
    }
  },

  // Get student profile
  async getProfile(): Promise<StudentProfile> {
    const response = await fetch(`${API_URL}/api/student/profile`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch student profile');
    }

    const data = await response.json();
    return data.data;
  },

  // Update student profile
  async updateProfile(profile: Partial<StudentProfile>): Promise<StudentProfile> {
    const response = await fetch(`${API_URL}/api/student/profile`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      throw new Error('Failed to update student profile');
    }

    const data = await response.json();
    return data.data;
  },

  // Create new booking
  async createBooking(booking: CreateBookingRequest): Promise<StudentBooking> {
    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });

      // Check if response is HTML (backend not running or wrong endpoint)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        throw new Error('Backend server is not running or API endpoint not found. Please start your backend server.');
      }

      if (!response.ok) {
        const errorText = await response.text();
        // Check if it's HTML error page
        if (errorText.includes('<!DOCTYPE') || errorText.includes('<html>')) {
          throw new Error('Backend server returned HTML error page. API endpoint may not exist.');
        }
        
        // Try to parse as JSON for proper error messages
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
        
        throw new Error(errorData.error?.message || `Failed to create booking: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Booking failed:", error);
      throw new Error(`Failed to book session: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  },

  // Cancel booking
  async cancelBooking(bookingId: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/bookings/${bookingId}/cancel`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to cancel booking');
    }
  },

  // Leave review
  async leaveReview(bookingId: string, review: {
    rating: number;
    comment: string;
  }): Promise<void> {
    const result = await apiClient.createReview({
      bookingId,
      rating: review.rating,
      comment: review.comment,
    });

    if (result.error) {
      throw new Error(result.error.message || 'Failed to leave review');
    }
  },

  // Get available tutors for browsing
  async getAvailableTutors(params?: {
    category?: string;
    rating?: number;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }): Promise<{ data: any[]; pagination: any }> {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.rating) searchParams.append('rating', params.rating.toString());
    if (params?.minPrice) searchParams.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_URL}/api/tutors/available?${searchParams}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch available tutors');
    }

    return await response.json();
  },
};

export default studentService;
