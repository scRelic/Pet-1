<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

interface IProps {
  modelValue: string;
  options: { value: string; label: string }[];
}

const props = defineProps<IProps>();
const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const selectRef = ref<HTMLElement | null>(null);

function selectOption(value: string) {
  emit("update:modelValue", value);
  open.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    open.value = false;
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
  <div class="relative w-full" ref="selectRef">
    <button
      class="w-full px-4 py-2 rounded-lg bg-[#2C293A] border border-[#974fdb] text-white flex justify-between items-center focus:outline-none cursor-pointer"
      @click="open = !open"
      type="button">
      <span>
        {{ props.options.find((opt) => opt.value === props.modelValue)?.label || "Оберіть..." }}
      </span>
      <svg class="w-4 h-4 ml-2 text-[#974fdb]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <ul v-if="open" class="absolute left-0 right-0 mt-2 bg-[#211F2B] border border-[#6c3bbf] rounded-lg z-10 py-2">
      <li
        v-for="option in props.options"
        :key="option.value"
        @click="selectOption(option.value)"
        class="px-4 py-2 cursor-pointer hover:bg-purple-600/50 text-white transition rounded-lg"
        :class="{ 'bg-[#392750]': option.value === props.modelValue }">
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>
