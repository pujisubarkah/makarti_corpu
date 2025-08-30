<template>
  <div class="flex min-h-screen bg-base-100">
    <!-- Sidebar -->

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <h1 class="text-3xl font-bold mb-2">Dashboard Instruktur</h1>
      <p class="text-lg mb-6 text-blue-700 font-semibold">
        Selamat Datang, {{ displayName }}.<br>
        Ini adalah dashboard Anda.<br>
        Silakan mengupload lebih banyak pembelajaran untuk Akademi Pengentasan Kemiskinan.
      </p>
      
   
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="card bg-primary text-primary-content">
          <div class="card-body">
            <h2 class="card-title">Total Kursus</h2>
            <p>{{ stats.totalCourses }} kursus aktif</p>
          </div>
        </div>

        <div class="card bg-secondary text-secondary-content">
          <div class="card-body">
            <h2 class="card-title">Total Peserta</h2>
            <p>{{ stats.totalStudents }} peserta</p>
          </div>
        </div>

        <div class="card bg-accent text-accent-content">
          <div class="card-body">
            <h2 class="card-title">Materi Tersedia</h2>
            <p>{{ stats.totalContent }} konten belajar</p>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-2xl font-semibold mb-2">Aktivitas Terbaru</h2>
        <div class="bg-white rounded-lg shadow p-4">
          <ul class="space-y-2">
            <li v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>{{ activity.description }}</span>
              <span class="text-xs text-gray-500 ml-auto">{{ activity.time }}</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { ref, computed, onMounted } from 'vue'

const auth = useAuthStore()

// Computed untuk display name dengan fallback
const displayName = computed(() => {
  if (!auth.user) return 'Instruktur'
  
  // Coba beberapa kemungkinan field nama
  return auth.user.full_name || 
         auth.user.name || 
         auth.user.username || 
         auth.user.email?.split('@')[0] || 
         'Instruktur'
})

// Stats data
const stats = ref({
  totalCourses: 0,
  totalStudents: 0,
  totalContent: 0
})

// Recent activities
const recentActivities = ref([
  {
    id: 1,
    description: 'Mengunggah video baru ke kursus "Dasar Statistik"',
    time: '2 jam lalu'
  },
  {
    id: 2,
    description: 'Menambahkan paparan PDF untuk "Materi Ekonomi"',
    time: '5 jam lalu'
  },
  {
    id: 3,
    description: 'Menjawab 3 pertanyaan dari peserta',
    time: '1 hari lalu'
  }
])

// Fetch dashboard stats
const fetchDashboardStats = async () => {
  try {
    // Jika ada API untuk stats dashboard
    const response = await $fetch('/api/instructor/dashboard', {
      headers: {
        'Authorization': `Bearer ${auth.user?.token}`
      }
    })
    
    if (response.success) {
      stats.value = response.stats
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    // Fallback ke data dummy
    stats.value = {
      totalCourses: 5,
      totalStudents: 120,
      totalContent: 42
    }
  }
}

onMounted(() => {
  console.log('=== DASHBOARD MOUNTED ===')
  console.log('Auth user:', auth.user)
  console.log('Display name:', displayName.value)
  
  // Load user from storage jika belum ada
  if (!auth.user) {
    auth.loadFromStorage?.()
  }
  
  // Fetch stats
  fetchDashboardStats()
})

definePageMeta({
  layout: 'main'
})
</script>
