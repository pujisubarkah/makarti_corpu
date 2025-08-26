<template>
  <div>
    <p class="mb-4">Selamat datang di kursus ini! 🎉 Yuk mulai perjalanan belajarmu.</p>
    <button class="btn btn-primary" @click="$emit('completed')">Mulai Belajar</button>
  </div>
</template>

<script setup>
defineProps(['section'])
</script>
