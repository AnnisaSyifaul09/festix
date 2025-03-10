import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import KategoriView from "../views/KategoriView.vue";
import SigninView from "../views/SigninView.vue";
import WelcomeView from "../views/WelcomeView.vue";
import VerificationView from "@/views/VerificationView.vue";
import ResetPasswordView from "@/views/ResetPasswordView.vue";
import ProfileView from "@/views/ProfileView.vue";
import RiwayatView from "@/views/RiwayatView.vue";
import DetailTiketView from "@/views/DetailTiketView.vue";
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
    },
    {
      path: "/resetPassword",
      name: "resetPassword",
      component: ResetPasswordView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/riwayat",
      name: "riwayat",
      component: RiwayatView,
    },
    {
      path: "/detail",
      name: "detail",
      component: DetailTiketView,
    },
  ],
});

export default router;
