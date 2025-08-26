<template>
  <div>
    <h2 class="font-bold text-xl mb-4">Tes Akhir</h2>
    <p class="mb-4">Silakan jawab pertanyaan akhir untuk menyelesaikan kursus ini.</p>
    <button class="btn btn-warning" @click="$emit('completed')">Selesai Kursus</button>
  </div>
</template>

<script setup>
defineProps(['section'])
</script>
