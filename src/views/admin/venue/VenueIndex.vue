<template>
    <div>
      <NavbarAdmin></NavbarAdmin>
      <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
        <div class="pt-10 p-2 min-h-screen flex flex-col">
            <div class="py-5 flex flex-row justify-between items-center">
                <h1 class="text-2xl font-bold text-indigo-900 leading-tight">Manage Venue</h1>
                <a href="#" class="font-bold py-4 px-6 bg-indigo-700 text-white rounded-full"> Add New</a>
            </div>
            <div class="pt-10 grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl mx-auto justify-items-center">
            <ManageVenueCard 
              v-for="(venue, index) in venues" 
              :key="index" 
              :image="venue.image" 
              :name="venue.name" 
              :location="venue.location" 
            />
          </div>

        </div>
      </section>
    </div>
  </template>
    
  <script>
  import NavbarAdmin from "@/components/NavbarAdmin.vue";
  import ManageVenueCard from "@/components/ManageVenueCard.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
  
  export default {
    components: {
      NavbarAdmin,
      ManageVenueCard,
    IconLocation,
  },
    
    data() {
      return {
        venues: [
        {
          image: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
          name: "Teater Taman Sriwedari",
          location: "Jl.lorem ipsum",
        },
        {
          image: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
          name: "Teater Taman Sriwedari",
          location: "Jl.lorem ipsum",
        },
        {
          image: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
          name: "LOREM IPSUM DOLOR",
          date: "12 July 2025",
          time: "18.00",
          location: "Teater Taman Sriwedari",
        },
        ],
      };
    },
};
  </script>