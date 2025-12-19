<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import router from "@/router";
import { useAuth } from "@/composables/useAuth";

const { logout } = useAuth();
const userStore = useUserStore();

const handleLogout = () => {
  logout();
  router.push("/");
};
</script>

<template>
  <header class="text-gray-800 pt-3">
    <div class="container flex items-center justify-end">
      <div class="flex items-center gap-4">
        <router-link
          v-if="userStore.isAuthChecked === false"
          to="/auth"
          class="bg-purple-700 hover:bg-purple-800 hover:scale-105 px-4 py-2 font-bold block text-center rounded-lg text-white transition"
          >Увійти</router-link
        >
      </div>
    </div>
  </header>
</template>
