<script setup lang="ts">
import { computed } from "vue";

interface IProps {
  currentPage: number;
  totalPages: number;
}

const props = defineProps<IProps>();

const emit = defineEmits(["update:currentPage"]);

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) emit("update:currentPage", page);
};

const pages = computed(() => {
  const arr = [];
  for (let i = 1; i <= props.totalPages; i++) arr.push(i);
  return arr;
});
</script>

<template>
  <nav class="flex flex-col items-center gap-2 mt-18 select-none">
    <div class="flex justify-center items-center gap-2">
      <button
        class="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-[#974fdb] to-[#6c3bbf] text-white shadow transition hover:from-[#6c3bbf] hover:to-[#974fdb] disabled:opacity-40 cursor-pointer"
        :disabled="props.currentPage === 1"
        @click="goToPage(props.currentPage - 1)">
        ←
      </button>
      <button
        v-for="page in pages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-4 py-2 rounded-xl font-bold transition shadow',
          page === props.currentPage
            ? 'bg-gradient-to-r from-[#974fdb] to-[#6c3bbf] text-white'
            : 'bg-[#211F2B] text-[#974fdb] hover:bg-[#392750] hover:text-white cursor-pointer',
        ]">
        {{ page }}
      </button>
      <button
        class="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-[#974fdb] to-[#6c3bbf] text-white shadow transition hover:from-[#6c3bbf] hover:to-[#974fdb] disabled:opacity-40 cursor-pointer"
        :disabled="props.currentPage === props.totalPages"
        @click="goToPage(props.currentPage + 1)">
        →
      </button>
    </div>
    <div class="mt-2 text-sm text-gray-400">
      Сторінка <span class="font-bold text-[#974fdb]">{{ props.currentPage }}</span> з <span class="font-bold text-[#974fdb]">{{ props.totalPages }}</span>
    </div>
  </nav>
</template>

<style scoped>
nav button {
  outline: none;
}
</style>
