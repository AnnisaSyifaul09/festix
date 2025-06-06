<template>
    <div>
        <NavbarAdmin />
        <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
            <div class="pt-10 p-2 min-h-screen flex flex-col">
                <div class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
                    <h1 class="font-semibold text-2xl text-center mb-6">Create Seat Category</h1>
                    <form @submit.prevent="handleSubmit" class="space-y-6">

                        <!-- name -->
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">name</label>
                            <input type="text" id="name" v-model="formData.name"
                                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name[0] }}</p>
                        </div>

                        <!-- Buttons -->
                        <div class="flex justify-end space-x-4">
                            <RouterLink :to="{ name: 'adminSeatCategory' }"
                                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                Cancel
                            </RouterLink>
                            <button type="submit" :disabled="isLoading"
                                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span v-if="isLoading">Creating...</span>
                                <span v-else>Create</span>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import { RouterLink } from "vue-router";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default {
    components: {
        NavbarAdmin,
        RouterLink,
    },
    data() {
        return {
            formData: {
                name: "",
            },
            errors: {},
            isLoading: false,
        };
    },
    mounted() {

    },
    methods: {

        async handleSubmit() {
            this.isLoading = true;
            this.errors = {};

            try {
                const token = localStorage.getItem("token");
                const formData = new FormData();
                formData.append("name", this.formData.name);

                await axios.post(`${API_URL}/seat-categories/create`, formData, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });

                alert("User created successfully!");
                this.$router.push({ name: "adminSeatCategory" });
            } catch (error) {
                if (error.response?.data?.errors) {
                    this.errors = error.response.data.errors;
                } else {
                    alert("Something went wrong.");
                }
                console.error("Error creating user:", error);
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>