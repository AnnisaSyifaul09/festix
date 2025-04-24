<template>
  <div>
    <NavbarItem></NavbarItem>
    <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
      <div class="pt-15 p-2 min-h-screen flex flex-col">

        <RouterLink :to="{ name: 'riwayatPembayaran' }"
          class="inline-flex items-center gap-2 w-fit px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 14l2-2m0 0l2-2m-2 2v6m-6 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v16z" />
          </svg>
          History Payment
        </RouterLink>

        <h1 class="text-2xl font-bold text-indigo-900 mb-8 text-left">TICKET HISTORY</h1>

        <div v-if="loading" class="flex justify-center items-center min-h-screen">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>

        <div v-else>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mx-auto justify-items-center">
            <TicketCard v-for="(ticket, index) in paginatedData" :key="index"
              :image="Array.isArray(ticket.event_price.event.event_image) && ticket.event_price.event.event_image.length > 0 ? ticket.event_price.event.event_image[0].link : ''"
              :title="ticket.event_price.event.name" :date="ticket.event_price.event.date"
              :time="ticket.event_price.event.time.split(' ')[1].slice(0, 5)"
              :location="ticket.event_price.event.vanue?.name || 'Unknown Venue'" :id="ticket.id"
              :status="ticket.status" />
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="mt-10 flex justify-center gap-2">
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
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavbarItem from "@/components/NavbarItem.vue";
import TicketCard from "@/components/TicketCard.vue";
import IconDate from "@/components/icons/IconDate.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import axios from "axios";
import router from "@/router";

export default {
  components: {
    NavbarItem,
    TicketCard,
    IconDate,
    IconTime,
    IconLocation,
  },
  data() {
    return {
      data: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 9,
    };
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.data.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.data.length / this.itemsPerPage);
    }
  },
  mounted() {
    this.getItem();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('name');

    if (!token || !username) {
      router.push({ name: 'login' });
    }
  },
  methods: {
    getItem() {
      axios.get(`http://localhost:8000/api/history-tickets`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        console.log(res.data.data);
        this.data = res.data.data;
        this.currentPage = 1; // Reset page setiap data diambil ulang
        this.loading = false;
      }).catch((err) => {
        if (err.response?.status === 401) {
          localStorage.clear();
          router.push({ name: 'login' });
        } else {
          console.error("Error fetching ticket history:", err);
        }
        this.loading = false;
      });
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  }
};
</script>
