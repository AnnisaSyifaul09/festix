<template>
  <div class="min-h-screen ">
    <NavbarItem />
    <div class="flex flex-col items-center justify-center min-h-screen p-20">
      <h1 class="text-3xl font-bold text-black mb-5">Ticket</h1>
      <DesainCard v-if="data.event_price" :title="data?.event_price?.event?.name" :date="data?.event_price?.event?.date"
        :time="data?.event_price?.event?.time" :location="data.event_price?.event?.vanue?.name"
        :category="data?.event_price?.seat_category?.name" :seatNumber="data?.seat_number" :qrCode="data?.code"
        :image="Array.isArray(data.event_price.event.event_image) && data.event_price.event.event_image.length > 0 ? data.event_price.event.event_image[0].link : ''" />
    </div>
  </div>
</template>

<script>
import NavbarItem from "@/components/NavbarItem.vue";
import DesainCard from "@/components/DesainCard.vue";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


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
      data: {} // Inisialisasi sebagai objek kosong
    };
  },
  mounted() {
    this.getItem();
  },
  methods: {
    getItem() {
      axios.get(`${API_URL}/history-tickets/${this.$route.params.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.data?.data) {
          console.log(res.data.data)
          this.data = res.data.data;
        }
      }).catch((err) => {
        console.error("Error fetching ticket data:", err);
      });
    }
  }
};
</script>
