<template>
  <div class="bg-white p-6 rounded-lg shadow-lg mt-6">
    <div class="overflow-x-auto">
      <table class="min-w-full table-auto">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets Sold</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="transaction in sortedTransactions" :key="transaction.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.date }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.event }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.ticketsSold }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${{ transaction.revenue.toFixed(2) }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`,
                transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800']"
              >
                {{ transaction.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'TransactionTable',
  props: {
    transactions: {
      type: Array,
      required: true
    },
    sortBy: {
      type: String,
      default: 'date'
    },
    sortOrder: {
      type: String,
      default: 'desc'
    }
  },
  setup(props) {
    const sortedTransactions = computed(() => {
      return [...props.transactions].sort((a, b) => {
        const modifier = props.sortOrder === 'desc' ? -1 : 1;
        if (props.sortBy === 'date') {
          return modifier * (new Date(a.date) - new Date(b.date));
        }
        return modifier * (a[props.sortBy] - b[props.sortBy]);
      });
    });

    return {
      sortedTransactions
    };
  }
};
</script>