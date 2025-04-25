<template>
    <div>
        <NavbarAdmin></NavbarAdmin>
        <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
            <div class="pt-10 p-2 min-h-screen flex flex-col">
                <div class="py-5 flex flex-row justify-between items-center">
                    <h1 class="text-2xl font-bold text-indigo-900 leading-tight">Manage Payments</h1>
                    <!-- <RouterLink :to="{ name: 'userCreate' }"
                        class="font-bold py-4 px-6 bg-indigo-700 text-white rounded-full">Add New</RouterLink> -->
                </div>

                <div class="pt-10 w-full">
                    <div class="overflow-x-auto rounded-2xl shadow-lg">
                        <table class="min-w-full bg-white text-sm text-gray-700">
                            <thead class="bg-gray-100 text-left text-xs font-semibold uppercase text-gray-500">
                                <tr>
                                    <th class="px-6 py-4">Tanggal</th>
                                    <th class="px-6 py-4">Status</th>
                                    <th class="px-6 py-4">Event</th>
                                    <th class="px-6 py-4">Tanggal Event</th>
                                    <th class="px-6 py-4">Harga Satuan</th>
                                    <th class="px-6 py-4">Jumlah</th>
                                    <th class="px-6 py-4">Harga Total</th>
                                    <th class="px-6 py-4">Image</th>
                                    <th class="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr v-for="payment in data" :key="payment.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4">{{ formatDate(payment.created_at) }}</td>
                                    <td class="px-6 py-4">
                                        <span :class="[
                                            'text-xs font-semibold px-3 py-1 rounded-full',
                                            payment.status === 'success' ? 'bg-green-100 text-green-600' :
                                                payment.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                                    payment.status === 'expired' ? 'bg-red-100 text-red-600' :
                                                        'bg-gray-200 text-gray-600'
                                        ]">
                                            {{ payment.status }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4">{{ payment.event_price.event.name }}</td>
                                    <td class="px-6 py-4">{{ payment.event_price.event.date }}</td>
                                    <td class="px-6 py-4">{{ formatToIDR(payment.price) }}</td>
                                    <td class="px-6 py-4">{{ payment.amount_ticket }}</td>
                                    <td class="px-6 py-4 font-medium text-gray-900">{{
                                        formatToIDR(payment.total_payment) }}</td>
                                    <td class="px-6 py-4 font-medium text-gray-900">
                                        <button @click="openImageModal(payment.image)"
                                            class="rounded-xl bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 transition">
                                            Show
                                        </button>
                                    </td>
                                    <td class="px-6 py-4 space-x-2">
                                        <div v-if="payment.status === 'pending'" class="text-center">
                                            <button v-on:click="openConfirmModal(payment.id, 'confirm')"
                                                class="rounded-xl bg-green-500 px-3 py-1 text-white hover:bg-green-600 transition">
                                                Confirm
                                            </button>
                                            <button v-on:click="openConfirmModal(payment.id, 'deny')"
                                                class="rounded-xl bg-red-500 px-3 py-1 text-white hover:bg-red-600 transition">
                                                Denied
                                            </button>
                                        </div>

                                        <div v-else class="text-center">
                                            -
                                        </div>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

        <!-- MODAL UNTUK MENAMPILKAN GAMBAR -->
        <div v-if="showImageModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
            <div class="bg-white rounded-2xl overflow-hidden shadow-xl max-w-3xl w-full">
                <div class="p-4 flex justify-between items-center border-b">
                    <h2 class="text-lg font-semibold text-gray-800">Bukti Pembayaran</h2>
                    <button @click="closeImageModal"
                        class="text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
                </div>
                <div class="p-4">
                    <img :src="selectedImageUrl" alt="Payment Proof" class="w-full object-contain rounded-xl">
                </div>
                <div class="p-4 flex justify-end">
                    <button @click="closeImageModal"
                        class="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition">Close</button>
                </div>
            </div>
        </div>

        <!-- Modal Konfirmasi untuk Confirm dan Denied -->
        <div v-if="showConfirmModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
            <div class="bg-white rounded-2xl overflow-hidden shadow-xl max-w-sm w-full">
                <div class="p-4 flex justify-between items-center border-b">
                    <h2 class="text-lg font-semibold text-gray-800">Konfirmasi</h2>
                    <button @click="closeConfirmModal"
                        class="text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
                </div>
                <div class="p-4">
                    <p class="text-gray-800">Apakah Anda yakin ingin {{ actionText }} pembayaran ini?</p>
                </div>
                <div class="p-4 flex justify-end space-x-2">
                    <button @click="handleConfirmAction"
                        class="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition">Ya</button>
                    <button @click="closeConfirmModal"
                        class="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition">Tidak</button>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import ManageUserTable from "@/components/ManageUserTable.vue";
import { RouterLink } from 'vue-router';
import axios from "axios";

export default {
    components: {
        NavbarAdmin,
        ManageUserTable
    },

    data() {
        return {
            users: [],
            data: [],
            isLoading: true,
            showImageModal: false,
            selectedImageUrl: '',
            showConfirmModal: false,
            paymentId: null,
            action: '', // 'confirm' or 'deny'
            actionText: ''
        };
    },

    mounted() {
        this.getItem();
    },

    methods: {
        formatDate(date) {
            if (!date || typeof date !== 'string') return 'Tanggal tidak valid';
            const parsed = new Date(String(date));
            return parsed.toISOString().split('T')[0];
        },

        openImageModal(imageUrl) {
            this.selectedImageUrl = imageUrl ? `http://127.0.0.1:8000${imageUrl}` : '/src/assets/noImage.png';
            this.showImageModal = true;
        },

        closeImageModal() {
            this.showImageModal = false;
            this.selectedImageUrl = '';
        },

        openConfirmModal(paymentId, action) {
            this.paymentId = paymentId;
            this.action = action;
            this.actionText = action === 'confirm' ? 'Confirm' : 'Deny';
            this.showConfirmModal = true;
        },

        closeConfirmModal() {
            this.showConfirmModal = false;
            this.paymentId = null;
            this.action = '';
        },

        async handleConfirmAction() {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };
            try {
                if (this.action === 'confirm') {
                    await axios.post(`http://localhost:8000/api/admin/payments/manual/confirm`, { paymentId: this.paymentId }, config);
                } else if (this.action === 'deny') {
                    await axios.post(`http://localhost:8000/api/admin/payments/manual/deny`, { paymentId: this.paymentId }, config);
                }
                this.closeConfirmModal();
                this.getItem(); // Refresh data after action
            } catch (err) {
                console.error("Error:", err);
            }
        },

        async getItem() {
            this.isLoading = true;
            try {
                const res = await axios.get(`http://localhost:8000/api/admin/payments`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                this.isLoading = false;
                if (res.data?.data) {
                    console.log(res.data.data);
                    this.data = res.data.data;
                }
            } catch (err) {
                this.isLoading = false;
                if (err.response?.status === 401) {
                    localStorage.removeItem('email');
                    localStorage.removeItem('name');
                    localStorage.removeItem('role_id');
                    localStorage.removeItem('token');
                    this.$router.push({ name: 'login' });
                } else {
                    console.error("Error fetching data:", err);
                }
            }
        },

        formatToIDR(value) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(value);
        },
    }
};
</script>
