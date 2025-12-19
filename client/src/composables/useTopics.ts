import { ref } from "vue";
import { api } from "../http";
import type { ITopic } from "@/types/topic";

export const useTopics = () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const isLoaded = ref(false);
  const topics = ref<ITopic[]>([]);

  const fetchTopics = async () => {
    if (isLoaded.value) return;

    isLoading.value = true;
    error.value = null;

    try {
      const response = await api.get("/topics");
      topics.value = response.data;
      isLoaded.value = true;
    } catch (e: any) {
      error.value = e.message || "Failed to fetch topics";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    topics,
    isLoading,
    error,
    fetchTopics,
  };
};
