import { API_URL } from '@/config/api';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "APPLICATION" | "REVIEW";
  link?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

const notificationService = {
  // Get current user notifications
  async getNotifications(): Promise<Notification[]> {
    try {
      const response = await fetch(`${API_URL}/api/notifications`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.warn("Failed to fetch notifications:", error);
      return [];
    }
  },

  // Mark a notification as read
  async markAsRead(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/api/notifications/${id}/read`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      throw error;
    }
  },

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/api/notifications/read-all`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to mark all as read');
      }
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      throw error;
    }
  },

  // Delete a notification
  async deleteNotification(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/api/notifications/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete notification');
      }
    } catch (error) {
      console.error("Failed to delete notification:", error);
      throw error;
    }
  },
};

export default notificationService;
