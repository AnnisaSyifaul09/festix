<template>
    <div class="min-h-screen ">
        <NavbarAdmin></NavbarAdmin>
        <div class="container mx-auto w-full min-h-screen py-20 px-4 md:w-3/4">
            <div class="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
                <div>
                    <div class="rounded-md overflow-hidden">
                        <img class="aspect-video object-cover w-full" :src="Array.isArray(event.event_image) && event.event_image.length > 0
                            ? `http://127.0.0.1:8000${event.event_image[0].link}`
                            : '/src/assets/noImage.png'" alt="Event Image" />
                    </div>
                    <h1 class="text-4xl text-indigo-900 font-semibold mt-4">{{ event.name }}</h1>
                    <div class="mt-2 flex flex-wrap gap-5">
                        <p class="flex items-center gap-2">
                            <IconDate class="w-5 h-5 text-indigo-900" />
                            {{ event.date }}
                        </p>
                        <p class="flex items-center gap-2">
                            <IconTime class="w-5 h-5 text-indigo-900" />
                            {{ event.time?.split(" ")[1].slice(0, 5) }}
                        </p>

                    </div>
                    <p class="flex items-center gap-2">
                        <IconLocation class="w-5 h-5 text-indigo-900" />
                        {{ event.vanue?.name
                        }}
                    </p>
                    <!-- <div class="w-full flex flex-wrap gap-3 mt-5">
                        <div class="px-5 py-1 rounded-lg"
                            :class="item.remaining_seat !== 0 ? 'bg-[#37FF30]' : 'bg-[#FF3030]'"
                            v-for="(item, index) in category" :key="index">
                            {{ item.name }}
                        </div>
                    </div> -->

                    <hr class="my-7">

                    <div class="">
                        <div class="relative grid grid-cols-2 mb-8 bg-white shadow-lg rounded-lg px-2 py-5"
                            v-for="(item, index) in category" :key="index">
                            <h4 class="text-lg font-semibold text-indigo-900">{{ item.name }}</h4>
                            <h4 class="text-lg font-semibold text-indigo-900 text-end">{{ formatToIDR(item.price) }}
                            </h4>
                            <p>Remaining Seat : <span>{{ item.remaining_seat }}</span></p>
                            <span class="absolute -top-4 right-3 rounded-lg py-1 px-4 "
                                :class="item.remaining_seat !== 0 ? 'bg-[#37FF30]' : 'bg-[#FF3030]'">{{
                                    item.remaining_seat !== 0 ? "Available" : "Sold" }}</span>
                        </div>
                    </div>
                </div>

                <div class="">

                    <div class="">
                        <h1 class="text-2xl font-semibold">Seat Map</h1>
                        <div class="w-full bg-amber-100 mt-5 rounded-lg overflow-hidden">
                            <img class="object-cover w-full" :src="event.seat_image
                                ? `http://127.0.0.1:8000${event.seat_image}`
                                : '/src/assets/noImage.png'" alt="Event Image" />
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>


</template>

<style scoped>
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.no-spinner {
    -moz-appearance: textfield;
}
</style>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import IconDate from "@/components/icons/IconDate.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import axios from "axios";
import router from "@/router";

export default {
    components: {
        NavbarAdmin,
        IconDate,
        IconTime,
        IconLocation,
    },
    data() {
        return {
            ticket: {
                image: "/src/assets/konser1.jpg",
                title: "Lorem Ipsum Dolor",
                date: "12 July 2025",
                time: "18.00",
                location: "Indonesia",
            },
            eventId: "",
            event: "",
            category: [],
            selectedCategory: {},
            quantity: 1,
            price: 0,
            isDropdownOpen: false,
            total: 0,
            showModal: false,
            admin: 2000,
            resultJson: "",
            snapToken: "",
            payment: "",
            ppn: "",
            isProcessing: false,
            clientkey: import.meta.env.VITE_MIDTRANS_CLIENT_KEY
        };
    },
    computed: {
        totalPrice() {
            return this.price * this.quantity;
        },
        totalPay() {
            this.totalPayment = this.price * this.quantity + this.admin + this.ppn
            return this.price * this.quantity + this.admin + this.ppn;
        }
    },
    mounted() {
        this.eventId = this.$route.params.id;
        this.getItem();

        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", "client"); // Ganti dengan ClientKey
        document.body.appendChild(script);

    },
    methods: {
        formatToIDR(value) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(value);
        },
        getItem() {
            axios.get(`http://localhost:8000/api/events/${this.eventId}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }).then((res) => {
                console.log(res.data.data)
                this.category = res.data.data.total_seats_remaining;
                this.event = res.data.data.event;
                if (this.category.length > 0) {
                    this.selectedCategory = this.category[0]; // Default ke kategori pertama
                    this.price = this.selectedCategory.price;
                    this.quantity = 1; // Set default quantity ke 1
                }
            }).catch((err) => {
                console.log(err);
            });
        },
    },
};
</script>