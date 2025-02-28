<template lang="">
<div className="flex flex-col md:flex-row h-screen">
  <div className="w-full md:w-1/2 h-1/3 md:h-full hidden md:block">
    <!-- <img
      src="/your-image.jpg"
      alt="Concert"
      className="w-full h-full object-cover"
    /> -->
  </div>
    <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 min-h-screen">
        <div className="w-full md:w-2/3">
            <h2 className="text-4xl font-semibold text-violet-900 text-center mb-6">LOGIN</h2>
            <form>
            <div className="mb-4">
                <label className="block text-lg font-semibold text-violet-900 mb-2">Email</label>
                <input 
                type="email" 
                className="w-full p-2 border-3 border-yellow-500 rounded-full" 
                placeholder="Enter your email"
                />
            </div>

            <div className="mb-4">
                <label className="block text-lg font-semibold text-violet-900 mb-2">Password</label>
                <input 
                type="password" 
                className="w-full p-2 border-3 border-yellow-500 rounded-full" 
                placeholder="Enter your password"
                />
            </div>

            <p className="text-sm text-violet-900 text-center mb-4">
                Don't have an account? <a href="#" className="font-semibold">Sign In</a>
            </p>

            <button 
                type="submit" 
                className="w-full bg-yellow-500 text-white p-2 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300"
            >
                Login
            </button>
            </form>
        </div>
    </div>
</div>

</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>