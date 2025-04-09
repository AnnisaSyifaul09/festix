<template>
    <div>
        <NavbarAdmin></NavbarAdmin>
        <section class="pt-24 py-12 px-6 md:px-0 max-w-screen-xl mx-auto">
            <h2 class="text-indigo-900 font-bold text-2xl mb-2">PROFILE</h2>
            <ProfileCardAdmin :username="me.username" :email="me.email" :id="me.id" :name="me.name"
                :role="me.role?.name" />
        </section>
    </div>
</template>

<script>
import TicketCard from "@/components/TicketCard.vue";
import axios from "axios";
import router from "@/router";
import ProfileCardAdmin from "@/components/ProfileCardAdmin.vue";
import NavbarAdmin from "@/components/NavbarAdmin.vue";


export default {
    components: {
        NavbarAdmin, TicketCard, ProfileCardAdmin
    },
    data() {
        return {
            me: {},
            data: [],
            loading: true,  // Start loading state as true
        };
    },
    mounted() {
        this.getItem();

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('name');

        if (!token || !username) {
            router.push({ name: 'login' });
        }
    },
    methods: {
        getItem() {
            // Fetch user profile
            axios.get(`http://localhost:8000/api/auth/me`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }).then((res) => {
                console.log(res.data.data);
                this.me = res.data.data;
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
            });
        },
    }
};
</script>