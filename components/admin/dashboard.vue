<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Dashboard Admin</h1>

    <!-- Stat cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <AdminStatCard title="Total Users" :value="totalUsers" icon="👥" />
      <AdminStatCard title="Total Courses" :value="totalCourses" icon="📚" />
      <AdminStatCard title="Total Instructors" :value="totalInstructors" icon="🧑‍🏫" />
    </div>

    <!-- Courses table -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Kursus Terbaru</h2>
      <AdminCourseTable />
    </div>

    <!-- Users table -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Pengguna Terbaru</h2>
      <AdminUserTable />
    </div>
  </div>
</template>

<script setup>
const totalUsers = 243
const totalCourses = 38
const totalInstructors = 12
</script>
