<template>
    <div
        class="relative bg-white rounded-2xl shadow-md w-full max-w-sm overflow-hidden hover:shadow-xl transition group">
        <!-- Top gradient bar -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

        <!-- Event image -->
        <img :src="image_link" alt="Event Image" class="w-full h-40 object-cover" />

        <!-- Content -->
        <div class="p-4 space-y-2">
            <h2 class="text-lg font-bold text-gray-800">{{ title }}</h2>
            <p class="text-sm text-gray-500">{{ location }}</p>

            <!-- Detail Info -->
            <div class="flex justify-between text-sm text-gray-600 mt-3">
                <div class="flex items-center gap-1">
                    <IconDate class="w-4 h-4 text-indigo-500" />
                    <span>{{ date }}</span>
                </div>
                <div class="flex items-center gap-1">
                    <IconTime class="w-4 h-4 text-indigo-500" />
                    <span>{{ time }}</span>
                </div>
            </div>

            <!-- Footer: Status + Button -->
            <div class="flex justify-between items-center mt-5">
                <span :class="[
                    'text-xs font-semibold px-3 py-1 rounded-full',
                    status == 1 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                ]">
                    {{ status == 1 ? 'Not Used' : 'Used' }}
                </span>

                <RouterLink :to="{ name: 'detail', params: { id: id } }"
                    class="text-sm bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
                    Detail
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import IconDate from "@/components/icons/IconDate.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import { RouterLink } from "vue-router";

export default {
    props: {
        image: String,
        title: String,
        date: String,
        time: String,
        location: String,
        id: String,
        status: String,
    },
    data() {
        return {
            image_link: this.image
                ? `http://127.0.0.1:8000${this.image}`
                : "/src/assets/noImage.png",
        };
    },
    components: {
        IconDate,
        IconTime,
        IconLocation,
        RouterLink,
    },
};
</script>