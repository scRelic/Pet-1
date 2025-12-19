<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => router.push("/");
const goBack = () => router.back();

document.title = "404 — Сторінку не знайдено";
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-6">
    <div
      class="max-w-2xl w-full bg-[#0f1724]/60 backdrop-blur-md border border-[#2b2136] rounded-2xl p-10 text-center shadow-xl animate-fade-in"
      role="main"
      aria-labelledby="notfound-title">
      <div class="flex items-center justify-center mb-6">
        <div
          class="w-20 h-20 rounded-full bg-gradient-to-br from-[#974fdb] to-[#6c3bbf] flex items-center justify-center text-white text-3xl font-extrabold shadow-lg">
          404
        </div>
      </div>

      <h1 id="notfound-title" class="text-3xl md:text-4xl font-extrabold text-white mb-3">Сторінку не знайдено</h1>

      <p class="text-sm md:text-base text-gray-300 mb-6">
        Вибачте, сторінка, яку ви шукаєте, не існує або була переміщена. Перевірте адресу або поверніться на головну сторінку.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          @click="goHome"
          class="px-5 py-2 rounded-lg bg-gradient-to-br from-[#974fdb] to-[#6c3bbf] text-white font-semibold shadow hover:scale-[1.02] transition cursor-pointer">
          На головну
        </button>

        <button @click="goBack" class="px-5 py-2 rounded-lg border border-[#3a3342] text-[#cfc7dd] bg-transparent hover:bg-[#25232f] transition cursor-pointer">
          Повернутись назад
        </button>
      </div>

      <p class="text-xs text-gray-500 mt-6">Якщо проблема повторюється — зв'яжіться з підтримкою.</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 320ms ease;
}
</style>
