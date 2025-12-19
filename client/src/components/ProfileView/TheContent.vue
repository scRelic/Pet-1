<script setup lang="ts">
import { inject } from "vue";
import { formatDate } from "@/utils";
import { CaEmailNew } from "@kalimahapps/vue-icons";
import type { IUser } from "@/types/user";

interface IProps {
  user: IUser | null;
  isEditMode: boolean;
}

const props = defineProps<IProps>();

const toggleEditMode = inject("toggleEditMode") as () => void;
</script>

<template>
  <section
    v-if="props.user"
    class="bg-gradient-to-br from-[#974fdb] to-[#392750] rounded-2xl p-4 flex flex-col items-center relative shadow-2xl border border-[#6c3bbf] min-w-[500px] flex-1">
    <div
      @click="toggleEditMode"
      class="absolute top-4 right-4 cursor-pointer text-yellow-300 hover:text-yellow-500 font-semibold transition flex items-center gap-2">
      <img src="/icons/pencil.svg" alt="Edit" class="w-4 h-4" />
      <span>Редагувати</span>
    </div>
    <div class="relative w-28 h-28 flex items-center justify-center mb-2">
      <div class="w-28 h-28 rounded-full border-4 border-[#6c3bbf] flex items-center justify-center bg-[#974fdb] shadow-lg">
        <span class="text-white text-7xl font-extrabold drop-shadow">{{ props.user?.username?.charAt(0) }}</span>
      </div>
      <span class="absolute bottom-1 right-2 w-6 h-6 rounded-full bg-green-500 border-4 border-[#392750] flex items-center justify-center shadow">
        <span class="w-2 h-2 rounded-full bg-white block"></span>
      </span>
    </div>
    <h2 class="text-3xl font-extrabold text-white mb-2 tracking-tight flex items-center gap-2">
      {{ props.user?.username }}
      <span v-if="props.user?.profession === 'Full Stack Developer'" class="text-2xl">💻</span>
    </h2>
    <div class="text-gray-100 mb-2 text-center italic text-lg">
      <span v-if="props.user?.description">📝</span>
      {{ props.user?.description }}
    </div>
    <div class="text-gray-100 mb-2 text-center italic text-lg flex items-center justify-center gap-2">
      <span v-if="props.user?.profession">🎓</span>
      {{ props.user?.profession }}
    </div>
    <div class="text-gray-100 mb-4 flex items-center gap-2 text-lg justify-center">
      <CaEmailNew class="w-6 h-6 text-[#ffe6ff]" />
      <span class="font-bold">{{ props.user?.email }}</span>
    </div>
    <div class="text-gray-300 text-base mb-2 flex items-center gap-2 justify-center">
      <span>📅</span>
      Зареєстровано: <span class="font-semibold">{{ formatDate(props.user.created_at ?? null) }}</span>
    </div>
  </section>
</template>
