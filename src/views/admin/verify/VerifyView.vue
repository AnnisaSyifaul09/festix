<template>
    <div>
        <NavbarAdmin />

        <section class="container mx-auto mt-20 px-4 md:w-1/2">
            <div class="text-2xl font-bold text-indigo-900 leading-tight">Scan QR Code</div>
            <div class="flex gap-2 mb-4 rounded-lg overflow-hidden">
                <div id="qr-reader"></div>
            </div>

            <div class="w-full">
                <div class="grid [grid-template-columns:1fr_3fr] items-center">
                    <h3 class="text-xl font-semibold">Event</h3>
                    <select v-model="selectedEventId" class="px-4 py-2 w-full shadow rounded-lg">
                        <option value="">All</option>
                        <option v-for="(event, index) in data" :key="index" :value="event.id">
                            {{ `${event.name} | ${event.date} | ${event.time.split(' ')[1].slice(0, 5)}` }}
                        </option>
                    </select>
                </div>
                <div class="flex mt-5 gap-2">
                    <input type="text"
                        class="px-4 py-2 w-full shadow rounded-lg focus:border-gray-300 active:border-gray-300"
                        v-model="code" placeholder="Input QR Code" />
                    <button class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-300"
                        @click="submit">Submit</button>
                </div>
            </div>
        </section>

        <transition name="fade" class="mt-15">
            <div v-if="alertMessage" :class="alertClass"
                class="fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-black shadow-lg">
                {{ alertMessage }}
            </div>
        </transition>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { Html5Qrcode } from 'html5-qrcode';
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import axios from "axios";

export default {
    components: {
        NavbarAdmin,
    },
    data() {
        return {
            data: [],
            selectedEventId: '',
            code: '',
            alertMessage: '',
            alertClass: '',
        };
    },
    methods: {
        showAlert(message, colorClass) {
            this.alertMessage = message;
            this.alertClass = colorClass;
            setTimeout(() => {
                this.alertMessage = "";
            }, 5000);
        },
        submit() {
            if (!this.code) {
                this.showAlert("❌ Input QR Code!", "bg-red-200");
                return;
            }

            axios.post("http://localhost:8000/api/verify-ticket", {
                code: this.code,
                event_id: this.selectedEventId,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    console.log(res.data);
                    this.showAlert("✅ Success", "bg-green-200");
                })
                .catch((err) => {
                    console.error(err);
                    this.showAlert("❌ Failed", "bg-red-200");
                });
        },
        getItem() {
            axios.get(`http://localhost:8000/api/events`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }).then((res) => {
                if (res.data?.data) {
                    this.data = res.data.data;

                    // ✅ Pilih otomatis event pertama saat berhasil load
                    if (this.data.length > 0) {
                        this.selectedEventId = this.data[0].id;
                    }
                }
            }).catch((err) => {
                if (err.response?.status === 401) {
                    localStorage.clear();
                    this.$router.push({ name: 'login' });
                } else {
                    console.error("Error fetching events data:", err);
                }
            });
        }
    },
    mounted() {
        this.getItem();

        const qrScanner = new Html5Qrcode("qr-reader");
        qrScanner.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
                rememberLastUsedCamera: true,
                showTorchButtonIfSupported: true,
            },
            (decodedText) => {
                this.code = decodedText;

                axios.post("http://localhost:8000/api/verify-ticket", {
                    code: this.code,
                    event_id: this.selectedEventId,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => {
                        console.log(res.data);
                        this.showAlert("✅ Success", "bg-green-200");
                    })
                    .catch((err) => {
                        console.error(err);
                        this.showAlert("❌ Failed", "bg-red-200");
                    });
            },
            (error) => {
                // handle scan error if needed
            }
        ).catch(err => console.error("Camera start error:", err));

        this.qrScanner = qrScanner;
    },
    unmounted() {
        if (this.qrScanner) {
            this.qrScanner.stop().then(() => {
                this.qrScanner.clear();
            }).catch(err => console.error("Camera stop error:", err));
        }
    },
};
</script>

<style scoped>
#qr-reader {
    width: 100%;
    max-width: 400px;
    height: auto;
    margin: auto;
    border: 1px solid #ccc;
}
</style>
