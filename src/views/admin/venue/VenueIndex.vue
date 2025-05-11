<template>
  <div>
    <NavbarAdmin />
    <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
      <div class="pt-10 p-4 min-h-screen flex flex-col">
        <div class="py-5 flex flex-row justify-between items-center">
          <h1 class="text-2xl font-bold text-indigo-900 leading-tight">Manage Venue</h1>
          <RouterLink :to="{ name: 'venuesCreate' }"
            class="font-bold py-4 px-6 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800">
            Add New
          </RouterLink>
        </div>

        <!-- Search Input -->
        <div class="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <input v-model="searchQuery" @input="handleSearch" type="text"
            placeholder="Search venue by name or address..."
            class="border border-gray-300 px-4 py-2 rounded-lg w-full md:w-1/3" />
        </div>

        <!-- Loading Spinner -->
        <div v-if="isLoading" class="flex justify-center items-center h-32">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-900"></div>
        </div>

        <!-- Venue Cards -->
        <div v-else
          class="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full container mx-auto justify-items-center">
          <ManageVenueCard v-for="venue in paginatedVenues" :key="venue.id" :id="venue.id" :name="venue.name"
            :address="venue.address"
            :image="Array.isArray(venue.venue_image) && venue.venue_image.length > 0 ? venue.venue_image[0].link : ''"
            :location="venue.address" @deleted="handleDeleted" />
        </div>

        <!-- Pagination -->
        <div class="pt-8 flex justify-center">
          <button v-for="page in totalPages" :key="page" @click="currentPage = page"
            :class="['mx-1 px-3 py-1 rounded-md', currentPage === page ? 'bg-indigo-700 text-white' : 'bg-gray-200']">
            {{ page }}
          </button>
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
      data: [],
      isLoading: true,
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 8,
    };
  },

  computed: {
    filteredVenues() {
      if (!this.searchQuery) return this.data;
      const query = this.searchQuery.toLowerCase();
      return this.data.filter(venue =>
        venue.name.toLowerCase().includes(query) ||
        venue.address.toLowerCase().includes(query)
      );
    },
    totalPages() {
      return Math.ceil(this.filteredVenues.length / this.itemsPerPage);
    },
    paginatedVenues() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredVenues.slice(start, start + this.itemsPerPage);
    },
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
        this.isLoading = false;
        if (err.response?.status === 401) {
          localStorage.clear();
          router.push({ name: 'login' });
        } else {
          console.error("Error fetching venues data:", err);
        }
      });
    },

    handleDeleted(deletedId) {
      this.data = this.data.filter(venue => venue.id !== deletedId);
    },

    handleSearch() {
      this.currentPage = 1;
    }
  }
};
</script>
