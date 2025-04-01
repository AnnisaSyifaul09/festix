<template>
  <div class="bg-indigo-900 text-white rounded-xl shadow-lg  w-full max-w-5xl relative">
    <img class="w-full h-70 object-cover rounded-s-lg rounded-se-lg" :src="image" alt="Event Image" />
    <div class="p-3">
      <h2 class="text-lg font-bold">{{ title }}</h2>
      <div class="mt-2 flex flex-col gap-1">
        <p class="flex items-center gap-2">
          <IconDate class="w-5 h-5 text-white" />
          {{ date }}
        </p>
        <p class="flex items-center gap-2">
          <IconTime class="w-5 h-5 text-white" />
          {{ time }}
        </p>
        <p class="flex items-center gap-2">
          <IconLocation class="w-5 h-5 text-white" />
          {{ location }}
        </p>
      </div>
      <RouterLink :to="{ name: 'detail', params: { id: id } }"
        class="mt-4 bg-indigo-500 px-4 py-2 rounded-lg w-20 hover:bg-indigo-800 flex items-center justify-center">
        Detail
      </RouterLink>
    </div>
    <span class="absolute px-4 py-2  -top-4 right-2  rounded-lg"
      :class="status == 1 ? 'bg-[#37FF30]' : 'bg-[#FF3030]'">{{
        status == 1 ? "Not Use" : "Used" }}</span>
  </div>
</template>


<script>
import IconDate from "@/components/icons/IconDate.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import { RouterLink } from "vue-router";

export default {
  props: {
    image: String,
    title: String,
    date: String,
    time: String,
    location: String,
    id: String,
    status: String
  },
  components: {
    IconDate,
    IconTime,
    IconLocation,
  },
  methods: {
    timeOnly(time) {
      return time.split(" ")[1].slice(0, 5); // Ambil bagian jam dan menit
    },
  }
};
</script>