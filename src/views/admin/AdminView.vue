<template>
    <div>
      <NavbarAdmin></NavbarAdmin>
      <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">

        
        <div class="pt-15 p-2 min-h-screen flex flex-col">
          <h1 class="text-2xl font-bold text-indigo-900 mb-8 text-left">Dashboard</h1>
          
          
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
        
      };
    },
  };
  </script>