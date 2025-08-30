
<template>
  <div class="flex min-h-screen flex-col font-poppins bg-base-100">
    <Navbar />
    <main class="flex-1 pt-16">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<style>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>