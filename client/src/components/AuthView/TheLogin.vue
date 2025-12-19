<script setup lang="ts">
import { useForm, Field } from "vee-validate";
import * as yup from "yup";

interface IProps {
  error: string | null;
  isLoading: boolean;
}

const props = defineProps<IProps>();

const schema = yup.object({
  email: yup.string().required("Вкажіть пошту").email("Некоректна пошта"),
  password: yup.string().required("Вкажіть пароль").min(6, "Мінімум 6 символів"),
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
});

const emit = defineEmits(["toggleView", "login"]);

const handleLogin = handleSubmit((values) => {
  emit("login", values);
});

const switchToRegister = () => emit("toggleView");
</script>

<template>
  <section class="flex items-center justify-center mt-[15vh]">
    <div class="flex w-full max-w-3xl">
      <div class="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white/90 rounded-l-2xl">
        <h2 class="text-purple text-3xl font-extrabold mb-8 text-center tracking-tight">Вхід</h2>
        <form @submit.prevent="handleLogin" class="flex flex-col">
          <Field
            name="email"
            type="email"
            placeholder="Пошта"
            class="border-purple border rounded-lg px-4 py-3 focus:outline-none focus:border-purple bg-gray-50 text-gray-800 mb-2" />
          <div v-if="errors.email" class="text-red-500 text-xs mb-4">{{ errors.email }}</div>
          <Field
            name="password"
            type="password"
            placeholder="Пароль"
            class="border-purple border rounded-lg px-4 py-3 focus:outline-none focus:border-purple bg-gray-50 text-gray-800 mb-2" />
          <div v-if="errors.password" class="text-red-500 text-xs mb-3">{{ errors.password }}</div>
          <div class="text-purple flex justify-end text-xs mb-4">
            <a href="#" class="hover:underline">Забули свій <span class="font-bold">пароль?</span></a>
          </div>
          <div v-if="props.error" class="text-red-600 text-xs text-center">{{ props.error }}</div>
          <button
            type="submit"
            class="bttn-primary text-white py-3 rounded-lg font-bold transition cursor-pointer shadow"
            :disabled="props.isLoading || isSubmitting">
            {{ props.isLoading || isSubmitting ? "Вхід..." : "Увійти" }}
          </button>
        </form>
        <div class="mt-6 text-center text-gray-600 text-sm">
          Не маєте акаунт?
          <span @click="switchToRegister" class="text-[#974fdb] font-bold hover:underline cursor-pointer">Зареєструйтесь</span>
        </div>
      </div>
      <div class="hidden md:flex w-1/2 bg-gradient-to-br from-[#974fdb] via-[#6c3bbf] to-[#392750] flex-col items-center justify-center p-10 rounded-r-2xl">
        <h2 class="text-3xl font-extrabold text-white mb-4">Вітаємо!</h2>
        <p class="text-white text-lg">Авторизуйтесь, щоб продовжити</p>
      </div>
    </div>
  </section>
</template>
