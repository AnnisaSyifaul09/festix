<template>
    <div class="min-h-screen bg-gray-100">
      <NavbarItem />
      <div class="flex flex-col items-center justify-center min-h-screen p-20">
        <h1 class="text-3xl font-bold text-black mb-5">Design Ticket</h1>
        <DesainCard v-bind="ticket" />
      </div>
    </div>
  </template>
  
  <script>
  import NavbarItem from "@/components/NavbarItem.vue";
  import DesainCard from "@/components/DesainCard.vue";
  
  export default {
    components: {
      NavbarItem,
      DesainCard,
    },
    data() {
      return {
        ticket: {
          image: "/src/assets/konser1.jpg",
          title: "Lorem Ipsum Dolor",
          date: "12 July 2025",
          time: "18.00",
          location: "Indonesia",
          qrCode: "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg",
        },
      };
    },
  };
  </script>
  