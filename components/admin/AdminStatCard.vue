<template>
  <div class="card bg-base-100 shadow-md">
    <div class="card-body flex flex-row items-center gap-4">
      <div class="text-3xl">{{ icon }}</div>
      <div>
        <h2 class="card-title text-lg">{{ title }}</h2>
        <p class="text-2xl font-bold">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: String,
})
</script>
