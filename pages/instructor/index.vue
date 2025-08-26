<template>
  <div class="flex min-h-screen bg-base-100">
    <!-- Sidebar -->


    <!-- Main Content -->
    <main class="flex-1 p-6">
      <h1 class="text-3xl font-bold mb-2">Dashboard Instruktur</h1>
      <p class="text-lg mb-6 text-blue-700 font-semibold">
        Selamat Datang, {{ auth.user?.name }}.<br>
        Ini adalah dashboard Anda.<br>
        Silakan mengupload lebih banyak pembelajaran untuk Akademi Pengentasan Kemiskinan.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="card bg-primary text-primary-content">
          <div class="card-body">
            <h2 class="card-title">Total Kursus</h2>
            <p>5 kursus aktif</p>
          </div>
        </div>

        <div class="card bg-secondary text-secondary-content">
          <div class="card-body">
            <h2 class="card-title">Total Peserta</h2>
            <p>120 peserta</p>
          </div>
        </div>

        <div class="card bg-accent text-accent-content">
          <div class="card-body">
            <h2 class="card-title">Materi Tersedia</h2>
            <p>42 konten belajar</p>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-2xl font-semibold mb-2">Aktivitas Terbaru</h2>
        <ul class="list-disc ml-5">
          <li>Mengunggah video baru ke kursus "Dasar Statistik"</li>
          <li>Menambahkan paparan PDF untuk "Materi Ekonomi"</li>
          <li>Menjawab 3 pertanyaan dari peserta</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

definePageMeta({
  layout: 'instructor'
})
</script>
