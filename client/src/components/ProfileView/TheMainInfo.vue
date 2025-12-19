<script setup lang="ts">
import type { IUser } from "@/types/user";
import TheContent from "./TheContent.vue";

import TheEdit from "@/components/ProfileView/TheEdit.vue";

interface IProps {
  user: IUser | null;
  isEditMode: boolean;
}

const props = defineProps<IProps>();
</script>

<template>
  <section class="flex justify-between gap-8">
    <Transition name="slide-x" mode="out-in">
      <component :is="props.isEditMode ? TheEdit : TheContent" :user="props.user" :isEditMode="props.isEditMode" key="edit-mode" class="flex-1" />
    </Transition>
  </section>
</template>

<style scoped>
.slide-x-enter-active,
.slide-x-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-x-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}
.slide-x-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
