<template lang="">
<div className="flex flex-col md:flex-row h-screen">
  <div className="w-full md:w-1/2 h-1/3 md:h-full hidden md:block">
    <!-- <img
      src="/your-image.jpg"
      alt="Concert"
      className="w-full h-full object-cover"
    /> -->
  </div>
    <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 min-h-screen">
        <div className="w-full md:w-2/3">
            <h2 className="text-4xl font-semibold text-violet-900 text-center mb-6">LOGIN</h2>
            <form @submit.prevent="login">
            <div className="mb-4">
                <label className="block text-lg font-medium text-indigo-900 mb-2">Email</label>
                <input 
                type="email" 
                v-model="email"
                className="w-full p-2 border-3 border-yellow-500 rounded-full" 
                placeholder="Enter your email"
                />
            </div>

            <div className="mb-4">
                <label className="block text-lg font-medium text-indigo-900 mb-2">Password</label>
                <input 
                type="password" 
                v-model="password"
                className="w-full p-2 border-3 border-yellow-500 rounded-full" 
                placeholder="Enter your password"
                />
            </div>

            <p className="text-sm text-indigo-900 text-center mb-4">
                Don't have an account? <a href="/signin" className="font-semibold">Sign In</a>
            </p>

            <button 
                type="submit" 
                className="w-full bg-yellow-500 text-white p-2 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300">
                Login
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


export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login() {
            axios
                .post('http://127.0.0.1:8000/api/auth/login', {
                    email: this.email,
                    password: this.password
                })
                .then((response) => {
                    console.log(response);

                    if (response.data.data.email_verified_at === null) {
                        const userStore = useUserStore();
                        console.log(this.email);
                        axios
                            .post('http://127.0.0.1:8000/api/auth/get-token', {
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
                    // Handle errors
                    if (error.response && error.response.data) {
                        alert(error.response.errors);
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