<template>
    <NavbarAdmin></NavbarAdmin>
    <div class="container md:w-2/4 mx-auto mt-20 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Create Event</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
            <div>
                <label class="block text-sm font-medium">Name:</label>
                <input v-model="form.name" type="text" required class="w-full p-2 border rounded" />
            </div>

            <div>
                <label class="block text-sm font-medium">Date | Time:</label>
                <input v-model="form.time" type="datetime-local" required class="w-full p-2 border rounded" />
            </div>

            <div>
                <label class="block text-sm font-medium">Description:</label>
                <textarea v-model="form.description" required class="w-full p-2 border rounded"></textarea>
            </div>

            <div>
                <label class="block text-sm font-medium">Venue:</label>
                <select v-model="form.venue_id" required class="w-full p-2 border rounded">
                    <option v-for="venue in venues" :key="venue.id" :value="venue.id">
                        {{ venue.name }}
                    </option>
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium">Cover Image:</label>
                <input type="file" @change="onFileChange($event, 'cover')" class="w-full p-2 border rounded" />
            </div>

            <div>
                <label class="block text-sm font-medium">Seat Map:</label>
                <input type="file" @change="onFileChange($event, 'seat_map')" class="w-full p-2 border rounded" />
            </div>

            <div>
                <label class="block text-sm font-medium">Seats:</label>
                <button type="button" @click="addSeat" class="bg-blue-500 text-white px-4 py-2 rounded">Add
                    Seat</button>
                <div v-for="(seat, index) in form.seats" :key="index" class="border p-2 rounded mt-2">
                    <input v-model.number="seat.price" type="number" required placeholder="Price"
                        class="w-full p-2 border rounded mb-2" />
                    <input v-model.number="seat.total_seat" type="number" required placeholder="Total Seat"
                        class="w-full p-2 border rounded mb-2" />
                    <select v-model="seat.category_seat" required class="w-full p-2 border rounded mb-2">
                        <option v-for="seatCategory in seatCategories" :key="seatCategory.id" :value="seatCategory.id">
                            {{ seatCategory.name }}
                        </option>
                    </select>
                    <button type="button" @click="removeSeat(index)"
                        class="bg-red-500 text-white px-4 py-2 rounded">Remove</button>
                </div>
            </div>

            <button type="submit" class="w-full bg-green-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
    </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";

import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default {
    components: {
        NavbarAdmin,
    },
    data() {
        return {
            form: {
                name: '',
                date: '',
                time: '',
                description: '',
                venue_id: '',
                seats: []  // Ensure seats is always an array
            },
            coverImage: null,
            seatMapImage: null,
            venues: [],
            seatCategories: []
        };
    },
    mounted() {
        this.getVenues();
        this.getSeatCategories();
    },
    methods: {
        onFileChange(event, type) {
            if (type === 'cover') {
                this.coverImage = event.target.files[0];
            } else if (type === 'seat_map') {
                this.seatMapImage = event.target.files[0];
            }
        },
        addSeat() {
            const defaultCategory = this.seatCategories.length ? this.seatCategories[0].id : '';
            this.form.seats.push({ price: '', total_seat: '', category_seat: defaultCategory });
        },
        removeSeat(index) {
            this.form.seats.splice(index, 1);
        },
        async submitForm() {
            // Validate if seats are added
            if (this.form.seats.length === 0) {
                alert('Please add at least one seat.');
                return;
            }

            // Validate if each seat is filled properly
            for (let seat of this.form.seats) {
                if (!seat.price || !seat.total_seat || !seat.category_seat) {
                    alert('Please fill in all seat details.');
                    return;
                }
            }

            try {
                // Set date field to be the same as time field
                this.form.date = this.form.time.split('T')[0];  // Take only the date part from datetime-local

                const formData = new FormData();
                formData.append('name', this.form.name);
                formData.append('date', this.form.date); // Using the date derived from time
                formData.append('time', this.form.time.split("T")[1].slice(0, 5));
                formData.append('description', this.form.description);
                formData.append('venue_id', this.form.venue_id);

                // Handle file uploads
                if (this.coverImage) {
                    formData.append('cover_image', this.coverImage);
                }
                if (this.seatMapImage) {
                    formData.append('seat_map', this.seatMapImage);
                }

                // Append seats as individual fields (instead of JSON string)
                this.form.seats.forEach((seat, index) => {
                    formData.append(`seats[${index}][price]`, seat.price);
                    formData.append(`seats[${index}][total_seat]`, seat.total_seat);
                    formData.append(`seats[${index}][category_seat]`, seat.category_seat);
                });

                // Log the formData before sending it for debugging purposes
                for (let pair of formData.entries()) {
                    console.log(`${pair[0]}:`, pair[1]);
                }


                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token
                    }
                };

                await axios.post(`${API_URL}/events/create`, formData, config);
                // alert('Form submitted successfully');
                this.$router.push('/admin/events'); // Redirect to events list after successful submission
            } catch (error) {
                console.error(error);
                alert('Error submitting form');
            }
        },
        // async submitForm() {
        //     // Validate if seats are added
        //     if (this.form.seats.length === 0) {
        //         alert('Please add at least one seat.');
        //         return;
        //     }

        //     // Validate if each seat is filled properly
        //     for (let seat of this.form.seats) {
        //         if (!seat.price || !seat.total_seat || !seat.category_seat) {
        //             alert('Please fill in all seat details.');
        //             return;
        //         }
        //     }

        //     try {
        //         // Set date field to be the same as time field
        //         this.form.date = this.form.time.split('T')[0];  // Take only the date part from datetime-local

        //         const formData = new FormData();
        //         formData.append('name', this.form.name);
        //         formData.append('date', this.form.date); // Using the date derived from time
        //         formData.append('time', this.form.time);
        //         formData.append('description', this.form.description);
        //         formData.append('venue_id', this.form.venue_id);

        //         // Handle file uploads
        //         if (this.coverImage) {
        //             formData.append('cover_image', this.coverImage);
        //         }
        //         if (this.seatMapImage) {
        //             formData.append('seat_map', this.seatMapImage);
        //         }

        //         // Append seats as individual fields (instead of JSON string)
        //         this.form.seats.forEach((seat, index) => {
        //             formData.append(`seats[${index}][price]`, seat.price);
        //             formData.append(`seats[${index}][total_seat]`, seat.total_seat);
        //             formData.append(`seats[${index}][category_seat]`, seat.category_seat);
        //         });

        //         // Log the formData before sending it for debugging purposes
        //         console.log('Form Data:', formData);

        //         const token = localStorage.getItem('token');
        //         const config = {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data',
        //                 'Authorization': 'Bearer ' + token
        //             }
        //         };

        //         await axios.post(`${API_URL}/events/create`, formData, config);
        //         alert('Form submitted successfully');
        //     } catch (error) {
        //         console.error(error);
        //         alert('Error submitting form');
        //     }
        // },
        async getVenues() {
            try {
                const response = await axios.get(`${API_URL}/venues`, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                });
                if (response.data?.data) {
                    this.venues = response.data.data;
                    this.form.venue_id = this.venues.length ? this.venues[0].id : '';
                }
            } catch (error) {
                console.error('Error fetching venues:', error);
            }
        },
        async getSeatCategories() {
            try {
                const response = await axios.get(`${API_URL}/seat-categories`, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                });
                if (response.data?.data) {
                    this.seatCategories = response.data.data;
                }
            } catch (error) {
                console.error('Error fetching seat categories:', error);
            }
        }
    }
};
</script>
