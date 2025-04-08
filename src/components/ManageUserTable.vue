<template>
  <div class="overflow-x-auto w-full">
    <table class="min-w-full bg-white rounded-xl shadow-lg">
      <thead class="bg-indigo-900 text-white">
        <tr>
          <th class="py-3 px-4 text-left">Username</th>
          <th class="py-3 px-4 text-left">Full Name</th>
          <th class="py-3 px-4 text-left">Email</th>
          <th class="py-3 px-4 text-left">Role</th>
          <th class="py-3 px-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-50">
          <td class="py-3 px-4">{{ user.username }}</td>
          <td class="py-3 px-4">{{ user.name }}</td>
          <td class="py-3 px-4">{{ user.email }}</td>
          <td class="py-3 px-4">
            <span :class="getRoleBadgeClass(user.role.name)">{{ user.role.name }}</span>
          </td>
          <td class="py-3 px-4">
            <div class="flex justify-center gap-2">
              <button @click="$emit('edit', user.id)"
                class="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-700 transition-colors">
                Edit
              </button>
              <button @click="$emit('delete', user.id)"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  methods: {
    getRoleBadgeClass(role) {
      const baseClasses = 'px-2 py-1 rounded-full text-xs font-semibold';
      const roleColors = {
        superadmin: 'bg-purple-100 text-purple-800',
        admin: 'bg-blue-100 text-blue-800',
        manager: 'bg-green-100 text-green-800',
        user: 'bg-gray-100 text-gray-800'
      };
      return `${baseClasses} ${roleColors[role.toLowerCase()]}`;
    }
  }
};
</script>