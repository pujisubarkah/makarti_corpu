<template>
  <div class="min-h-screen bg-white flex pt-20 font-poppins">
    <sidebar_forum />
    <div class="flex-1 p-6">
      <!-- Tombol Cari Berdasarkan Kode -->
      <button
        type="button"
        class="mb-4 flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition"
      >
        <i class="fas fa-search"></i>
        Cari Berdasarkan Kode
      </button>

      <!-- Bar Pencarian dan Filter -->
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex-1 flex items-center gap-2">
          <input
            type="search"
            placeholder="Cari Webinar"
            class="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            class="p-2 rounded-lg bg-yellow-400 text-blue-900 font-bold shadow hover:bg-yellow-500 transition"
          >
            <i class="fas fa-search"></i>
          </button>
        </div>
        <div class="w-full md:w-48">
          <select class="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="terdekat">Tanggal Terdekat</option>
            <option value="terbaru">Tanggal Terbaru</option>
          </select>
        </div>
      </div>

      <!-- Grid Webinar -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <NuxtLink
          v-for="webinar in webinars"
          :key="webinar.id"
          :to="`/makarti_forum/webinar/${webinar.slug}`"
          class="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 flex flex-col hover:shadow-xl transition cursor-pointer group"
        >
          <img :src="webinar.image" alt="Webinar" class="w-full h-32 object-cover group-hover:scale-105 transition" />
          <div class="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 class="font-semibold text-blue-800 mb-2 truncate group-hover:text-yellow-600">{{ webinar.title }}</h3>
              <div class="flex items-center text-sm text-blue-600 gap-2 mb-1">
                <i class="fas fa-calendar-alt"></i>
                {{ webinar.date }}
                <span class="mx-2">|</span>
                <i class="fas fa-clock"></i>
                {{ webinar.duration }}
              </div>
            </div>
            <div
              class="mt-4 w-full py-2 rounded-lg bg-gray-200 text-gray-500 font-semibold flex items-center justify-center gap-2"
            >
              <i class="fas fa-ban"></i>
              Ditutup
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import sidebar_forum from '~/components/sidebar_forum.vue'
const webinars = [
  {
    id: 1,
    slug: 'penguatan-mental-rohani-korpri-2025',
    image: 'https://siasn.bkd.jatimprov.go.id:9000/public/image-1yJ0ddhIKC.jpg',
    title: 'Penguatan Mental Rohani dan Peningkatan Etos Kerja bagi anggota KORPRI 2025',
    date: '23 Jun 2025',
    duration: '8 Jam Pelajaran',
  },
  {
    id: 2,
    slug: 'onboarding-casn-formasi-2024',
    image: 'https://siasn.bkd.jatimprov.go.id:9000/public/image-t1l2e29scN.jpg',
    title: 'ONBOARDING CASN FORMASI TAHUN 2024',
    date: '10 Jun 2025',
    duration: '24 Jam Pelajaran',
  },
  // ...tambahkan data webinar lain sesuai kebutuhan
]
</script>