<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Avatar from "@/components/FriendView/Avatar.vue";
import { useFriend } from "@/composables/useFriend";
import { useUserStore } from "@/stores/user";
import type { IFriend } from "@/types/friend";
import type router from "@/router";

const { searchFriend } = useFriend();
const userStore = useUserStore();

const searchQuery = ref("");
const foundFriends = ref<IFriend[]>([]);
const messageSearch = ref("");
const isSearching = ref(false);
const activeTab = ref<"all" | "online" | "search">("all");

const hasQuery = computed(() => searchQuery.value.trim().length > 0);
const friends = computed(() => userStore.friends || []);
const onlineFriends = computed(() => friends.value.filter((f) => f.is_online));

const displayFriends = computed(() => {
  if (hasQuery.value && foundFriends.value.length) return foundFriends.value;
  if (activeTab.value === "online") return onlineFriends.value;
  return friends.value;
});

const handleSearch = async () => {
  messageSearch.value = "";
  foundFriends.value = [];

  if (!hasQuery.value) {
    activeTab.value = "all";
    return;
  }

  isSearching.value = true;
  activeTab.value = "search";

  try {
    const res = await searchFriend(searchQuery.value.trim());
    const data: IFriend[] = Array.isArray(res) ? res : (res as any)?.friends ?? [];
    foundFriends.value = data;

    if (data.length === 0) {
      messageSearch.value = "Нічого не знайдено";
    }
  } catch (e: any) {
    messageSearch.value = e?.response?.data?.message || "Помилка пошуку";
  } finally {
    isSearching.value = false;
  }
};

const clearSearch = () => {
  searchQuery.value = "";
  foundFriends.value = [];
  messageSearch.value = "";
  activeTab.value = "all";
};

onMounted(async () => {
  await userStore.getUserFriends();
});

document.title = "Друзі";
</script>

<template>
  <main class="py-10">
    <div class="container mx-auto px-4">
      <div class="bg-gradient-to-br from-[#1a1625] to-[#0f0e13] rounded-2xl border border-[#2b2136] shadow-2xl overflow-hidden">
        <div class="bg-gradient-to-r from-[#974fdb]/10 to-[#6c3bbf]/10 border-b border-[#2b2136] px-8 py-6">
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#974fdb] to-[#6c3bbf] flex items-center justify-center shadow-xl">
                <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h1 class="text-3xl font-extrabold text-white tracking-tight">Мої друзі</h1>
                <p class="text-sm text-gray-400 mt-1">
                  {{ friends.length }} {{ friends.length === 1 ? "друг" : friends.length < 5 ? "друга" : "друзів" }}
                  <span v-if="onlineFriends.length > 0" class="ml-2">
                    • <span class="text-green-400">{{ onlineFriends.length }} онлайн</span>
                  </span>
                </p>
              </div>
            </div>

            <div class="w-full lg:w-auto lg:min-w-[320px]">
              <div
                class="relative flex items-center bg-[#211f2b] border border-[#3a3342] rounded-xl px-4 py-3 focus-within:border-[#974fdb] focus-within:shadow-lg focus-within:shadow-[#974fdb]/20 transition-all">
                <svg class="w-5 h-5 text-[#974fdb] mr-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="7"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  v-model="searchQuery"
                  @input="handleSearch"
                  type="text"
                  placeholder="Знайти друзів..."
                  class="bg-transparent outline-none text-white placeholder:text-gray-500 w-full" />
                <span v-if="hasQuery" @click="clearSearch" class="ml-2 text-gray-400 hover:text-white cursor-pointer transition text-lg"> ✕ </span>
              </div>
            </div>
          </div>

          <div class="flex gap-3 mt-6">
            <button
              @click="
                activeTab = 'all';
                clearSearch();
              "
              :class="[
                'px-6 py-2 rounded-lg font-semibold transition-all ',
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-[#974fdb] to-[#6c3bbf] text-white shadow-lg'
                  : 'bg-[#211f2b] text-gray-400 hover:text-white hover:bg-[#2c293a] cursor-pointer',
              ]">
              Всі ({{ friends.length }})
            </button>
            <button
              @click="activeTab = 'online'"
              :class="[
                'px-6 py-2 rounded-lg font-semibold transition-all',
                activeTab === 'online'
                  ? 'bg-gradient-to-r from-[#974fdb] to-[#6c3bbf] text-white shadow-lg'
                  : 'bg-[#211f2b] text-gray-400 hover:text-white hover:bg-[#2c293a] cursor-pointer',
              ]">
              <span class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-green-400"></span>
                Онлайн ({{ onlineFriends.length }})
              </span>
            </button>
          </div>
        </div>

        <div class="p-8 min-h-[400px]">
          <div v-if="userStore.loading || isSearching" class="flex flex-col items-center justify-center py-20">
            <div class="w-16 h-16 border-4 border-[#974fdb] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-gray-400">Завантаження...</p>
          </div>

          <div v-else-if="messageSearch && hasQuery" class="flex flex-col items-center justify-center py-20">
            <div class="w-20 h-20 rounded-full bg-[#2b2136] flex items-center justify-center mb-6">
              <span class="text-4xl">🔍</span>
            </div>
            <p class="text-gray-400 text-center text-lg">{{ messageSearch }}</p>
          </div>

          <div v-else-if="displayFriends.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            <router-link
              :to="`/friend/${friend.id}`"
              v-for="friend in displayFriends"
              :key="friend.id"
              class="group flex flex-col items-center p-4 rounded-xl bg-[#1a1625] border border-[#2b2136] hover:border-[#974fdb] hover:shadow-xl hover:shadow-[#974fdb]/20 hover:scale-105 transition-all duration-300 cursor-pointer">
              <Avatar :friend="friend" />
            </router-link>
          </div>

          <div v-else class="flex flex-col items-center justify-center py-20">
            <div class="w-24 h-24 rounded-full bg-gradient-to-br from-[#974fdb]/20 to-[#6c3bbf]/20 flex items-center justify-center mb-6">
              <span class="text-6xl">👥</span>
            </div>
            <h3 class="text-white text-xl font-bold mb-2">
              {{ activeTab === "online" ? "Немає онлайн друзів" : "У вас поки немає друзів" }}
            </h3>
            <p class="text-gray-400 text-center max-w-md">
              {{ activeTab === "online" ? "Зараз жоден з ваших друзів не в мережі" : "Використовуйте пошук вище, щоб знайти нових друзів та додати їх" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
