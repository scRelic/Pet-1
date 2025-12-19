import { ref } from "vue";
import type { IQuestion } from "@/types/question";
import { api } from "../http";

export const useQuestions = () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const isLoaded = ref(false);
  const questions = ref<IQuestion[]>([]);

  const fetchQuestions = async (testId: number) => {
    if (isLoaded.value) return;

    isLoading.value = true;
    error.value = null;

    try {
      const response = await api.get(`/questions?testId=${testId}`);
      questions.value = response.data;
      isLoaded.value = true;
    } catch (e: any) {
      error.value = e.message || "Failed to fetch questions";
    } finally {
      isLoading.value = false;
    }
  };

  return { questions, isLoading, error, fetchQuestions };
};
