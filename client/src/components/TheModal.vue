<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  modelValue: boolean;
  actionAfterClosing?: Function;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const visible = ref(props.modelValue);

const closeModal = () => {
  emit("update:modelValue", false);
  visible.value = false;
  props.actionAfterClosing?.();
};

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
  }
);
</script>

<template>
  <teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div class="bg-card rounded-2xl py-8 border border-[#22D3EE] min-w-[320px] max-w-lg w-full relative">
        <button @click="closeModal" class="absolute top-4 right-4 text-[#22D3EE] text-2xl font-bold hover:text-[#6c3bbf] transition cursor-pointer">
          &times;
        </button>
        <slot />
      </div>
    </div>
  </teleport>
</template>
