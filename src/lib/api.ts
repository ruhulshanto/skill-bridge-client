import { API_URL } from '@/config/api';

import { User } from '@/types';

export interface LoginResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // Include cookies for Better Auth
        ...options,
      };

      // Add auth token if available (for backward compatibility)
      const token = this.getAuthToken();
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          error: {
            message: data.message || 'Request failed',
            code: response.status.toString(),
          },
        };
      }

      return { data };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Network error',
        },
      };
    }
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
    role: 'STUDENT' | 'TUTOR';
  }) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getMe(): Promise<ApiResponse<User>> {
    return this.request('/api/auth/me');
  }

  // Tutors endpoints
  async getTutors(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
    minRating?: string;
    maxRate?: string;
  }): Promise<ApiResponse<{ data: User[], meta: any }>> {
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
      return this.request<{ data: User[], meta: any }>(`/api/tutors${query ? `?${query}` : ''}`);
    } catch (error) {
      // Return empty result if API is not available
      console.warn("API not available, returning empty tutors:", error);
      return {
        data: { data: [], meta: { total: 0, page: 1, limit: 10 } }
      };
    }
  }

  async getTutorById(id: string): Promise<ApiResponse<User>> {
    try {
      return this.request<User>(`/api/tutors/${id}`);
    } catch (error) {
      // Return null if API is not available
      console.warn("API not available, returning null for tutor:", error);
      return { data: undefined };
    }
  }

  // Bookings endpoints
  async createBooking(bookingData: {
    tutorId: string;
    date: string;
    startTime: string;
    endTime: string;
    notes?: string;
  }) {
    return this.request('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getMyBookings() {
    return this.request('/api/bookings/my');
  }

  async updateBookingStatus(id: string, status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED') {
    return this.request(`/api/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async rescheduleBooking(id: string, rescheduleData: {
    date?: string;
    startTime?: string;
    endTime?: string;
  }) {
    return this.request(`/api/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(rescheduleData),
    });
  }

  // Reviews endpoints
  async createReview(reviewData: {
    bookingId: string;
    rating: number;
    comment?: string;
  }) {
    return this.request('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  async getTutorReviews(tutorId: string) {
    return this.request(`/api/reviews/tutor/${tutorId}`);
  }

  // Categories endpoints
  async getCategories() {
    return this.request('/api/categories');
  }

  // Student profile endpoints
  async getStudentProfile(): Promise<ApiResponse<User>> {
    return this.request('/api/student/profile');
  }

  async updateStudentProfile(profileData: {
    name?: string;
    phone?: string;
    bio?: string;
    location?: string;
  }) {
    return this.request('/api/student/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Admin profile endpoints
  async updateAdminProfile(profileData: {
    name?: string;
    phone?: string;
    bio?: string;
    location?: string;
  }) {
    return this.request('/api/admin/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }
}

export const apiClient = new ApiClient(API_URL);
