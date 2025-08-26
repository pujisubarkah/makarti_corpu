<template>
  <div>
    <div class="aspect-w-16 aspect-h-9 mb-4">
      <iframe
        class="w-full h-full"
        :src="section.url"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
    <button class="btn btn-success" @click="$emit('completed')">Lanjut</button>
  </div>
</template>

<script setup>
defineProps(['section'])
</script>
