<template>
    <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/2 h-1/3 md:h-full hidden md:block"></div>
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 min-h-screen">
            <div className="w-full md:w-2/3">
                <h2 className="text-4xl font-semibold text-violet-900 text-center mb-6">Reset Password</h2>
                <form @submit.prevent="requestOtp">
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-indigo-900 mb-2">Email</label>
                        <input type="email" v-model="email"
                            className="w-full p-2 border-3 border-yellow-500 rounded-full"
                            placeholder="Enter your email" required />
                    </div>
                    <button type="submit"
                        className="w-full bg-yellow-500 text-white p-2 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300">
                        Send OTP
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal OTP -->
    <div v-if="showOtpModal" class="fixed inset-0 flex items-center justify-center bg-gray-900/10 bg-opacity-50">
        <div class="bg-white p-6 rounded-lg w-96">
            <h2 class="text-2xl font-semibold text-center mb-4">Enter OTP Code</h2>
            <input type="text" v-model="otp" class="w-full p-2 border-2 border-gray-300 rounded-md mb-4 text-center"
                placeholder="Enter OTP Code" required />
            <div class="flex justify-end">
                <button @click="verifyOtp" class="bg-green-500 text-white p-2 rounded-md mr-2">Verify</button>
                <button @click="showOtpModal = false" class="bg-red-500 text-white p-2 rounded-md">Cancel</button>
            </div>
        </div>
    </div>

    <!-- Modal New Password -->
    <div v-if="showNewPasswordModal"
        class="fixed inset-0 flex items-center justify-center bg-gray-900/10 bg-opacity-50">
        <div class="bg-white p-6 rounded-lg w-96">
            <h2 class="text-2xl font-semibold text-center mb-4">Set New Password</h2>
            <input type="password" v-model="newPassword" class="w-full p-2 border-2 border-gray-300 rounded-md mb-4"
                placeholder="Enter New Password" required />
            <input type="password" v-model="confirmPassword" class="w-full p-2 border-2 border-gray-300 rounded-md mb-4"
                placeholder="Confirm New Password" required />
            <div class="flex justify-end">
                <button @click="resetPassword" class="bg-blue-500 text-white p-2 rounded-md mr-2">Save</button>
                <button @click="showNewPasswordModal = false"
                    class="bg-gray-500 text-white p-2 rounded-md">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from '@/router';

const API_URL = import.meta.env.VITE_API_URL;


export default {
    data() {
        return {
            email: '',
            otp: '',
            newPassword: '',
            confirmPassword: '',
            showOtpModal: false,
            showNewPasswordModal: false,
            userId: null
        };
    },
    methods: {
        // Kirim OTP ke email
        requestOtp() {
            axios.post(`${API_URL}/auth/reset-password`, { email: this.email })
                .then((response) => {
                    console.log(response);
                    this.userId = response.data.data.id; // Simpan ID user
                    this.showOtpModal = true;
                })
                .catch((error) => {
                    alert(error.response?.data?.message || "Error sending OTP");
                });
        },

        // Verifikasi OTP yang dimasukkan
        verifyOtp() {
            axios.post(`${API_URL}/auth/${this.userId}/otp-validation`, {
                email: this.email,
                otp_code: this.otp,
            })
                .then((response) => {
                    console.log(response);
                    this.showOtpModal = false;
                    this.showNewPasswordModal = true; // Tampilkan modal untuk memasukkan password baru
                })
                .catch((error) => {
                    alert(error.response?.data?.message || "Invalid OTP");
                });
        },

        // Simpan password baru
        resetPassword() {
            if (this.newPassword !== this.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            axios.post(`${API_URL}/auth/reset-password/new`, {
                userId: this.userId,
                password: this.newPassword
            })
                .then((response) => {
                    console.log(response);
                    this.showNewPasswordModal = false;
                    alert("Password successfully updated! Please login.");
                    router.push({ name: 'login' });
                })
                .catch((error) => {
                    alert(error.response?.data?.message || "Error updating password");
                });
        }
    }
};
</script>
