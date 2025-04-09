<template>
    <NavbarAdmin></NavbarAdmin>

    <div class="max-w-md mx-auto mt-20 bg-white p-6 rounded-2xl shadow-md">
        <h2 class="text-2xl font-bold mb-4">Update Password</h2>

        <form @submit.prevent="updatePassword">
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input type="password" v-model="form.password"
                    class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required />
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input type="password" v-model="form.newPassword"
                    class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <button type="submit"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                :disabled="loading">
                {{ loading ? 'Updating...' : 'Update Password' }}
            </button>
        </form>

        <div v-if="message" :class="['mt-4 text-center', status === 'error' ? 'text-red-500' : 'text-green-600']">
            {{ message }}
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import NavbarAdmin from '@/components/NavbarAdmin.vue'

export default {
    components: {
        NavbarAdmin
    },
    data() {
        return {
            form: {
                password: '',
                newPassword: '',
            },
            loading: false,
            message: '',
            status: ''
        }
    },
    methods: {
        async updatePassword() {
            this.loading = true
            this.message = ''
            try {
                const formData = new FormData();
                formData.append('password', this.form.password);
                formData.append('newPassword', this.form.newPassword);

                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token,
                    },
                };
                const response = await axios.put(`http://localhost:8000/api/admin/users/`, formData, config);

                this.status = response.data.status
                this.message = 'Password updated successfully'
                this.form.password = ''
                this.form.newPassword = ''
            } catch (error) {
                if (error.response) {
                    this.status = 'error'
                    this.message = error.response.data.message || 'Update failed'
                } else {
                    this.status = 'error'
                    this.message = 'Something went wrong'
                }
            } finally {
                this.loading = false
            }
        }
    }
}
</script>