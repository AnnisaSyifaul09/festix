<template>
  <div @click="$emit('click')"
    class="group bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-5xl cursor-pointer transition duration-300 hover:shadow-2xl hover:-translate-y-1">
    <div class="relative">
      <img :src="image_link" alt="Event Image" class="w-full h-64 object-cover" />
      <div
        class="absolute top-3 right-3 bg-white/70 backdrop-blur-sm text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full shadow">
        {{ ticketsSold }} Tickets
      </div>
    </div>

    <div class="bg-gradient-to-br from-indigo-950 to-indigo-800 text-white p-6 rounded-b-3xl space-y-4">
      <div>
        <h2
          class="text-2xl font-bold leading-tight group-hover:underline underline-offset-4 decoration-green-400 transition">
          {{ title }}
        </h2>
        <p class="text-sm text-indigo-300 mt-1">Live Event</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div class="flex items-center gap-2">
          <IconDate class="w-5 h-5 text-indigo-300" />
          <span>{{ date }}</span>
        </div>
        <div class="flex items-center gap-2">
          <IconTime class="w-5 h-5 text-indigo-300" />
          <span>{{ timeOnly }}</span>
        </div>
        <div class="flex items-center gap-2">
          <IconLocation class="w-5 h-5 text-indigo-300" />
          <span>{{ location }}</span>
        </div>
      </div>

      <div class="border-t border-indigo-700 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p class="text-green-400 text-xl font-bold tracking-wide">
          Revenue: ${{ totalRevenue }}
        </p>
        <p class="text-sm text-indigo-300">Click for more details</p>
      </div>
    </div>
  </div>
</template>

<script>
import IconDate from "@/components/icons/IconDate.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconLocation from "@/components/icons/IconLocation.vue";

export default {
  data() {
    return {
      image_link: this.image
        ? `http://127.0.0.1:8000${this.image}`
        : "/src/assets/noImage.png",
    };
  },
  props: {
    image: String,
    title: String,
    date: String,
    time: String,
    location: String,
    totalRevenue: Number,
    ticketsSold: Number
  },
  computed: {
    dayOnly() {
      return this.date.split('-')[2];
    },
    monthOnly() {
      return this.date.split('-')[1];
    },
    yearOnly() {
      return this.date.split('-')[0];
    },
    timeOnly() {
      return this.time.split(" ")[1].slice(0, 5); // Ambil bagian jam dan menit
    },
  },
  components: {
    IconDate,
    IconTime,
    IconLocation,
  },
  emits: ['click']
};
</script>
