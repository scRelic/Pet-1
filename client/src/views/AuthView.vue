<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import type { ILoginData, IRegisterData } from "@/types/auth";
import TheLogin from "@/components/AuthView/TheLogin.vue";
import TheRegister from "@/components/AuthView/TheRegister.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { authLogin, authRegister, error, isLoading } = useAuth();

const isLoginView = ref(true);

const toggleView = () => {
  isLoginView.value = !isLoginView.value;
  error.value = null;
};

const handleLogin = async (data: ILoginData) => {
  try {
    await authLogin(data);
    router.push("/");
  } catch (error: any) {
    return;
  }
};

const handleRegister = async (data: IRegisterData) => {
  try {
    await authRegister(data);
    toggleView();
  } catch (error: any) {
    return;
  }
};

document.title = "Авторизація";
</script>

<template>
  <main class="">
    <TheLogin v-if="isLoginView" @toggleView="toggleView" :error="error" :isLoading="isLoading" @login="handleLogin" />
    <TheRegister v-else @toggleView="toggleView" :error="error" :isLoading="isLoading" @register="handleRegister" />
  </main>
</template>
