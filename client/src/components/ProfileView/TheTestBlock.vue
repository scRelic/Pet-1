<script setup lang="ts">
import { formatDate } from "@/utils";

interface ITestProps {
  id: number;
  name?: string;
  description?: string;
  completed_at?: string;
  score?: number;
  total_questions?: number;
}

interface IProps {
  tests: ITestProps[];
}

const props = defineProps<IProps>();
const tests = props.tests ?? [];

const emit = defineEmits(["notifySuccess"]);

const handleNotifySuccess = (message: string) => {
  emit("notifySuccess", message);
};
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <article
      v-for="t in tests"
      :key="t.id"
      class="test-card p-4 rounded-2xl bg-gradient-to-b from-[#0f0e13] to-[#141217] border border-[#2b2136] flex flex-col justify-between">
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#974fdb] to-[#6c3bbf] flex items-center justify-center text-white font-bold">
          <span class="text-sm">T</span>
        </div>

        <div class="min-w-0 flex-1">
          <h4 class="text-sm font-semibold text-white truncate">{{ t.name || "Тест" }}</h4>
          <p class="text-xs text-gray-400 mt-1 truncate">{{ t.description || "" }}</p>

          <div class="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-400">
            <span
              >Пройдено: <strong class="text-white">{{ formatDate(t.completed_at ?? null) || "—" }}</strong></span
            >
            <span
              >Правильних: <strong class="text-white">{{ t.score ?? 0 }}</strong></span
            >
            <span v-if="t.score !== undefined && t.total_questions !== undefined"
              >Оцінка: <strong class="text-white">{{ t.score }} / {{ t.total_questions }}</strong></span
            >
          </div>
        </div>
      </div>

      <div class="mt-4 flex items-center justify-between gap-2">
        <div class="flex w-full sm:w-auto flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <button
            @click="handleNotifySuccess('В розробці!')"
            class="px-3 py-2 rounded-md bg-[#22D3EE] text-black font-semibold text-sm hover:opacity-95 transition text-center cursor-pointer">
            Переглянути
          </button>

          <router-link
            :to="`/test/${t.id}`"
            class="px-3 py-2 rounded-md bg-transparent border border-[#3a3342] text-[#cfc7dd] hover:bg-[#27242f] transition text-sm cursor-pointer">
            Повторити
          </router-link>
        </div>
      </div>
    </article>
  </div>
</template>
