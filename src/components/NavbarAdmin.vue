<template>
  <nav
    class="bg-white shadow-md px-6 py-4 flex items-center justify-between w-full fixed top-0 left-0 right-0 z-50 rounded-b-2xl">
    <div class="container mx-auto flex items-center justify-between max-w-screen-xl">
      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" class="lg:hidden text-indigo-900 focus:outline-none text-2xl font-bold">
        ☰
      </button>

      <!-- Menu Kiri -->
      <div class="hidden lg:flex space-x-12">
        <a href="/admin"
          class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">Home</a>
        <a href="/admin/events"
          class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">Events</a>
        <a href="/admin/venues"
          class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">Venue</a>
        <a href="/admin/seatcategory"
          class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">Seat
          Category</a>
        <a href="/admin/payments"
          class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">Payment</a>
        <a href="/admin/verify"
          class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">Verify
          Ticket</a>
        <a href="/admin/cash"
          class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">Cash
          Report</a>
        <a href="/admin/user"
          class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">User</a>
      </div>

      <!-- Dropdown Profile -->
      <div class="relative">
        <button @click="toggleDropdown"
          class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">
          Profile ▼
        </button>
        <div v-if="dropdownOpen"
          class="absolute right-0 mt-2 w-48 z-50 bg-white shadow-lg rounded-lg py-2 transition-all transform scale-95 origin-top-right">
          <RouterLink :to="{ name: 'profileAdmin' }"
            class="block px-4 py-2 text-indigo-900 hover:bg-indigo-100 hover:text-indigo-700 transition-all">
            Settings</RouterLink>
          <button @click="logout"
            class="block px-4 py-2 w-full text-indigo-900 text-start hover:bg-indigo-100 hover:text-indigo-700 transition-all">Logout</button>
        </div>
      </div>
    </div>

    <div v-if="dropdownOpen" @click="closeDropdown" class="fixed inset-0"></div>

    <div v-if="mobileMenuOpen" class="lg:hidden bg-white shadow-md p-4 absolute top-10 left-0 right-0">
      <a href="/admin" class="block py-2 text-indigo-900 font-semibold" @click="mobileMenuOpen = false">DASHBOARD</a>
      <a href="/admin/events" class="block py-2 text-indigo-900 font-semibold" @click="mobileMenuOpen = false">EVENT</a>
      <a href="/admin/venues" class="block py-2 text-indigo-900 font-semibold" @click="mobileMenuOpen = false">VENUE</a>
      <a href="/admin/verify" class="block py-2 text-indigo-900 font-semibold" @click="mobileMenuOpen = false">VERIFY
        TICKET</a>
      <a href="/admin/cash" class="block py-2 text-indigo-900 font-semibold" @click="mobileMenuOpen = false">CASH
        REPORT</a>
      <a href="/admin/user" class="block py-2 text-indigo-900 font-semibold" @click="mobileMenuOpen = false">USERS</a>
    </div>
  </nav>

</template>
<script>
import { RouterLink } from 'vue-router';
import router from "@/router";

export default {
  data() {
    return {
      mobileMenuOpen: false,
      dropdownOpen: false,
    };
  },
  mounted() {
    this.mobileMenuOpen = false;
    this.dropdownOpen = false;
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    logout() {
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('role_id');
      localStorage.removeItem('token');

      router.push({ name: 'login' });
    }
  },
};
</script>