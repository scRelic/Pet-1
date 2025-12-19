<script setup lang="ts">
import { ref, computed } from "vue";
import Avatar from "../FriendView/Avatar.vue";
import { useFriend } from "@/composables/useFriend";
import type { IFriend } from "@/types/friend";

const props = withDefaults(
  defineProps<{
    friends?: IFriend[];
    max?: number;
  }>(),
  {
    friends: () => [],
    max: 8,
  }
);

const { searchFriend } = useFriend();

const searchQuery = ref("");
const foundFriends = ref<IFriend[]>([]);
const messageSearch = ref("");

const hasQuery = computed(() => searchQuery.value.trim().length > 0);
const maxFriends = computed(() => props.max ?? 8);

const handleSearch = async () => {
  messageSearch.value = "";
  foundFriends.value = [];

  if (!hasQuery.value) return;

  try {
    const res = await searchFriend(searchQuery.value.trim());

    const data: IFriend[] = Array.isArray(res) ? res : (res as any)?.friends ?? [];
    foundFriends.value = data;

    if (data.length === 0) {
      messageSearch.value = "Нічого не знайдено";
    }
  } catch (e: any) {
    messageSearch.value = e?.response?.data?.message || "Помилка пошуку";
  }
};
</script>

<template>
  <section class="bg-gradient-to-br from-[#1a1625] to-[#0f0e13] rounded-2xl border border-[#2b2136] shadow-xl overflow-hidden">
    <div class="bg-gradient-to-r from-[#974fdb]/10 to-[#6c3bbf]/10 border-b border-[#2b2136] px-6 py-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#974fdb] to-[#6c3bbf] flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-2xl font-extrabold text-white tracking-tight">Друзі</h3>
            <p class="text-sm text-gray-400">
              {{ props.friends.length }} {{ props.friends.length === 1 ? "друг" : props.friends.length < 5 ? "друга" : "друзів" }}
            </p>
          </div>
        </div>

        <div class="w-full sm:w-auto sm:min-w-[280px]">
          <div
            class="relative flex items-center bg-[#211f2b] border border-[#3a3342] rounded-xl px-4 py-2.5 focus-within:border-[#974fdb] focus-within:shadow-lg focus-within:shadow-[#974fdb]/20 transition-all">
            <svg class="w-5 h-5 text-[#974fdb] mr-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Пошук друзів..."
              class="bg-transparent outline-none text-white placeholder:text-gray-500 w-full text-sm" />
            <span
              v-if="hasQuery"
              @click="
                searchQuery = '';
                handleSearch();
              "
              class="ml-2 text-gray-400 hover:text-white cursor-pointer transition">
              ✕
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="p-6 min-h-[200px]">
      <div v-if="messageSearch && hasQuery" class="flex flex-col items-center justify-center py-12">
        <div class="w-16 h-16 rounded-full bg-[#2b2136] flex items-center justify-center mb-4">
          <span class="text-3xl">🔍</span>
        </div>
        <p class="text-gray-400 text-center">{{ messageSearch }}</p>
      </div>

      <div v-else-if="props.friends.length && !hasQuery" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div
          v-for="friend in props.friends.slice(0, maxFriends)"
          :key="friend.id"
          class="group flex flex-col items-center p-3 rounded-xl bg-[#1a1625] border border-[#2b2136] hover:border-[#974fdb] hover:shadow-lg hover:shadow-[#974fdb]/20 transition-all cursor-pointer">
          <Avatar :friend="friend" />
        </div>
      </div>

      <div v-else-if="hasQuery && foundFriends.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div
          v-for="friend in foundFriends.slice(0, maxFriends)"
          :key="friend.id"
          class="group flex flex-col items-center p-3 rounded-xl bg-[#1a1625] border border-[#2b2136] hover:border-[#974fdb] hover:shadow-lg hover:shadow-[#974fdb]/20 transition-all cursor-pointer">
          <Avatar :friend="friend" />
        </div>
      </div>

      <div v-else-if="!hasQuery && props.friends.length === 0" class="flex flex-col items-center justify-center py-12">
        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-[#974fdb]/20 to-[#6c3bbf]/20 flex items-center justify-center mb-4">
          <span class="text-5xl">👥</span>
        </div>
        <p class="text-gray-400 text-center text-lg">У вас поки немає друзів</p>
        <p class="text-gray-500 text-center text-sm mt-2">Використовуйте пошук, щоб знайти нових друзів</p>
      </div>
    </div>
  </section>
</template>
