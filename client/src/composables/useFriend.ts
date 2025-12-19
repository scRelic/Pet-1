import { api } from "../http";
import { ref } from "vue";
import type { IFriend } from "@/types/friend";

export const useFriend = () => {
  const friend = ref<IFriend | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const isLoaded = ref(false);

  const fetchFriend = async (friendId: number) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.get(`/friends/${friendId}`);
      friend.value = response.data;
      isLoaded.value = true;
    } catch (err: any) {
      error.value = err.message || "Failed to fetch friend";
      console.error("Error fetching friend:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const deleteFriend = async (friendId: number) => {
    isLoading.value = true;
    error.value = null;
    try {
      await api.delete(`/friends/${friendId}`);
      friend.value = null;
      isLoaded.value = false;
    } catch (err: any) {
      error.value = err.message || "Failed to delete friend";
      console.error("Error deleting friend:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const addFriend = async (friendId: number) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.post(`/friends/${friendId}`);
      friend.value = response.data;
      isLoaded.value = true;
    } catch (err: any) {
      error.value = err.message || "Failed to add friend";
      console.error("Error adding friend:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const searchFriend = async (username: string): Promise<IFriend[] | { friends: IFriend[] }> => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.get(`/friends/search?username=${encodeURIComponent(username)}`);
      return response.data;
    } catch (err: any) {
      error.value = err.message || "Failed to search friend";
      console.error("Error searching for friend:", err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    friend,
    isLoading,
    error,
    fetchFriend,
    deleteFriend,
    searchFriend,
    addFriend,
  };
};
