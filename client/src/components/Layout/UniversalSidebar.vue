<script setup lang="ts">
import { computed } from "vue";
import { AkHomeAlt1 } from "@kalimahapps/vue-icons";
import { CgProfile } from "@kalimahapps/vue-icons";
import { CaFriendship } from "@kalimahapps/vue-icons";
import TheAvatar from "./TheAvatar.vue";
import route from "@/router";

const navLinks = [
  { name: "Головна", icon: AkHomeAlt1, to: "/" },
  { name: "Профіль", icon: CgProfile, to: "/profile" },
  { name: "Друзі", icon: CaFriendship, to: "/friends" },
];

const isProfilePage = computed(() => route.currentRoute.value.path.startsWith("/profile"));
</script>

<template>
  <section class="flex flex-col h-full">
    <nav class="flex-1 w-full flex flex-col gap-2 overflow-y-auto">
      <router-link
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-white font-medium hover:bg-[#392750] transition"
        active-class="bg-[#392750] text-[#22D3EE]">
        <span class="text-[#22D3EE]"><component :is="link.icon" /></span>
        <span>{{ link.name }}</span>
      </router-link>
    </nav>
    <TheAvatar v-if="!isProfilePage" />
  </section>
</template>
