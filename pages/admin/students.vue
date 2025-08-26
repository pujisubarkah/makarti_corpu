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
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.courses }}</td>
            <td>
              <span :class="student.status === 'active' ? 'badge badge-success' : 'badge badge-warning'">
                {{ student.status }}
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
  layout: 'admin'
})

const students = [
  {
    id: 1,
    name: 'Ahmad Setiawan',
    email: 'ahmad@example.com',
    courses: 3,
    status: 'active'
  },
  {
    id: 2,
    name: 'Dewi Lestari',
    email: 'dewi@example.com',
    courses: 2,
    status: 'inactive'
  },
  {
    id: 3,
    name: 'Budi Prasetyo',
    email: 'budi@example.com',
    courses: 1,
    status: 'active'
  }
]
</script>
