<template>
  <div class="flex flex-col min-h-screen bg-base-100">
    <Navbar class="z-20 sticky top-0" />
    <div class="flex flex-1">
  <Sidebar :role="sidebarRole" class="z-10 h-full min-h-[calc(100vh-64px-64px)]" />
      <main class="flex-1 px-6 py-8 md:px-10 md:py-10 bg-base-100">
        <slot />
      </main>
    </div>
    <Footer class="z-20" />
  </div>
</template>

<script setup>
import { useHead } from '#imports'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
import Sidebar from '~/components/Sidebar.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sidebarRole = computed(() => {
  if (route.path.startsWith('/admin')) return 'admin'
  if (route.path.startsWith('/instructor')) return 'instruktur'
  return 'admin'
})

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap'
    }
  ]
})
</script>
