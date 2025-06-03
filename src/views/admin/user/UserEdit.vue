<template>
  <div>
    <NavbarAdmin></NavbarAdmin>
    <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
      <div class="pt-10 p-2 min-h-screen flex flex-col">
        <div class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-2xl font-bold text-indigo-900 leading-tight text-center mb-6">Edit User</h1>
          <form @submit.prevent="updateUser" class="space-y-6">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" id="username" v-model="formData.username"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required />
            </div>

            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="fullName" v-model="formData.name"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" v-model="formData.email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password (Leave empty to keep current password)
              </label>
              <input type="password" id="password" v-model="formData.password"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>

            <div>
              <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
              <select id="role" v-model="formData.role_id"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required>
                <option value="">Select a role</option>
                <option v-for="role in roles" :key="role.id" :value="role.id">
                  {{ role.name }}
                </option>
              </select>
            </div>

            <div class="flex justify-center space-x-4">
              <button type="submit"
                class="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700">
                Update User
              </button>
              <RouterLink :to="{ name: 'user' }"
                class="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Back to Users
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import { RouterLink } from 'vue-router';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default {
  components: {
    NavbarAdmin,
  },
  data() {
    return {
      formData: {
        username: '',
        name: '',
        email: '',
        password: '',
        role_id: ''
      },
      roles: []
    };
  },
  async created() {
    await this.fetchRoles();
    await this.fetchUser();
  },
  methods: {
    async fetchRoles() {
      try {
        const response = await axios.get(`${API_URL}/roles`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.roles = response.data;
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    },
    async fetchUser() {
      try {
        const response = await axios.get(`${API_URL}/users/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const userData = response.data;
        this.formData = {
          username: userData.username,
          name: userData.name,
          email: userData.email,
          password: '',
          role_id: userData.role_id
        };
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async updateUser() {
      try {
        const updateData = { ...this.formData };
        if (!updateData.password) {
          delete updateData.password;
        }

        await axios.put(`${API_URL}/users/${this.$route.params.id}`, updateData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        this.$router.push({ name: 'user' });
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  }
};
</script>