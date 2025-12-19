<script setup lang="ts">
import { computed } from "vue";
import SidebarFilter from "./SidebarFilter.vue";
import UniversalSidebar from "./UniversalSidebar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const page = computed(() => {
  const path = route.path;
  if (path === "/" || path.startsWith("/home")) return "home";
  else return "other";
});
</script>

<template>
  <aside class="w-72 bg-[#211F2B] border-r border-[#6c3bbf] p-4 flex flex-col h-screen">
    <div class="flex items-center gap-2 mb-10">
      <router-link to="/" class="font-extrabold text-2xl tracking-tight cursor-pointer">
        <span class="text-[#974fdb]">Test</span>
        <span class="text-white">Check</span>
      </router-link>
    </div>
    <div class="flex-1 flex flex-col min-h-0">
      <UniversalSidebar v-if="page !== 'home'" />
      <SidebarFilter v-else />
    </div>
  </aside>
</template>
