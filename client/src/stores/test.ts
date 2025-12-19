import { defineStore } from "pinia";
import { ref } from "vue";
import type { ITest } from "@/types/test";
import { api } from "../http";
import { useFilterSortStore } from "@/stores/filterSort";
import { useUserStore } from "@/stores/user";

export const useTestStore = defineStore("test", () => {
  const tests = ref<ITest[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const totalPages = ref(0);
  const filterSortStore = useFilterSortStore();

  const fetchTests = async (page = 1) => {
    loading.value = true;
    error.value = null;

    const params = new URLSearchParams({
      page: page.toString(),
      sort: filterSortStore.sort,
    });

    if (filterSortStore.category) params.append("topic", filterSortStore.category);
    if (filterSortStore.searchTest) params.append("search", filterSortStore.searchTest);
    if (filterSortStore.difficulty) params.append("difficulty", filterSortStore.difficulty);
    if (filterSortStore.statusTest !== null && filterSortStore.statusTest !== "all") {
      params.append("status", filterSortStore.statusTest);
    }

    try {
      const response = await api.get(`/tests?${params.toString()}`);
      tests.value = response.data.tests;
      totalPages.value = Math.ceil(response.data.totalCount / 12);
    } catch (e: any) {
      error.value = e.message || "Failed to fetch tests";
    } finally {
      loading.value = false;
    }
  };

  const saveResultsForTest = async (test_id: number, score: number, total_questions: number) => {
    loading.value = true;
    error.value = null;
    try {
      await api.post(`/user-tests`, { test_id, score, total_questions });
      const userStore = useUserStore();
      userStore.userTests = [];
    } catch (e: any) {
      error.value = e.message || "Failed to save test results";
    } finally {
      loading.value = false;
    }
  };

  return { tests, loading, error, totalPages, fetchTests, saveResultsForTest };
});
