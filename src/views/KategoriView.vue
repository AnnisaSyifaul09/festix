<template>
  <div class="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
    <NavbarItem></NavbarItem>

    <div class="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
      <RouterLink v-for="event in data" :key="event.id"
        class="bg-white rounded-2xl shadow-lg overflow-hidden p-5 w-full max-w-[500px] flex flex-col"
        :to="{ name: 'detailEvent', params: { id: event.id } }">

        <img class=" w-full h-48 object-cover rounded-lg" :src="imageUrl" alt="Event Image" />

        <div class="mt-4">
          <h2 class="text-xl font-bold text-indigo-900">{{ event.name }}</h2>

          <p class="text-lg font-medium text-indigo-900 flex flex-wrap items-center gap-2 sm:flex-nowrap">
            <span class="font-bold text-4xl text-indigo-900">{{ dayOnly(event.date) }}</span>
            <span class="flex flex-col ml-2">
              <span class="text-lg text-indigo-900">{{ getMonthName(event.date) }}</span>
              <span class="text-lg text-indigo-900">{{ yearOnly(event.date) }}</span>
            </span>

            <span class="flex items-center gap-1 text-indigo-900 ml-3">
              <IconTime></IconTime>
              {{ timeOnly(event.time) }}
            </span>

            <span class="flex items-center gap-1 text-indigo-900 text-sm sm:ml-1 ml-0 w-full sm:w-auto">
              <IconLocation></IconLocation>
              <strong class="whitespace-nowrap sm:whitespace-normal">{{ event.vanue.name }}</strong>
            </span>
          </p>

          <div class="mt-3">
            <div class="flex flex-wrap gap-2">
              <button v-for="(seat, index) in event.event_price" :key="index" @click="selectCategory(event, seat)"
                :class="['px-3 py-1 text-sm rounded-md font-medium',
                  seat.tickets_count < seat.total_seat ? 'cursor-pointer' : 'cursor-not-allowed opacity-100']" :style="{
                    backgroundColor: seat.tickets_count < seat.total_seat
                      ? (event.selectedCategory === seat.seat_category.name ? '#FFD700' : '#37FF30')
                      : '#FF3030',
                    color: seat.tickets_count < seat.total_seat ? 'black' : 'white'
                  }">
                {{ seat.seat_category.name }} ({{ seat.total_seat - seat.tickets_count }})
              </button>
            </div>

            <div class="flex flex-col  mt-3">
              <span class="text-lg font-medium text-yellow-500">
                <strong class="text-2xl">{{ event.selectedPrice == 0 ? formatToIDR(event.event_price_min_price) :
                  event.selectedPrice }}</strong>
              </span>
            </div>
          </div>

        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import IconLocation from '@/components/icons/IconLocation.vue';
import IconTime from '@/components/icons/IconTime.vue';
import NavbarItem from '@/components/NavbarItem.vue';
import axios from "axios";

export default {
  components: {
    NavbarItem, IconTime, IconLocation
  },
  data() {
    return {
      imageUrl: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
      data: [],
    };
  },
  mounted() {
    this.getItem();
  },
  methods: {
    formatToIDR(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(value);
    },
    selectCategory(event, seat) {
      if (seat.tickets_count < seat.total_seat) {
        event.selectedCategory = seat.seat_category.name;
        event.selectedPrice = this.formatToIDR(seat.price);
      }
    },
    getItem() {
      axios.get(`http://localhost:8000/api/events`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.data?.data) {
          this.data = res.data.data.map(event => ({
            ...event,
            selectedCategory: null,
            selectedPrice: 0
          }));
        }
      }).catch((err) => {
        console.error("Error fetching ticket data:", err);
      });
    },
    dayOnly(date) {
      return date.split("-")[2];
    },
    yearOnly(date) {
      return date.split("-")[0];
    },
    timeOnly(time) {
      return time.split(" ")[1].slice(0, 5);
    },
    getMonthName(date) {
      const dateObj = new Date(date);
      return new Intl.DateTimeFormat("en-US", { month: "long" }).format(dateObj);
    },
  },
};
</script>