<!-- pages/instructor/competencies/[id].vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRoute } from 'vue-router'

const auth = useAuthStore()
const route = useRoute()

const kompetensi = ref({})
const courses = ref([])
const showAddModal = ref(false)

async function fetchData() {
  const kompetensiId = route.params.id
  // fetch data kompetensi
  kompetensi.value = await $fetch(`/api/competencies/${kompetensiId}`)
  // fetch courses instruktur berdasarkan kompetensi
  const res = await $fetch(`/api/instructor/${auth.user.id}/courses?kompetensi_id=${kompetensiId}`)
  courses.value = Array.isArray(res) ? res : []
}

function openAddCourseModal() {
  showAddModal.value = true
}

onMounted(fetchData)
</script>

<template>
  <div class="min-h-screen p-6 bg-base-100">
    <h1 class="text-3xl font-bold mb-2">{{ kompetensi.name }}</h1>
    <p class="text-gray-700 mb-6">{{ kompetensi.description }}</p>

    <div class="mb-4 flex justify-between items-center">
      <h2 class="text-2xl font-semibold">📚 Course Terkait</h2>
      <button @click="openAddCourseModal" class="btn btn-sm btn-primary">+ Tambah Course</button>
    </div>

    <div v-if="courses.length === 0" class="text-gray-500 py-10 text-center">
      Belum ada course untuk kompetensi ini.
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="course in courses" :key="course.id" class="card bg-white shadow-lg rounded-xl">
        <img :src="course.thumbnail_url" class="h-40 w-full object-cover rounded-t-xl" />
        <div class="card-body">
          <h3 class="text-lg font-bold">{{ course.title }}</h3>
          <p class="text-gray-600">{{ course.description }}</p>
          <NuxtLink :to="`/instructor/courses/${course.id}/manage`" class="btn btn-sm btn-primary mt-2">Kelola</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Modal Tambah Course bisa pakai komponen yang sama dengan index.vue -->
    <AddCourseModal
      v-if="showAddModal"
      :kompetensi-id="kompetensi.id"
      @close="showAddModal = false"
      @saved="fetchData"
    />
  </div>
</template>

<script>
definePageMeta({
  layout: 'main'
})
</script>
