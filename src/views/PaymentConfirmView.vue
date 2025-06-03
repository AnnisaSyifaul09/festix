<template>
    <div class="min-h-screen bg-gray-100">
        <NavbarItem />
        <div class="container mx-auto w-full min-h-screen py-20 px-4 md:w-1/2">
            <div class="grid grid-cols-1 gap-4">
                <div>
                    <h1 class="text-4xl font-semibold">{{ event.title }}</h1>
                    <div class="mt-2 flex flex-wrap gap-5">
                        <p class="flex items-center gap-2">
                            <IconDate class="w-5 h-5 text-black" />
                            {{ event.date }}
                        </p>
                        <p class="flex items-center gap-2">
                            <IconTime class="w-5 h-5 text-black" />
                            {{ event.time }}
                        </p>

                    </div>
                    <p class="flex items-center gap-2 mb-5">
                        <IconLocation class="w-5 h-5 text-black" />
                        {{ event.location }}
                    </p>
                    <span class="px-5 py-1 rounded-lg bg-[#37FF30]">
                        VIP
                    </span>

                    <div class="p-4 rounded-lg border mt-10">
                        <div class="flex justify-between">
                            <p>10x10000</p>
                            <p>100000</p>
                        </div>
                        <div class="flex justify-between">
                            <p>PPN 10%</p>
                            <p>100000</p>
                        </div>
                        <div class="flex justify-between">
                            <p>Admin</p>
                            <p>2000</p>
                        </div>
                    </div>

                    <div class="flex justify-between mt-5 m-2">
                        <p class="text-2xl font-semibold">Total</p>
                        <p class="text-2xl font-semibold">100000</p>
                    </div>

                    <button class="bg-[#37FF30] w-full rounded-lg py-2">Buy Now</button>
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
import NavbarItem from "@/components/NavbarItem.vue";
import IconDate from "@/components/icons/IconDate.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import axios from "axios";
import { inject } from 'vue';

const API_URL = import.meta.env.VITE_API_URL;


export default {
    components: {
        NavbarItem,
        IconDate,
        IconTime,
        IconLocation,
    },
    data() {
        return {
            eventId: "26376ed6-b2d0-4c83-9900-df9f98070c97",
            event: "",
            category: "",
            selectedCategory: {},
            quantity: 1,
            price: 0,
            isDropdownOpen: false,
            data: "",
            quantity: "",
            total: "",
            admin: ""
        };
    },
    computed: {
        totalPrice() {
            return this.selectedCategory.price ? this.selectedCategory.price * this.quantity : 0;
        },
    },
    mounted() {
        const { data } = inject('sharedData');
        this.event = data.data.event;
        this.category = data.data.category;
        this.price = data.data.price;
        this.quantity = data.data.quantity;
        this.total = data.data.total_payment;
        this.admin = data.data.admin
    },
    methods: {
        formatToIDR(value) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0, // Bisa diubah sesuai kebutuhan
            }).format(value);
        },
        buy() {

            let formData = new FormData();
            formData.append("quantity", this.quantity);
            formData.append("price", this.price);

            axios.post(`${API_URL}/payment`, formData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        }
    },
};
</script>
