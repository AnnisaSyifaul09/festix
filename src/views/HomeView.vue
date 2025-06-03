<template>
  <div>
    <div class="relative w-full h-180">
      <NavbarItem></NavbarItem>
      <img src="@/assets/konser1.jpg" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="absolute inset-0 flex flex-col justify-center items-center text-white px-6">
        <h1 class="text-4xl md:text-3xl lg:text-5xl font-semibold tracking-wide text-center">ROCK AND ROLLSS</h1>
        <p class="text-base md:text-sm lg:text-lg mt-2 font-medium max-w-4xl text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse euismod, justo at viverra eleifend,
          lectus urna tristique erat, vel fermentum eros ipsum non ex.
        </p>
        <button
          class="mt-4 border border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-black transition-all">
          Buy Ticket
        </button>
      </div>
    </div>

    <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
      <h2 class="text-indigo-900 text-2xl font-bold mb-2">OUR EVENTS</h2>
      <div v-if="isLoading" class="flex justify-center items-center h-32">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-900"></div>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EventCard v-for="event in limitedEvents" :key="event" :name="event.name" :venue="event.vanue.name"
          :date="event.date" :time="event.time"
          :image="Array.isArray(event.event_image) && event.event_image.length > 0 ? event.event_image[0].link : ''" />
      </div>
    </section>

    <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
      <h2 class="text-indigo-900 text-2xl font-bold mb-2">VENUES</h2>
      <div v-if="isLoading" class="flex justify-center items-center h-32">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-900"></div>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <VenueCard v-for="venue in data" :key="venue" :name="venue.name" :address="venue.address"
          :image="Array.isArray(venue.venue_image) && venue.venue_image.length > 0 ? venue.venue_image[0].link : ''" />
      </div>
    </section>

    <footer class="bg-indigo-900 text-white text-center py-4 text-lg">FOOTER</footer>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import NavbarItem from "@/components/NavbarItem.vue";
import VenueCard from "@/components/VenueCard.vue";
import axios from "axios";
import router from '@/router';

const API_URL = import.meta.env.VITE_API_URL;


export default {
  components: {
    EventCard, VenueCard, NavbarItem
  },
  data() {
    return {
      data: {},
      data_events: {},
      isLoading: true,
    };
  },
  computed: {
    limitedEvents() {
      return Array.isArray(this.data_events) ? this.data_events.slice(0, 6) : [];
    }
  },
  mounted() {
    this.getItem();
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "client"); // Ganti dengan ClientKey
    document.body.appendChild(script);
  },
  methods: {
    getItem() {
      this.isLoading = true;
      axios.get(`${API_URL}/venues`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
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

      axios.get(`${API_URL}/events`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.data?.data) {
          this.data_events = res.data.data;
        }
      }).catch((err) => {
        console.error("Error fetching ticket data:", err);
      }).finally(() => {
        this.isLoading = false;
      });
    }
  }
};
</script>
