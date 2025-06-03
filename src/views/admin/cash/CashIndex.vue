<template>
  <div>
    <NavbarAdmin></NavbarAdmin>
    <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
      <div class="pt-10 p-2 min-h-screen flex flex-col">
        <!-- Tabs -->
        <div class="flex flex-row justify-center items-center space-x-8 mb-8">
          <button @click="currentView = 'global'"
            :class="[currentView === 'global' ? 'text-indigo-700 border-b-2 border-indigo-700' : 'text-indigo-900', 'text-2xl font-bold pb-2']">
            Global Report
          </button>
          <button @click="currentView = 'event'"
            :class="[currentView === 'event' ? 'text-indigo-700 border-b-2 border-indigo-700' : 'text-indigo-900', 'text-2xl font-bold pb-2']">
            Event Report
          </button>
        </div>

        <!-- Global Report View -->
        <div v-if="currentView === 'global'" class="w-full">
          <RevenueGraph :data="dataGlobal" />
          <TransactionTable :transactions="dataGlobal" />
        </div>

        <!-- Event Report View -->
        <div v-else class="w-full">
          <div v-if="!selectedEvent">
            <!-- Search Input -->
            <div class="mb-6">
              <input v-model="searchQuery" type="text" placeholder="Search event..."
                class="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg" />
            </div>

            <!-- Event Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CashEventCard v-for="(event, index) in paginatedEvents" :key="index" :title="event.name"
                :date="event.date" :time="event.time" :location="event.vanue?.name" :totalRevenue="event.total_cash"
                :image="Array.isArray(event.event_image) && event.event_image.length > 0 ? event.event_image[0].link : ''"
                :tickets-sold="event.total_ticket_sold" @click="selectEvent(event)" />
            </div>

            <!-- Pagination -->
            <!-- <div class="mt-6 flex justify-center space-x-2">
              <button @click="currentPage--" :disabled="currentPage === 1"
                class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
                Prev
              </button>
              <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="[
                'px-3 py-1 rounded',
                page === currentPage ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              ]">
                {{ page }}
              </button>
              <button @click="currentPage++" :disabled="currentPage === totalPages"
                class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
                Next
              </button>
            </div> -->

            <div v-if="totalPages > 1" class="mt-10 flex flex-wrap justify-center gap-2">
              <button @click="currentPage--" :disabled="currentPage === 1"
                class="px-4 py-2 bg-indigo-100 text-indigo-900 rounded hover:bg-indigo-200 disabled:opacity-50">
                Prev
              </button>

              <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="[
                'px-4 py-2 rounded',
                currentPage === page
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white border border-gray-300 text-indigo-900 hover:bg-gray-100'
              ]">
                {{ page }}
              </button>

              <button @click="currentPage++" :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-indigo-100 text-indigo-900 rounded hover:bg-indigo-200 disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div v-if="selectedEvent"
      class="fixed px-4 inset-0 flex items-center justify-center bg-gray-400/50 backdrop-blur-xl z-100">
      <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 class="text-2xl font-bold text-indigo-900 mb-6 text-center">
          {{ selectedEvent.name }} - Revenue Report
        </h2>

        <div class="space-y-4">
          <div v-for="(category, index) in selectedEvent.tickets_per_price" :key="index"
            class="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:shadow transition">
            <div>
              <h3 class="text-lg font-semibold text-indigo-800">{{ category.seat_category_name }}</h3>
              <p class="text-sm text-gray-500">{{ formatToIDR(category.price.toLocaleString()) }}</p>
            </div>
            <div class="text-right">
              <p class="text-xl font-bold text-green-600">{{ category.total_ticket }}</p>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center mt-6 border-t pt-4">
          <h2 class="font-semibold text-xl">Total </h2>
          <p class="text-xl font-bold text-green-600"> {{ formatToIDR(selectedEvent.total_cash) }}</p>
        </div>

        <button @click="closeModal"
          class="mt-8 w-full bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded-xl transition">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import RevenueGraph from "@/components/RevenueGraph.vue";
import TransactionTable from "@/components/TransactionTable.vue";
import CashEventCard from "@/components/CashEventCard.vue";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default {
  components: {
    NavbarAdmin,
    RevenueGraph,
    TransactionTable,
    CashEventCard
  },
  data() {
    return {
      dataGlobal: [],
      currentView: 'global',
      selectedEvent: null,
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 4,
      isLoading: false,
    };
  },
  computed: {
    filteredEvents() {
      if (!this.searchQuery) return this.dataGlobal;
      const query = this.searchQuery.toLowerCase();
      return this.dataGlobal.filter(event =>
        event.name?.toLowerCase().includes(query) ||
        event.vanue?.name?.toLowerCase().includes(query)
      );
    },
    paginatedEvents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredEvents.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
    }
  },
  mounted() {
    this.getItem();
  },
  methods: {
    formatToIDR(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(value);
    },
    selectEvent(event) {
      this.selectedEvent = event;
    },
    closeModal() {
      this.selectedEvent = null;
    },
    getItem() {
      this.isLoading = true;
      axios.get(`${API_URL}/cash/global/index`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.data?.data) {
          console.log(res.data.data);
          this.dataGlobal = res.data.data;
        }
      }).catch((err) => {
        console.error("Error fetching events:", err);
      }).finally(() => {
        this.isLoading = false;
      });
    }
  }
};
</script>
