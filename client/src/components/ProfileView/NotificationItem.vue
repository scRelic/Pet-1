<script setup lang="ts">
import type { INotification } from "@/types/notification";
import { formatDate } from "@/utils";

interface IProps {
  notification: INotification;
}

const props = defineProps<IProps>();
const emit = defineEmits(["handleDeleteNotification", "markAsRead"]);

const removeNotification = (id: number) => {
  emit("handleDeleteNotification", id);
};

const onMark = (id: number) => {
  if (props.notification.is_read) return;
  emit("markAsRead", id);
};
</script>

<template>
  <div
    class="flex items-start gap-3 p-3 rounded-xl bg-[#17161d] hover:bg-[#25232f] transition-shadow shadow-sm border border-[#22D3EE]/50"
    :class="{ 'ring-2 ring-[#22D3EE]/30': !props.notification.is_read }">
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2 min-w-0">
          <span v-if="!props.notification.is_read" class="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" aria-hidden="true"></span>
        </div>
        <time class="text-xs text-gray-400 shrink-0">{{ formatDate(props.notification.created_at) }}</time>
      </div>

      <p class="text-xs text-gray-300 mt-1 truncate">{{ props.notification.message }}</p>

      <div class="flex gap-2 mt-3">
        <button
          @click="onMark(props.notification.id as number)"
          class="text-xs px-2 py-1 rounded-md bg-[#2c293a] text-[#cfc7dd] hover:bg-green-600 hover:text-white transition cursor-pointer">
          {{ props.notification.is_read ? "Прочитано" : "Позначити як прочитане" }}
        </button>
        <button
          @click="removeNotification(props.notification.id as number)"
          class="text-xs px-2 py-1 rounded-md bg-transparent text-red-400 border border-red-600 hover:bg-red-600/10 transition cursor-pointer">
          Видалити
        </button>
      </div>
    </div>
  </div>
</template>
