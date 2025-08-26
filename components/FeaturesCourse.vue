<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

interface Course {
  id: string
  title: string
  slug: string
  description: string
  thumbnail_url?: string
  instructor_name: string
  created_at: string
  is_published: boolean
}

const router = useRouter()
const courses = ref<Course[]>([])
const search = ref('')
const isLoading = ref(true)
const error = ref('')

const fetchCourses = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const res = await fetch('/api/course')
    if (!res.ok) throw new Error('Gagal memuat data kursus')
    const data = await res.json()
    // Filter hanya kursus yang published
    courses.value = data.filter((c: Course) => c.is_published)
  } catch (e: any) {
    error.value = e.message || 'Gagal memuat data kursus'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchCourses)

const filteredCourses = computed(() =>
  courses.value.filter(course =>
    course.title.toLowerCase().includes(search.value.toLowerCase())
  )
)

const goToCourse = (course: Course) => {
  // Pakai id atau slug sesuai routing kamu
  router.push(`/course/${course.id}`)
}
</script>

<template>
  <section class="features-course pb-20">
    <div class="container mx-auto px-4">
      <div class="flex justify-center">
        <div class="max-w-xl w-full">
          <div class="main-title text-center mb-8">
            <div class="relative flex items-center">
              <input
                type="text"
                placeholder="Cari Kompetensi Genteri dan Kompetensi Inti..."
                class="input input-bordered w-full py-4 pl-5 pr-14 text-lg rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                v-model="search"
              />
              <button
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FFD966] text-[#3399FF] rounded-full p-3 shadow-md hover:bg-[#FFD54F] transition"
                @click="search = ''"
                title="Reset Pencarian"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="text-center py-12">
        <div class="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-500">Loading kursus...</p>
      </div>
      <div v-else-if="error" class="text-center py-12 text-red-600">{{ error }}</div>
      <div v-else class="mt-8">
        <div class="w-full">
          <div class="flex gap-6 overflow-x-auto pb-4">
            <div v-for="course in filteredCourses" :key="course.id" class="min-w-[355px]">
              <div class="top_courses ccnWithFoot hbmsu-masonry-grid-custom bg-white rounded-xl shadow-lg p-4 transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl">
                <div class="thumb relative mb-2">
                  <img
                    class="img-whp rounded-lg w-full h-48 object-cover"
                    :src="course.thumbnail_url || 'https://placehold.co/400x200?text=No+Image'"
                    :alt="course.title"
                  >
                  <button
                    class="overlay absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-30 rounded-lg"
                    @click="goToCourse(course)"
                  >
                    <div class="tag bg-[#FFD966] text-[#3399FF] px-3 py-2 rounded font-semibold shadow">Lihat Materi</div>
                  </button>
                </div>
                <div class="details mt-2">
                  <div class="tc_content">
                    <h5 class="font-bold text-lg text-gray-800 mb-1">{{ course.title }}</h5>
                    <p class="text-sm text-gray-600 mb-2">{{ course.description }}</p>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    <span>Instruktur: {{ course.instructor_name }}</span>
                  </div>
                  <div class="text-xs text-gray-500">
                    <span>Dibuat: {{ new Date(course.created_at).toLocaleDateString('id-ID') }}</span>
                  </div>
                </div>
                <div class="tc_footer flex justify-end items-center mt-2">
                  <!-- Add more info if needed -->
                </div>
              </div>
            </div>
            <div v-if="filteredCourses.length === 0" class="text-center text-gray-500 w-full py-12">
              Tidak ada kursus ditemukan.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
