<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="text-center p-10 bg-white shadow-lg rounded-2xl max-w-md">
            <div class="text-red-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M18.364 5.636l-1.414 1.414M5.636 18.364l1.414-1.414M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
                </svg>
            </div>
            <h1 class="text-3xl font-bold text-red-600 mb-2">Unauthorized Access</h1>
            <p class="text-gray-600 mb-6">You don't have permission to view this page.</p>
            <RouterLink :to="{ name: 'home' }"
                class="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
                Go to Home
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
// No script needed unless you want to add auth logic or redirect
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>