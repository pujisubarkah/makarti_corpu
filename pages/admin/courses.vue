<!-- pages/admin/courses.vue -->
<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Kelola Kursus</h1>

    <!-- Search & Add Button -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
      <input
        v-model="search"
        type="text"
        placeholder="Cari kursus..."
        class="input input-bordered w-full md:max-w-xs"
      />
      <!-- Tombol tambah kursus dihapus untuk halaman admin -->
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded-xl shadow-lg bg-base-100">
      <table class="table w-full">
        <thead class="bg-blue-900 text-white">
          <tr>
            <th class="py-3">No</th>
            <th>Judul</th>
            <th>Nama Instruktur</th>
            <th>Status</th>
            <th class="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, index) in filteredCourses" :key="course.id" class="hover:bg-blue-50 transition">
            <td>{{ index + 1 }}</td>
            <td class="font-semibold text-blue-900">{{ course.title }}</td>
            <td>{{ course.instructor_name }}</td>
            <td>
              <span
                :class=" [
                  'badge px-3 py-2 text-xs font-semibold',
                  course.is_published
                    ? 'badge-success bg-green-100 text-green-700'
                    : 'badge-warning bg-yellow-100 text-yellow-700'
                ]"
              >
                {{ course.is_published ? 'Published' : 'Draft' }}
              </span>
            </td>
            <td class="text-center space-x-2">
              <button
                class="inline-flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-700 transition p-2"
                title="Setujui Kursus"
                @click="approveCourse(course.id)"
                :disabled="course.is_published"
              >
                ✔️ Setujui
              </button>
            </td>
          </tr>
          <tr v-if="filteredCourses.length === 0">
            <td colspan="5" class="text-center py-6 text-gray-400">Tidak ada kursus ditemukan.</td>
          </tr>
        </tbody>
      </table>
    </div>

   
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

import { ref, computed, onMounted } from 'vue'
import { Edit, Trash2 } from 'lucide-vue-next'

const search = ref('')
const modal = ref(null)
const isEditing = ref(false)
const editingId = ref(null)

const form = ref({
  title: '',
  instructor_name: '',
  is_published: false
})

const courses = ref([])

onMounted(async () => {
  try {
    const res = await $fetch('/api/course')
    courses.value = Array.isArray(res) ? res : []
  } catch (err) {
    courses.value = []
  }
})

const filteredCourses = computed(() =>
  courses.value.filter(c => c.title.toLowerCase().includes(search.value.toLowerCase()))
)

function openAddModal() {
  isEditing.value = false
  form.value = { title: '', instructor_name: '', is_published: false }
  modal.value.showModal()
}

function editCourse(course) {
  isEditing.value = true
  editingId.value = course.id
  form.value = { ...course }
  modal.value.showModal()
}

function saveCourse() {
  if (isEditing.value) {
    const index = courses.value.findIndex(c => c.id === editingId.value)
    if (index !== -1) {
      courses.value[index] = { ...form.value, id: editingId.value }
    }
  } else {
    // Simulasi id baru, seharusnya dari backend
    const newId = Math.random().toString(36).slice(2)
    courses.value.push({ ...form.value, id: newId })
  }
  modal.value.close()
}

function deleteCourse(id) {
  courses.value = courses.value.filter(c => c.id !== id)
}

function closeModal() {
  modal.value.close()
}

async function approveCourse(id) {
  try {
    await $fetch(`/api/course/${id}`, {
      method: 'PATCH',
      body: { is_published: true }
    })
    const idx = courses.value.findIndex(c => c.id === id)
    if (idx !== -1) {
      courses.value[idx].is_published = true

      // Kirim notifikasi ke instruktur
      await $fetch('/api/notifikasi', {
        method: 'POST',
        body: {
          user_id: courses.value[idx].instructor_id, // id instruktur
          pesan: 'Kursus anda telah disetujui admin, dan siap untuk publikasi',
          dibaca: false,
          created_by: 'ADMIN_ID' // ganti dengan id admin yang sedang login
        }
      })
    }
  } catch (err) {
    // Optional: tampilkan pesan error
    // alert('Gagal menyetujui kursus')
  }
}

function rejectCourse(id) {
  const idx = courses.value.findIndex(c => c.id === id)
  if (idx !== -1) {
    courses.value[idx].is_published = false
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
