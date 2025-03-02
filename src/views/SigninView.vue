<template>
    <div>
        <div class="flex flex-col md:flex-row h-screen">
            <div class="w-full md:w-1/2 h-1/3 md:h-full hidden md:block">
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
                        <div class="mb-4">
                            <label class="block text-lg font-medium text-indigo-900 mb-2">Username</label>
                            <input type="text" v-model="username"
                                class="w-full p-2 border-3 border-yellow-500 rounded-full"
                                placeholder="Enter your username" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-lg font-medium text-indigo-900 mb-2">Name</label>
                            <input type="text" v-model="name" class="w-full p-2 border-3 border-yellow-500 rounded-full"
                                placeholder="Enter your name" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-lg font-medium text-indigo-900 mb-2">Email</label>
                            <input type="email" v-model="email"
                                class="w-full p-2 border-3 border-yellow-500 rounded-full"
                                placeholder="Enter your email" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-lg font-medium text-indigo-900 mb-2">Password</label>
                            <input type="password" v-model="password"
                                class="w-full p-2 border-3 border-yellow-500 rounded-full"
                                placeholder="Enter your password" />
                        </div>

                        <p className="text-sm text-indigo-900 text-center mb-4">
                            Have an account? <a href="/login" className="font-semibold">Log in</a>
                        </p>

                        <button type="submit"
                            class="w-full bg-yellow-500 text-white p-2 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300">
                            Sign In
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
            password: ''
        };
    },
    methods: {
        register() {
            const userStore = useUserStore();

            axios
                .post('http://127.0.0.1:8000/api/auth/register', {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                    username: this.username
                })
                .then((response) => {
                    console.log(response);

                    // Save user data to localStorage
                    // localStorage.setItem('email', response.data.data.email);
                    // localStorage.setItem('name', response.data.data.name);
                    // localStorage.setItem('role_id', response.data.data.role_id);
                    // localStorage.setItem('token', response.data.data.token);

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
