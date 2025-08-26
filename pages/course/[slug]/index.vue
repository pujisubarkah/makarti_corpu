<template>
  <div class="bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-16 min-h-screen font-poppins">
    <div class="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
      <!-- Main Content -->
      <div class="w-full lg:w-2/3 xl:w-3/4">
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-24">
          <div class="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p class="text-gray-500">Loading course details...</p>
        </div>

        <!-- Course Content -->
        <div v-else-if="course" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div class="relative mb-6">
            <img
              v-if="course.thumbnail_url"
              :src="course.thumbnail_url"
              :alt="course.title"
              class="w-full h-72 object-cover rounded-xl shadow-lg"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
          </div>
          
          <!-- Course Title -->
          <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {{ course.title }}
          </h1>

          <!-- Instructor Info -->
          <div class="flex items-center gap-3 mb-4">
            <span class="bg-blue-100 p-2 rounded-full">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <div>
              <span class="text-sm text-gray-500">Instruktur</span>
              <p class="font-medium text-gray-700">{{ course.instructor_name }}</p>
            </div>
          </div>

          <!-- Course Description -->
          <p class="text-gray-700 text-lg leading-relaxed mb-4">{{ course.description }}</p>
          
          <!-- Course Info -->
          <div class="flex items-center gap-4 text-sm text-gray-500">
            <span>ID: {{ course.id }}</span>
            <span>•</span>
            <span>Dibuat: {{ new Date(course.created_at).toLocaleDateString() }}</span>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="!course" class="text-center py-24">
          <div class="text-red-500 mb-2">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <p class="text-gray-700">Failed to load course details</p>
          <button 
            @click="fetchCourseData" 
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>

        <!-- Materi Section with Enhanced Design -->
        <section v-if="course" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
            <span class="bg-blue-600 text-white p-2 rounded-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
              </svg>
            </span>
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Materi Pembelajaran
            </span>
          </h2>

          <!-- Sections List -->
          <div v-if="sections.length" class="space-y-3">
            <div v-for="section in sections" 
                 :key="section.id" 
                 class="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 group">
              <div class="flex items-center gap-4">
                <span class="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center font-bold">
                  {{ section.order }}
                </span>
                <h3 class="text-gray-700 group-hover:text-blue-600 font-medium transition-colors duration-300">
                  {{ section.title }}
                </h3>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-else class="animate-pulse space-y-3">
            <div v-for="i in 3" :key="i" class="h-16 bg-gray-200 rounded-xl"></div>
          </div>
        </section>
      </div>

      <!-- Enhanced Sidebar -->
      <aside class="w-full lg:w-1/3 xl:w-1/4">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 mb-8 sticky top-24">
          <div class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Info Kursus
          </div>
          <div v-if="courseInfo" class="space-y-4">
            <ul class="space-y-4">
              <li class="flex items-center gap-3">
                <span class="bg-blue-100 p-2 rounded-lg">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </span>
                <div>
                  <span class="text-sm text-gray-500">Level</span>
                  <p class="font-medium text-gray-700">{{ courseInfo.level }}</p>
                </div>
              </li>
              <li class="flex items-center gap-3">
                <span class="bg-purple-100 p-2 rounded-lg">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </span>
                <div>
                  <span class="text-sm text-gray-500">Durasi</span>
                  <p class="font-medium text-gray-700">{{ courseInfo.duration }} Menit</p>
                </div>
              </li>
              <li class="flex items-center gap-3">
                <span class="bg-green-100 p-2 rounded-lg">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </span>
                <div>
                  <span class="text-sm text-gray-500">Bahasa</span>
                  <p class="font-medium text-gray-700">{{ courseInfo.language }}</p>
                </div>
              </li>
              <li class="flex items-center gap-3">
                <span class="bg-yellow-100 p-2 rounded-lg">
                  <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </span>
                <div>
                  <span class="text-sm text-gray-500">Mode</span>
                  <p class="font-medium text-gray-700">{{ courseInfo.mode }}</p>
                </div>
              </li>
              <li v-if="courseInfo.certificate" class="flex items-center gap-3">
                <span class="bg-red-100 p-2 rounded-lg">
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </span>
                <div>
                  <span class="text-sm text-gray-500">Sertifikat</span>
                  <p class="font-medium text-gray-700">Tersedia</p>
                </div>
              </li>
              <li v-if="courseInfo.mobile_friendly" class="flex items-center gap-3">
                <span class="bg-indigo-100 p-2 rounded-lg">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </span>
                <div>
                  <span class="text-sm text-gray-500">Mobile Friendly</span>
                  <p class="font-medium text-gray-700">Ya</p>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="space-y-4 animate-pulse">
            <!-- Loading skeleton -->
            <div v-for="i in 5" :key="i" class="flex items-center gap-3">
              <span class="bg-gray-200 p-2 rounded-lg w-10 h-10"></span>
              <div class="space-y-2">
                <div class="h-4 bg-gray-200 rounded w-20"></div>
                <div class="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
          <button 
            @click="handleJoin"
            class="mt-8 w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Mulai Belajar Sekarang
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

// Extend the user type to include 'token'
const auth = useAuthStore() as {
  isLoggedIn: boolean;
  user?: {
    id: string;
    name: string;
    role_id: number;
    token?: string;
  };
}

interface Course {
  id: string
  title: string
  description: string
  thumbnail_url?: string
  instructor_id: string
  instructor_name: string
  created_at: string
  is_published: boolean
  slug: string
}

interface Section {
  id: string
  title: string
  order: number
  // Add other fields if needed
}

interface CourseInfo {
  level: string
  duration: number
  language: string
  mode: string
  certificate?: boolean
  mobile_friendly?: boolean
  // Add other fields if needed
}

const course = ref<Course | null>(null)
const sections = ref<Section[]>([])
const courseInfo = ref<CourseInfo | null>(null)
const route = useRoute()
const router = useRouter()

// Add loading state
const isLoading = ref(true)

// Fetch all course data
const fetchCourseData = async () => {
  isLoading.value = true
  try {
    // Get course ID from the route (using slug)
    const id = route.params.id || route.params.slug
    if (!id) throw new Error('Course ID not found')

    // Fetch course data
    const courseRes = await fetch(`/api/course/${id}`)
    if (!courseRes.ok) throw new Error('Failed to fetch course')
    
    const courseData = await courseRes.json()
    if (!courseData.course) throw new Error('Invalid course data')
    
    course.value = courseData.course

    // Only fetch sections and info if we have a valid course
    if (course.value?.id) {
      // Fetch sections and course info in parallel
      const [sectionsRes, infoRes] = await Promise.all([
        fetch(`/api/course_section/${course.value.id}`),
        fetch(`/api/course_info/${course.value.id}`)
      ])

      // Handle sections - API returns array directly
      if (sectionsRes.ok) {
        const sectionsData = await sectionsRes.json()
        // API returns array directly, no need to access .sections
        sections.value = sectionsData.sort((a: Section, b: Section) => a.order - b.order)
      }

      // Handle course info - API returns object with course_info property
      if (infoRes.ok) {
        const { course_info } = await infoRes.json()
        courseInfo.value = course_info
      }
    }
  } catch (error) {
    console.error('Error loading course:', error)
  } finally {
    isLoading.value = false
  }
}

// Update onMounted to use async/await
onMounted(async () => {
  await fetchCourseData()
})

const handleJoin = async () => {
  try {
    if (!auth.isLoggedIn) {
      localStorage.setItem('redirectAfterSignup', `/course/${route.params.slug}/materi`)
      router.push('/login')
      return
    }

    if (!course.value?.id) {
      throw new Error('Course ID not found')
    }

    // Create enrollment
    const response = await fetch('/api/enrollment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header
        'Authorization': `Bearer ${auth.user?.token}`
      },
      body: JSON.stringify({
        course_id: course.value.id
      }),
      // Ensure credentials are included
      credentials: 'include'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to enroll')
    }

    const data = await response.json()
    
    // Show success message
    alert('Successfully enrolled in the course!')
    
    // Redirect to course material
    router.push(`/course/${route.params.slug}/materi`)
  } catch (error) {
    console.error('Enrollment error:', error)
    alert(error instanceof Error ? error.message : 'Failed to enroll in course')
  }
}
</script>

<style>
/* Import Poppins from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}
</style>