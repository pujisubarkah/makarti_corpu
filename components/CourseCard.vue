<template>
  <NuxtLink
    :to="`/course/${course.id}`"
    class="block top_courses bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
  >
    <div class="thumb w-full h-48 bg-gray-100 flex items-center justify-center">
      <img
        v-if="course.thumbnail_url"
        :src="course.thumbnail_url"
        :alt="course.title"
        class="w-full h-full object-cover"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-gray-400 text-sm"
      >
        Tidak ada gambar
      </div>
      <div class="overlay absolute inset-0"></div>
    </div>
    <div class="p-4">
      <h3 class="font-bold text-lg mb-2">{{ course.title }}</h3>
      <p class="text-gray-600 text-sm mb-2">{{ course.description }}</p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ course: any }>()
</script>

<style scoped>
.top_courses .thumb {
  position: relative;
}
.overlay {
  transition: background 0.2s;
}
.top_courses:hover .overlay {
  background: rgba(0, 0, 0, 0.25);
}
</style>
