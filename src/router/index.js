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
import AdminView from "@/views/admin/AdminView.vue";
import EventIndex from "@/views/admin/event/EventIndex.vue";
import VenueIndex from "@/views/admin/venue/VenueIndex.vue";
import CashIndex from "@/views/admin/cash/CashIndex.vue";
import DetailEventView from "@/views/DetailEventView.vue";
import PaymentConfirmView from "@/views/PaymentConfirmView.vue";
import VerifyView from "@/views/admin/verify/VerifyView.vue";
import CreateEventView from "@/views/admin/event/CreateEventView.vue";
import ShowEventView from "@/views/admin/event/ShowEventView.vue";
import CreateVenueView from "@/views/admin/venue/CreateVenueView.vue";
import UserCreate from "@/views/admin/user/UserCreate.vue";
import UserIndex from "@/views/admin/user/UserIndex.vue";
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
      path: "/riwayat/:id",
      name: "detail",
      component: DetailTiketView,
    },
    {
      path: "/events/:id",
      name: "detailEvent",
      component: DetailEventView,
    },
    {
      path: "/payment-confirmation",
      name: "paymentConfirmation",
      component: PaymentConfirmView,
    },
    {
      path: "/admin",
      name: "dashboard",
      component: AdminView,
    },
    {
      path: "/admin/events",
      name: "events",
      component: EventIndex,
    },
    {
      path: "/admin/events/create",
      name: "eventCreate",
      component: CreateEventView,
    },
    {
      path: "/admin/events/:id",
      name: "eventShow",
      component: ShowEventView,
    },
    {
      path: "/admin/verify",
      name: "verify",
      component: VerifyView,
    },
    {
      path: "/admin/venues",
      name: "venues",
      component: VenueIndex,
    },
    {
      path: "/admin/venues/create",
      name: "venuesCreate",
      component: CreateVenueView,
    },
    {
      path: "/admin/cash",
      name: "cash",
      component: CashIndex,
    },
    {
      path: "/admin/users",
      name: "adminUsers",
      component: UserIndex,
    },
    {
      path: "/admin/users/create",
      name: "adminUsersCreate",
      component: UserCreate,
    },
  ],
});

export default router;
