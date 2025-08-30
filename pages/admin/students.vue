<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Daftar Siswa</h1>

    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Kursus Diikuti</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.full_name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.course_count }}</td>
            <td>
              <span :class="student.is_active ? 'badge badge-success' : 'badge badge-warning'">
                {{ student.is_active ? 'aktif' : 'non-aktif' }}
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-info mr-2">Detail</button>
              <button class="btn btn-sm btn-error">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main'
})

import { ref, onMounted, computed } from 'vue'

const studentsRaw = ref([])
const isLoading = ref(true)
const error = ref(null)

const students = computed(() => studentsRaw.value)

const fetchStudents = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await fetch('/api/pembelajar')
    if (!response.ok) throw new Error('Failed to fetch students')
    const data = await response.json()
    studentsRaw.value = Array.isArray(data) ? data : (data.students || [])
  } catch (e) {
    error.value = 'Failed to load students. Please try again.'
    console.error('Error fetching students:', e)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchStudents()
})
</script>
