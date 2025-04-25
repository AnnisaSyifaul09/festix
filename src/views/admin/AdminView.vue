<template>
    <div>
      <NavbarAdmin></NavbarAdmin>
      <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
        <div class="pt-15 p-2 min-h-screen flex flex-col">
          <h1 class="text-2xl font-bold text-indigo-900 mb-8 text-left">Dashboard</h1>
          
          <!-- Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <!-- Today's Revenue -->
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h2 class="text-lg font-semibold text-gray-700 mb-2">Today's Revenue</h2>
              <p class="text-3xl font-bold text-indigo-700">{{ formatCurrency(todayRevenue) }}</p>
              <p class="text-sm text-gray-500 mt-2">{{ getTodayDate() }}</p>
            </div>
            
            <!-- Ongoing Events -->
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h2 class="text-lg font-semibold text-gray-700 mb-2">Ongoing Events</h2>
              <p class="text-3xl font-bold text-indigo-700">{{ ongoingEvents }}</p>
              <p class="text-sm text-gray-500 mt-2">Active events</p>
            </div>

            <!-- Total Users -->
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h2 class="text-lg font-semibold text-gray-700 mb-2">Total Users</h2>
              <p class="text-3xl font-bold text-indigo-700">{{ totalUsers }}</p>
              <p class="text-sm text-gray-500 mt-2">Registered users</p>
            </div>
          </div>

          <!-- Revenue Graph -->
          
        </div>
      </section>
    </div>
  </template>
    
  <script>
  import NavbarAdmin from "@/components/NavbarAdmin.vue";

  
  export default {
    components: {
      NavbarAdmin,

    },
    data() {
      return {
        todayRevenue: 0,
        ongoingEvents: 0,
        totalUsers: 0,
        revenueData: {
          labels: [],
          values: []
        }
      };
    },
    methods: {
      formatCurrency(value) {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
        }).format(value);
      },
      getTodayDate() {
        return new Date().toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      },
      
      
    },

  };
  </script>