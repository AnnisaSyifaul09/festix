<template>
  <div class="bg-white shadow-lg rounded-xl p-10 flex flex-col md:flex-row items-center gap-6 w-full">

    <div class="flex flex-col items-center md:items-start text-center md:text-left">
      <span class="text-indigo-900 font-bold text-2xl">{{ username }}</span>
      <span class="text-indigo-900 text-lg">{{ email }}</span>
      <RouterLink to="resetPassword" class="px-4 py-2 mt-3 rounded-lg bg-indigo-900 text-white hover:bg-indigo-950">
        Reset Password</RouterLink>
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