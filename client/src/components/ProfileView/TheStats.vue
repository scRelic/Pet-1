<script setup lang="ts">
import { SiVitest } from "@kalimahapps/vue-icons";
import { TaFilledRosetteDiscountCheck } from "@kalimahapps/vue-icons";

interface IProps {
  countTests: number;
  averageScore: number;
}

const props = defineProps<IProps>();
</script>

<template>
  <div class="grid grid-cols-2 gap-6">
    <div class="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl border border-green-300">
      <div class="flex items-center gap-3">
        <SiVitest class="text-white w-6 h-6" />
        <span class="text-3xl font-extrabold text-white drop-shadow">{{ props.countTests ?? 0 }}</span>
      </div>
      <span class="text-white mt-2 font-medium text-center">Пройдено тестів</span>
    </div>

    <div class="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 flex flex-col items-center shadow-xl border border-blue-300">
      <div class="flex items-center gap-3">
        <TaFilledRosetteDiscountCheck class="text-white w-6 h-6" />
        <span class="text-3xl font-extrabold text-white drop-shadow">{{ props.averageScore ?? 0 }}%</span>
      </div>
      <span class="text-white mt-2 font-medium text-center">Середній бал правильних відповідей</span>
    </div>
  </div>
</template>
