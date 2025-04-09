<template>
  <div>
    <NavbarAdmin></NavbarAdmin>
    <section class="py-12 px-6 md:px-0 container mx-auto">
      <div class="pt-10 p-4 min-h-screen flex flex-col">
        <div class="py-5 flex flex-row justify-between items-center">
          <h1 class="text-2xl font-bold text-indigo-900 leading-tight">Manage Event</h1>
          <RouterLink :to="{ name: 'eventCreate' }" class="font-bold py-4 px-6 bg-indigo-700 text-white rounded-full">
            Add New
          </RouterLink>
        </div>
        <div v-if="isLoading" class="flex justify-center items-center h-32">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-900"></div>
        </div>
        <div v-else
          class="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full mx-auto justify-items-center">
          <ManageEventCard v-for="(event, index) in data" class="shadow-lg hover:scale-105 transition duration-300"
            :key="index" :event="event" :title="event.name" :date="event.date" :time="event.time"
            :image="Array.isArray(event.event_image) && event.event_image.length > 0 ? event.event_image[0].link : ''"
            :location="event.vanue?.name" :id="event.id" @confirm-delete="confirmDelete" />
        </div>
      </div>
    </section>

    <!-- Confirm Modal -->
    <div v-if="confirmModal.show"
      class="fixed inset-0 bg-white/15 backdrop-blur-lg flex items-center justify-center z-50">
      <div class="bg-white text-black rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 class="text-xl font-bold mb-4">Are you sure?</h2>
        <p class="mb-6">Do you really want to delete this event? This action cannot be undone.</p>
        <div class="flex justify-end gap-3">
          <button @click="confirmModal.show = false"
            class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">
            Cancel
          </button>
          <button @click="deleteEvent(confirmModal.id)"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
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
      isLoading: true,
      data: [],
      confirmModal: {
        show: false,
        id: null,
      },
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
          this.data = res.data.data;
        }
      }).catch((err) => {
        console.error("Error fetching ticket data:", err);
      }).finally(() => {
        this.isLoading = false;
      });
    },
    confirmDelete(id) {
      this.confirmModal.id = id;
      this.confirmModal.show = true;
    },
    deleteEvent(id) {
      const formData = new FormData();
      formData.append("_method", "delete");

      axios.post(`http://localhost:8000/api/events/delete/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
        this.data = this.data.filter(e => e.id !== id);
        this.confirmModal.show = false;
      }).catch((err) => {
        console.error("Error deleting event:", err);
        this.confirmModal.show = false;
      });
    },
  }
};
</script>
