import { API_URL } from '@/config/api';

export interface AdminStats {
  totalUsers: number;
  totalTutors: number;
  totalStudents: number;
  totalBookings: number;
  completedBookings: number;
  totalReviews: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'TUTOR' | 'ADMIN';
  status: 'ACTIVE' | 'BANNED';
  createdAt: string;
  tutorProfile?: {
    id: string;
    hourlyRate: number;
    rating: number;
    totalReviews: number;
  };
}

export interface Booking {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  totalAmount: number;
  notes?: string;
  meetingLink?: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
  tutor: {
    id: string;
    hourlyRate: number;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
  review?: {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

const adminService = {
  // Get dashboard statistics
  async getStats(): Promise<AdminStats> {
    const response = await fetch(`${API_URL}/api/admin/stats`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch admin stats');
    }

    const data = await response.json();
    return data.data;
  },

  // Get all users
  async getUsers(params?: {
    role?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: User[]; pagination: any }> {
    const searchParams = new URLSearchParams();
    if (params?.role) searchParams.append('role', params.role);
    if (params?.status) searchParams.append('status', params.status);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_URL}/api/admin/users?${searchParams}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return await response.json();
  },

  // Update user status
  async updateUserStatus(userId: string, status: string): Promise<User> {
    const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update user status');
    }

    const data = await response.json();
    return data.data;
  },

  // Get all bookings
  async getBookings(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Booking[]; pagination: any }> {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_URL}/api/admin/bookings?${searchParams}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }

    return await response.json();
  },

  // Get all categories
  async getCategories(): Promise<{ data: Category[] }> {
    const response = await fetch(`${API_URL}/api/admin/categories`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return await response.json();
  },

  // Create category
  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    const response = await fetch(`${API_URL}/api/admin/categories`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      throw new Error('Failed to create category');
    }

    const data = await response.json();
    return data.data;
  },

  // Update category
  async updateCategory(id: string, category: Partial<Category>): Promise<Category> {
    const response = await fetch(`${API_URL}/api/admin/categories/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      throw new Error('Failed to update category');
    }

    const data = await response.json();
    return data.data;
  },

  // Delete category
  async deleteCategory(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/admin/categories/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
  },
};

export default adminService;
