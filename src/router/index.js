import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import KategoriView from "../views/KategoriView.vue";
import SigninView from "../views/SigninView.vue";
import WelcomeView from "../views/WelcomeView.vue";
import VerificationView from "@/views/VerificationView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/welcome",
      name: "welcome",
      component: WelcomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    { path: "/signin", name: "signin", component: SigninView },
    { path: "/kategori", name: "kategori", component: KategoriView },
    {
      path: "/signup/verif",
      name: "verif",
      component: VerificationView,
      props: true,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    }
  ],
});

export default router;
