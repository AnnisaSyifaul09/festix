<template>
    <div>
        <div class="flex flex-col md:flex-row h-screen">
            <div class="w-full md:w-1/2 h-1/3 md:h-full hidden md:block">
                <!-- optional image -->
                <!-- <img
                    src="/your-image.jpg"
                    alt="Concert"
                    class="w-full h-full object-cover"
                /> -->
            </div>
            <div class="w-full md:w-1/2 flex items-center justify-center bg-white p-6 min-h-screen">
                <div class="w-full md:w-2/3">
                    <h2 class="text-4xl font-semibold text-indigo-900 text-center mb-6">SIGN IN</h2>
                    <form @submit.prevent="register">
                        <!-- Username -->
                        <div class="mb-4">
                            <label class="block text-lg font-medium text-indigo-900 mb-2">Username</label>
                            <input type="text" v-model="username"
                                class="w-full p-2 border-3 border-yellow-500 rounded-full"
                                placeholder="Enter your username" />
                            <span v-if="errors.username" class="text-red-600 text-sm">{{ errors.username[0] }}</span>
                        </div>

                        <!-- Name -->
                        <div class="mb-4">
                            <label class="block text-lg font-medium text-indigo-900 mb-2">Name</label>
                            <input type="text" v-model="name" class="w-full p-2 border-3 border-yellow-500 rounded-full"
                                placeholder="Enter your name" />
                            <span v-if="errors.name" class="text-red-600 text-sm">{{ errors.name[0] }}</span>
                        </div>

                        <!-- Email -->
                        <div class="mb-4">
                            <label class="block text-lg font-medium text-indigo-900 mb-2">Email</label>
                            <input type="email" v-model="email"
                                class="w-full p-2 border-3 border-yellow-500 rounded-full"
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

                        <!-- Link to login -->
                        <p class="text-sm text-indigo-900 text-center mb-4">
                            Have an account? <a href="/login" class="font-semibold">Log in</a>
                        </p>

                        <!-- Submit -->
                        <button type="submit" :disabled="isLoading"
                            class="w-full bg-yellow-500 text-white p-2 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300 flex justify-center items-center gap-2">
                            <span v-if="isLoading">
                                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4" />
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                </svg>
                            </span>
                            <span>{{ isLoading ? 'Signing in...' : 'Sign In' }}</span>
                        </button>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import router from '@/router';
import { useUserStore } from '@/stores/userStore';

export default {
    data() {
        return {
            name: '',
            username: '',
            email: '',
            password: '',
            errors: {},
            isLoading: false // <-- Tambahkan ini
        };
    },
    methods: {
        register() {
            const userStore = useUserStore();
            this.isLoading = true; // ⏳ Start loading

            axios
                .post('http://127.0.0.1:8000/api/auth/register', {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                    username: this.username
                })
                .then((response) => {
                    this.isLoading = false; // ✅ Done

                    userStore.setUserData(response.data.data);
                    router.push({ name: 'verif' });
                })
                .catch((error) => {
                    this.isLoading = false; // ❌ Error happened
                    console.error(error);
                    this.errors = error.response.data.errors || {};
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

<style></style>
