<template>
    <NavbarAdmin></NavbarAdmin>
    <form @submit.prevent="submitForm" class="max-w-md mx-auto mt-20 bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Create User</h2>

        <!-- Name -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="form.name" type="text" class="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm" />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name[0] }}</p>
        </div>

        <!-- Username -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Username</label>
            <input v-model="form.username" type="text" class="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm" />
            <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username[0] }}</p>
        </div>

        <!-- Email -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="form.email" type="email" class="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm" />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email[0] }}</p>
        </div>

        <!-- Password -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <input v-model="form.password" type="password" class="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm" />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password[0] }}</p>
        </div>

        <!-- Role -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Role</label>
            <select v-model="form.role_id" class="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm">
                <option disabled value="">Select Role</option>
                <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.name }}
                </option>
            </select>
            <p v-if="errors.role_id" class="text-red-500 text-sm mt-1">{{ errors.role_id[0] }}</p>
        </div>

        <!-- Submit -->
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Submit
        </button>
    </form>
</template>

<script>
import axios from 'axios'
import router from '@/router'; // pastikan router diimport kalau belum
import NavbarAdmin from '@/components/NavbarAdmin.vue';
export default {
    components: {
        NavbarAdmin,
    },
    data() {
        return {
            form: {
                name: '',
                username: '',
                email: '',
                password: '',
                role_id: '',
            },
            errors: {},
            roles: [],
            isLoading: false,
        };
    },
    mounted() {
        this.getItem();
    },
    methods: {
        async getItem() {
            this.isLoading = true;
            try {
                const res = await axios.get(`http://localhost:8000/api/admin/roles`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                this.isLoading = false;
                if (res.data?.data) {
                    this.roles = res.data.data;

                    // Set default role_id ke role pertama
                    if (this.roles.length > 0) {
                        this.form.role_id = this.roles[0].id;
                    }
                }
            } catch (err) {
                this.isLoading = false;
                if (err.response?.status === 401) {
                    localStorage.removeItem('email');
                    localStorage.removeItem('name');
                    localStorage.removeItem('role_id');
                    localStorage.removeItem('token');

                    router.push({ name: 'login' });
                } else {
                    console.error("Error fetching roles data:", err);
                }
            }
        },
        async submitForm() {
            const formData = new FormData();
            formData.append('name', this.form.name);
            formData.append('username', this.form.username);
            formData.append('email', this.form.email);
            formData.append('password', this.form.password);
            formData.append('role_id', this.form.role_id);

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };

            try {
                const response = await axios.post('http://localhost:8000/api/admin/users/create', formData, config);
                alert('Form submitted successfully!');
                this.errors = {};
                this.form = {
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    role_id: this.roles.length > 0 ? this.roles[0].id : '',
                };
                // Reset form if needed
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        },
    },
};
</script>
