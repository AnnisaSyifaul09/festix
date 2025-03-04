<template>
    <div class="max-w-lg mx-auto mt-8 space-y-6 md:flex-col">
      <div class="bg-white border-2 border-indigo-900 shadow-lg rounded-lg p-6 sm:max-w-lg mx-auto">

        <img class="w-full h-full object-cover rounded-lg" src="/src/assets/konser1.jpg" alt="Event Image" />
        <div class="mt-4">
          <div class="flex items-start gap-2 text-indigo-900 text-xs sm:text-sm">
            <IconLocation></IconLocation>
            <p class="text-xs sm:text-base break-words max-w-full ml-2">Slamet Riyadi St No.275, Sriwedari, Laweyan, Surakarta City, Central Java 57141</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import IconLocation from "./icons/IconLocation.vue";

export default {
  components: { 
    IconLocation 
  }
};
</script>
