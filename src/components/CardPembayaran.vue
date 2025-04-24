<template>
    <div
        class="relative bg-white rounded-2xl shadow-lg p-5 w-full max-w-sm overflow-hidden group transition hover:shadow-xl hover:shadow-indigo-500/20">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

        <div class="flex flex-col gap-4">
            <!-- Header Image -->
            <img :src="image_link" alt="Event" class="rounded-xl w-full h-40 object-cover shadow-sm" />

            <!-- Event Info -->
            <div>
                <h2 class="text-lg font-bold text-gray-800">{{ title }}</h2>
                <p class="text-sm text-gray-500 mt-1">{{ location }}</p>
            </div>

            <!-- Event Details -->
            <div class="flex items-center text-sm text-gray-600 justify-between">
                <div class="flex items-center gap-1">
                    <IconDate class="w-4 h-4 text-indigo-500" />
                    <span>{{ date }}</span>
                </div>
                <div class="flex items-center gap-1">
                    <IconTime class="w-4 h-4 text-indigo-500" />
                    <span>{{ time }}</span>
                </div>
            </div>

            <!-- Status and Action -->
            <div class="flex justify-between items-center mt-2">
                <span :class="[
                    'text-xs font-semibold px-3 py-1 rounded-full',
                    status === 'success' ? 'bg-green-100 text-green-600' :
                        status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-gray-200 text-gray-600'
                ]">
                    {{ status }}
                </span>

                <button v-if="status === 'pending'" @click="$emit('pay', { id, snapToken })"
                    class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-medium px-4 py-2 rounded-lg shadow hover:brightness-110 transition">
                    Pay Now
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import IconDate from "@/components/icons/IconDate.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconLocation from "@/components/icons/IconLocation.vue";

export default {
    props: ["image", "title", "date", "time", "location", "status", "snapToken", "id"],
    data() {
        return {
            image_link: this.image
                ? `http://127.0.0.1:8000${this.image}`
                : "/src/assets/noImage.png",
        }
    },
    components: {
        IconDate,
        IconTime,
        IconLocation
    }
};
</script>