<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full transition hover:shadow-md">
    <!-- Image -->
    <div class="relative">
      <img class="w-full h-48 object-cover" :src="image_link" alt="Event Image" />
      <div class="absolute bottom-0 left-0 bg-black/50 text-white text-xs px-2 py-1 rounded-tr-xl">
        {{ date }}
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 space-y-2">
      <!-- Title -->
      <h2 class="text-lg font-bold text-gray-900 truncate">{{ title }}</h2>

      <!-- Metadata -->
      <div class="text-xs text-gray-500 space-y-1">
        <div class="flex items-center gap-2">
          <IconTime class="w-4 h-4 text-gray-400" />
          <span>{{ timeOnly }}</span>
        </div>
        <div class="flex items-center gap-2">
          <IconLocation class="w-4 h-4 text-gray-400" />
          <span class="truncate">{{ location }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-between gap-2 pt-3">
        <RouterLink :to="{ name: 'eventShow', params: { id: id } }"
          class="flex-1 text-center text-xs py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition">
          Detail
        </RouterLink>
        <RouterLink :to="{ name: 'eventUpdate', params: { id: id } }"
          class="flex-1 text-center text-xs py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition">
          Edit
        </RouterLink>
        <button @click="showConfirmModal = true"
          class="flex-1 text-center text-xs py-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition">
          Hapus
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showConfirmModal"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h3 class="text-base font-semibold mb-3 text-gray-900">Hapus Event?</h3>
        <p class="text-sm text-gray-600 mb-4">Apakah kamu yakin ingin menghapus event ini? Tindakan ini tidak bisa
          dibatalkan.</p>
        <div class="flex justify-end gap-2">
          <button @click="showConfirmModal = false"
            class="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
            Batal
          </button>
          <button @click="deleteItem" class="text-sm px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import IconDate from "@/components/icons/IconDate.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import axios from "axios";
export default {
  props: {
    id: String,
    image: String,
    title: String,
    date: String,
    time: String,
    location: String,
  },
  data() {
    return {
      image_link: this.image
        ? `http://127.0.0.1:8000${this.image}`
        : "/src/assets/noImage.png",
      showConfirmModal: false, // kontrol modal
    };
  },
  components: {
    IconDate,
    IconTime,
    IconLocation,
  },
  computed: {
    dayOnly() {
      return this.date.split("-")[2]; // Ambil bagian tanggalnya saja
    },
    yearOnly() {
      return this.date.split("-")[0]; // Ambil bagian tahun
    },
    timeOnly() {
      // return this.time.split(" ")[1].slice(0, 5); // Ambil bagian jam dan menit
      return this.time; // Ambil bagian jam dan menit
    },
  },
  methods: {
    getMonthName(date) {
      const dateObj = new Date(date);
      return new Intl.DateTimeFormat("en-US", { month: "long" }).format(dateObj);
    },
    deleteItem() {
      const formData = new FormData();
      formData.append("_method", "delete");

      axios
        .post(
          `http://localhost:8000/api/events/delete/${this.id}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          this.$emit("deleted", this.id); // kirim sinyal ke parent
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