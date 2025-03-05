<template>
    <div class="bg-white shadow-lg rounded-xl p-10 flex flex-col md:flex-row items-center gap-6 w-full">
      <div class="w-32 h-32 bg-gray-300 rounded-full"></div>
  
      <div class="flex flex-col items-center md:items-start text-center md:text-left">
        <span class="text-indigo-900 font-bold text-2xl">{{ username }}</span>
        <span class="text-indigo-900 text-lg">{{ email }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      username: String,
      email: String,
    },
  };
  </script>
  