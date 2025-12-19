<script setup lang="ts">
import type { ITest } from "@/types/test";

interface IProps {
  test: ITest;
}

interface IDefficultyOption {
  label: string;
  color: string;
}

const props = defineProps<IProps>();

const difficultyOptions: Record<string, IDefficultyOption> = {
  easy: { label: "Легкий", color: "bg-green-200 text-green-800" },
  medium: { label: "Середній", color: "bg-yellow-200 text-yellow-800" },
  hard: { label: "Складний", color: "bg-red-200 text-red-800" },
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "completed":
      return "Завершений";
    default:
      return "Не завершений";
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-[#FFD700] text-yellow-800";
    default:
      return "bg-orange-200 text-orange-800";
  }
};
</script>

<template>
  <div class="bg-card w-full rounded-xl p-6 flex flex-col justify-between border border-[#392750] hover:shadow-lg transition-shadow">
    <div class="flex flex-col items-center">
      <div class="mb-3 flex gap-2">
        <span class="inline-block rounded-full px-3 py-1 text-xs font-bold mb-2" :class="getStatusClass(props.test.status)">{{
          getStatusLabel(props.test.status)
        }}</span>
        <span :class="difficultyOptions[props.test.difficulty]?.color" class="inline-block rounded-full px-3 py-1 text-xs font-bold mb-2">{{
          difficultyOptions[props.test.difficulty]?.label
        }}</span>
      </div>
      <h3 class="text-lg font-bold text-white mb-2 text-center">{{ props.test.name }}</h3>
      <p class="text-secondary text-center mb-4">{{ props.test.description }}</p>
    </div>
    <div class="flex flex-col items-center">
      <div class="text-secondary mb-4 text-sm">Питань: {{ props.test.questionCount }}</div>
      <router-link
        :to="`/test/${props.test.id}`"
        class="bttn-primary w-full py-2 rounded-lg font-semibold text-base transition cursor-pointer text-center text-white flex items-center justify-center gap-2">
        Почати тест
      </router-link>
    </div>
  </div>
</template>
