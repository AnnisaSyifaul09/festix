<template>
    <NavbarAdmin />
    <div class="container md:w-2/4 mx-auto mt-20 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Update Event</h2>
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

            <div class="">
                <img src="" alt="">
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
                <button type="button" @click="addSeat" class="bg-blue-500 text-white px-4 py-2 rounded mb-2">
                    Add Seat
                </button>
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
                    <button type="button" @click="removeSeat(index)" class="bg-red-500 text-white px-4 py-2 rounded">
                        Remove
                    </button>
                </div>
            </div>

            <button type="submit" class="w-full bg-green-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
    </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import axios from "axios";

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
                seats: [],
            },
            coverImage: null,
            seatMapImage: null,
            venues: [],
            seatCategories: [],

        };
    },
    async mounted() {
        this.eventId = this.$route.params.id;

        await Promise.all([
            this.getVenues(),
            this.getSeatCategories()
        ]);

        await this.getItem(); // pastikan seatCategories sudah terisi dulu
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
            if (this.form.seats.length === 0) {
                alert('Please add at least one seat.');
                return;
            }

            for (let seat of this.form.seats) {
                if (!seat.price || !seat.total_seat || !seat.category_seat) {
                    alert('Please fill in all seat details.');
                    return;
                }
            }

            try {
                this.form.date = this.form.time.split('T')[0];

                const formData = new FormData();
                formData.append('_method', 'patch');
                formData.append('name', this.form.name);
                formData.append('date', this.form.date);
                formData.append('time', this.form.time);
                formData.append('description', this.form.description);
                formData.append('venue_id', this.form.venue_id);

                if (this.coverImage) {
                    formData.append('cover_image', this.coverImage);
                }
                if (this.seatMapImage) {
                    formData.append('seat_map', this.seatMapImage);
                }

                this.form.seats.forEach((seat, index) => {
                    formData.append(`seats[${index}][price]`, seat.price);
                    formData.append(`seats[${index}][total_seat]`, seat.total_seat);
                    formData.append(`seats[${index}][category_seat]`, seat.category_seat);
                });

                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token,
                    },
                };

                await axios.post(`http://localhost:8000/api/events/update/${this.eventId}`, formData, config);
                alert('Form submitted successfully');
            } catch (error) {
                console.error(error);
                alert('Error submitting form');
            }
        },
        async getVenues() {
            try {
                const res = await axios.get('http://localhost:8000/api/venues', {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
                });
                this.venues = res.data?.data || [];
            } catch (e) {
                console.error(e);
            }
        },
        async getSeatCategories() {
            try {
                const res = await axios.get('http://localhost:8000/api/seat-categories', {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
                });
                this.seatCategories = res.data?.data || [];
            } catch (e) {
                console.error(e);
            }
        },
        async getItem() {
            try {
                const res = await axios.get(`http://localhost:8000/api/events/${this.eventId}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });

                const event = res.data.data.event;
                const seatsFromBackend = res.data.data.event_price;

                this.form.name = event.name;
                this.form.time = event.time;
                this.form.description = event.description;
                this.form.venue_id = event.venue_id;

                // Cocokkan seat category dari getItem dengan list kategori yang ada
                this.form.seats = seatsFromBackend.map(seat => {
                    const foundCategory = this.seatCategories.find(cat => cat.id === seat.seat_category_id);
                    console.log('Cek kategori:', seat.seat_category_id, '=>', foundCategory); // Tambahkan log ini
                    return {
                        price: seat.price,
                        total_seat: seat.total_seat,
                        category_seat: foundCategory ? foundCategory.id : '', // Set kosong kalau tidak ditemukan
                    };
                });

            } catch (err) {
                console.error('Error fetching event:', err);
            }
        },
    }
};
</script>