<template>
  <div class="max-w-lg mx-auto mt-8 space-y-6 md:flex-col">
    <!-- Card dengan Router Link -->
    <router-link to="/kategori" class="block">
      <div class="bg-indigo-900 shadow-lg rounded-lg p-6 transition transform hover:scale-105 duration-300 cursor-pointer">
        <!-- Gambar -->
        <img class="w-full h-full object-cover rounded-lg" src="/src/assets/konser1.jpg" alt="Event Image" />

        <div class="mt-4">
          <div class="flex flex-wrap sm:flex-nowrap items-center justify-between text-white text-sm">
            <!-- Bagian Tanggal (Kiri) -->
            <div class="flex items-center gap-4">
              <span class="font-bold text-5xl text-white">12</span>
              <span class="flex flex-col ml-2">
                <span class="text-base text-white">July</span>
                <span class="text-base text-white">2025</span>
              </span>
            </div>

            <!-- Bagian Jam (Kanan) -->
            <div class="flex items-center gap-2">
              <IconTime></IconTime>
              <p class="text-3xl font-semibold">18.00</p>
            </div>
          </div>

          <!-- Bagian Lokasi -->
          <div class="flex items-start gap-2 text-white text-xs sm:text-sm mt-3">
            <IconLocation></IconLocation>
            <p class="text-xs sm:text-base break-words max-w-full ml-2">
              Slamet Riyadi St No.275, Sriwedari, Laweyan, Surakarta City, Central Java 57141
            </p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import IconLocation from "./icons/IconLocation.vue";
import IconTime from "./icons/IconTime.vue";

export default {
  components: { 
    IconTime, IconLocation 
  }
};
</script>
