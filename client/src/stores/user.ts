import { defineStore } from "pinia";
import { ref } from "vue";
import type { IUser } from "@/types/user";
import type { ITest } from "@/types/test";
import type { IFriend } from "@/types/friend";
import { api } from "../http";

export const useUserStore = defineStore("user", () => {
  const user = ref<IUser | null>(null);
  const isAuthenticated = ref(false);
  const countTests = ref<number>(0);
  const achievements = ref([]);
  const averageScore = ref<number>(0);
  const friends = ref<IFriend[]>([]);
  const error = ref<string | null>(null);
  const loading = ref(false);
  const isAuthChecked = ref(false);

  const userTests = ref<ITest[]>([]);
  const totalPages = ref(0);

  const fetchUserTests = async (page = 1) => {
    loading.value = true;
    error.value = null;

    const params = new URLSearchParams({
      page: page.toString(),
    });

    try {
      const response = await api.get(`/user-tests/tests?${params.toString()}`);
      userTests.value = response.data.tests;
      totalPages.value = Math.ceil(response.data.totalCount / 12);
    } catch (e: any) {
      error.value = e.message || "Failed to fetch tests";
    } finally {
      loading.value = false;
    }
  };

  const setUser = (userData: IUser) => {
    user.value = userData;
    isAuthenticated.value = true;
  };

  const clearUser = () => {
    user.value = null;
    isAuthenticated.value = false;
  };

  const setAuthenticated = (authStatus: boolean) => {
    isAuthenticated.value = authStatus;
  };

  const getUser = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get("/user");
      user.value = response.data;
    } catch (e: any) {
      error.value = e.message || "Failed to get user";
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const updateUser = async (updatedUser: Partial<IUser>) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.patch("/user", updatedUser);
      user.value = response.data;
    } catch (e: any) {
      error.value = e.response?.data?.message || "Failed to update user";
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const getUserCountTests = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get("/user-tests/count");

      countTests.value = Number(response.data);
    } catch (e: any) {
      error.value = e.message || "Failed to get user count tests";
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const getUserAchievements = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get("/user/achievements");
      achievements.value = response.data;
    } catch (e: any) {
      error.value = e.message || "Failed to get user achievements";
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const getAverageScore = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get("/user/average-score");
      averageScore.value = response.data.averageScore;
    } catch (e: any) {
      error.value = e.message || "Failed to get average score";
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const getUserFriends = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get("/friends");
      friends.value = response.data;
    } catch (e: any) {
      error.value = e.message || "Failed to get user friends";
      throw e;
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    isAuthenticated,
    userTests,
    countTests,
    achievements,
    averageScore,
    friends,
    error,
    loading,
    isAuthChecked,
    totalPages,

    setUser,
    clearUser,
    setAuthenticated,
    getUser,
    updateUser,
    getUserCountTests,
    getUserAchievements,
    getAverageScore,
    getUserFriends,
    fetchUserTests,
  };
});
