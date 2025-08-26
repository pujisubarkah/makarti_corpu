<template>
  <div class="min-h-screen bg-white flex pt-20 font-poppins">
    <sidebar_forum />
    <div class="flex-1 p-8 overflow-y-auto">
      <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border-t-4 border-yellow-400">
        <h1 class="text-3xl font-bold text-blue-900 mb-2 text-center drop-shadow-lg">Makarti Forum</h1>
        <p class="text-lg text-blue-700 mb-6 text-center">Tempat diskusi, berbagi ide, dan kolaborasi antar peserta Makarti Corpu.</p>
        <div class="flex flex-col gap-6">
          <div class="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-lg p-6 shadow-md border-l-4 border-yellow-400">
            <h2 class="text-xl font-semibold text-yellow-300 mb-3 flex items-center gap-2">
              <i class="fas fa-comments text-yellow-300"></i>
              Forum Terbaru
            </h2>
            <div class="space-y-3">
              <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-300">
                <h3 class="font-semibold text-blue-900">Diskusi Pengembangan Kompetensi ASN</h3>
                <p class="text-sm text-blue-700 mt-1">5 balasan • 2 jam yang lalu</p>
              </div>
              <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-300">
                <h3 class="font-semibold text-blue-900">Tips & Trik Belajar Efektif di Makarti Corpu</h3>
                <p class="text-sm text-blue-700 mt-1">12 balasan • 4 jam yang lalu</p>
              </div>
              <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-300">
                <h3 class="font-semibold text-blue-900">Kolaborasi Proyek Pembelajaran</h3>
                <p class="text-sm text-blue-700 mt-1">8 balasan • 1 hari yang lalu</p>
              </div>
            </div>
          </div>
          <div class="bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 rounded-lg p-6 shadow-md border-l-4 border-yellow-400">
            <h2 class="text-xl font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <i class="fas fa-plus-circle text-yellow-400"></i>
              Buat Topik Baru
            </h2>
            <form class="flex flex-col gap-4">
              <input type="text" placeholder="Judul Topik" class="border border-yellow-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all" />
              <textarea placeholder="Deskripsi atau pertanyaan..." rows="4" class="border border-yellow-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"></textarea>
              <button type="submit" class="bg-gradient-to-r from-blue-700 to-blue-900 text-yellow-300 font-semibold px-6 py-3 rounded-lg hover:from-blue-800 hover:to-blue-900 transition-all shadow-md hover:shadow-lg flex items-center gap-2 justify-center">
                <i class="fas fa-paper-plane"></i>
                Kirim Topik
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import sidebar_forum from '~/components/sidebar_forum.vue'
// Halaman forum placeholder, integrasi backend/forum logic bisa ditambahkan nanti
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>
