<template>
    <div class="flex flex-col md:flex-row h-screen">
        <div class="w-full md:w-1/2 h-1/3 md:h-full hidden md:block">
            <!-- optional image -->
        </div>
        <div class="w-full md:w-1/2 flex items-center justify-center bg-white p-6 min-h-screen">
            <div class="w-full md:w-2/3">
                <h2 class="text-4xl font-semibold text-violet-900 text-center mb-6">Verification</h2>
                <form @submit.prevent="verif">
                    <!-- Token input -->
                    <div class="mb-4">
                        <label class="block text-lg font-medium text-indigo-900 mb-2">Token</label>
                        <input type="text" v-model="token" class="w-full p-2 border-3 border-yellow-500 rounded-full"
                            placeholder="Enter your token" />
                        <p v-if="errorMessage" class="text-red-600 text-sm mt-2">{{ errorMessage }}</p>
                    </div>

                    <!-- Resend token -->
                    <p class="text-sm text-indigo-900 text-center mb-4">
                        Click
                        <span @click="getToken" class="font-bold cursor-pointer text-indigo-600">
                            <span v-if="isGettingToken">
                                <svg class="inline w-4 h-4 animate-spin mr-1" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4" />
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                            </span>
                            this
                        </span>
                        if you don't receive email.
                    </p>

                    <!-- Submit -->
                    <button type="submit"
                        class="w-full bg-yellow-500 text-white p-2 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300 flex items-center justify-center"
                        :disabled="isLoading">
                        <svg v-if="isLoading" class="w-5 h-5 animate-spin mr-2 text-white" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span>{{ isLoading ? 'Submitting...' : 'Submit' }}</span>
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
            isLoading: false,
            isGettingToken: false,
            errorMessage: ''
        };
    },
    methods: {
        verif() {
            const userStore = useUserStore();
            this.isLoading = true;
            this.errorMessage = ''; // clear previous errors

            axios
                .post(`http://127.0.0.1:8000/api/auth/${userStore.id}/otp-validation`, {
                    otp_code: this.token,
                })
                .then(() => {
                    router.push({ name: 'login' });
                })
                .catch((error) => {
                    this.errorMessage = error.response?.data?.message || 'Verification failed';
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        getToken() {
            const userStore = useUserStore();
            this.isGettingToken = true;

            axios
                .post(`http://127.0.0.1:8000/api/auth/get-token`, {
                    email: userStore.email,
                })
                .then(() => {
                    alert('OTP sent!');
                })
                .catch((error) => {
                    alert(error.response?.data?.message || 'Failed to resend OTP');
                })
                .finally(() => {
                    this.isGettingToken = false;
                });
        }
    },
    mounted() {
        const username = localStorage.getItem('name');
        const userStore = useUserStore();

        if (username) {
            router.push({ name: 'home' });
        }

        if (!userStore.role_id) {
            router.push({ name: 'login' });
        }
    }
};
</script>