<script setup>
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
</script>

<template>
  <div class="mt-auto border-t border-[#2b2136] bg-gradient-to-br from-[#1a1625] to-[#0f0e13] p-4 rounded-xl">
    <router-link to="/profile" class="block group">
      <div class="flex items-center gap-3">
        <div class="relative">
          <div
            class="w-12 h-12 rounded-full bg-gradient-to-br from-[#974fdb] to-[#6c3bbf] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span class="text-xl font-bold text-white">
              {{ userStore.user?.username?.charAt(0).toUpperCase() || "U" }}
            </span>
          </div>
          <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#0f0e13]"></div>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-white font-semibold text-sm truncate group-hover:text-[#22D3EE] transition">
            {{ userStore.user?.username || "Користувач" }}
          </h3>
          <p class="text-gray-500 text-xs truncate">Переглянути профіль</p>
        </div>
        <svg class="w-5 h-5 text-gray-500 group-hover:text-[#974fdb] transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </router-link>
  </div>
</template>
