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

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mx-auto justify-items-center">
          <TicketCard v-for="(ticket, index) in data" :key="index"
            :image="Array.isArray(ticket.event_price.event.event_image) && ticket.event_price.event.event_image.length > 0 ? ticket.event_price.event.event_image[0].link : ''"
            :title="ticket.event_price.event.name" :date="ticket.event_price.event.date"
            :time="ticket.event_price.event.time.split(' ')[1].slice(0, 5)" :location="tickets[0].location"
            :id="ticket.id" :status="ticket.status" />
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
      tickets: [
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
      data: "",
      loading: true,
    };
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
        console.log(res.data.data)
        this.data = res.data.data;
        this.loading = false;
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
        this.loading = false;
      });
    }
  }
};
</script>
