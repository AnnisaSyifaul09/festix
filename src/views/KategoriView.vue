<template>
  <div class="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
    <NavbarItem></NavbarItem>
    <!-- Event Cards Grid -->
    <div class="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-center max-w-5xl">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden p-5 w-full max-w-[500px] flex flex-col">
        <!-- Image -->
        <img class="w-full h-48 object-cover rounded-lg" :src="imageUrl" alt="Event Image" />

        <!-- Content -->
        <div class="mt-4">
          <h2 class="text-xl font-bold text-indigo-900">Lorem Ipsum Dolor</h2>

          <p class="text-lg font-medium text-indigo-900 flex flex-wrap items-center gap-2 sm:flex-nowrap">
            <span class="font-bold text-4xl text-indigo-900">12</span>
            <span class="flex flex-col ml-2">
              <span class="text-lg text-indigo-900">July</span>
              <span class="text-lg text-indigo-900">2025</span>
            </span>

            <span class="flex items-center gap-1 text-indigo-900 ml-3">
              <IconTime></IconTime>
              18.00
            </span>

            <span class="flex items-center gap-1 text-indigo-900 text-sm sm:ml-1 ml-0 w-full sm:w-auto">
              <IconLocation></IconLocation>
              <strong class="whitespace-nowrap sm:whitespace-normal">Teater Taman Sriwedari</strong>
            </span>
          </p>

          <!-- Categories & Price Row -->
          <div class="flex justify-between items-center mt-3">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="(seat, index) in seatCategories"
                :key="index"
                @click="selectCategory(seat)"
                :class="['px-3 py-1 text-sm rounded-md font-medium', 
                         seat.available > 0 ? 'cursor-pointer' : 'cursor-not-allowed opacity-100']"
                :style="{ backgroundColor: seat.available > 0 ? (selectedCategory === seat.name ? '#FFD700' : '#37FF30') : '#FF3030', color: seat.available > 0 ? 'black' : 'white' }">
                {{ seat.name }} ({{ seat.available }})
              </button>
            </div>

            <div class="flex flex-col items-end">
              <span class="text-lg font-medium text-yellow-500">
                Start<br>
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
import IconLocation from '@/components/icons/IconLocation.vue';
import IconTime from '@/components/icons/IconTime.vue';
import NavbarItem from '@/components/NavbarItem.vue';

export default {
  components: {
    NavbarItem, IconTime, IconLocation
  },
  data() {
    return {
      imageUrl: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
      selectedCategory: null,
      selectedPrice: 80000,
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
    selectCategory(seat) {
      if (seat.available > 0) {
        this.selectedCategory = seat.name;
        this.selectedPrice = seat.price;
      }
    },
  },
};
</script>
