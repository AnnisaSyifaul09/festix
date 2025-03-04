<template>
    <div>
      <NavbarItem></NavbarItem>
      <div class="pt-20 p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <h1 class="text-3xl font-bold text-indigo-900 mb-5">TICKET HISTORY</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto justify-items-center">
          <TicketCard 
            v-for="(ticket, index) in tickets" 
            :key="index" 
            :image="ticket.image" 
            :title="ticket.title" 
            :date="ticket.date" 
            :time="ticket.time" 
            :location="ticket.location" 
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavbarItem from "@/components/NavbarItem.vue";
  import TicketCard from "@/components/TicketCard.vue";
  import IconDate from "@/components/icons/IconDate.vue";
  import IconTime from "@/components/icons/IconTime.vue";
  import IconLocation from "@/components/icons/IconLocation.vue";
  
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
      };
    },
  };
  </script>