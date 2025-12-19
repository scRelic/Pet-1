import axios from "axios";
import { API_BASE_URL } from "../config";
import type { ILoginData, IRegisterData } from "@/types/auth";
import { ref } from "vue";
import { api } from "../http";
import { useUserStore } from "@/stores/user";

export const useAuth = () => {
  const userStore = useUserStore();
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const authLogin = async ({ email, password }: ILoginData) => {
    isLoading.value = true;
    try {
      error.value = null;
      const response = await api.post(`/auth/login`, { email, password });

      localStorage.setItem("accessToken", response.data.accessToken);
      userStore.setUser(response.data.user);
      userStore.setAuthenticated(true);
    } catch (e: any) {
      error.value = e.response?.data?.error || "Помилка входу";
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const authRegister = async (data: IRegisterData) => {
    isLoading.value = true;
    try {
      error.value = null;
      await api.post(`/auth/register`, data);
    } catch (e: any) {
      error.value = e.response?.data?.error || "Помилка реєстрації";
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    isLoading.value = true;
    try {
      error.value = null;
      await api.post(`/auth/logout`);
      localStorage.removeItem("accessToken");
      userStore.clearUser();
      userStore.setAuthenticated(false);
    } catch (e: any) {
      error.value = e.response?.data?.error || "Помилка виходу";
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const checkAuth = async () => {
    isLoading.value = true;
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/refresh`, { withCredentials: true });

      localStorage.setItem("accessToken", response.data.accessToken);

      userStore.setUser(response.data.user);
      userStore.setAuthenticated(true);
    } catch (e: any) {
      error.value = e.response?.data?.error || "Помилка перевірки автентифікації";
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  return { authLogin, authRegister, logout, checkAuth, error, isLoading };
};
