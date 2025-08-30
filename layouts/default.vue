

<template>
  <div>
    <div class="flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-1">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>


<script setup>
import { useHead } from '#imports'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap'
    }
  ]
})
</script>
