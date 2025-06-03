<template>
    <div class="flex h-screen">

        <!-- Login form section -->
        <div class="w-full flex items-center justify-center px-6 py-10 bg-white">
            <div class="w-full max-w-md">
                <h2 class="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2>
                <form @submit.prevent="login" class="space-y-5">
                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" v-model="email" placeholder="you@example.com"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500" />
                        <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email[0] }}</span>
                    </div>

                    <!-- Password -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" v-model="password" placeholder="••••••••"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500" />
                        <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password[0] }}</span>
                    </div>

                    <!-- Links -->
                    <div class="flex justify-center text-sm text-gray-600">
                        <router-link to="/resetPassword" class="hover:underline font-medium">Forgot
                            Password?</router-link>
                    </div>

                    <!-- Submit button -->
                    <button type="submit" :disabled="isLoading"
                        class="w-full flex justify-center items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-md transition disabled:opacity-50">
                        <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
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
            isLoading: false,
        };
    },
    methods: {
        login() {
            this.isLoading = true;
            axios.post(`${API_URL}/auth/login-admin`, {
                email: this.email,
                password: this.password
            }).then((response) => {
                this.isLoading = false;

                if (response.data.data.email_verified_at === null) {
                    const userStore = useUserStore();
                    axios.post(`${API_URL}/auth/get-token`, { email: this.email })
                        .then((res) => {
                            userStore.setUserData(res.data.data);
                            router.push({ name: 'verif' });
                        }).catch((error) => {
                            alert(error.response?.data?.message || error.message);
                        });
                    return;
                }

                localStorage.setItem('email', response.data.data.email);
                localStorage.setItem('name', response.data.data.name);
                localStorage.setItem('role_id', response.data.data.role_id);
                localStorage.setItem('token', response.data.data.token);
                router.push({ name: 'dashboard' });

            }).catch((error) => {
                this.isLoading = false;
                this.errors = error.response?.data?.errors || {};
                if (error.response?.data?.message && !Object.keys(this.errors).length) {
                    alert(error.response.data.message);
                }
            });
        }
    },
    mounted() {
        if (localStorage.getItem('name')) {
            router.push({ name: 'home' });
        }
    }
};
</script>