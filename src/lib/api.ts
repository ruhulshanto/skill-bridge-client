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

export type TutorReviewDto = {
  id: string;
  user: string;
  userImage?: string | null;
  rating: number;
  comment?: string | null;
  createdAt: string;
};

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
        cache: 'no-store', // Prevent browser caching
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

      const contentType = response.headers.get('content-type') ?? '';
      let payload: unknown = null;

      if (contentType.includes('application/json')) {
        try {
          payload = await response.json();
        } catch {
          payload = null;
        }
      } else if (!response.ok) {
        const text = (await response.text()).trim().slice(0, 280);
        return {
          error: {
            message: text || 'Request failed',
            code: response.status.toString(),
          },
        };
      }

      if (!response.ok && payload !== null && typeof payload === 'object') {
        const body = payload as Record<string, unknown>;
        const nested = body?.error as Record<string, unknown> | undefined;
        const message =
          (typeof body?.message === 'string' && body.message) ||
          (typeof nested?.message === 'string' && nested.message) ||
          'Request failed';

        return {
          error: {
            message,
            code: response.status.toString(),
          },
        };
      }

      if (!response.ok) {
        return {
          error: {
            message: 'Request failed',
            code: response.status.toString(),
          },
        };
      }

      return { data: payload as T };
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

  async getTutorStats(): Promise<ApiResponse<{ minPrice: number; maxPrice: number; avgPrice: number }>> {
    return this.request('/api/tutors/stats');
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

  async getTutorReviews(tutorId: string): Promise<ApiResponse<TutorReviewDto[]>> {
    const res = await this.request(`/api/reviews/tutor/${tutorId}`);
    if (res.error) return { error: res.error };
    const payload = res.data as unknown;
    const list =
      Array.isArray(payload)
        ? payload
        : payload &&
          typeof payload === 'object' &&
          'data' in payload &&
          Array.isArray((payload as { data: unknown[] }).data)
          ? (payload as { data: unknown[] }).data
          : [];
    return { data: list as TutorReviewDto[] };
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
  }): Promise<ApiResponse<User>> {
    return this.request<User>('/api/student/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Admin profile endpoints
  async getAdminProfile(): Promise<ApiResponse<User>> {
    return this.request<User>('/api/admin/profile');
  }

  async updateAdminProfile(profileData: {
    name?: string;
    phone?: string;
    bio?: string;
    location?: string;
  }): Promise<ApiResponse<User>> {
    return this.request<User>('/api/admin/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }
}

export const apiClient = new ApiClient(API_URL);
