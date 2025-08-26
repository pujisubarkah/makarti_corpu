<!-- filepath: c:\Users\user\Documents\cloud-campus\layouts\admin.vue -->
<template>
  <div class="flex min-h-screen bg-base-100 flex-col font-poppins">
    <HeaderAdmin />
    <div class="flex flex-1  border-t-4 border-yellow-400">
      <SidebarAdmin />
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import HeaderAdmin from '@/components/HeaderAdmin.vue'
import SidebarAdmin from '@/components/SidebarAdmin.vue'
</script>

<style>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>