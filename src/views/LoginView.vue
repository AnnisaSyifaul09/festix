<template>
    <div class="flex flex-col md:flex-row h-screen">
        <div class="w-full md:w-1/2 h-1/3 md:h-full hidden md:block">
            <!-- Optional image here -->
        </div>
        <div class="w-full md:w-1/2 flex items-center justify-center bg-white p-6 min-h-screen">
            <div class="w-full md:w-2/3">
                <h2 class="text-4xl font-semibold text-violet-900 text-center mb-6">LOGIN</h2>
                <form @submit.prevent="login">
                    <!-- Email -->
                    <div class="mb-4">
                        <label class="block text-lg font-medium text-indigo-900 mb-2">Email</label>
                        <input type="email" v-model="email" class="w-full p-2 border-3 border-yellow-500 rounded-full"
                            placeholder="Enter your email" />
                        <span v-if="errors.email" class="text-red-600 text-sm">{{ errors.email[0] }}</span>
                    </div>

                    <!-- Password -->
                    <div class="mb-4">
                        <label class="block text-lg font-medium text-indigo-900 mb-2">Password</label>
                        <input type="password" v-model="password"
                            class="w-full p-2 border-3 border-yellow-500 rounded-full"
                            placeholder="Enter your password" />
                        <span v-if="errors.password" class="text-red-600 text-sm">{{ errors.password[0] }}</span>
                    </div>

                    <!-- Link to Sign In -->
                    <p class="text-sm text-indigo-900 text-center mb-4">
                        Don't have an account? <a href="/signin" class="font-semibold">Sign In</a>
                    </p>
                    <p class="text-sm text-indigo-900 text-center mb-4">
                        Forget password? <a href="/resetPassword" class="font-semibold">Reset Password</a>
                    </p>

                    <!-- Submit -->
                    <button type="submit" :disabled="isLoading"
                        class="w-full bg-yellow-500 text-white p-2 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300 flex justify-center items-center gap-2">
                        <span v-if="isLoading">
                            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4" />
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                        </span>
                        <span>{{ isLoading ? 'Logging in...' : 'Login' }}</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from '@/router';
import { useUserStore } from '@/stores/userStore';

const API_URL = import.meta.env.VITE_API_URL;


export default {
    data() {
        return {
            email: '',
            password: '',
            errors: {},
            isLoading: false // 🔄 Tambahkan ini
        };
    },

    methods: {
        login() {
            this.isLoading = true; // Mulai loading

            axios
                .post(`${API_URL}/auth/login`, {
                    email: this.email,
                    password: this.password
                })
                .then((response) => {
                    this.isLoading = false; // Selesai loading

                    console.log(response);

                    if (response.data.data.email_verified_at === null) {
                        const userStore = useUserStore();
                        console.log(this.email);
                        axios
                            .post(`${API_URL}/auth/get-token`, {
                                email: this.email,
                            })
                            .then((response) => {
                                console.log(response);

                                userStore.setUserData(response.data.data);

                                // Navigate to home page
                                router.push({ name: 'verif' });
                            })
                            .catch((error) => {
                                // Handle errors
                                if (error.response && error.response.data) {
                                    alert(error.response.data.message);
                                } else {
                                    console.log('Error:', error.message);
                                }
                            });

                        return;
                    }

                    // Save user data to localStorage
                    localStorage.setItem('email', response.data.data.email);
                    localStorage.setItem('name', response.data.data.name);
                    localStorage.setItem('role_id', response.data.data.role_id);
                    localStorage.setItem('token', response.data.data.token);

                    // Navigate to home page
                    router.push({ name: 'home' });
                })
                .catch((error) => {
                    this.isLoading = false; // Hentikan loading saat error

                    if (error.response) {
                        this.errors = error.response.data.errors || {};

                        if (error.response.data.message && Object.keys(this.errors).length === 0) {
                            alert(error.response.data.message);
                        }
                    } else {
                        console.log('Error:', error.message);
                    }
                });
        }

    },
    mounted() {
        const username = localStorage.getItem('name');
        if (username) {
            router.push({ name: 'home' });
        }
    }
};
</script>
<style lang="">

</style>