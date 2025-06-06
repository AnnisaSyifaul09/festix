<template>
  <div class="max-w-lg mx-auto mt-8 space-y-6 md:flex-col">
    <div class="bg-white border-2 border-indigo-900 shadow-lg rounded-lg p-6 sm:max-w-lg mx-auto">

      <img class="w-full h-full object-cover rounded-lg" :src="image_link" alt="Event Image" />
      <div class="mt-4">


        <div class="flex text-indigo-900">
          <p class="text-2xl font-semibold">{{ name }}</p>
        </div>
        <p class="text-xs sm:text-base break-words">{{ address }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import IconLocation from "./icons/IconLocation.vue";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export default {
  components: {
    IconLocation
  },
  data() {
    return {
      image_link: this.image
        ? `${BASE_URL}${this.image}`
        : "/src/assets/noImage.png",
    };
  },
  props: {
    image: String,
    name: String,
    address: String,
  },
};
</script>
