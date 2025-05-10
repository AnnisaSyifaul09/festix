<template>
  <nav
    class="bg-white shadow-md px-6 py-4 flex items-center justify-between w-full fixed top-0 left-0 right-0 z-50 rounded-b-2xl">
    <div class="container mx-auto flex items-center justify-between max-w-screen-xl">
      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" class="md:hidden text-indigo-900 focus:outline-none text-2xl font-bold">
        ☰
      </button>

      <!-- Logo -->
      <!-- <a href="/home" class="text-indigo-900 text-2xl font-bold">Logo</a> -->

      <!-- Menu Kiri -->
      <div class="hidden md:flex space-x-12">
        <a href="/home"
          class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">Home</a>
        <a href="/kategori"
          class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">Events</a>
        <a href="/home"
          class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">Places</a>
      </div>

      <!-- Dropdown Profile -->
      <div class="relative" v-if="token && username">
        <button @click="toggleDropdown"
          class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">
          Profile ▼
        </button>
        <div v-if="dropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 transition-all transform scale-95 origin-top-right z-50">
          <a href="/riwayat"
            class="block px-4 py-2 text-indigo-900 hover:bg-indigo-100 hover:text-indigo-700 transition-all">Riwayat</a>
          <a href="/profile"
            class="block px-4 py-2 text-indigo-900 hover:bg-indigo-100 hover:text-indigo-700 transition-all">Settings</a>
          <button @click="logout"
            class="block px-4 py-2 w-full text-start text-indigo-900 hover:bg-indigo-100 hover:text-indigo-700 transition-all">Logout</button>
        </div>
      </div>

      <div v-else class=" md:flex space-x-12">
        <a href="/login"
          class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">Login</a>
        <a href="/signin"
          class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">Register</a>

      </div>
    </div>

    <div v-if="dropdownOpen" @click="closeDropdown" class="fixed inset-0"></div>

    <div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-md p-4 absolute top-10 left-0 right-0">
      <a href="/home" class="block py-2 text-indigo-900 font-semibold" @click="mobileMenuOpen = false">HOME</a>
      <a href="#" class="block py-2 text-indigo-900 font-semibold" @click="mobileMenuOpen = false">EVENTS</a>
      <a href="#" class="block py-2 text-indigo-900 font-semibold" @click="mobileMenuOpen = false">PLACES</a>
    </div>
  </nav>

</template>
<script>
import router from "@/router";

export default {
  data() {
    return {
      mobileMenuOpen: false,
      dropdownOpen: false,
      token: '',
      username: '',
    };
  },
  mounted() {
    this.mobileMenuOpen = false;
    this.dropdownOpen = false;
    this.token = localStorage.getItem('token');
    this.username = localStorage.getItem('name');
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
