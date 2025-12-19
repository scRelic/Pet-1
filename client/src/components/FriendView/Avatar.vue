<script setup lang="ts">
import type { IFriend } from "@/types/friend";

interface IProps {
  friend: IFriend;
}

const props = defineProps<IProps>();
</script>

<template>
  <div class="flex gap-1 flex-col items-center hover:scale-105 transition-transform duration-300 cursor-pointer">
    <div class="w-14 h-14 rounded-full border-2 border-[#22D3EE] flex items-center justify-center bg-yellow-500">
      <span class="text-white text-2xl font-semibold drop-shadow">{{ props.friend.username?.charAt(0) }}</span>
    </div>
    <div class="max-w-[90px]">
      <span class="text-white text-sm block truncate">
        {{ props.friend.username }}
      </span>
    </div>
  </div>
</template>
