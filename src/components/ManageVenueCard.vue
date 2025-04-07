<template>
  <div class="bg-indigo-900 text-white rounded-xl shadow-lg overflow-hidden w-full max-w-5xl">
    <img class="w-full h-70 object-cover" :src="image_link" alt="Event Image" />
    <div class="p-3">
      <h2 class="text-lg font-bold">{{ name }}</h2>
      <div class="mt-2 flex flex-col gap-1">

        <p class="flex items-center gap-2">
          <IconLocation class="w-5 h-5 text-white" />
          {{ location }}
        </p>
      </div>

      <div class="flex gap-5">
        <button
          class="mt-4 bg-indigo-500 px-4 py-2 rounded-lg w-20 hover:bg-indigo-700 flex items-center justify-center">
          Detail
        </button>
        <button class="mt-4 bg-red-500 px-4 py-2 rounded-lg w-20 hover:bg-red-700 flex items-center justify-center">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import IconLocation from "@/components/icons/IconLocation.vue";

export default {
  props: {
    image: String,
    name: String,
    location: String,
  },
  components: {
    IconLocation,
  },
  data() {
    return {
      image_link: this.image
        ? `http://127.0.0.1:8000${this.image}`
        : "/src/assets/noImage.png",
    };
  },
};
</script>