<script setup lang="ts">
import { ref, onMounted } from "vue";
import CustomSelect from "../CustomSelect.vue";
import { useFilterSortStore } from "@/stores/filterSort";
import { useTestStore } from "@/stores/test";
import { useTopics } from "@/composables/useTopics";
import { useUserStore } from "@/stores/user";
import TheAvatar from "./TheAvatar.vue";

const currentPage = ref(1);
const filterSortStore = useFilterSortStore();
const testStore = useTestStore();
const userStore = useUserStore();
const { topics, fetchTopics } = useTopics();

const resetFilters = () => {
  filterSortStore.resetFilters();
  testStore.fetchTests(currentPage.value);
};

onMounted(async () => {
  await fetchTopics();
});
</script>

<template>
  <section class="flex flex-col h-full">
    <div class="flex-1 overflow-y-auto">
      <div>
        <label class="block text-gray-400 mb-2 font-semibold">Пошук</label>
        <input
          v-model="filterSortStore.searchTest"
          type="text"
          placeholder="Введіть назву тесту"
          class="w-full px-4 py-2 rounded-lg bg-[#2C293A] border border-[#974fdb] text-white focus:outline-none focus:border-[#22D3EE] transition" />
      </div>
      <div class="mt-4">
        <label class="block text-gray-400 mb-2 font-semibold">Категорія</label>
        <CustomSelect v-model="filterSortStore.category" :options="topics.map((topic) => ({ value: String(topic.id), label: topic.name }))" />
      </div>

      <div class="mt-4">
        <label class="block text-gray-400 mb-2 font-semibold">Складність</label>
        <CustomSelect
          v-model="filterSortStore.difficulty"
          :options="[
            { value: 'easy', label: 'Легкий рівень' },
            { value: 'medium', label: 'Середній рівень' },
            { value: 'hard', label: 'Важкий рівень' },
          ]" />
      </div>

      <div class="mt-4">
        <label class="block text-gray-400 mb-2 font-semibold">Статус тесту</label>
        <div class="flex flex-col gap-3">
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="radio" v-model="filterSortStore.statusTest" value="all" class="hidden peer" />
            <span
              class="w-5 h-5 rounded border-2 border-[#22D3EE] flex items-center justify-center transition peer-checked:bg-[#974fdb] peer-checked:border-[#974fdb] bg-[#2C293A] group-hover:border-[#974fdb]">
              <svg
                v-if="filterSortStore.statusTest === 'all'"
                class="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span class="text-gray-300 font-semibold">Всі</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="radio" v-model="filterSortStore.statusTest" value="not-completed" class="hidden peer" />
            <span
              class="w-5 h-5 rounded border-2 border-[#22D3EE] flex items-center justify-center transition peer-checked:bg-[#974fdb] peer-checked:border-[#974fdb] bg-[#2C293A] group-hover:border-[#974fdb]">
              <svg
                v-if="filterSortStore.statusTest === 'not-completed'"
                class="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span class="text-gray-300 font-semibold">Не завершений</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="radio" v-model="filterSortStore.statusTest" value="completed" class="hidden peer" />
            <span
              class="w-5 h-5 rounded border-2 border-[#22D3EE] flex items-center justify-center transition peer-checked:bg-[#974fdb] peer-checked:border-[#974fdb] bg-[#2C293A] group-hover:border-[#974fdb]">
              <svg
                v-if="filterSortStore.statusTest === 'completed'"
                class="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span class="text-gray-300 font-semibold">Завершений</span>
          </label>
        </div>
      </div>
      <div class="flex gap-2 mt-8 mb-4">
        <button
          @click="testStore.fetchTests()"
          class="px-4 py-2 rounded-lg bg-gradient-to-r from-[#974fdb] to-[#22D3EE] text-white font-bold hover:from-[#22D3EE] hover:to-[#974fdb] transition cursor-pointer">
          Застосувати
        </button>
        <button @click="resetFilters()" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white font-bold hover:bg-gray-600 transition cursor-pointer">
          Скинути
        </button>
      </div>
    </div>
    <TheAvatar />
  </section>
</template>
