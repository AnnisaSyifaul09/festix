<template>
  <div>
    <NavbarAdmin></NavbarAdmin>
    <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
      <div class="pt-10 p-2 min-h-screen flex flex-col">
        <div class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-2xl font-bold text-indigo-900 leading-tight text-center mb-6">Edit User</h1>
          <p class="text-center text-gray-600 mb-4">This feature is currently under development.</p>
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                v-model="formData.username"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                v-model="formData.fullName"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password (Leave empty to keep current password)
              </label>
              <input
                type="password"
                id="password"
                v-model="formData.password"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                v-model="formData.role"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select a role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>

            <div class="text-center">
              <RouterLink
                :to="{ name: 'user' }"
                class="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Back to Users
              </RouterLink>
            </div>
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
  }
};
</script>