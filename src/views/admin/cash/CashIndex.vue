<template>
  <div>
    <NavbarAdmin></NavbarAdmin>
    <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
      <div class="pt-10 p-2 min-h-screen flex flex-col">
        <div class="flex flex-row justify-center items-center space-x-8 mb-8">
          <button @click="currentView = 'global'" :class="[currentView === 'global' ? 'text-indigo-700 border-b-2 border-indigo-700' : 'text-indigo-900',
            'text-2xl font-bold pb-2']">
            Global Report
          </button>
          <button @click="currentView = 'event'" :class="[currentView === 'event' ? 'text-indigo-700 border-b-2 border-indigo-700' : 'text-indigo-900',
            'text-2xl font-bold pb-2']">
            Event Report
          </button>
        </div>

        <!-- Global Report View -->
        <div v-if="currentView === 'global'" class="w-full">
          <RevenueGraph :data="globalRevenueData" />
          <TransactionTable :transactions="globalTransactions" />
        </div>

        <!-- Event Report View -->
        <div v-else class="w-full">
          <div v-if="!selectedEvent" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CashEventCard v-for="event in events" :key="event.id" v-bind="event" @click="selectEvent(event)" />
          </div>
          <div v-else>
            <button @click="selectedEvent = null" class="mb-6 flex items-center text-indigo-700 hover:text-indigo-900">
              <span class="mr-2">←</span> Back to Events
            </button>
            <h2 class="text-xl font-bold text-indigo-900 mb-6">{{ selectedEvent.title }} - Revenue Report</h2>
            <RevenueGraph :data="selectedEvent.revenueData" />
            <TransactionTable :transactions="selectedEvent.transactions" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import RevenueGraph from "@/components/RevenueGraph.vue";
import TransactionTable from "@/components/TransactionTable.vue";
import CashEventCard from "@/components/CashEventCard.vue";

export default {
  components: {
    NavbarAdmin,
    RevenueGraph,
    TransactionTable,
    CashEventCard
  },

  data() {
    return {
      currentView: 'global',
      selectedEvent: null,
      globalRevenueData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [12000, 19000, 15000, 25000, 22000, 30000]
      },
      globalTransactions: [
        {
          id: 1,
          date: '2023-06-01',
          event: 'Summer Music Festival',
          ticketsSold: 150,
          revenue: 7500,
          status: 'completed'
        },
        {
          id: 2,
          date: '2023-06-02',
          event: 'Comedy Night',
          ticketsSold: 80,
          revenue: 2400,
          status: 'completed'
        },
        {
          id: 3,
          date: '2023-06-03',
          event: 'Theater Show',
          ticketsSold: 200,
          revenue: 10000,
          status: 'pending'
        }
      ],
      events: [
        {
          id: 1,
          image: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
          title: "Summer Music Festival",
          date: "12 July 2025",
          time: "18.00",
          location: "Teater Taman Sriwedari",
          totalRevenue: 25000,
          ticketsSold: 500,
          revenueData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            values: [5000, 7000, 4000, 3000, 3000, 3000]
          },
          transactions: [
            {
              id: 1,
              date: '2023-06-01',
              event: 'Summer Music Festival',
              ticketsSold: 100,
              revenue: 5000,
              status: 'completed'
            },
            {
              id: 2,
              date: '2023-06-02',
              event: 'Summer Music Festival',
              ticketsSold: 150,
              revenue: 7500,
              status: 'completed'
            }
          ]
        },
        {
          id: 2,
          image: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
          title: "Comedy Night Special",
          date: "15 July 2025",
          time: "20.00",
          location: "Comedy Club Central",
          totalRevenue: 15000,
          ticketsSold: 300,
          revenueData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            values: [2000, 3000, 2500, 2500, 2500, 2500]
          },
          transactions: [
            {
              id: 1,
              date: '2023-06-01',
              event: 'Comedy Night Special',
              ticketsSold: 50,
              revenue: 2500,
              status: 'completed'
            },
            {
              id: 2,
              date: '2023-06-02',
              event: 'Comedy Night Special',
              ticketsSold: 60,
              revenue: 3000,
              status: 'pending'
            }
          ]
        },
        {
          id: 3,
          image: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
          title: "Theater Show Spectacular",
          date: "20 July 2025",
          time: "19.00",
          location: "Grand Theater Hall",
          totalRevenue: 20000,
          ticketsSold: 400,
          revenueData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            values: [3000, 4000, 3500, 3500, 3000, 3000]
          },
          transactions: [
            {
              id: 1,
              date: '2023-06-01',
              event: 'Theater Show Spectacular',
              ticketsSold: 80,
              revenue: 4000,
              status: 'completed'
            },
            {
              id: 2,
              date: '2023-06-02',
              event: 'Theater Show Spectacular',
              ticketsSold: 70,
              revenue: 3500,
              status: 'completed'
            }
          ]
        },
      ],
    };
  },
  methods: {
    selectEvent(event) {
      this.selectedEvent = event;
    }
  }
};
</script>