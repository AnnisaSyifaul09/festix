<template>
    <div>
      <NavbarAdmin></NavbarAdmin>
      <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
        <div class="pt-10 p-2 min-h-screen flex flex-col">
            <div class="py-5 flex flex-row justify-between items-center">
                <h1 class="text-2xl font-bold text-indigo-900 leading-tight">Manage User</h1>
                <a href="#" class="font-bold py-4 px-6 bg-indigo-700 text-white rounded-full"> Add New</a>
            </div>
            <div class="pt-10 grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl mx-auto justify-items-center">
            
          </div>

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