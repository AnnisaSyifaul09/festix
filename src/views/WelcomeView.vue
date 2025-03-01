<template>
    <div class="flex justify-center items-center h-screen w-screen">
      <img 
        src="/src/assets/festix-logo1.png" 
        alt="Concert" 
        class="w-[400px] max-w-[80%] md:w-[450px] cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-105"
        @click="goToLogin"
      />
    </div>
</template>
  
<script>
export default {
methods: {
    goToLogin() {
    this.$router.push("/login");
    },
},
};
</script>
  