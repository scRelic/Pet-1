<template>
  <div class="flex items-center justify-center py-8">
    <div class="relative">
      <div class="w-12 h-12 border-4 border-[#974fdb]/20 rounded-full animate-spin">
        <div
          class="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-[#974fdb] rounded-full animate-spin"
          style="animation-duration: 0.6s"></div>
      </div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#22D3EE] rounded-full animate-pulse"></div>
    </div>
    <span class="ml-4 text-[#974fdb] font-semibold text-lg">Завантаження...</span>
  </div>
</template>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
