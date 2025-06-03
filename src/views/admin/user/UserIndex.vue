<template>
  <div>
    <NavbarAdmin></NavbarAdmin>
    <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
      <div class="pt-10 p-2 min-h-screen flex flex-col">
        <div class="py-5 flex flex-row justify-between items-center">
          <h1 class="text-2xl font-bold text-indigo-900 leading-tight">Manage User</h1>
          <RouterLink :to="{ name: 'userCreate' }"
            class="font-bold py-4 px-6 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800">
            Add New
          </RouterLink>
        </div>

        <div class="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <input v-model="searchQuery" @input="handleSearch" type="text" placeholder="Search by name or email..."
            class="border border-gray-300  px-4 py-2 rounded-lg w-full md:w-1/3" />
        </div>

        <div class="pt-4 w-full">
          <ManageUserTable :users="paginatedUsers" @edit="handleEdit" @delete="handleDelete" />
        </div>

        <div class="pt-8 flex justify-center">
          <button v-for="page in totalPages" :key="page" @click="currentPage = page"
            :class="['mx-1 px-3 py-1 rounded-md', currentPage === page ? 'bg-indigo-700 text-white' : 'bg-gray-200']">
            {{ page }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import ManageUserTable from "@/components/ManageUserTable.vue";
import { RouterLink } from 'vue-router';
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default {
  components: {
    NavbarAdmin,
    ManageUserTable,
    RouterLink
  },

  data() {
    return {
      data: [],
      isLoading: true,
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 5
    };
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) return this.data;
      const query = this.searchQuery.toLowerCase();
      return this.data.filter(user =>
        user.username.toLowerCase().includes(query) ||
        user.name?.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredUsers.slice(start, start + this.itemsPerPage);
    }
  },
  mounted() {
    this.getItem();
  },
  methods: {
    handleEdit(userId) {
      this.$router.push({ name: 'userEdit', params: { id: userId } });
    },
    handleDelete(userId) {
      console.log('Delete user:', userId);
      // Implement delete logic
    },
    handleSearch() {
      this.currentPage = 1;
    },
    async getItem() {
      this.isLoading = true;
      try {
        const res = await axios.get(`${API_URL}/admin/users`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        this.isLoading = false;
        if (res.data?.data) {
          this.data = res.data.data;
        }
      } catch (err) {
        this.isLoading = false;
        if (err.response?.status === 401) {
          localStorage.removeItem('email');
          localStorage.removeItem('name');
          localStorage.removeItem('role_id');
          localStorage.removeItem('token');
          router.push({ name: 'login' });
        } else {
          console.error("Error fetching roles data:", err);
        }
      }
    },
  }
};
</script>
