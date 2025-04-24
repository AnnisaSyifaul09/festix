<template>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <div class="flex justify-between items-center mb-6">
      <div class="flex space-x-4">
        <button @click="timeFrame = 'monthly'"
          :class="[timeFrame === 'monthly' ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-gray-700', 'px-4 py-2 rounded-lg']">
          Monthly
        </button>
        <button @click="timeFrame = 'yearly'"
          :class="[timeFrame === 'yearly' ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-gray-700', 'px-4 py-2 rounded-lg']">
          Yearly
        </button>
      </div>
      <div class="flex space-x-4">
        <input type="date" v-model="startDate" class="border rounded-lg px-3 py-2" />
        <input type="date" v-model="endDate" class="border rounded-lg px-3 py-2" />
      </div>
    </div>

    <div class="h-80">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'RevenueGraph',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const chartCanvas = ref(null);
    const chart = ref(null);
    const timeFrame = ref('monthly');
    const startDate = ref('');
    const endDate = ref('');

    // Filter dan grup data berdasarkan waktu
    const prepareGraphData = (rawData, timeframe, start, end) => {
      const filtered = rawData.filter(e => {
        const d = new Date(e.date);
        const afterStart = start ? new Date(start) <= d : true;
        const beforeEnd = end ? d <= new Date(end) : true;
        return afterStart && beforeEnd;
      });

      const map = new Map();

      filtered.forEach(item => {
        const d = new Date(item.date);
        let key = timeframe === 'yearly'
          ? d.getFullYear().toString()
          : d.toLocaleString('default', { month: 'long', year: 'numeric' });

        map.set(key, (map.get(key) || 0) + item.total_cash);
      });

      const labels = Array.from(map.keys()).sort((a, b) => new Date(a) - new Date(b));
      const values = labels.map(label => map.get(label));

      return { labels, values };
    };

    const createChart = () => {
      if (chart.value) {
        chart.value.destroy();
      }

      const chartData = prepareGraphData(props.data, timeFrame.value, startDate.value, endDate.value);

      if (!chartCanvas.value) return;
      const ctx = chartCanvas.value.getContext('2d');

      chart.value = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [{
            label: 'Revenue',
            data: chartData.values,
            borderColor: '#4338CA',
            backgroundColor: '#4338CA',
            tension: 0.4,
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => `Rp${value.toLocaleString('id-ID')}`
              }
            }
          }
        }
      });
    };

    // Re-render chart saat data/tanggal berubah
    onMounted(createChart);

    watch(() => props.data, createChart, { deep: true });
    watch([timeFrame, startDate, endDate], createChart);

    return {
      chartCanvas,
      timeFrame,
      startDate,
      endDate
    };
  }
};
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
}
</style>
