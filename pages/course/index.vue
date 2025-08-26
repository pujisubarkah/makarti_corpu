<template>
  <div class="bg-base-100 py-8 pt-24">
    <div class="container mx-auto px-4">
      <div class="flex flex-col gap-8">
        <!-- Search Bar -->
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div class="w-full md:w-1/3">
            <!-- Placeholder for instructor search result -->
          </div>
          <div class="w-full md:w-2/3 flex justify-end">
            <form autocomplete="off" action="https://cloudcampus.hbmsu.ac.ae/search/index.php" method="get" class="flex gap-2">
              <input type="hidden" name="areaids" value="core_course-course" />
              <input type="text" class="input input-bordered" placeholder="Cari kursus..." name="q" />
              <button class="btn btn-primary" type="submit">
                <span class="flaticon-magnifying-glass"></span>
              </button>
            </form>
          </div>
        </div>
        <!-- Courses Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <CourseCard
            v-for="course in courses"
            :key="course.id"
            :course="course"
          />
        </div>
        <div v-if="courses.length === 0" class="flex flex-col items-center justify-center py-16 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold mb-2">Belum ada kursus yang tersedia</h3>
          <p class="text-base">Silakan gunakan fitur pencarian di atas atau kembali lagi nanti untuk melihat kursus baru.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CourseCard from '~/components/CourseCard.vue'

const courses = ref([])

onMounted(async () => {
  try {
    const res = await $fetch('/api/course/published')
    courses.value = Array.isArray(res) ? res : []
  } catch (err) {
    courses.value = []
    // Optional: tampilkan pesan error
    // console.error('Gagal mengambil data kursus:', err)
  }
})
</script>

<style scoped>
.top_courses .thumb {
  position: relative;
}
.overlay {
  transition: background 0.2s;
}
.top_courses:hover .overlay {
  background: rgba(0,0,0,0.25);
}
</style>
