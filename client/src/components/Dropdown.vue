<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <div @click="toggleDropdown">
      <slot name="trigger" />
    </div>
    <div v-if="isOpen" class="bg-gradient absolute border border-[#402E57] right-0 mt-1 min-w-[140px] rounded-xl shadow-xl z-20 py-2 animate-fade-in">
      <div @click="isOpen = false">
        <slot name="menu" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.2s ease;
}

.bg-gradient {
  background: linear-gradient(to right, #3e1f5f, #1f2c5f);
}
</style>
