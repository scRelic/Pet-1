<script setup lang="ts">
import type { IFriend } from "@/types/friend";

interface IProps {
  friend: IFriend;
  handleDeleteFriend: () => Promise<void>;
  handleAddFriend: () => Promise<void>;
}

const props = defineProps<IProps>();
const emit = defineEmits(["notifySuccess"]);

const handleNotifySuccess = (message: string) => {
  emit("notifySuccess", message);
};
</script>

<template>
  <section v-if="friend" class="bg-gradient-to-br from-[#974fdb] to-[#392750] rounded-2xl p-8 items-center border border-[#6c3bbf] gap-8 justify-between">
    <div class="flex gap-6 justify-between">
      <div class="flex gap-6">
        <div class="flex flex-col items-center">
          <div class="relative w-28 h-28 flex items-center justify-center mb-2">
            <div class="w-28 h-28 rounded-full border-4 border-[#22D3EE] flex items-center justify-center bg-yellow-500">
              <span class="text-white text-5xl font-bold drop-shadow">
                {{ props.friend.username?.charAt(0) }}
              </span>
            </div>
          </div>
          <h2 class="text-3xl font-extrabold text-white tracking-tight">
            {{ props.friend.username }}
          </h2>
        </div>

        <div class="flex flex-col">
          <div class="flex flex-col gap-2 mt-2">
            <div class="text-gray-100 italic flex items-center gap-2">
              <span v-if="props.friend.profession">🎓</span>
              {{ props.friend.profession }}
            </div>
            <div class="text-gray-100 italic flex items-center gap-2">
              <span v-if="props.friend.description">📝</span>
              {{ props.friend.description }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="bg-[#22D3EE] rounded-xl px-5 py-3 text-white font-bold flex flex-col items-center w-36">
          <span class="text-xl">{{ props.friend.testsPassed }}</span>
          <span class="text-xs">Пройдено тестів</span>
        </div>
        <div class="bg-[#974fdb] rounded-xl px-5 py-3 text-white font-bold flex flex-col items-center w-36">
          <span class="text-xl">{{ props.friend.averageScore }}%</span>
          <span class="text-xs">Середній бал</span>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4 mt-6 w-full">
      <button
        @click="handleNotifySuccess('В розробці!')"
        v-if="props.friend.status === 'friend'"
        class="px-4 py-2 rounded-lg bg-[#22D3EE] text-white font-bold hover:bg-sky-400 transition cursor-pointer">
        Написати повідомлення
      </button>
      <button
        v-if="props.friend.status === 'not_friend'"
        @click="props.handleAddFriend"
        class="px-4 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition cursor-pointer">
        Додати в друзі
      </button>
      <button
        v-if="props.friend.status === 'friend'"
        @click="props.handleDeleteFriend"
        class="px-4 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition cursor-pointer">
        Видалити з друзів
      </button>
    </div>
  </section>
</template>
