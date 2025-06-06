<template>
  <div
    class="bg-white rounded-xl shadow border border-gray-200 w-full max-w-5xl overflow-hidden transition hover:shadow-md">
    <!-- Venue Image -->
    <img :src="image_link" alt="Venue Image" class="w-full h-48 object-cover" />

    <!-- Venue Info -->
    <div class="p-4 space-y-3">
      <!-- Title -->
      <h2 class="text-xl font-semibold text-gray-900 truncate">{{ name }}</h2>

      <!-- Location -->
      <p class="flex items-center gap-2 text-sm text-gray-600">
        <IconLocation class="w-5 h-5 text-gray-400" />
        <span class="truncate">{{ location }}</span>
      </p>

      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-2">
        <RouterLink :to="{ name: 'venuesUpdate', params: { id: id } }"
          class="text-sm px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition">
          Edit
        </RouterLink>
        <button @click="showConfirmModal = true"
          class="text-sm px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition">
          Delete
        </button>
      </div>
    </div>

    <!-- Modal Confirmation -->
    <div v-if="showConfirmModal"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white text-gray-800 rounded-xl p-6 w-full max-w-sm shadow-xl">
        <h2 class="text-lg font-semibold mb-2">Hapus Venue?</h2>
        <p class="text-sm text-gray-600 mb-6">Apakah Anda yakin ingin menghapus venue ini? Tindakan ini tidak bisa
          dibatalkan.</p>
        <div class="flex justify-end gap-3">
          <button @click="showConfirmModal = false"
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm">
            Batal
          </button>
          <button @click="deleteItem" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconLocation from "@/components/icons/IconLocation.vue";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export default {
  props: {
    id: String,
    image: String,
    name: String,
    location: String,
  },
  components: {
    IconLocation,
  },
  data() {
    return {
      image_link: this.image
        ? `${BASE_URL}${this.image}`
        : "/src/assets/noImage.png",
      showConfirmModal: false,
    };
  },
  methods: {
    deleteItem() {
      const formData = new FormData();
      formData.append("_method", "delete");

      axios
        .post(`http://localhost:8000/api/venues/delete/${this.id}`, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.$emit("deleted", this.id);
          this.showConfirmModal = false;
        })
        .catch((err) => {
          console.error("Error deleting venue:", err);
          this.showConfirmModal = false;
        });
    },
  },
};
</script>
