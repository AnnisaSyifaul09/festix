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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mx-auto justify-items-center">
          <!-- <TicketCard 
            v-for="(ticket, index) in tickets" 
            :key="index" 
            :image="ticket.image" 
            :title="ticket.title" 
            :date="ticket.date" 
            :time="ticket.time" 
            :location="ticket.location" 
          /> -->
          <TicketCard v-for="(ticket, index) in data" :key="index" :image="tickets[0].image"
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
import ProfileCard from "@/components/ProfileCard.vue";
import TicketCard from "@/components/TicketCard.vue";
import axios from "axios";


export default {
  components: {
    NavbarItem, TicketCard, ProfileCard
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
      me: {},
      data: {},
    };
  },
  mounted() {
    this.getItem();
  },
  methods: {
    getItem() {
      axios.get(`http://localhost:8000/api/auth/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        console.log(res.data.data);
        this.me = res.data.data;
      }).catch((err) => {
        console.error("Error fetching ticket data:", err);
      });

      axios.get(`http://localhost:8000/api/history-tickets`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        console.log(res.data.data)
        this.data = res.data.data
      }).catch((err) => {
        console.log(err);
      });

    },
  }
};
</script>
