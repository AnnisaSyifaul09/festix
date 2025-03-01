<template>
  <div class="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
    <!-- Navbar -->
    <nav class="bg-white shadow-md px-6 py-4 flex justify-between items-center w-full fixed top-0 left-0 right-0 z-50 rounded-b-2xl">
      <!-- Mobile Menu Button (Kiri Atas) -->
      <button @click="toggleMobileMenu" class="md:hidden text-indigo-900 focus:outline-none text-2xl font-bold">
        ☰
      </button>

      <!-- Menu Kiri -->
      <div class="hidden md:flex space-x-6">
        <a href="#" class="font-semibold hover:text-indigo-600 text-indigo-900">HOME</a>
        <a href="#" class="font-semibold hover:text-indigo-600 text-indigo-900">EVENTS</a>
        <a href="#" class="font-semibold hover:text-indigo-600 text-indigo-900">PLACES</a>
      </div>

      <div class="relative">
        <button @click="toggleDropdown" class="font-semibold hover:text-indigo-600 text-indigo-900">PROFILE ▼</button>
        <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2">
          <a href="#" class="block px-4 py-2 hover:bg-gray-200 text-indigo-900">Settings</a>
          <a href="#" class="block px-4 py-2 hover:bg-gray-200 text-indigo-900">Logout</a>
        </div>
      </div>
    </nav>

    <!-- Klik di luar dropdown untuk menutup -->
    <div v-if="dropdownOpen" @click="closeDropdown" class="fixed inset-0"></div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-md p-4 absolute top-16 left-0 right-0">
      <a href="#" class="block py-2 text-indigo-900 font-semibold" @click="mobileMenuOpen = false">HOME</a>
      <a href="#" class="block py-2 text-indigo-900 font-semibold" @click="mobileMenuOpen = false">EVENTS</a>
      <a href="#" class="block py-2 text-indigo-900 font-semibold" @click="mobileMenuOpen = false">PLACES</a>
    </div>

    <!-- Event Cards Grid -->
    <div class="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-center max-w-5xl">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden p-5 w-full max-w-[500px] flex flex-col">
        <!-- Image -->
        <img class="w-full h-48 object-cover rounded-lg" :src="imageUrl" alt="Event Image" />

        <!-- Content -->
        <div class="mt-4">
          <h2 class="text-xl font-bold text-indigo-900">Lorem Ipsum Dolor</h2>

          <!-- Tanggal, Jam, dan Lokasi -->
          <p class="text-lg font-medium text-indigo-900 flex flex-wrap items-center gap-2 sm:flex-nowrap">
            <span class="font-bold text-4xl text-indigo-900">12</span>
            <span class="flex flex-col ml-2">
              <span class="text-lg text-indigo-900">July</span>
              <span class="text-lg text-indigo-900">2025</span>
            </span>

            <!-- Ikon Jam -->
            <span class="flex items-center gap-1 text-indigo-900 ml-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clock">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
              </svg>
              18.00
            </span>

            <!-- Ikon Lokasi -->
            <span class="flex items-center gap-1 text-indigo-900 text-sm sm:ml-1 ml-0 w-full sm:w-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-geo-alt">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
              </svg>
              <strong class="whitespace-nowrap sm:whitespace-normal">Teater Taman Sriwedari</strong>
            </span>
          </p>


          <!-- Categories & Price Row -->
          <div class="flex justify-between items-center mt-3">
            <div class="flex flex-wrap gap-2">
              <button v-for="(seat, index) in seatCategories" 
                      :key="index" 
                      @click="selectCategory(seat)"
                      :class="['px-3 py-1 text-sm rounded-md font-medium', 
                              seat.available > 0 ? 'cursor-pointer' : 'cursor-not-allowed opacity-100']"
                      :style="{ backgroundColor: seat.available > 0 ? (selectedCategory === seat.name ? '#FFD700' : '#37FF30') : '#FF3030', color: seat.available > 0 ? 'black' : 'white' }">
                {{ seat.name }} ({{ seat.available }})
              </button>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-lg font-medium text-yellow-500">Start<br>
                <strong class="text-2xl">{{ selectedPrice.toLocaleString() }}</strong>
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false,
      mobileMenuOpen: false,
      imageUrl: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
      selectedCategory: null,
      selectedPrice: 80000, // Default price
      seatCategories: [
        { name: "VIP", price: 100000, available: 5 },
        { name: "cat 1", price: 80000, available: 3 },
        { name: "cat 2", price: 60000, available: 0 },
        { name: "cat 3", price: 50000, available: 10 },
        { name: "cat 4", price: 40000, available: 7 },
      ],
    };
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
    selectCategory(seat) {
      if (seat.available > 0) {
        this.selectedCategory = seat.name;
        this.selectedPrice = seat.price;
      }
    },
  },
};
</script>
