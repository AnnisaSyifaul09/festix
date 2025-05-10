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
import UserIndex from "@/views/admin/user/UserIndex.vue";
import UserCreate from "@/views/admin/user/UserCreate.vue";
import UserEdit from "@/views/admin/user/UserEdit.vue";
import EditEventView from "@/views/admin/event/EditEventView.vue";
import EditVenueView from "@/views/admin/venue/EditVenueView.vue";
import AdminProfileView from "@/views/admin/profile/AdminProfileView.vue";
import UpdateAdminProfileView from "@/views/admin/profile/UpdateAdminProfileView.vue";
import RiwayatPembayaranView from "@/views/RiwayatPembayaranView.vue";
import IndexPaymentView from "@/views/admin/payment/IndexPaymentView.vue";
import AdminLoginView from "@/views/admin/login/AdminLoginView.vue";

const userRole = import.meta.env.VITE_USER_ROLE;
const adminRole = import.meta.env.VITE_ADMIN_ROLE;
const managerRole = import.meta.env.VITE_MANAGER_ROLE;
const superAdminRole = import.meta.env.VITE_SUPER_ADMIN_ROLE;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: () => import("@/views/UnauthorizedView.vue"), // Buat view ini ya
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
      meta: {
        requiresAuth: true,
        role: [userRole, superAdminRole],
      },
    },
    {
      path: "/riwayat",
      name: "riwayat",
      component: RiwayatView,
      meta: {
        requiresAuth: true,
        role: [userRole, superAdminRole],
      },
    },
    {
      path: "/riwayat/pembayaran",
      name: "riwayatPembayaran",
      component: RiwayatPembayaranView,
      meta: {
        requiresAuth: true,
        role: [userRole, superAdminRole],
      },
    },
    {
      path: "/riwayat/:id",
      name: "detail",
      component: DetailTiketView,
      meta: {
        requiresAuth: true,
        role: [userRole, superAdminRole],
      },
    },
    {
      path: "/events/:id",
      name: "detailEvent",
      component: DetailEventView,
      meta: {
        requiresAuth: true,
        role: [userRole, superAdminRole],
      },
    },
    {
      path: "/payment-confirmation",
      name: "paymentConfirmation",
      component: PaymentConfirmView,
      meta: {
        requiresAuth: true,
        role: [userRole, superAdminRole],
      },
    },
    {
      path: "/admin",
      name: "dashboard",
      component: AdminView,
      meta: {
        requiresAuth: true,
        role: [adminRole, managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/events",
      name: "events",
      component: EventIndex,
      meta: {
        requiresAuth: true,
        role: [adminRole, managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/events/create",
      name: "eventCreate",
      component: CreateEventView,
      meta: {
        requiresAuth: true,
        role: [adminRole, managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/events/:id",
      name: "eventShow",
      component: ShowEventView,
      meta: {
        requiresAuth: true,
        role: [adminRole, managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/events/update/:id",
      name: "eventUpdate",
      component: EditEventView,
      meta: {
        requiresAuth: true,
        role: [adminRole, managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/verify",
      name: "verify",
      component: VerifyView,
      meta: {
        requiresAuth: true,
        role: [adminRole, managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/venues",
      name: "venues",
      component: VenueIndex,
      meta: {
        requiresAuth: true,
        role: [adminRole, managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/venues/create",
      name: "venuesCreate",
      component: CreateVenueView,
      meta: {
        requiresAuth: true,
        role: [managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/venues/update/:id",
      name: "venuesUpdate",
      component: EditVenueView,
      meta: {
        requiresAuth: true,
        role: [managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/cash",
      name: "cash",
      component: CashIndex,
      meta: {
        requiresAuth: true,
        role: [managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/user",
      name: "user",
      component: UserIndex,
      meta: {
        requiresAuth: true,
        role: [managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/user/create",
      name: "userCreate",
      component: UserCreate,
      meta: {
        requiresAuth: true,
        role: [managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/user/edit/:id",
      name: "userEdit",
      component: UserEdit,
      meta: {
        requiresAuth: true,
        role: [managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/profile",
      name: "profileAdmin",
      component: AdminProfileView,
      meta: {
        requiresAuth: true,
        role: [adminRole, managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/profile/update",
      name: "updateProfileAdmin",
      component: UpdateAdminProfileView,
      meta: {
        requiresAuth: true,
        role: [adminRole, managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/payments",
      name: "adminPayments",
      component: IndexPaymentView,
      meta: {
        requiresAuth: true,
        role: [adminRole, managerRole, superAdminRole],
      },
    },
    {
      path: "/admin/login",
      name: "adminLogin",
      component: AdminLoginView,
    },
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  try {
    const role_id = localStorage.getItem("role_id");

    // Jika halaman butuh login dan belum login
    if (to.meta.requiresAuth && !role_id) {
      return next("/login");
    }

    if (to.meta.role && role_id === userRole) {
      return next("/home");
    }

    // Jika ada aturan role dan role user tidak sesuai
    if (to.meta.role && (!role_id || !to.meta.role.includes(role_id))) {
      return next("/unauthorized");
    }

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return next("/login");
  }
});
