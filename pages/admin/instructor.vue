<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Daftar Instruktur</h1>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-12">
      <div class="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p class="text-gray-500">Loading instructors...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <div class="text-red-500 mb-4">
        <i class="fas fa-exclamation-circle text-4xl"></i>
      </div>
      <p class="text-gray-700 mb-4">{{ error }}</p>
      <button @click="fetchInstructors" class="btn btn-primary">
        Try Again
      </button>
    </div>

    <!-- Data Table -->
    <div v-else class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Jumlah Kursus</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="instructor in instructors" :key="instructor.id">
            <td>{{ instructor.full_name }}</td>
            <td>{{ instructor.email }}</td>
            <td>{{ instructor.course_count }}</td>
            <td>
              <span :class="instructor.is_active ? 'badge badge-success' : 'badge badge-error'">
                {{ instructor.is_active ? 'aktif' : 'non-aktif' }}
              </span>
            </td>
            <td>
              <div class="flex gap-2">
                <button @click="showInstructorDetail(instructor)" class="btn btn-sm btn-info">Detail</button>
                <button class="btn btn-sm btn-warning">Edit</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Detail Modal -->
    <div v-if="selectedInstructor" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="p-6 border-b">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold">Detail Instruktur</h3>
            <button @click="selectedInstructor = null" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <!-- Instructor Info -->
          <div class="space-y-4 mb-6">
            <div class="flex items-center gap-4">
              <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="fas fa-user-tie text-3xl text-blue-600"></i>
              </div>
              <div>
                <h4 class="text-xl font-bold">{{ selectedInstructor.full_name }}</h4>
                <p class="text-gray-600">{{ selectedInstructor.email }}</p>
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-blue-50 rounded-lg">
                <div class="text-sm text-gray-600">Jumlah Kursus</div>
                <div class="text-2xl font-bold text-blue-600">{{ selectedInstructor.course_count }}</div>
              </div>
              <div class="p-4 bg-green-50 rounded-lg">
                <div class="text-sm text-gray-600">Status</div>
                <div class="text-2xl font-bold" :class="selectedInstructor.is_active ? 'text-green-600' : 'text-red-600'">
                  {{ selectedInstructor.is_active ? 'Aktif' : 'Non-aktif' }}
                </div>
              </div>
            </div>

            <!-- Additional Info -->
            <div class="space-y-2">
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Tanggal Bergabung</span>
                <span class="font-medium">{{ new Date(selectedInstructor.created_at).toLocaleDateString('id-ID', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) }}</span>
              </div>
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Role</span>
                <span class="font-medium capitalize">{{ selectedInstructor.role }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-6 border-t bg-gray-50">
          <button @click="selectedInstructor = null" class="btn btn-primary">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'main'
})

interface Instructor {
  id: string
  full_name: string
  email: string
  role: string
  created_at: string
  is_active: boolean
  course_count: number
}

const instructors = ref<Instructor[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const selectedInstructor = ref<Instructor | null>(null)

const fetchInstructors = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await fetch('/api/instructor')
    if (!response.ok) throw new Error('Failed to fetch instructors')
    const data = await response.json()
    // Jika response berupa { instructors: [...] }
    instructors.value = Array.isArray(data) ? data : (data.instructors || [])
  } catch (e) {
    error.value = 'Failed to load instructors. Please try again.'
    console.error('Error fetching instructors:', e)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchInstructors()
})

const showInstructorDetail = (instructor: Instructor) => {
  selectedInstructor.value = instructor
}
</script>
