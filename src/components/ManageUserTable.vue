<template>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-xl ">
        <thead class="bg-gray-50 ">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-b border-gray-300 hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.username }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span :class="getRoleBadgeClass(user.role.name)">{{ user.role.name }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex justify-center gap-2">
                <RouterLink :to="{ name: 'userEdit', params: { id: user.id } }"
                  class="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-700 transition-colors">
                  Edit
                </RouterLink>
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