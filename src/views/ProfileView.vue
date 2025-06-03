<template>
  <div>
    <NavbarItem />
    <section class="pt-24 py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
      <h2 class="text-indigo-900 font-bold text-2xl mb-2">PROFILE</h2>
      <ProfileCard :username="me.name" :email="me.email" :id="me.id" />
    </section>

    <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
      <div class="p-2 min-h-screen flex flex-col">
        <h1 class="text-2xl font-bold text-indigo-900 mb-8 text-left">TICKET HISTORY</h1>

        <!-- Loading Spinner -->
        <div v-if="loading" class="flex justify-center items-center min-h-screen">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>

        <!-- Content Display After Data is Loaded -->
        <div v-else>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mx-auto justify-items-center">
            <TicketCard v-for="(ticket, index) in paginatedData" :key="index"
              :image="Array.isArray(ticket.event_price.event.event_image) && ticket.event_price.event.event_image.length > 0 ? ticket.event_price.event.event_image[0].link : ''"
              :title="ticket.event_price.event.name" :date="ticket.event_price.event.date"
              :time="ticket.event_price.event.time" :location="ticket.event_price.event.location" :id="ticket.id"
              :status="ticket.status" />
          </div>

          <!-- Pagination Controls -->
          <div v-if="totalPages > 1" class="mt-10 flex justify-center gap-2 flex-wrap">
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
import ProfileCard from "@/components/ProfileCard.vue";
import TicketCard from "@/components/TicketCard.vue";
import axios from "axios";
import router from "@/router";

const API_URL = import.meta.env.VITE_API_URL;


export default {
  components: {
    NavbarItem, TicketCard, ProfileCard
  },
  data() {
    return {
      me: {},
      data: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 6,
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
      // Fetch user profile
      axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        this.me = res.data.data;
      }).catch((err) => {
        if (err.response?.status === 401) {
          this.logout();
        } else {
          console.error("Error fetching user data:", err);
        }
      });

      // Fetch ticket history
      axios.get(`${API_URL}/history-tickets`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        this.data = res.data.data;
        this.currentPage = 1;
        this.loading = false;
      }).catch((err) => {
        if (err.response?.status === 401) {
          this.logout();
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
    },
    logout() {
      localStorage.clear();
      router.push({ name: 'login' });
    }
  }
};
</script>
