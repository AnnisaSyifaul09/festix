<template>
  <div 
    @click="$emit('click')"
    class="bg-indigo-900 text-white rounded-xl shadow-lg overflow-hidden w-full max-w-5xl cursor-pointer hover:bg-indigo-800 transition-colors"
  >
    <img class="w-full h-70 object-cover" :src="image" alt="Event Image" />
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
        <p class="mt-2 text-xl font-bold text-green-400">
          Revenue: ${{ totalRevenue.toFixed(2) }}
        </p>
        <p class="text-sm text-green-300">
          Tickets Sold: {{ ticketsSold }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import IconDate from "@/components/icons/IconDate.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconLocation from "@/components/icons/IconLocation.vue";

export default {
  props: {
    image: String,
    title: String,
    date: String,
    time: String,
    location: String,
    totalRevenue: Number,
    ticketsSold: Number
  },
  components: {
    IconDate,
    IconTime,
    IconLocation,
  },
  emits: ['click']
};
</script>