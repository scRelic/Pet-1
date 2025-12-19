import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilterSortStore = defineStore("filterSort", () => {
  const sort = ref<string>("random");
  const searchTest = ref<string | null>(null);
  const category = ref<string>("");
  const difficulty = ref<string>("");
  const statusTest = ref<"all" | "completed" | "not-completed">("all");

  const resetFilters = () => {
    searchTest.value = null;
    category.value = "";
    difficulty.value = "";
    statusTest.value = "all";
  };
  return { sort, searchTest, category, difficulty, statusTest, resetFilters };
});
