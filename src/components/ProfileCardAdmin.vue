<template>
  <div class="bg-white shadow-lg rounded-xl p-10 flex flex-col  items-center gap-6 w-full">

    <div class="flex flex-col items-center text-center">
      <span class="text-indigo-900 font-bold text-2xl">{{ username }}</span>
      <span class="text-indigo-900 text-lg">{{ name }}</span>
      <span class="text-indigo-900 text-lg">{{ email }}</span>
      <span class="text-indigo-900 text-lg"> <span :class="getRoleBadgeClass(role)">{{ role }}</span></span>
      <RouterLink :to="{ name: 'updateProfileAdmin' }"
        class="px-4 py-2 mt-3 rounded-lg bg-indigo-900 text-white hover:bg-indigo-950">
        Reset Password</RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    username: String,
    name: String,
    id: String,
    role: String,
    email: String,
  },
  methods: {
    getRoleBadgeClass(role) {
      if (!role) return 'bg-gray-100 text-gray-800'; // fallback
      const baseClasses = 'px-2 py-1 rounded-full text-xs font-semibold';
      const roleColors = {
        superadmin: 'bg-purple-100 text-purple-800',
        admin: 'bg-blue-100 text-blue-800',
        manager: 'bg-green-100 text-green-800',
        user: 'bg-gray-100 text-gray-800'
      };
      return `${baseClasses} ${roleColors[role.toLowerCase()] || roleColors.user}`;
    }
  }
};
</script>