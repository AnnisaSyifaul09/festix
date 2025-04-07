<template>
  <div>
    <NavbarAdmin></NavbarAdmin>
    <section class="py-12 px-6 md:px-0 container mx-auto">
      <div class="pt-10 p-2 min-h-screen flex flex-col">
        <div class="py-5 flex flex-row justify-between items-center">
          <h1 class="text-2xl font-bold text-indigo-900 leading-tight">Manage Venue</h1>
          <a href="#" class="font-bold py-4 px-6 bg-indigo-700 text-white rounded-full"> Add New</a>
        </div>
        <div v-if="isLoading" class="flex justify-center items-center h-32">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-900"></div>
        </div>
        <div v-else class="pt-10 grid grid-cols-1 md:grid-cols-4 gap-10 w-full container mx-auto justify-items-center">
          <ManageVenueCard v-for="(venue, index) in data" :key="index" :name="venue.name" :address="venue.address"
            :image="Array.isArray(venue.venue_image) && venue.venue_image.length > 0 ? venue.venue_image[0].link : ''"
            :location="venue.address" />
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import ManageVenueCard from "@/components/ManageVenueCard.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import axios from "axios";
import router from "@/router";

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
      data: [],
      isLoading: true,
    };
  },
  mounted() {
    this.getItem();
  },
  methods: {
    getItem() {
      this.isLoading = true;
      axios.get(`http://localhost:8000/api/venues`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        this.isLoading = false;
        if (res.data?.data) {
          this.data = res.data.data;
        }
      }).catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem('email');
          localStorage.removeItem('name');
          localStorage.removeItem('role_id');
          localStorage.removeItem('token');

          router.push({ name: 'login' });
        } else {
          console.error("Error fetching venues data:", err);
        }
      });
    }
  }
};
</script>