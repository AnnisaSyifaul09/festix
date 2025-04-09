<template>
  <div class="bg-indigo-900 text-white rounded-xl shadow-lg overflow-hidden w-full ">
    <img class="w-full aspect-video object-cover" :src="image_link" alt="Event Image" />
    <div class="p-3">
      <h2 class="text-lg font-bold">{{ title }}</h2>
      <div class="mt-2 flex flex-col gap-1">
        <p class="flex items-center gap-2">
          <IconDate class="w-5 h-5 text-white" />
          {{ date }}
        </p>
        <p class="flex items-center gap-2">
          <IconTime class="w-5 h-5 text-white" />
          {{ timeOnly }}
        </p>
        <p class="flex items-center gap-2">
          <IconLocation class="w-5 h-5 text-white" />
          {{ location }}
        </p>
      </div>
      <div class="flex justify-between gap-3">
        <RouterLink :to="{ name: 'eventShow', params: { id: id } }"
          class="mt-4 bg-indigo-500 px-4 py-2 rounded-lg  hover:bg-indigo-700 flex items-center justify-center">
          Detail
        </RouterLink>
        <RouterLink :to="{ name: 'eventUpdate', params: { id: id } }"
          class="mt-4 bg-lime-500 px-4 py-2 rounded-lg  hover:bg-lime-700 flex items-center justify-center">
          Update
        </RouterLink>
        <button @click="$emit('confirm-delete', id)"
          class="mt-4 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center">
          Delete
        </button>

      </div>

    </div>

    <div v-if="showConfirmModal"
      class="fixed inset-0 bg-white/15 backdrop-blur-lg flex items-center justify-center z-50">
      <div class="bg-white text-black rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 class="text-xl font-bold mb-4">Are you sure?</h2>
        <p class="mb-6">Do you really want to delete this venue? This action cannot be undone.</p>
        <div class="flex justify-end gap-3">
          <button @click="showConfirmModal = false"
            class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">
            Cancel
          </button>
          <button @click="deleteItem" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800">
            Yes, Delete
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
      return this.time.split(" ")[1].slice(0, 5); // Ambil bagian jam dan menit
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