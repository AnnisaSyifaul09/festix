<template>
    <div class="min-h-screen ">
        <NavbarItem />
        <div class="container mx-auto w-full min-h-screen py-20 px-4 md:w-3/4">
            <div class="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr]">
                <div>
                    <div class="rounded-md overflow-hidden">
                        <img class="aspect-video object-cover w-full" :src="ticket.image" alt="Event Image" />
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
                        {{ ticket.location }}
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
                            <span class="absolute -top-4 right-3 rounded-lg py-1 px-4 "
                                :class="item.remaining_seat !== 0 ? 'bg-[#37FF30]' : 'bg-[#FF3030]'">{{
                                    item.remaining_seat !== 0 ? "Available" : "Sold" }}</span>
                        </div>
                    </div>
                </div>

                <div class="">
                    <div class="mt-4 shadow-lg p-5 rounded-lg  bg-white h-max md:mt-0">
                        <h2 class="font-semibold text-indigo-900 my-2">Category Seat</h2>

                        <!-- Dropdown dengan Tailwind -->
                        <div class="relative w-full">
                            <button @click="toggleDropdown"
                                class="w-full bg-white border border-slate-400 px-3 py-2 rounded-lg flex justify-between items-center">
                                {{ selectedCategory.name || "Select Category" }}
                                <span class="material-icons"></span>
                            </button>
                            <div v-if="isDropdownOpen"
                                class="absolute w-full bg-white border border-slate-300 rounded-lg shadow-md mt-1">
                                <div v-for="(item, index) in category" :key="index" @click="selectCategory(item)"
                                    class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>

                        <h2 class="font-semibold text-indigo-900 my-2">Quantity</h2>
                        <div class="grid grid-cols-2 w-full">
                            <div class="flex w-full gap-2">
                                <button
                                    class="px-1 w-10 h-10 border border-slate-400 rounded-lg flex items-center justify-center text-lg"
                                    @click="subtract">-</button>
                                <input type="number"
                                    class="w-20 p-2 text-center border border-slate-400 rounded-lg no-spinner"
                                    v-model="quantity" />
                                <button
                                    class="px-1 w-10 h-10 border border-slate-400 rounded-lg flex items-center justify-center text-lg"
                                    @click="add">+</button>
                            </div>
                            <div class="w-full flex items-center justify-end font-semibold text-indigo-900">
                                <h5>Stock: <span>{{ selectedCategory.remaining_seat || 0 }}</span></h5>
                            </div>
                        </div>
                        <div class="flex text-indigo-900 justify-between text-2xl font-semibold my-2">
                            <h5 class="">Total</h5>
                            <h5>{{ formatToIDR(totalPrice) }}</h5>
                        </div>

                        <!-- Tombol Buy hanya muncul jika quantity lebih dari 0 -->
                        <button v-if="selectedCategory.remaining_seat > 0"
                            class="w-full py-2 bg-[#37FF30] rounded-lg hover:bg-green-600 transition-all"
                            v-on:click="buy()">Buy</button>
                    </div>

                    <div class="">
                        <div class="w-full h-99 bg-amber-100 mt-5 rounded-lg"></div>
                    </div>
                </div>

            </div>
        </div>
        <div v-if="showModal" class="px-4 fixed inset-0 flex items-center justify-center bg-black/75 ">
            <div class="bg-white p-6 rounded-lg w-full md:w-1/3">
                <h2 class="text-xl font-semibold mb-4">Payment Confirmation</h2>
                <hr>
                <h1 class="text-4xl font-semibold">{{ event.name }}</h1>
                <div class="mt-2 flex flex-wrap gap-5">
                    <p class="flex items-center gap-2">
                        <IconDate class="w-5 h-5 text-indigo-900" />
                        {{ event.date }}
                    </p>
                    <p class="flex items-center gap-2">
                        <IconTime class="w-5 h-5 text-indigo-900" />
                        {{ event.time.split(" ")[1].slice(0, 5) }}
                    </p>

                </div>
                <p class="flex items-center gap-2">
                    <IconLocation class="w-5 h-5 text-indigo-900" />
                    {{ ticket.location }}
                </p>

                <div class="my-4">
                    <span class="px-4 py-2 rounded-lg border-1 ">{{ selectedCategory.name }}</span>
                </div>

                <div class="p-2 border-1 rounded-lg">
                    <div class="flex justify-between">
                        <h5>{{ formatToIDR(price) }} x {{ quantity }}</h5>
                        <h5>{{ formatToIDR(price * quantity) }}</h5>
                    </div>
                    <div class="flex justify-between">
                        <h5>PPN 10%</h5>
                        <h5>{{ formatToIDR(ppn) }}</h5>
                    </div>
                    <div class="flex justify-between">
                        <h5>Admin</h5>
                        <h5>{{ formatToIDR(admin) }}</h5>
                    </div>

                </div>

                <div class="flex justify-between p-2 text-2xl font-semibold my-4">
                    <p>Total</p>
                    <p>{{ formatToIDR(totalPay) }}</p>

                </div>
                <div class="flex justify-end mt-4 gap-2">
                    <button class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-500 transition-all"
                        @click="showModal = false">Batal</button>
                    <button class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
                        @click="payments()" :disabled="isProcessing">
                        <span v-if="isProcessing"
                            class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 inline-block mr-2"></span>
                        Konfirmasi
                    </button>
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
import router from "@/router";

export default {
    components: {
        NavbarItem,
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
            totalPayment: 0,
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
        add() {
            if (this.quantity < this.selectedCategory.remaining_seat) {
                this.quantity++;
            }
        },
        subtract() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        selectCategory(item) {
            this.selectedCategory = item;
            this.quantity = 1;
            this.price = item.price;
            this.isDropdownOpen = false;
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        buy() {
            this.showModal = true;
            this.ppn = this.totalPrice * 0.1
        },
        payments() {
            this.isProcessing = true;

            console.log(this.selectedCategory)
            let formData = new FormData();
            formData.append("quantity", this.quantity);
            formData.append("price", this.price);
            formData.append("total", this.totalPayment);
            formData.append("eventPriceId", this.selectedCategory.event_price_id)

            axios.post(`http://localhost:8000/api/payments/create`, formData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }).then((res) => {
                console.log(res.data);
                this.payment = res.data.data
                this.snapToken = res.data.data.snap_token

                this.pay()
            }).catch((err) => {
                console.log(err);
            });
        },
        pay() {
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
                            name: "Riwayat",
                        });
                    }).catch((err) => {
                        console.log(err);
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
    },
};
</script>