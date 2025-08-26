<template>
  <div class="min-h-screen bg-white flex pt-20 font-poppins">
    <sidebar_forum />
    <div class="flex-1 p-6 flex flex-col md:flex-row gap-8">
      <button @click="$router.push('/makarti_forum/webinar')" type="button" class="mb-6 px-4 py-2 rounded-lg bg-blue-100 text-blue-900 font-semibold hover:bg-blue-200 transition w-max flex items-center gap-2">
        <i class="fas fa-arrow-left"></i>
      </button>
      <!-- Konten Utama -->
      <div class="w-full md:w-2/3">
        <div class="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
          <h4 class="text-2xl font-bold text-blue-900 mb-4">ONBOARDING CASN FORMASI TAHUN 2024</h4>
          <hr class="my-4 border-blue-200" />
          <div class="space-y-4 text-blue-800">
            <div>🎉 <span class="font-semibold">ONBOARDING CASN FORMASI 2024</span> 🎉<br>
              Selamat Datang, Abdi Negara Muda!
            </div>
            <div>
              Bersiaplah memulai perjalanan luar biasa sebagai bagian dari roda pemerintahan Indonesia! Di Onboarding CASN Formasi 2024, kamu nggak cuma belajar aturan dan tugas — tapi juga merasakan semangat, budaya kerja, dan solidaritas ASN sejati! 💼🇮🇩
            </div>
            <div>
              ✨ Dalam acara ini, kamu akan:<br>
              🔹 Mengenal lebih dekat nilai-nilai ASN dan instansi tempatmu bertugas<br>
              🔹 Dapat insight langsung dari mentor dan ASN berpengalaman<br>
              🔹 Ikut aktivitas seru yang membangun teamwork & leadership<br>
              🔹 Tahu cara naik level karier & berkarya untuk negeri<br>
              🔹 Bangun jaringan dengan sesama CASN se-Indonesia!
            </div>
            <div>
              💡 Bukan sekadar pembekalan, ini adalah momen transformasi: dari calon, menjadi pelayan publik profesional yang siap berkontribusi nyata.
            </div>
          </div>
        </div>
      </div>
      <!-- Sidebar Info Event -->
      <div class="w-full md:w-1/3">
        <div class="bg-white rounded-xl shadow-lg border border-yellow-200 p-6">
          <h5 class="text-lg font-bold text-yellow-600 mb-4">Informasi Event</h5>
          <div class="space-y-3 text-blue-800">
            <div class="flex items-center gap-2">
              <i class="fas fa-clock text-blue-500"></i>
              <strong>10 Jun 2025 - 13 Jun 2025</strong>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-users text-blue-500"></i>
              <strong>2955 Peserta</strong>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-book text-blue-500"></i>
              <strong>24 Jam Pelajaran</strong>
            </div>
            <div>
              <span class="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold text-sm">Belum Registrasi</span>
            </div>
          </div>
          <hr class="my-4 border-yellow-200" />
          <button
            type="button"
            class="w-full py-2 rounded-lg bg-gray-200 text-gray-500 font-semibold flex items-center justify-center gap-2"
            disabled
          >
            <i class="fas fa-smile"></i>
            Ditutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import sidebar_forum from '~/components/sidebar_forum.vue'
// Data bisa diambil dari API/props sesuai kebutuhan
</script>