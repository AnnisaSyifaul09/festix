<template>
    <div>
        <NavbarItem></NavbarItem>
        <section class="py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
            <div class="pt-15 p-2 min-h-screen flex flex-col">
                <h1 class="text-2xl font-bold text-indigo-900 mb-8 text-left">TICKET HISTORY</h1>

                <div v-if="loading" class="flex justify-center items-center min-h-screen">
                    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mx-auto justify-items-center">
                    <CardPembayaranVue v-for="(ticket, index) in data" :key="index"
                        :image="Array.isArray(ticket.event_price.event.event_image) && ticket.event_price.event.event_image.length > 0 ? ticket.event_price.event.event_image[0].link : ''"
                        :title="ticket.event_price.event.name" :date="ticket.event_price.event.date"
                        :time="ticket.event_price.event.time.split(' ')[1].slice(0, 5)" :location="tickets[0].location"
                        :id="ticket.id" :status="ticket.status" :snapToken="ticket.snap_token" @pay="handlePay">
                    </CardPembayaranVue>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import NavbarItem from "@/components/NavbarItem.vue";
import TicketCard from "@/components/TicketCard.vue";
import IconDate from "@/components/icons/IconDate.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import axios from "axios";
import router from "@/router";
import CardPembayaranVue from '@/components/CardPembayaran.vue';


export default {
    components: {
        NavbarItem,
        CardPembayaranVue,
        IconDate,
        IconTime,
        IconLocation,
    },
    data() {
        return {
            tickets: [
                {
                    image: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
                    title: "LOREM IPSUM DOLOR",
                    date: "12 July 2025",
                    time: "18.00",
                    location: "Teater Taman Sriwedari",
                },
                {
                    image: "https://awsimages.detik.net.id/community/media/visual/2020/03/06/6ee251fb-59d2-4d12-bb31-4cbaa12f0450.jpeg?w=1200",
                    title: "LOREM IPSUM DOLOR",
                    date: "12 July 2025",
                    time: "18.00",
                    location: "Teater Taman Sriwedari",
                },
            ],
            data: "",
            loading: true,
            clientkey: import.meta.env.VITE_MIDTRANS_CLIENT_KEY
        };
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
        script.setAttribute("data-client-key", "client"); // Ganti dengan ClientKey
        document.body.appendChild(script);
    },
    methods: {
        getItem() {
            axios.get(`http://localhost:8000/api/payments`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }).then((res) => {
                console.log(res.data.data)
                this.data = res.data.data;
                this.loading = false;
            }).catch((err) => {
                if (err.response?.status === 401) {
                    localStorage.removeItem('email');
                    localStorage.removeItem('name');
                    localStorage.removeItem('role_id');
                    localStorage.removeItem('token');

                    router.push({ name: 'login' });
                } else {
                    console.error("Error fetching venues data:", err);
                }
                this.loading = false;
            });
        },
        handlePay({ id, snapToken }) {
            const payment = { id, snapToken };
            this.pay(payment);
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
                    this.resultJson = JSON.stringify(result, null, 2);
                    let formData = new FormData();
                    formData.append("status", "success");
                    formData.append("paymentId", payment.id);

                    axios.post(`http://localhost:8000/api/payments/create/success`, formData, {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }).then((res) => {
                        console.log(res.data);
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
                onPending: (result) => {
                    this.resultJson = JSON.stringify(result, null, 2);
                },
                onError: (result) => {
                    this.resultJson = JSON.stringify(result, null, 2);
                }
            });
        },
    }
};
</script>