<template>
  <div>
    <NavbarAdmin></NavbarAdmin>
    <section class="py-12 px-6 md:px-0 container mx-auto">
      <div class="pt-10 p-2 min-h-screen flex flex-col">
        <div class="py-5 flex flex-row justify-between items-center">
          <h1 class="text-2xl font-bold text-indigo-900 leading-tight">Manage User</h1>
          <RouterLink :to="{ name: 'adminUsersCreate' }"
            class="font-bold py-4 px-6 bg-indigo-700 text-white rounded-full">
            Add New</RouterLink>
        </div>
        <div v-if="isLoading" class="flex justify-center items-center h-32">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-900"></div>
        </div>
        <div v-else class="overflow-x-auto w-full mx-auto bg-white shadow rounded-lg">
          <table class="min-w-full text-sm text-left text-gray-700">
            <thead class="bg-gray-100 text-xs uppercase">
              <tr>
                <th class="px-6 py-4 border-b">No</th>
                <th class="px-6 py-4 border-b">Name</th>
                <th class="px-6 py-4 border-b">Username</th>
                <th class="px-6 py-4 border-b">Role</th>
                <th class="px-6 py-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in data" :key="user" class="hover:bg-gray-50">
                <td class="px-6 py-4 border-b">{{ index + 1 }}</td>
                <td class="px-6 py-4 border-b">{{ user.name }}</td>
                <td class="px-6 py-4 border-b">{{ user.username }}</td>
                <td class="px-6 py-4 border-b capitalize">{{ user.role.name }}</td>
                <td class="px-6 py-4 border-b space-x-2">
                  <button @click="editUser(user)"
                    class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs">
                    Edit
                  </button>
                  <button @click="deleteUser(user)"
                    class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import axios from "axios";

export default {
  components: {
    NavbarAdmin,
  },
  data() {
    return {
      users: [
        { id: 1, name: "Alice Johnson", username: "alicej", role: "admin" },
        { id: 2, name: "Bob Smith", username: "bobsmith", role: "editor" },
        { id: 3, name: "Carol Lee", username: "carollee", role: "viewer" },
      ],
      data: [],
      isLoading: true,
    };
  },
  mounted() {
    this.getItem();
  },
  methods: {
    editUser(user) {
      alert(`Edit user: ${user.name}`);
    },
    deleteUser(user) {
      if (confirm(`Are you sure you want to delete ${user.name}?`)) {
        this.users = this.users.filter((u) => u.id !== user.id);
      }
    },
    async getItem() {
      this.isLoading = true;
      try {
        const res = await axios.get(`http://localhost:8000/api/admin/users`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        this.isLoading = false;
        if (res.data?.data) {
          this.data = res.data.data;

          // Set default role_id ke role pertama
          if (this.roles.length > 0) {
            this.form.role_id = this.roles[0].id;
          }
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
  },
};
</script>
