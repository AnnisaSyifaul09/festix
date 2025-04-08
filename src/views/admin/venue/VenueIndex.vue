<template>
  <div>
    <NavbarAdmin />
    <section class="py-12 px-6 md:px-0 container mx-auto">
      <div class="pt-10 p-4 min-h-screen flex flex-col">
        <div class="py-5 flex flex-row justify-between items-center">
          <h1 class="text-2xl font-bold text-indigo-900 leading-tight">Manage Venue</h1>
          <RouterLink :to="{ name: 'venuesCreate' }" class="font-bold py-4 px-6 bg-indigo-700 text-white rounded-full">
            Add New
          </RouterLink>
        </div>

        <!-- Loading Spinner -->
        <div v-if="isLoading" class="flex justify-center items-center h-32">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-900"></div>
        </div>

        <!-- Venue Cards -->
        <div v-else
          class="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full container mx-auto justify-items-center">
          <ManageVenueCard v-for="venue in data" :key="venue.id" :id="venue.id" :name="venue.name"
            :address="venue.address"
            :image="Array.isArray(venue.venue_image) && venue.venue_image.length > 0 ? venue.venue_image[0].link : ''"
            :location="venue.address" @deleted="handleDeleted" />
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
      data: [],        // data venue dari API
      isLoading: true, // status loading
    };
  },

  mounted() {
    this.getItem();
  },

  methods: {
    // Ambil data venue dari API
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
        this.isLoading = false;
        if (err.response?.status === 401) {
          localStorage.clear();
          router.push({ name: 'login' });
        } else {
          console.error("Error fetching venues data:", err);
        }
      });
    },

    // Tangani event delete dari child component
    handleDeleted(deletedId) {
      this.data = this.data.filter(venue => venue.id !== deletedId);
    }
  }
};
</script>
