<template>
    <div>
        <NavbarAdmin></NavbarAdmin>
        <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
            <div class="pt-10 p-2 min-h-screen flex flex-col">
                <div class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
                    <h1 class="text-2xl font-bold text-indigo-900 leading-tight text-center mb-6">Edit Seat Category
                    </h1>
                    <form @submit.prevent="updateUser" class="space-y-6">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">name</label>
                            <input type="text" id="name" v-model="formData.name"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required />
                        </div>

                        <div class="flex justify-center space-x-4">
                            <button type="submit"
                                class="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700">
                                Update
                            </button>
                            <RouterLink :to="{ name: 'adminSeatCategory' }"
                                class="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                Cancel
                            </RouterLink>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import { RouterLink } from 'vue-router';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default {
    components: {
        NavbarAdmin,
    },
    data() {
        return {
            formData: {
                name: '',
            },
        };
    },
    async created() {
        await this.getItem();
    },
    methods: {
        async getItem() {
            try {
                const response = await axios.get(`${API_URL}/seat-categories/${this.$route.params.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const seat = response.data.data;
                console.log('Fetched seat:', seat);
                this.formData = {
                    name: seat.name,
                };
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        },
        async updateUser() {
            try {
                const updateData = { ...this.formData };


                await axios.patch(`${API_URL}/seat-categories/update/${this.$route.params.id}`, updateData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                this.$router.push({ name: 'adminSeatCategory' });
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    }
};
</script>