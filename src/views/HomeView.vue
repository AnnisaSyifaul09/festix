<template lang="">
    <div>
        <nav class="bg-white shadow-md px-6 py-4 flex items-center justify-between w-full fixed top-0 left-0 right-0 z-50 rounded-b-2xl">
            <div class="container mx-auto flex items-center justify-between max-w-screen-xl">
                <!-- Mobile Menu Button -->
                <button @click="toggleMobileMenu" class="md:hidden text-indigo-900 focus:outline-none text-2xl font-bold">
                ☰
                </button>

                <!-- Menu Kiri -->
                <div class="hidden md:flex space-x-12">
                <a href="#" class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">Home</a>
                <a href="#" class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">Events</a>
                <a href="#" class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">Places</a>
                </div>

                <!-- Dropdown Profile -->
                <div class="relative">
                <button @click="toggleDropdown" class="font-semibold text-indigo-900 uppercase tracking-wide hover:text-indigo-700 transition-all">
                    Profile ▼
                </button>
                <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 transition-all transform scale-95 origin-top-right">
                    <a href="#" class="block px-4 py-2 text-indigo-900 hover:bg-indigo-100 hover:text-indigo-700 transition-all">Settings</a>
                    <a href="#" class="block px-4 py-2 text-indigo-900 hover:bg-indigo-100 hover:text-indigo-700 transition-all">Logout</a>
                </div>
                </div>
            </div>
        </nav>

        <div class="relative w-full h-180">
        <img src="@/assets/konser1.jpg" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black opacity-50"></div>

        <div class="absolute inset-0 flex flex-col justify-center items-center text-white px-6">
            <h1 class="text-4xl md:text-3xl lg:text-5xl font-semibold tracking-wide text-center">ROCK AND ROLLSS</h1>
            <p class="text-base md:text-sm lg:text-lg mt-2 font-medium max-w-4xl text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse euismod, justo at viverra eleifend, lectus urna tristique erat, vel fermentum eros ipsum non ex. Vivamus aliquet odio nec libero vulputate, ut fermentum justo tincidunt. Nulla facilisi. Duis ac facilisis velit, sit amet ullamcorper est. Integer sit amet arcu sed mi bibendum fermentum non at velit. Cras fringilla, elit ut consectetur feugiat, ex urna pharetra orci, eu efficitur lacus quam non odio.
            </p>
            <button class="mt-4 border border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-black transition-all">
                Buy Ticket
            </button>
        </div>
    </div>


    <!-- Our Events -->
    <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
        <h2 class="text-indigo-900 text-2xl font-bold mb-2">OUR EVENTS</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EventCard v-for="n in 4" :key="n" />
        </div>
    </section>

    <!-- Venues -->
    <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
        <h2 class="text-indigo-900 text-2xl font-bold mb-2">VENUES</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VenueCard v-for="n in 2" :key="n" />
        </div>
    </section>


    <!-- Footer -->
    <footer class="bg-indigo-900 text-white text-center py-4 text-lg">FOOTER</footer>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import VenueCard from "@/components/VenueCard.vue";

export default {
  components: { EventCard, VenueCard }
};
</script>