<script setup lang="ts">
import type { IAchievement } from "@/types/achievement";

interface IProps {
  achievements: IAchievement[];
}

const props = defineProps<IProps>();
</script>

<template>
  <section class="bg-[#211F2B] rounded-2xl p-8 shadow-xl border border-[#6c3bbf] w-full">
    <h3 class="text-2xl font-extrabold text-[#22D3EE] mb-6 tracking-tight">Досягнення</h3>
    <div v-if="props.achievements && props.achievements.length" class="grid grid-cols-2 gap-4">
      <div v-for="ach in props.achievements" :key="ach.id" class="flex flex-col items-center bg-gradient-to-br from-[#974fdb] to-[#22D3EE] rounded-xl p-4">
        <img :src="`/icons/achievements/${ach.icon_url}`" alt="icon" class="w-12 h-12 mb-2" />
        <span class="text-white font-semibold">{{ ach.title }}</span>
      </div>
    </div>
    <div v-else class="text-gray-400 text-center">У цього користувача немає досягнень</div>
  </section>
</template>
