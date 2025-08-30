<template>
  <div class="p-6">
  <h1 class="text-2xl font-bold mb-4">Kompetensi Generik yang Dikelola</h1>

    <!-- Filter kategori -->
    <div class="mb-4">
      <label class="mr-2 font-semibold">Kategori:</label>
      <select v-model="selectedCategory" @change="fetchCompetencies" class="border rounded px-2 py-1">
        <option value="">Semua</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <!-- List kompetensi -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="comp in competencies" :key="comp.id" class="p-4 border rounded-lg shadow">
        <h2 class="text-lg font-semibold">{{ comp.name }}</h2>
        <p class="text-gray-600">{{ comp.description }}</p>
        <NuxtLink :to="`/instructor/kompetensi/${comp.id}`" class="text-blue-600 underline mt-2 inline-block">
          Kelola Materi →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const categories = ref([])
const competencies = ref([])
const selectedCategory = ref("")

const fetchCategories = async () => {
  const res = await $fetch('/api/categories')
  categories.value = res
}

const fetchCompetencies = async () => {
  let url = '/api/competencies'
  if (selectedCategory.value) {
    url += `?category=${selectedCategory.value}`
  }
  const res = await $fetch(url)
  competencies.value = res
}

onMounted(async () => {
  await fetchCategories()
  await fetchCompetencies()
})

definePageMeta({
  layout: 'main'
})
</script>
