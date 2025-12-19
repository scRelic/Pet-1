import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "Home",
      path: "/",
      component: () => import("../views/HomeView.vue"),
      meta: { requiresAuth: false },
    },
    {
      name: "Auth",
      path: "/auth",
      component: () => import("../views/AuthView.vue"),
      meta: { requiresAuth: false },
    },
    {
      name: "Test",
      path: "/test/:testId",
      component: () => import("../views/TestView.vue"),
      meta: { requiresAuth: true },
    },
    {
      name: "Profile",
      path: "/profile",
      component: () => import("../views/ProfileView.vue"),
      meta: { requiresAuth: true },
    },
    {
      name: "Friend",
      path: "/friend/:id",
      component: () => import("../views/FriendView.vue"),
      meta: { requiresAuth: true },
    },
    {
      name: "Friends",
      path: "/friends",
      component: () => import("../views/FriendsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      name: "NotFound",
      path: "/:pathMatch(.*)*",
      component: () => import("../views/NotFoundView.vue"),
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthRequired = to.meta.requiresAuth;

  if (isAuthRequired && userStore.isAuthChecked && !userStore.isAuthenticated) {
    next({ name: "Auth" });
  } else {
    next();
  }
});

export default router;
