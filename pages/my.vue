<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 font-poppins pt-16">
    <!-- Header dengan animasi -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div class="max-w-6xl mx-auto px-6">
        <nav class="breadcrumb mb-6" aria-label="breadcrumb">
          <ol class="flex space-x-2 text-sm opacity-90">
            <li><NuxtLink to="/" class="hover:underline">Beranda</NuxtLink></li>
            <li><span class="mx-2">/</span></li>
            <li class="font-semibold">Kursus Saya</li>
          </ol>
        </nav>
        <div class="flex items-center space-x-4">
          <div class="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <div>
            <h1 class="text-4xl font-bold mb-2">Kursus yang Anda Ikuti</h1>
            <p class="text-xl opacity-90">Lihat progres dan lanjutkan materi yang sedang dipelajari.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-6 -mt-8 pb-12">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Konten Utama -->
        <div class="flex-1">
          <!-- Loading State -->
          <div v-if="isLoading" class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div class="text-center py-16">
              <div class="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p class="text-gray-500">Memuat data kursus...</p>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
            <div class="text-center py-16">
              <div class="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-4 text-red-800">Terjadi Kesalahan</h3>
              <p class="text-red-600 mb-8">{{ error }}</p>
              <button @click="fetchEnrollments" class="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow hover:bg-red-700 transition">
                Coba Lagi
              </button>
            </div>
          </div>

          <!-- Main Content -->
          <div v-else>
            <!-- Kartu Statistik -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div class="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
                <div class="flex items-center">
                  <div class="bg-blue-100 p-3 rounded-xl">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm text-gray-600">Total Kursus</p>
                    <p class="text-2xl font-bold text-gray-800">{{ enrollments.length }}</p>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                <div class="flex items-center">
                  <div class="bg-green-100 p-3 rounded-xl">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm text-gray-600">Selesai</p>
                    <p class="text-2xl font-bold text-gray-800">0</p>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                <div class="flex items-center">
                  <div class="bg-orange-100 p-3 rounded-xl">
                    <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm text-gray-600">Sedang Berjalan</p>
                    <p class="text-2xl font-bold text-gray-800">{{ enrollments.length }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Kartu Kursus -->
            <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <!-- Belum Login -->
              <div v-if="!auth.isLoggedIn" class="text-center py-16">
                <div class="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <h2 class="text-3xl font-bold mb-4 text-gray-800">Selamat Datang Kembali!</h2>
                <p class="text-gray-600 mb-8 text-lg">Silakan masuk untuk mengakses materi pembelajaran dan melanjutkan perjalanan Anda.</p>
                <NuxtLink to="/login" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                  </svg>
                  Masuk untuk Melanjutkan
                </NuxtLink>
              </div>

              <!-- Belum Ada Kursus -->
              <div v-else-if="enrollments.length === 0" class="text-center py-16">
                <div class="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold mb-4 text-gray-800">Belum Ada Kursus</h3>
                <p class="text-gray-600 mb-8">Ayo mulai langkah pertama Anda dengan bergabung di kursus pilihan!</p>
                <NuxtLink to="/course" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition">
                  Jelajahi Kursus
                </NuxtLink>
              </div>

              <!-- Daftar Kursus -->
              <div v-else>
                <div class="flex items-center justify-between mb-8">
                  <h2 class="text-2xl font-bold text-gray-800">Kursus Anda</h2>
                  <div class="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{{ enrollments.length }} kursus terdaftar</span>
                  </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div v-for="enroll in enrollments" :key="enroll.enrollmentId" 
                       class="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <!-- Gambar Kursus -->
                    <div class="relative overflow-hidden h-48">
                      <img :src="enroll.course_thumbnail" 
                           :alt="enroll.course_title"
                           class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div class="absolute top-4 right-4">
                        <span class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          Terdaftar
                        </span>
                      </div>
                    </div>

                    <!-- Konten Kursus -->
                    <div class="p-6">
                      <div class="mb-4">
                        <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{{ enroll.course_title }}</h3>
                        <p class="text-gray-600 text-sm line-clamp-3">{{ enroll.course_description }}</p>
                      </div>

                      <!-- Progress Bar -->
                      <div class="mb-4">
                        <div class="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Kemajuan</span>
                          <span>0%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style="width: 0%"></div>
                        </div>
                      </div>

                      <!-- Tombol Aksi -->
                      <div class="flex space-x-3">
                        <NuxtLink :to="`/course/${enroll.course_id}/materi`"
                                  class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                          Lanjutkan Belajar
                        </NuxtLink>
                        <button class="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                          </svg>
                        </button>
                        <span v-if="enroll.progress_percent === 100" class="ml-2 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold shadow">Kursus Selesai</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar yang Ditingkatkan -->
        <div class="w-full lg:w-80 space-y-6">
          <!-- Widget Timeline -->
          <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div class="flex items-center mb-6">
              <div class="bg-blue-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-800 ml-3">Timeline</h3>
            </div>
            
            <div class="text-center py-8">
              <div class="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p class="text-gray-500 text-sm">Tidak ada aktivitas yang memerlukan tindakan</p>
            </div>
          </div>

          <!-- Acara Mendatang -->
          <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div class="flex items-center mb-6">
              <div class="bg-purple-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 012 2z"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-800 ml-3">Acara Mendatang</h3>
            </div>

            <div class="space-y-4">
              <div class="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div class="bg-blue-100 p-2 rounded-lg">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-800 text-sm">Kehadiran</h4>
                  <p class="text-xs text-gray-600">Senin, 4 Agustus, 10:00 - 13:00</p>
                </div>
              </div>

              <div class="flex items-start space-x-3 p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                <div class="bg-yellow-100 p-2 rounded-lg">
                  <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-800 text-sm">Batas Proyek Akhir</h4>
                  <p class="text-xs text-gray-600">Jumat, 8 Agustus, 23:59</p>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-100">
              <a href="#" class="text-blue-600 hover:text-blue-700 text-sm font-medium">Lihat semua acara →</a>
            </div>
          </div>

          <!-- Webinar Saya -->
          <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div class="flex items-center mb-6">
              <div class="bg-purple-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10V3m-6 7V3m-4 8h16M5 21h14a2 2 0 002-2V11a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-800 ml-3">Webinar Saya</h3>
            </div>

            <div v-if="isLoadingWebinar" class="text-center py-8">
              <div class="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p class="text-gray-500 text-sm">Memuat webinar...</p>
            </div>
            <div v-else-if="webinars.length === 0" class="text-center py-8">
              <div class="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10V3m-6 7V3m-4 8h16M5 21h14a2 2 0 002-2V11a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </div>
              <p class="text-gray-500 text-sm">Belum ada webinar yang Anda ikuti</p>
            </div>
            <div v-else class="space-y-4">
              <div v-for="webinar in webinars" :key="webinar.id" class="flex items-start space-x-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
                <div class="bg-purple-100 p-2 rounded-lg">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10V3m-6 7V3m-4 8h16M5 21h14a2 2 0 002-2V11a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-800 text-sm">{{ webinar.title }}</h4>
                  <p class="text-xs text-gray-600">{{ webinar.date }} | {{ webinar.time }}</p>
                  <p class="text-xs text-gray-500">{{ webinar.description }}</p>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-100">
              <a href="/webinar" class="text-purple-600 hover:text-purple-700 text-sm font-medium">Lihat semua webinar →</a>
            </div>
          </div>

          <!-- Tips Belajar -->
          <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl p-6 border border-green-100">
            <div class="flex items-center mb-4">
              <div class="bg-green-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-800 ml-3">Tips Belajar</h3>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed">
              "Beristirahatlah secara teratur setiap 25 menit untuk meningkatkan fokus dan daya ingat. Otak Anda akan berterima kasih!"
            </p>
          </div>
        </div>
      </div>

      <!-- Kembali ke Beranda -->
      <div class="text-center mt-12">
        <NuxtLink to="/" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Kembali ke Beranda
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

interface Enrollment {
  enrollmentId: string | number
  course_id: string | number
  course_thumbnail: string
  course_title: string
  course_slug: string
  course_description: string
  progress_percent: number
}

const enrollments = ref<Enrollment[]>([])
const isLoading = ref(false)
const error = ref('')

const webinars = ref([
  {
    id: 1,
    title: 'Webinar: Strategi Pengentasan Kemiskinan',
    date: 'Senin, 4 Agustus',
    time: '10:00 - 12:00',
    description: 'Webinar bersama pakar ekonomi membahas strategi terbaru.'
  },
  {
    id: 2,
    title: 'Webinar: Diskusi Kelompok',
    date: 'Rabu, 6 Agustus',
    time: '14:00 - 15:30',
    description: 'Diskusi interaktif bersama peserta lain.'
  }
])
const isLoadingWebinar = ref(false)

const fetchEnrollments = async () => {
  // Pastikan auth sinkron dengan localStorage
  // auth.loadFromStorage?.()


  if (!auth.isLoggedIn || !auth.user?.token) {
    enrollments.value = []
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    // Fetch data dari API dengan header Authorization
    const responseData: any = await $fetch('/api/enrollment', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.user.token}`
      }
    })
    enrollments.value = responseData.enrollments || []
  } catch (err: any) {
    error.value = err?.message || 'Gagal memuat data kursus.'
  } finally {
    isLoading.value = false
  }
}

const fetchWebinars = async () => {
  isLoadingWebinar.value = true
  try {
    // Ganti endpoint sesuai API webinar peserta
    const response: any = await $fetch('/api/webinar/my', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.user?.token}`
      }
    })
    webinars.value = response.webinars || []
  } catch (err: any) {
    webinars.value = []
  } finally {
    isLoadingWebinar.value = false
  }
}

onMounted(() => {
  fetchEnrollments()
  fetchWebinars()
})
</script>