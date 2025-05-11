<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div class="text-center p-8 bg-white shadow-2xl rounded-2xl w-full max-w-md">
            <div class="text-red-500 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" />
                </svg>
            </div>

            <h1 class="text-2xl font-bold text-red-600 mb-2">Unauthorized Access</h1>
            <p class="text-gray-600 mb-6 text-sm">Sorry, you don’t have permission to access this page.</p>

            <RouterLink :to="{ name: 'home' }"
                class="inline-block bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition duration-300">
                Return to Home
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
// No script needed unless handling redirect
</script>