<script setup>
import { computed } from "vue";
import TheHeader from "./TheHeader.vue";
import TheSidebar from "./TheSidebar.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const showSidebar = computed(() => {
  const name = String(route.name ?? "");
  return name !== "Auth" && name !== "NotFound";
});
</script>

<template>
  <div class="min-h-screen">
    <TheSidebar v-if="showSidebar" class="fixed top-0 left-0 h-screen z-40" />
    <div :class="[showSidebar ? 'ml-72' : '', 'min-h-screen flex flex-col items-center p-2']">
      <div class="w-full">
        <TheHeader v-if="showSidebar" />
        <router-view />
      </div>
    </div>
  </div>
</template>
