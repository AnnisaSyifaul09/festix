<template>
    <NavbarAdmin></NavbarAdmin>
    <div class="max-w-lg mx-auto p-6 mt-20 bg-white rounded-xl shadow-md space-y-6">
        <h1 class="font-semibold text-2xl text-center">Create Venue</h1>
        <form @submit.prevent="submitForm" enctype="multipart/form-data" class="">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" v-model="form.name"
                    class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <p v-if="errors.name" class="text-sm text-red-600 mt-1">{{ errors.name[0] }}</p>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" v-model="form.address"
                    class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <p v-if="errors.address" class="text-sm text-red-600 mt-1">{{ errors.address[0] }}</p>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input type="number" v-model="form.capacity"
                    class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <p v-if="errors.capacity" class="text-sm text-red-600 mt-1">{{ errors.capacity[0] }}</p>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Image File</label>
                <input type="file" @change="handleFileUpload" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0
                 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                 hover:file:bg-blue-100" />
                <p v-if="errors.image_file" class="text-sm text-red-600 mt-1">{{ errors.image_file[0] }}</p>
            </div>

            <div class="text-right">
                <button type="submit"
                    class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Submit
                </button>
            </div>
        </form>
    </div>

</template>

<script>
import axios from 'axios';
import NavbarAdmin from '@/components/NavbarAdmin.vue';


export default {
    components: {
        NavbarAdmin,
    },
    data() {
        return {
            form: {
                name: '',
                address: '',
                capacity: '',
                image_file: null,
            },
            errors: {},
        };
    },
    methods: {
        handleFileUpload(event) {
            this.form.image_file = event.target.files[0];
        },
        async submitForm() {
            const formData = new FormData();
            formData.append('name', this.form.name);
            formData.append('address', this.form.address);
            formData.append('capacity', this.form.capacity);
            formData.append('image_file', this.form.image_file);

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            };

            try {
                const response = await axios.post('http://localhost:8000/api/venues/create', formData, config);
                alert('Form submitted successfully!');
                this.errors = {};
                // Reset form if needed
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    this.errors = error.response.data.errors;
                } else {
                    alert('Something went wrong!');
                }
            }
        },
    },
};
</script>