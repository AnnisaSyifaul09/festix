<template>
    <div class="max-w-lg mx-auto mt-8 space-y-6 md:flex-col">  
      <!-- Card -->
      <div class="bg-indigo-900 shadow-lg rounded-lg p-6">
        <!-- Gambar -->
        <img class="w-full h-full object-cover rounded-lg" src="/src/assets/konser1.jpg" alt="Event Image" />
  
        <!-- Konten -->
        <div class="mt-4">
          <p class="text-white flex flex-wrap items-center gap-4 sm:flex-nowrap text-sm">
            <span class="font-bold text-3xl text-white">12</span>
            <span class="flex flex-col ml-2">
              <span class="text-base text-white">July</span>
              <span class="text-base text-white">2025</span>
            </span>
  
            <!-- Ikon Jam -->
            <span class="flex items-center gap-2 text-white ml-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clock">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
              </svg>
              <span class="text-base">18.00</span>
            </span>
  
            <!-- Ikon Lokasi -->
            <span class="flex items-start gap-2 text-white text-sm sm:ml-6 ml-0 w-full sm:w-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-geo-alt">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
              </svg>
              <p class="text-xs sm:text-base break-words text-wrap leading-tight text-white">Teater Taman Sriwedari, Slamet Riyadi St No.275, Sriwedari, Laweyan, Surakarta City, Central Java 57141</p>
            </span>
          </p>
        </div>
      </div>
    </div>
</template>
  