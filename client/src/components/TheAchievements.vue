<script setup lang="ts">
import type { IAchievement } from "@/types/achievement";

interface IProps {
  userAchievements: IAchievement[];
  globalAchievements: IAchievement[];
}

const props = defineProps<IProps>();

const userHasAchievement = (id: number) => {
  return props.userAchievements.some((a) => a.id === id);
};
</script>

<template>
  <section class="mt-4">
    <div v-if="props.userAchievements" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="achievement in props.globalAchievements"
        :key="achievement.id"
        :class="[
          'flex items-center gap-2 rounded-xl p-3 shadow border transition',
          userHasAchievement(achievement.id)
            ? 'bg-gradient-to-r from-[#974fdb] to-[#3b82f6] border-[#6c3bbf] text-white'
            : 'bg-[#211F2B] border-[#392750] text-gray-400 opacity-60',
        ]">
        <img class="w-10 h-10" :src="`/icons/achievements/${achievement.icon_url}`" alt="icon" />
        <div class="flex-1">
          <div class="text-lg font-semibold">{{ achievement.title }}</div>
        </div>
      </div>
    </div>
    <div v-else class="text-gray-400 italic">Користувач не має досягнень.</div>
  </section>
</template>
