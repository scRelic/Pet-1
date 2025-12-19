import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/css/main.css";
import App from "./App.vue";
import router from "./router";
import { PerfectScrollbarPlugin } from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/style.css";
import { useUserStore } from "./stores/user";
import { useAuth } from "./composables/useAuth";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);

app.use(createPinia());

const userStore = useUserStore();
const { checkAuth } = useAuth();

const initAuth = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      await checkAuth();
    } catch (error) {
      console.error("Auth check failed:", error);
    }
  }
  userStore.isAuthChecked = true;
};

await initAuth();

app.use(router);
app.use(PerfectScrollbarPlugin);

app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "bottom-right",
  theme: "colored",
});

app.mount("#app");
