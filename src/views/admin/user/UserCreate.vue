<template>
    <div>
        <NavbarAdmin />
        <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
            <div class="pt-10 p-2 min-h-screen flex flex-col">
                <div class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
                    <h1 class="font-semibold text-2xl text-center mb-6">Create User</h1>
                    <form @submit.prevent="handleSubmit" class="space-y-6">

                        <!-- Username -->
                        <div>
                            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                            <input type="text" id="username" v-model="formData.username"
                                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username[0] }}</p>
                        </div>

                        <!-- Full Name -->
                        <div>
                            <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" id="fullName" v-model="formData.fullName"
                                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name[0] }}</p>
                        </div>

                        <!-- Email -->
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" v-model="formData.email"
                                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email[0] }}</p>
                        </div>

                        <!-- Password -->
                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password" v-model="formData.password"
                                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password[0] }}</p>
                        </div>

                        <!-- Role -->
                        <div>
                            <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
                            <select id="role" v-model="formData.role"
                                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select a role</option>
                                <option v-for="(role, index) in roles" :key="role.id" :value="role.id">
                                    {{ role.name }}{{ index === 0 ? ' (default)' : '' }}
                                </option>

                            </select>
                            <p v-if="errors.role_id" class="text-red-500 text-sm mt-1">{{ errors.role_id[0] }}</p>
                        </div>

                        <!-- Buttons -->
                        <div class="flex justify-end space-x-4">
                            <RouterLink :to="{ name: 'user' }"
                                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                Cancel
                            </RouterLink>
                            <button type="submit" :disabled="isLoading"
                                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span v-if="isLoading">Creating...</span>
                                <span v-else>Create User</span>
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
                username: "",
                fullName: "",
                email: "",
                password: "",
                role: "",
            },
            errors: {},
            roles: [],
            isLoading: false,
        };
    },
    mounted() {
        this.getRoles();
    },
    methods: {
        async getRoles() {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${API_URL}/admin/roles`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });

                if (res.data?.data) {
                    this.roles = res.data.data;

                    // 👉 Set default role ke role pertama jika belum dipilih
                    if (!this.formData.role && this.roles.length > 0) {
                        this.formData.role = this.roles[0].id;
                    }
                }
            } catch (error) {
                console.error("Failed to fetch roles:", error);
            }
        },

        async handleSubmit() {
            this.isLoading = true;
            this.errors = {};

            try {
                const token = localStorage.getItem("token");
                const formData = new FormData();
                formData.append("username", this.formData.username);
                formData.append("name", this.formData.fullName);
                formData.append("email", this.formData.email);
                formData.append("password", this.formData.password);
                formData.append("role_id", this.formData.role);

                await axios.post(`${API_URL}/admin/users/create`, formData, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });

                alert("User created successfully!");
                this.$router.push({ name: "user" });
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