<template>
  <div class="w-full mx-auto mt-8 space-y-6 md:flex-col">
    <!-- Card dengan Router Link -->
    <router-link to="/kategori" class="block">
      <div
        class="bg-indigo-900 w-full shadow-lg rounded-lg p-6 transition transform hover:shadow-xl hover:shadow-indigo-500/20 duration-300 cursor-pointer">
        <!-- Gambar -->
        <img class="w-full aspect-video object-cover rounded-lg" :src="image_link" alt="Event Image" />

        <div class="mt-4">
          <h2 class="text-lg font-bold text-white pb-3">{{ name }}</h2>
          <div class="flex flex-wrap sm:flex-nowrap items-center justify-between text-white text-sm">
            <!-- Bagian Tanggal (Kiri) -->
            <div class="flex items-center gap-4">
              <span class="font-bold text-5xl text-white">{{ dayOnly }}</span>
              <span class="flex flex-col ml-2">
                <span class="text-base text-white">{{ getMonthName(date) }}</span>
                <span class="text-base text-white">{{ yearOnly }}</span>
              </span>
            </div>

            <!-- Bagian Jam (Kanan) -->
            <div class="flex items-center gap-2">
              <IconTime></IconTime>
              <p class="text-3xl font-semibold">{{ timeOnly }}</p>
            </div>
          </div>

          <!-- Bagian Lokasi -->
          <div class="flex items-center text-white text-xs sm:text-sm mt-3">
            <IconLocation></IconLocation>
            <p class="text-xs sm:text-base break-words max-w-full ">
              {{ venue }}
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
  },
  data() {
    return {
      image_link: this.image
        ? `http://127.0.0.1:8000${this.image}`
        : "/src/assets/noImage.png",
    };
  },
  props: {
    image: String,
    name: String,
    venue: String,
    date: String,
    time: String,

  },
  computed: {
    dayOnly() {
      return this.date.split("-")[2]; // Ambil bagian tanggalnya saja
    },
    yearOnly() {
      return this.date.split("-")[0]; // Ambil bagian tahun
    },
    timeOnly() {
      return this.time.split(" ")[1].slice(0, 5); // Ambil bagian jam dan menit
    },
  },
  methods: {
    getMonthName(date) {
      const dateObj = new Date(date);
      return new Intl.DateTimeFormat("en-US", { month: "long" }).format(dateObj);
    },
  },
};
</script>
