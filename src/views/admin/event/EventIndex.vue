<template>
  <div>
    <NavbarAdmin></NavbarAdmin>
    <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
      <div class="pt-10 p-4 min-h-screen flex flex-col">
        <div class="py-5 flex flex-row justify-between items-center">
          <h1 class="text-2xl font-bold text-indigo-900 leading-tight">Manage Event</h1>
          <RouterLink :to="{ name: 'eventCreate' }"
            class="font-bold py-4 px-6 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800">
            Add New
          </RouterLink>
        </div>

        <!-- Search and Filter -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <input v-model="searchQuery" type="text" placeholder="Search events..."
            class="px-4 py-2 rounded border border-gray-300 w-full md:w-1/3" />
          <!-- Filter by Month and Year -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <input v-model="filterMonth" type="month" class="px-4 py-2 rounded border border-gray-300 w-full " />
          </div>
        </div>

        <div v-if="isLoading" class="flex justify-center items-center h-32">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-900"></div>
        </div>

        <div v-else
          class="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full mx-auto justify-items-center">
          <ManageEventCard v-for="(event, index) in paginatedData" :key="index"
            class="shadow-lg hover:shadow-lg hover:shadow-indigo-500/30 transition duration-300" :event="event"
            :title="event.name" :date="event.date" :time="event.time"
            :image="Array.isArray(event.event_image) && event.event_image.length > 0 ? event.event_image[0].link : ''"
            :location="event.vanue?.name" :id="event.id" @confirm-delete="confirmDelete" />
        </div>

        <!-- Pagination -->
        <!-- <div class="flex justify-center mt-10 space-x-2">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
            class="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50">
            Prev
          </button>
          <span class="font-semibold">Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
            class="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50">
            Next
          </button>
        </div> -->
        <div v-if="totalPages > 1" class="mt-10 flex flex-wrap justify-center gap-2">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
            class="px-4 py-2 bg-indigo-100 text-indigo-900 rounded hover:bg-indigo-200 disabled:opacity-50">
            Prev
          </button>

          <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="[
            'px-4 py-2 rounded',
            currentPage === page
              ? 'bg-indigo-500 text-white'
              : 'bg-white border border-gray-300 text-indigo-900 hover:bg-gray-100'
          ]">
            {{ page }}
          </button>

          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-indigo-100 text-indigo-900 rounded hover:bg-indigo-200 disabled:opacity-50">
            Next
          </button>
        </div>

        <!-- Confirm Modal -->
        <div v-if="confirmModal.show"
          class="fixed inset-0 bg-white/15 backdrop-blur-lg flex items-center justify-center z-50">
          <div class="bg-white text-black rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 class="text-xl font-bold mb-4">Are you sure?</h2>
            <p class="mb-6">Do you really want to delete this event? This action cannot be undone.</p>
            <div class="flex justify-end gap-3">
              <button @click="confirmModal.show = false"
                class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">
                Cancel
              </button>
              <button @click="deleteEvent(confirmModal.id)"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import ManageEventCard from "@/components/ManageEventCard.vue";
import axios from "axios";
import router from "@/router";

export default {
  components: {
    NavbarAdmin,
    ManageEventCard,
  },
  data() {
    return {
      isLoading: true,
      data: [],
      filteredData: [],
      confirmModal: {
        show: false,
        id: null,
      },
      searchQuery: "",
      filterMonth: "",  // Mengubah menjadi filterMonth
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredData.slice(start, start + this.itemsPerPage);
    },
  },
  watch: {
    searchQuery() {
      this.applyFilters();
    },
    filterMonth() {  // Menambahkan watch untuk filterMonth
      this.applyFilters();
    },
    data() {
      this.applyFilters();
    },
  },
  mounted() {
    this.getItem();
  },
  methods: {
    getItem() {
      this.isLoading = true;
      axios.get(`http://localhost:8000/api/events`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.data?.data) {
          this.data = res.data.data;
        }
      }).catch((err) => {
        console.error("Error fetching events:", err);
      }).finally(() => {
        this.isLoading = false;
      });
    },
    applyFilters() {
      let filtered = this.data;

      // Filter berdasarkan searchQuery
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        filtered = filtered.filter(event =>
          event.name.toLowerCase().includes(q)
        );
      }

      // Filter berdasarkan filterMonth
      if (this.filterMonth) {
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date);
          const filterDate = new Date(this.filterMonth);
          return (
            eventDate.getMonth() === filterDate.getMonth() &&
            eventDate.getFullYear() === filterDate.getFullYear()
          );
        });
      }

      this.filteredData = filtered;
      this.currentPage = 1;
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    confirmDelete(id) {
      this.confirmModal.id = id;
      this.confirmModal.show = true;
    },
    deleteEvent(id) {
      const formData = new FormData();
      formData.append("_method", "delete");

      axios.post(`http://localhost:8000/api/events/delete/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
        this.data = this.data.filter(e => e.id !== id);
        this.confirmModal.show = false;
        this.applyFilters();
      }).catch((err) => {
        console.error("Error deleting event:", err);
        this.confirmModal.show = false;
      });
    },
  }
};

</script>

<style scoped></style>
