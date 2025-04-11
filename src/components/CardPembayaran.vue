<template>
    <div class="bg-indigo-900 text-white rounded-xl shadow-lg  w-full max-w-5xl relative">
        <img class="w-full aspect-video object-cover rounded-ss-lg rounded-se-lg" :src="image_link" alt="Event Image" />
        <div class="p-3">
            <h2 class="text-lg font-bold">{{ title }}</h2>
            <div class="mt-2 flex flex-col gap-1">
                <p class="flex items-center gap-2">
                    <IconDate class="w-5 h-5 text-white" />
                    {{ date }}
                </p>
                <p class="flex items-center gap-2">
                    <IconTime class="w-5 h-5 text-white" />
                    {{ time }}
                </p>
                <p class="flex items-center gap-2">
                    <IconLocation class="w-5 h-5 text-white" />
                    {{ location }}
                </p>
            </div>
            <button @click="$emit('pay', { id, snapToken })"
                class="mt-4 bg-indigo-500 px-4 py-2 rounded-lg w-20 hover:bg-indigo-800 flex items-center justify-center">
                Detail
            </button>
        </div>
        <span class="absolute px-4 py-2  -top-4 right-2  rounded-lg"
            :class="status == 'success' ? 'bg-[#37FF30]' : 'bg-[#FF3030]'">{{
                status == 1 ? status : status }}</span>
    </div>
</template>


<script>
import IconDate from "@/components/icons/IconDate.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import { RouterLink } from "vue-router";

export default {
    data() {
        return {
            image_link: this.image
                ? `http://127.0.0.1:8000${this.image}`
                : "/src/assets/noImage.png",
        };
    },
    props: {
        image: String,
        title: String,
        date: String,
        time: String,
        location: String,
        id: String,
        status: String,
        snapToken: String,
    },
    components: {
        IconDate,
        IconTime,
        IconLocation,
    },
    methods: {
        timeOnly(time) {
            return time.split(" ")[1].slice(0, 5); // Ambil bagian jam dan menit
        },

        pay() {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('name');

            if (!token || !username) {
                router.push({ name: 'login' });
            }
            if (!window.snap) {
                console.error("Midtrans Snap.js is not loaded");
                return;
            }

            window.snap.pay(this.snapToken, {
                onSuccess: (result) => {
                    this.resultJson = JSON.stringify(result, null, 2);

                    let formData = new FormData();
                    formData.append("status", "success");
                    formData.append("paymentId", this.payment.id)

                    axios.post(`http://localhost:8000/api/payments/create/success`, formData, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }).then((res) => {
                        console.log(res.data);
                        router.push({
                            name: "riwayat",
                        });
                    }).catch((err) => {
                        if (err.response?.status === 401) {
                            localStorage.removeItem('email');
                            localStorage.removeItem('name');
                            localStorage.removeItem('role_id');
                            localStorage.removeItem('token');

                            router.push({ name: 'login' });
                        } else {
                            console.error("Error fetching  data:", err);
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
        }
    }
};
</script>