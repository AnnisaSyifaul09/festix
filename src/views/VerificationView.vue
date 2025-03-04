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
            <h2 className="text-4xl font-semibold text-violet-900 text-center mb-6">Verification</h2>
            <form @submit.prevent="verif">
            <div className="mb-4">
                <label className="block text-lg font-medium text-indigo-900 mb-2">Token</label>
                <input 
                type="text" 
                v-model="token"
                className="w-full p-2 border-3 border-yellow-500 rounded-full" 
                placeholder="Enter your token"
                />
            </div>
            <p className="text-sm text-indigo-900 text-center mb-4">
                Click <span @click="getToken" className="font-bold">this</span> if don't receive email.
            </p>
            <button 
                type="submit" 
                className="w-full bg-yellow-500 text-white p-2 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300">
                Submit
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
            token: '',
        };
    },
    methods: {
        verif() {
            const userStore = useUserStore();

            axios
                .post(`http://127.0.0.1:8000/api/auth/${userStore.id}/otp-validation`, {
                    otp_code: this.token,
                })
                .then((response) => {
                    console.log(response);

                    // Navigate to home page
                    router.push({ name: 'login' });
                })
                .catch((error) => {
                    // Handle errors
                    if (error.response && error.response.data) {
                        alert(error.response.data.message);
                    } else {
                        console.log('Error:', error.message);
                    }
                });
        },
        getToken() {
            const userStore = useUserStore();

            axios
                .post(`http://127.0.0.1:8000/api/auth/get-token`, {
                    email: userStore.email,
                })
                .then((response) => {
                    console.log(response);
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
        const userStore = useUserStore();
        console.log(userStore.role_id)

        if (username) {
            router.push({ name: 'home' });
        }

        if (!userStore.role_id) {
            router.push({ name: 'login' });
        }
    }
};
</script>
<style lang="">

</style>