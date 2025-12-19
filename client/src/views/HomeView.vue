<script setup lang="ts">
import { onMounted, ref } from "vue";
import CardTest from "@/components/HomeView/CardTest.vue";
import ThePagination from "@/components/ThePagination.vue";
import TheLoader from "@/components/TheLoader.vue";
import { useTestStore } from "@/stores/test";
import { useTopics } from "@/composables/useTopics";

const testStore = useTestStore();
const { isLoading: topicsLoading } = useTopics();

const currentPage = ref(1);

const updatePage = async (page: number) => {
  currentPage.value = page;
  await testStore.fetchTests(currentPage.value);
};

document.title = "Головна";

onMounted(async () => {
  await testStore.fetchTests(currentPage.value);
});
</script>

<template>
  <main class="min-h-[calc(100vh-56px)]">
    <div class="container flex justify-center px-8">
      <div v-if="testStore.loading || topicsLoading" class="flex justify-center py-16">
        <TheLoader />
      </div>
      <div v-else-if="testStore.tests.length" class="py-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <CardTest v-for="test in testStore.tests" :key="test.id" :test="test" />
        </div>
        <ThePagination :currentPage="currentPage" :totalPages="testStore.totalPages" @update:currentPage="updatePage" />
      </div>
      <div v-else class="flex flex-col items-center justify-center py-16">
        <h3 class="text-2xl font-extrabold text-[#974fdb] mb-2">Наразі немає тестів</h3>
        <span class="text-gray-400 text-lg">Спробуйте пізніше!</span>
        <span class="text-5xl mt-4">📝</span>
      </div>
    </div>
  </main>
</template>
