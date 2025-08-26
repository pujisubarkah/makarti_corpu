<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Email</th>
          <th>Role</th>
          <th>Terdaftar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td><span class="badge badge-outline">{{ user.role }}</span></td>
          <td>{{ user.joined }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const users = [
  { id: 1, name: 'Ani', email: 'ani@mail.com', role: 'Siswa', joined: '2025-07-25' },
  { id: 2, name: 'Raka', email: 'raka@mail.com', role: 'Instruktur', joined: '2025-07-28' },
]
</script>
