<script setup lang="ts">
import { inject, watch } from "vue";
import type { IUser } from "@/types/user";
import { useUserStore } from "@/stores/user";
import { useForm, Field } from "vee-validate";
import * as yup from "yup";

interface IProps {
  user: IUser | null;
}

const props = defineProps<IProps>();
const toggleEditMode = inject("toggleEditMode") as (() => void) | undefined;
const userStore = useUserStore();

const schema = yup.object({
  username: yup.string().required("Вкажіть ім'я користувача").min(4, "Мінімум 4 символи").max(40, "Максимум 40 символів"),
  email: yup.string().required("Вкажіть пошту").email("Некоректна пошта").max(70, "Максимум 70 символів"),
  description: yup.string().max(255).nullable(),
  profession: yup.string().max(100).nullable(),
});

const { handleSubmit, errors, isSubmitting, resetForm, values } = useForm({
  validationSchema: schema,
  initialValues: {
    username: props.user?.username ?? "",
    email: props.user?.email ?? "",
    description: props.user?.description ?? "",
    profession: props.user?.profession ?? "",
  },
});

watch(
  () => props.user,
  (u) => {
    resetForm({
      values: {
        username: u?.username ?? "",
        email: u?.email ?? "",
        description: u?.description ?? "",
        profession: u?.profession ?? "",
      },
    });
  },
  { immediate: true }
);

const handleUpdateUser = handleSubmit(async (formValues: Partial<IUser>) => {
  if (!props.user) return;
  try {
    await userStore.updateUser(formValues);
    toggleEditMode?.();
  } catch (error) {
    console.error("Помилка оновлення профілю:", error);
  }
});
</script>

<template>
  <section class="rounded-2xl p-4 flex flex-col items-center border border-[#6c3bbf] min-w-[500px] flex-1 bg-[#1E1C29] shadow-lg">
    <h3 class="text-2xl font-extrabold text-[#974fdb] mb-6 text-center tracking-tight">Редагувати профіль</h3>
    <form @submit.prevent="handleUpdateUser" class="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-gray-300 font-semibold mb-2">Ім'я користувача</label>
        <Field
          name="username"
          as="input"
          v-model="values.username"
          type="text"
          placeholder="Ім'я користувача"
          class="w-full border border-[#974fdb] rounded-lg px-4 py-3 bg-[#2C293A] text-white focus:outline-none focus:border-[#974fdb] transition mb-1" />
        <div v-if="errors.username" class="text-red-500 text-xs">{{ errors.username }}</div>
      </div>

      <div>
        <label class="block text-gray-300 font-semibold mb-2">Пошта</label>
        <Field
          name="email"
          as="input"
          v-model="values.email"
          type="email"
          class="w-full border border-[#974fdb] rounded-lg px-4 py-3 bg-[#2C293A] text-white focus:outline-none focus:border-[#974fdb] transition mb-1" />
        <div v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</div>
      </div>

      <div class="md:col-span-2">
        <label class="block text-gray-300 font-semibold mb-2">Опис</label>
        <Field
          name="description"
          as="input"
          v-model="values.description"
          type="text"
          class="w-full border border-[#974fdb] rounded-lg px-4 py-3 bg-[#2C293A] text-white focus:outline-none focus:border-[#974fdb] transition mb-1" />
        <div v-if="errors.description" class="text-red-500 text-xs">{{ errors.description }}</div>
      </div>

      <div class="md:col-span-2">
        <label class="block text-gray-300 font-semibold mb-2">Професія</label>
        <Field
          name="profession"
          as="input"
          v-model="values.profession"
          type="text"
          class="w-full border border-[#974fdb] rounded-lg px-4 py-3 bg-[#2C293A] text-white focus:outline-none focus:border-[#974fdb] transition mb-1" />
        <div v-if="errors.profession" class="text-red-500 text-xs">{{ errors.profession }}</div>
      </div>
      <div v-if="userStore.error">
        <p class="text-red-600">{{ userStore.error }}</p>
      </div>
      <div class="md:col-span-2 w-full flex justify-start">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-gradient-to-r from-[#974fdb] to-[#6c3bbf] text-white px-8 py-3 rounded-lg font-bold shadow hover:from-[#6c3bbf] hover:to-[#974fdb] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
          {{ isSubmitting ? "Збереження..." : "Зберегти зміни" }}
        </button>
      </div>
    </form>
  </section>
</template>
