<template>
    <div class="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <!-- Navbar -->
      <nav class="bg-white shadow-md px-6 py-4 flex justify-between items-center w-full fixed top-0 left-0 right-0 z-50 rounded-b-2xl">
        <div class="flex space-x-6">
          <a href="#" class="font-semibold hover:text-indigo-600" style="color: #3D348B;">HOME</a>
          <a href="#" class="font-semibold hover:text-indigo-600" style="color: #3D348B;">EVENTS</a>
          <a href="#" class="font-semibold hover:text-indigo-600" style="color: #3D348B;">PLACES</a>
        </div>
        <div>
          <button class="font-semibold hover:text-indigo-600" style="color: #3D348B;">PROFILE ▼</button>
        </div>
      </nav>
  
      <!-- Event Cards Grid -->
      <div class="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-center max-w-5xl">
        <div
          v-for="n in 4"
          :key="n"
          class="bg-white rounded-2xl shadow-lg overflow-hidden p-5 w-[500px] flex flex-col">
          
          <!-- Image -->
          <img class="w-full h-48 object-cover rounded-lg" :src="imageUrl" alt="Event Image" />
          
          <!-- Content -->
          <div class="mt-4">
            <h2 class="text-xl font-bold text-indigo-900">Lorem Ipsum Dolor</h2>
            
            <!-- Date & Time -->
            <p class="text-gray-600 text-sm flex items-center mt-1">
              <span class="font-bold text-4xl" style="color: #3D348B;">12</span>
              <span class="flex flex-col">
                <span class="text-lg" style="color: #3D348B;">July</span>
                <span class="text-lg" style="color: #3D348B;">2025</span>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clock mx-2 text-gray-600" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
              </svg>
              <span class="text-lg font-medium" style="color: #3D348B;">18.00</span>
            </p>
            
            <!-- Categories & Price Row -->
            <div class="flex justify-between items-center mt-3">
              <div class="flex flex-wrap gap-2">
                  <a href="#" class="text-black px-3 py-1 text-sm rounded-md" style="background-color: #37FF30;">VIP</a>
                <a href="#" class="text-white px-3 py-1 text-sm rounded-md" style="background-color: #FF3030;">cat 1</a>
                <a href="#" class="text-white px-3 py-1 text-sm rounded-md" style="background-color: #FF3030;">cat 2</a>
                <a href="#" class="text-black px-3 py-1 text-sm rounded-md" style="background-color: #37FF30;">cat 3</a>
                <a href="#" class="text-black px-3 py-1 text-sm rounded-md" style="background-color: #37FF30;">cat 4</a>
              </div>
              <div class="flex flex-col items-end">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-geo-alt mr-2 text-gray-600" viewBox="0 0 16 16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                  </svg>
                  <a href="#" class="text-sm font-medium whitespace-nowrap" style="color: #3D348B;"><strong>Teater Taman Sriwedari</strong></a>
                </div>
                <span class="text-lg font-medium" style="color: #F18701;">Start<br><strong class="text-2xl">50.000</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        imageUrl: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
      };
    },
  };
  </script>
