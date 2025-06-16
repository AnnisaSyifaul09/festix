<template>
    <div>
        <NavbarItem />
        <div v-if="showToast"
            class="fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded shadow z-50 transition-all duration-300">
            Check your receipt in your email!
        </div>
        <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
            <div class="pt-15 p-2 min-h-screen flex flex-col">
                <h1 class="text-2xl font-bold text-indigo-900 mb-8 text-left">PAYMENT HISTORY</h1>

                <div v-if="loading" class="flex justify-center items-center min-h-screen">
                    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>

                <div v-else>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mx-auto justify-items-center">
                        <CardPembayaranVue v-for="(ticket, index) in paginatedData" :key="index" :image="Array.isArray(ticket.event_price.event.event_image) && ticket.event_price.event.event_image.length > 0
                            ? ticket.event_price.event.event_image[0].link
                            : ''" :title="ticket.event_price.event.name" :date="ticket.event_price.event.date"
                            :time="ticket.event_price.event.time"
                            :location="ticket.event_price.event.vanue?.name || 'Unknown Venue'" :id="ticket.id"
                            :status="ticket.status" :snapToken="ticket.snap_token" @recipt="recipt" />
                    </div>

                    <!-- Pagination -->
                    <div v-if="totalPages > 1" class="mt-10 flex justify-center gap-2">
                        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                            class="px-4 py-2 bg-indigo-100 text-indigo-900 rounded hover:bg-indigo-200 disabled:opacity-50">
                            Prev
                        </button>

                        <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="[
                            'px-4 py-2 rounded',
                            currentPage === page
                                ? 'bg-indigo-500 text-white'
                                : 'bg-white border border-gray-300 text-indigo-900 hover:bg-gray-100'
                        ]">
                            {{ page }}
                        </button>

                        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                            class="px-4 py-2 bg-indigo-100 text-indigo-900 rounded hover:bg-indigo-200 disabled:opacity-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import NavbarItem from "@/components/NavbarItem.vue";
import CardPembayaranVue from '@/components/CardPembayaran.vue';
import axios from "axios";
import router from "@/router";

const API_URL = import.meta.env.VITE_API_URL;


export default {
    components: {
        NavbarItem,
        CardPembayaranVue,
    },
    data() {
        return {
            data: [],
            loading: true,
            showToast: false,
            currentPage: 1,
            itemsPerPage: 9,
            clientkey: import.meta.env.VITE_MIDTRANS_CLIENT_KEY,
        };
    },
    computed: {
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.data.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.data.length / this.itemsPerPage);
        }
    },
    mounted() {
        this.getItem();
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('name');

        if (!token || !username) {
            router.push({ name: 'login' });
        }

        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", this.clientkey);
        document.body.appendChild(script);
    },
    methods: {
        getItem() {
            this.loading = true;
            axios.get(`${API_URL}/payments`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }).then((res) => {
                console.log(res.data.data);
                this.data = res.data.data;
                this.currentPage = 1; // reset pagination when data is loaded
            }).catch((err) => {
                if (err.response?.status === 401) {
                    localStorage.clear();
                    router.push({ name: 'login' });
                } else {
                    console.error("Error fetching payment data:", err);
                }
            }).finally(() => {
                this.loading = false;
            });
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        handlePay({ id, snapToken }) {
            this.pay({ id, snapToken });
        },
        pay(payment) {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('name');

            if (!token || !username) {
                router.push({ name: 'login' });
                return;
            }

            if (!window.snap) {
                console.error("Midtrans Snap.js is not loaded");
                return;
            }

            window.snap.pay(payment.snapToken, {
                onSuccess: (result) => {
                    let formData = new FormData();
                    formData.append("status", "success");
                    formData.append("paymentId", payment.id);

                    axios.post(`${API_URL}/payments/create/success`, formData, {
                        headers: { Authorization: "Bearer " + token },
                    }).then(() => {
                        router.push({ name: "riwayat" });
                    }).catch((err) => {
                        if (err.response?.status === 401) {
                            localStorage.clear();
                            router.push({ name: 'login' });
                        } else {
                            console.error("Error posting payment data:", err);
                        }
                    });
                },
                onPending: result => console.log("Pending:", result),
                onError: result => console.error("Payment Error:", result),
            });
        },
        recipt(id) {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('name');

            if (!token || !username) {
                router.push({ name: 'login' });
                return;
            }

            axios.get(`${API_URL}/recipt/${id}`, {
                headers: { Authorization: "Bearer " + token },
            }).then(() => {
                this.showToastMessage(); // Tampilkan notifikasi
            }).catch((err) => {
                if (err.response?.status === 401) {
                    localStorage.clear();
                    router.push({ name: 'login' });
                } else {
                    console.error("Error fetching receipt:", err);
                }
            });
        },
        showToastMessage() {
            this.showToast = true;
            setTimeout(() => {
                this.showToast = false;
            }, 4000); // 4 detik
        },


    }
};
</script>