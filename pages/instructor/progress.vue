<!-- filepath: c:\Users\user\Documents\cloud-campus\pages\instructor\progress.vue -->
<template>
  <main class="flex-1 p-8">
    <h1 class="text-2xl font-bold mb-6">Progress Siswa</h1>
    <div class="bg-white rounded-xl shadow p-6">
      <table class="w-full text-left">
        <thead>
          <tr>
            <th class="pb-2">Nama Siswa</th>
            <th class="pb-2">Kursus</th>
            <th class="pb-2">Section</th>
            <th class="pb-2">Progress</th>
            <th class="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in progressData" :key="item.id">
            <td>{{ item.student }}</td>
            <td>{{ item.course }}</td>
            <td>{{ item.section }}</td>
            <td>
              <div class="w-32 bg-gray-200 rounded-full h-4">
                <div
                  class="bg-blue-600 h-4 rounded-full"
                  :style="{ width: item.progress_percent + '%' }"
                ></div>
              </div>
              <span class="text-xs ml-2">{{ item.progress_percent }}%</span>
            </td>
            <td>
              <span
                :class="item.is_completed ? 'text-green-600 font-semibold' : 'text-yellow-500 font-semibold'"
              >
                {{ item.is_completed ? 'Selesai' : 'Belum Selesai' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'instructor'
})

const progressData = [
  {
    id: 1,
    student: 'Budi Santoso',
    course: 'Dasar-Dasar Statistik',
    section: 'Pendahuluan',
    progress_percent: 100,
    is_completed: true,
  },
  {
    id: 2,
    student: 'Siti Aminah',
    course: 'Remote Sensing & GIS',
    section: 'Pengantar GIS',
    progress_percent: 75,
    is_completed: false,
  },
  {
    id: 3,
    student: 'Andi Wijaya',
    course: 'Dasar-Dasar Statistik',
    section: 'Analisis Data',
    progress_percent: 50,
    is_completed: false,
  },
  ]
  </script>