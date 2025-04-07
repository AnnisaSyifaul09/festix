<template>
  <div>
    <NavbarAdmin></NavbarAdmin>
    <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
      <div class="pt-10 p-2 min-h-screen flex flex-col">
        <div class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 class="font-semibold text-2xl text-center mb-6">Create User</h1>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                v-model="formData.username"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                v-model="formData.fullName"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                v-model="formData.password"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                v-model="formData.role"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>

            <div class="flex justify-end space-x-4">
              <RouterLink
                :to="{ name: 'user' }"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </RouterLink>
              <button
                type="submit"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create User
              </button>
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

export default {
  components: {
    NavbarAdmin,
  },
  data() {
    return {
      formData: {
        username: "",
        fullName: "",
        email: "",
        password: "",
        role: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log('Form submitted:', this.formData);
      // Implement create user logic here
      // After successful creation, redirect to user list
      this.$router.push({ name: 'user' });
    },
  },
};
</script>