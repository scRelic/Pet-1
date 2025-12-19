<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

import type { IUser } from "@/types/user";
import type { IAchievement } from "@/types/achievement";

import TheAchievements from "../TheAchievements.vue";
import NotificationItem from "./NotificationItem.vue";
import TheTestBlock from "./TheTestBlock.vue";
import TheStats from "./TheStats.vue";
import ThePagination from "../ThePagination.vue";

import { useNotification } from "@/composables/useNotification";
import { useNotify } from "@/composables/useNotify";

import { useUserStore } from "@/stores/user";

interface IProps {
  user: IUser | null;
  isEditMode: boolean;
  globalAchievements: IAchievement[];
}

const props = defineProps<IProps>();
const { fetchNotifications, deleteNotification, markAsRead, notifications, isLoading: notificationsLoading, hasMore } = useNotification();
const { notifySuccess } = useNotify();
const userStore = useUserStore();

const NOTIFICATIONS_PAGE_SIZE = 6;
const notificationsOffset = ref(0);

const loadMoreNotifications = async () => {
  notificationsOffset.value += NOTIFICATIONS_PAGE_SIZE;
  await fetchNotifications(NOTIFICATIONS_PAGE_SIZE, notificationsOffset.value, true);
};

const tabs = [
  { key: "stats", label: "Статистика" },
  { key: "achievements", label: "Досягнення" },
  { key: "notifications", label: "Сповіщення" },
  { key: "tests", label: "Пройдені тести" },
];

const active = ref<string>("stats");

const countTests = computed(() => props.user?.countTests ?? 0);
const averageScore = computed(() => props.user?.averageScore ?? 0);

const handleDeleteNotification = (id: number) => {
  deleteNotification(id);
};

const currentPage = ref(1);
const testsLoaded = ref(false);

const updatePage = async (page: number) => {
  currentPage.value = page;
  await userStore.fetchUserTests(currentPage.value);
};

const loadInitialTests = async () => {
  if (!testsLoaded.value) {
    await userStore.fetchUserTests(currentPage.value);
    testsLoaded.value = true;
  }
};

const resetTestsCache = () => {
  testsLoaded.value = false;
  currentPage.value = 1;
};

defineExpose({ resetTestsCache });

watch(active, async (newTab) => {
  if (newTab === "tests") {
    await loadInitialTests();
  }
});

onMounted(async () => {
  try {
    await fetchNotifications();
    if (active.value === "tests") {
      await loadInitialTests();
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2 mb-2">
      <div class="flex gap-2 bg-[#241f2b] rounded-xl p-1">
        <button
          v-for="t in tabs"
          :key="t.key"
          @click="active = t.key"
          :aria-pressed="active === t.key"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-semibold transition',
            active === t.key
              ? 'bg-gradient-to-br from-[#974fdb] to-[#6c3bbf] text-white shadow'
              : 'text-[#cfc7dd] hover:bg-[#2c293a] hover:text-white cursor-pointer',
          ]">
          {{ t.label }}
        </button>
      </div>
    </div>

    <transition name="fade-slide" mode="out-in">
      <section v-if="active === 'stats'" key="stats" class="mt-4">
        <TheStats :countTests="countTests" :averageScore="averageScore" />
      </section>

      <TheAchievements
        v-else-if="active === 'achievements'"
        key="achievements"
        :userAchievements="props.user?.achievements || []"
        :globalAchievements="props.globalAchievements" />

      <section v-else-if="active === 'notifications'" key="notifications" class="flex flex-col gap-4">
        <div v-if="notifications.length === 0" class="text-gray-400 text-center py-6">Немає сповіщень</div>
        <template v-else>
          <NotificationItem
            v-for="notification in notifications"
            :notification="notification"
            :key="notification.id"
            @handleDeleteNotification="handleDeleteNotification"
            @markAsRead="markAsRead" />
          <button
            v-if="hasMore && !notificationsLoading"
            @click="loadMoreNotifications"
            class="mt-4 px-10 py-2 rounded-lg bg-gradient-to-br from-[#974fdb] to-[#6c3bbf] text-white font-semibold shadow hover:opacity-90 transition flex mx-auto cursor-pointer">
            Більше...
          </button>
          <div v-if="notificationsLoading" class="text-gray-400 text-center py-4">Завантаження...</div>
        </template>
      </section>

      <section v-else-if="active === 'tests'" key="tests" class="mt-4">
        <div v-if="userStore.loading" class="text-gray-400 text-center py-6">Завантаження...</div>
        <div v-else-if="!userStore.userTests.length" class="text-gray-400 text-center py-6">Користувач ще не проходив тестів <span>😔</span></div>
        <template v-else>
          <TheTestBlock :tests="userStore.userTests" @notifySuccess="notifySuccess" />
          <ThePagination v-if="userStore.totalPages > 1" :currentPage="currentPage" :totalPages="userStore.totalPages" @update:currentPage="updatePage" />
        </template>
      </section>
    </transition>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 280ms ease, transform 280ms ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.995);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.995);
}
</style>
