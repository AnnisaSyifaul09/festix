<template>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <div class="flex justify-between items-center mb-6">
      <div class="flex space-x-4">
        <button 
          @click="timeFrame = 'monthly'"
          :class="[timeFrame === 'monthly' ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-gray-700', 'px-4 py-2 rounded-lg']"
        >
          Monthly
        </button>
        <button 
          @click="timeFrame = 'yearly'"
          :class="[timeFrame === 'yearly' ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-gray-700', 'px-4 py-2 rounded-lg']"
        >
          Yearly
        </button>
      </div>
      <div class="flex space-x-4">
        <input 
          type="date" 
          v-model="startDate"
          class="border rounded-lg px-3 py-2"
        />
        <input 
          type="date" 
          v-model="endDate"
          class="border rounded-lg px-3 py-2"
        />
      </div>
    </div>
    
    <div class="h-80">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'RevenueGraph',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const chartCanvas = ref(null);
    const chart = ref(null);
    const timeFrame = ref('monthly');
    const startDate = ref('');
    const endDate = ref('');

    const transformData = (data, timeframe) => {
      if (!data || !data.labels || !data.values) return data;
      
      if (timeframe === 'yearly') {
        // Group monthly data into yearly
        const yearlyData = {
          labels: [],
          values: []
        };
        
        for (let i = 0; i < data.labels.length; i += 12) {
          const year = data.labels[i].split(' ')[0];
          yearlyData.labels.push(year);
          yearlyData.values.push(
            data.values.slice(i, i + 12).reduce((sum, val) => sum + val, 0)
          );
        }
        return yearlyData;
      }
      return data;
    };

    const createChart = () => {
      if (chart.value) {
        chart.value.destroy();
      }

      const transformedData = transformData(props.data, timeFrame.value);
      
      if (!chartCanvas.value) return;
      
      const ctx = chartCanvas.value.getContext('2d');
      chart.value = new Chart(ctx, {
        type: 'line',
        data: {
          labels: transformedData.labels,
          datasets: [{
            label: 'Revenue',
            data: transformedData.values,
            borderColor: '#4338CA',
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
                callback: (value) => `$${value}`
              }
            }
          }
        }
      });
    };

    onMounted(() => {
      createChart();
    });

    watch(() => props.data, () => {
      createChart();
    }, { deep: true });

    watch(timeFrame, () => {
      if (props.data) {
        createChart();
      }
    });

    return {
      chartCanvas,
      timeFrame,
      startDate,
      endDate
    };
  }
};
</script>