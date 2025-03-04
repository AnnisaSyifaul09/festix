<template>
    <div class="bg-white text-black rounded-xl shadow-lg overflow-hidden w-full max-w-xs border h-auto min-h-[450px] flex flex-col">
      <img class="w-full h-40 object-cover" :src="image" :alt="title" />
      <div class="p-4 flex-grow flex flex-col">
        <h2 class="text-xl font-bold">{{ title }}</h2>
        <div class="mt-2">
          <span class="bg-black text-white text-xs px-3 py-1 rounded-full">VIP</span>
        </div>
        <div class="mt-2 flex flex-col gap-1 text-sm">
            <div class="flex justify-start gap-10 items-center">
                <p class="font-bold flex items-center gap-2">
                    <IconDate class="w-5 h-5 text-black" />
                    {{ date }}
                </p>
                <p class="font-bold flex items-center gap-2">
                    <IconTime class="w-5 h-5 text-black" />
                    {{ time }}
                </p>
            </div>
          <p class="font-bold flex items-center gap-2">
            <IconLocation class="w-5 h-5" />
            {{ location }}
          </p>
        </div>
        <div class="mt-auto flex justify-between items-center">
            <p class="font-bold text-lg">VIP 1 | 10</p>
            <img class="w-20 h-20 self-end" :src="qrCode" alt="QR Code" />
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
      qrCode: String,
    },
    components: {
      IconDate,
      IconTime,
      IconLocation,
    },
  };
  </script>
