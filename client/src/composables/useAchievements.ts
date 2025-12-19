import { api } from "../http";
import type { IAchievement } from "@/types/achievement";
import { ref } from "vue";

export const useAchievements = () => {
  const achievements = ref<IAchievement[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const isLoaded = ref(false);

  const fetchAchievements = async () => {
    if (isLoaded.value) return;

    isLoading.value = true;
    error.value = null;

    try {
      const response = await api.get("/achievements");
      achievements.value = response.data;
      isLoaded.value = true;
    } catch (err: any) {
      error.value = err.message || "Failed to fetch achievements";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    achievements,
    fetchAchievements,
    isLoading,
    error,
  };
};
