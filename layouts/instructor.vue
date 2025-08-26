<!-- filepath: c:\Users\user\Documents\cloud-campus\layouts\admin.vue -->
<template>
  <div class="flex min-h-screen bg-base-100 flex-col font-poppins">
    <HeaderInstructor />
    <div class="flex flex-1 pt-12 border-t-4 border-yellow-400">
      <SidebarInstructor />
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import HeaderInstructor from '@/components/headerInstructor.vue'
import SidebarInstructor from '@/components/SidebarInstruktur.vue'
</script>

<style>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>