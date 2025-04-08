<template>
  <div>
    <NavbarAdmin></NavbarAdmin>
    <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
      <div class="pt-10 p-2 min-h-screen flex flex-col">
        <div class="py-5 flex flex-row justify-between items-center">
          <h1 class="text-2xl font-bold text-indigo-900 leading-tight">Manage User</h1>
          <RouterLink :to="{ name: 'userCreate' }" class="font-bold py-4 px-6 bg-indigo-700 text-white rounded-full">Add
            New</RouterLink>
        </div>
        <div class="pt-10 w-full">
          <ManageUserTable :users="users" @edit="handleEdit" @delete="handleDelete" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import ManageUserTable from "@/components/ManageUserTable.vue";
import { RouterLink } from 'vue-router';

export default {
  components: {
    NavbarAdmin,
    ManageUserTable
  },

  data() {
    return {
      users: [
        {
          id: 1,
          username: 'johndoe',
          fullName: 'John Doe',
          email: 'john@example.com',
          role: 'admin'
        },
        {
          id: 2,
          username: 'janedoe',
          fullName: 'Jane Doe',
          email: 'jane@example.com',
          role: 'manager'
        },
        {
          id: 3,
          username: 'superuser',
          fullName: 'Super User',
          email: 'super@example.com',
          role: 'superadmin'
        },
        {
          id: 4,
          username: 'regularuser',
          fullName: 'Regular User',
          email: 'user@example.com',
          role: 'user'
        }
      ]
    };
  },
  methods: {
    handleEdit(userId) {
      this.$router.push({ name: 'userEdit', params: { id: userId } });
    },
    handleDelete(userId) {
      console.log('Delete user:', userId);
      // Implement delete logic
    }
  }
};
</script>