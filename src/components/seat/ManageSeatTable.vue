<template>
    <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white rounded-xl ">
                <thead class="bg-gray-50 ">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name
                        </th>
                        <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="seatcategory in seatcategories" :key="seatcategory.id"
                        class="border-b border-gray-300 hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ seatcategory.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div class="flex justify-center gap-2">
                                <RouterLink :to="{ name: 'adminSeatCategoryEdit', params: { id: seatcategory.id } }"
                                    class="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors">
                                    Edit
                                </RouterLink>
                                <button @click="$emit('delete', seatcategory.id)"
                                    class="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition-colors">
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        seatcategories: {
            type: Array,
            required: true
        }
    },
    methods: {
        // getRoleBadgeClass(role) {
        //     const baseClasses = 'px-2 py-1 rounded-full text-xs font-semibold';
        //     const roleColors = {
        //         superadmin: 'bg-purple-100 text-purple-800',
        //         admin: 'bg-blue-100 text-blue-800',
        //         manager: 'bg-green-100 text-green-800',
        //         user: 'bg-gray-100 text-gray-800'
        //     };
        //     return `${baseClasses} ${roleColors[role.toLowerCase()]}`;
        // }
    }
};
</script>