<template>
  <div>
    <NavbarAdmin></NavbarAdmin>
    <section class="py-12 px-6 md:px-0 container mx-auto">
      <div class="pt-10 p-4 min-h-screen flex flex-col">
        <div class="py-5 flex flex-row justify-between items-center">
          <h1 class="text-2xl font-bold text-indigo-900 leading-tight">Manage Event</h1>
          <RouterLink :to="{ name: 'eventCreate' }" class="font-bold py-4 px-6 bg-indigo-700 text-white rounded-full">
            Add
            New
          </RouterLink>
        </div>
        <div v-if="isLoading" class="flex justify-center items-center h-32">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-900"></div>
        </div>
        <div v-else
          class="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full  mx-auto justify-items-center">
          <ManageEventCard v-for="(event, index) in data" class="shadow-lg hover:scale-105 transition duration-300"
            :key="index" :event="event" :title="event.name" :date="event.date" :time="event.time"
            :image="Array.isArray(event.event_image) && event.event_image.length > 0 ? event.event_image[0].link : ''"
            :location="event.vanue?.name" :id="event.id" />
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import ManageEventCard from "@/components/ManageEventCard.vue";
import IconDate from "@/components/icons/IconDate.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import axios from "axios";
import router from "@/router";

export default {
  components: {
    NavbarAdmin,
    ManageEventCard,
    IconDate,
    IconTime,
    IconLocation,
  },

  data() {
    return {
      events: [
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
        {
          image: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
          title: "LOREM IPSUM DOLOR",
          date: "12 July 2025",
          time: "18.00",
          location: "Teater Taman Sriwedari",
        },
      ],
      isLoading: true,
      data: [],
    };
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
          console.log(res.data.data)
          this.data = res.data.data;
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