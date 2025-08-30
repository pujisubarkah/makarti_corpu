<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-2">{{ kompetensi.name }}</h1>
    <p class="text-gray-600 mb-4">{{ kompetensi.description }}</p>

    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">📚 Course Terkait</h2>
      <button @click="openAddModal" class="btn btn-primary px-6 py-2 text-base font-semibold">+ Tambah Course</button>
    </div>

    <div v-if="course.length === 0" class="text-gray-500 py-10 text-center">
      Belum ada materi  untuk kompetensi ini.
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="c in course" :key="c.id" class="p-4 border rounded-lg shadow">
        <div v-if="c.thumbnail_url" class="mb-3">
          <img :src="c.thumbnail_url" alt="Thumbnail" class="rounded w-full max-h-40 object-cover" />
        </div>
        <h3 class="text-lg font-semibold">{{ c.title }}</h3>
        <p class="text-gray-600">{{ c.description }}</p>
        <div class="flex gap-2 mt-2">
          <NuxtLink :to="`/instructor/courses/${c.id}/manage`" class="btn btn-sm btn-outline">Kelola</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Modal tambah course -->
    <AddCourseModal
      v-if="showAddModal"
      :kompetensi-id="kompetensi.id"
      @close="showAddModal = false"
      @saved="fetchCourse"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AddCourseModal from '~/components/AddCourseModal.vue'

definePageMeta({
  layout: 'main'
})

const route = useRoute()
const kompetensi = ref({})
const course = ref([])
const showAddModal = ref(false)

async function fetchCourse() {
  const res = await $fetch(`/api/course?competensi_id=${route.params.id}`)
  course.value = Array.isArray(res) ? res : []
}

async function fetchKompetensi() {
  kompetensi.value = await $fetch(`/api/competencies/${route.params.id}`)
}

function openAddModal() {
  showAddModal.value = true
}

async function deleteCourse(id) {
  if (confirm('Yakin hapus course ini?')) {
    await $fetch(`/api/course/${id}`, { method: 'DELETE' })
    fetchCourse()
  }
}

onMounted(async () => {
  await fetchKompetensi()
  await fetchCourse()
})
</script>
