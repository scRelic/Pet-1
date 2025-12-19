import { api } from "../http";
import { ref } from "vue";
import type { INotification } from "@/types/notification";

export const useNotification = () => {
  const notifications = ref<INotification[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const isLoaded = ref(false);
  const hasMore = ref(true);

  const fetchNotifications = async (limit = 6, offset = 0, append = false) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.get(`/notifications`, {
        params: { limit, offset },
      });
      if (append) {
        notifications.value = [...notifications.value, ...response.data];
      } else {
        notifications.value = response.data;
      }
      hasMore.value = response.data.length >= limit;
      isLoaded.value = true;
    } catch (err: any) {
      error.value = err.message || "Failed to fetch notifications";
      console.error("Error fetching notifications:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const deleteNotification = async (notificationId: number) => {
    isLoading.value = true;
    error.value = null;
    try {
      await api.delete(`/notifications/${notificationId}`);
      notifications.value = notifications.value.filter((n) => n.id !== notificationId);
    } catch (err: any) {
      error.value = err.message || "Failed to delete notification";
      console.error("Error deleting notification:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const markAsRead = async (notificationId: number) => {
    isLoading.value = true;
    error.value = null;
    try {
      await api.put(`/notifications/${notificationId}/read`);
      const notification = notifications.value.find((n) => n.id === notificationId);
      if (notification) {
        notification.is_read = true;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to mark notification as read";
      console.error("Error marking notification as read:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    notifications,
    isLoading,
    error,
    isLoaded,
    hasMore,
    fetchNotifications,
    deleteNotification,
    markAsRead,
  };
};
