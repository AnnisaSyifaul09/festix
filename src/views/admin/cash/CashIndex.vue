<template>
    <div>
      <NavbarAdmin></NavbarAdmin>
      <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
        <div class="pt-10 p-2 min-h-screen flex flex-col">
            <div class="flex flex-row justify-center items-center space-x-15">
                <a href="#" class="text-2xl font-bold text-indigo-900 leading-tight">Global Report</a>
                <a href="#" class="text-2xl font-bold text-indigo-900 leading-tight">Event Report</a>
            </div>
        </div>
      </section>
    </div>
  </template>
    
  <script>
   import NavbarAdmin from "@/components/NavbarAdmin.vue";
  import ManageEventCard from "@/components/ManageEventCard.vue";
import IconDate from "@/components/icons/IconDate.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
  
  export default {
    components: {
      NavbarAdmin,
      ManageEventCard,
    IconDate,
    IconTime,
    IconLocation,
  },
    
    data() {
      return {
        events: [
        {
          image: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
          title: "LOREM IPSUM DOLOR",
          date: "12 July 2025",
          time: "18.00",
          location: "Teater Taman Sriwedari",
        },
        {
          image: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
          title: "LOREM IPSUM DOLOR",
          date: "12 July 2025",
          time: "18.00",
          location: "Teater Taman Sriwedari",
        },
        {
          image: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
          title: "LOREM IPSUM DOLOR",
          date: "12 July 2025",
          time: "18.00",
          location: "Teater Taman Sriwedari",
        },
        ],
      };
    },
};
  </script>