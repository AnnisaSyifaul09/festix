<template>
    <div>
        <NavbarAdmin></NavbarAdmin>

        <section class="container mx-auto mt-20 px-4 md:w-1/2">
            <div class="text-lg font-semibold mb-4">Scan QR Code</div>
            <div class="flex gap-2 mb-4 rounded-lg overflow-hidden">
                <div id="qr-reader"></div>
            </div>

            <div class="flex mt-5 gap-2">
                <input type="text" class="px-4 py-2 w-full border rounded-lg" v-model="code"
                    placeholder="Scan QR Code" />
                <button class="px-4 py-2 border rounded-lg active:bg-slate-500" @click="submit">Submit</button>
            </div>
        </section>
        <!-- 
        <h2>QR Code Scanner</h2>
        <p>Scanned Result: {{ code }}</p> -->

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
    setup() {
        const code = ref('');
        const alertMessage = ref('');
        const alertClass = ref('');
        const qrScanner = ref(null);

        const showAlert = (message, colorClass) => {
            alertMessage.value = message;
            alertClass.value = colorClass;
            setTimeout(() => {
                alertMessage.value = "";
            }, 5000);
        };

        const submit = () => {
            if (!code.value) {
                showAlert("❌ Input QR Code!", "bg-red-200");
                return;
            }

            axios.post("http://localhost:8000/api/verify-ticket", { code: code.value }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    console.log(res.data);
                    showAlert("✅ Success", "bg-green-200");
                })
                .catch((err) => {
                    console.error(err);
                    showAlert("❌ Failed", "bg-red-200");
                });
        };

        const onScanSuccess = (decodedText) => {
            code.value = decodedText;

            axios.post("http://localhost:8000/api/verify-ticket", { code: code.value }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    console.log(res.data);
                    showAlert("✅ Success", "bg-green-200");
                })
                .catch((err) => {
                    console.error(err);
                    showAlert("❌ Failed", "bg-red-200");
                });
        };

        const onScanFailure = (error) => {
            // console.warn(`QR Code scan failed: ${error}`);
        };

        onMounted(() => {
            qrScanner.value = new Html5Qrcode("qr-reader");
            qrScanner.value.start(
                { facingMode: "environment" }, // Gunakan kamera belakang jika tersedia
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                    rememberLastUsedCamera: true,
                    showTorchButtonIfSupported: true,
                },
                onScanSuccess,
                onScanFailure
            ).catch(err => console.error("Camera start error:", err));
        });

        onUnmounted(() => {
            if (qrScanner.value) {
                qrScanner.value.stop().then(() => {
                    qrScanner.value.clear();
                }).catch(err => console.error("Camera stop error:", err));
            }
        });

        return { code, alertMessage, alertClass, submit };
    }
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
