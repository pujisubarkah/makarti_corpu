<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>Judul</th>
          <th>Instruktur</th>
          <th>Status</th>
          <th>Dibuat</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses" :key="course.id">
          <td>{{ course.title }}</td>
          <td>{{ course.instructor }}</td>
          <td><span class="badge badge-success">Aktif</span></td>
          <td>{{ course.createdAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const courses = [
  { id: 1, title: 'Vue Mastery', instructor: 'Pak Budi', createdAt: '2025-07-31' },
  { id: 2, title: 'Nuxt 3 Crash Course', instructor: 'Bu Rina', createdAt: '2025-07-30' },
]
</script>
