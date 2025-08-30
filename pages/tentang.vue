<template>
  <div class="min-h-screen bg-gray-50 font-poppins pt-28 pb-20">
    <div class="container mx-auto px-4 max-w-3xl">
      <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-blue-600">
        <!-- Ilustrasi di atas -->
        <div class="flex justify-center mb-8">
            <img src="/LAN_9736.JPG" alt="LAN" class="h-32 md:h-40 object-cover rounded-xl shadow-lg border-4 border-blue-200" />
        </div>
        <!-- Quote motivasi -->
        <div class="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-4 mb-8">
          <p class="italic text-blue-700 text-lg">"Bersama, kita wujudkan ASN LAN yang Bigger, Smarter, Better: unggul, inovatif, dan berdaya saing."</p>
        </div>
        <p class="text-lg text-gray-700 mb-6">
          Untuk meningkatkan efektivitas pengembangan kompetensi aparatur sipil negara di lingkungan Lembaga Administrasi Negara, telah ditetapkan kebutuhan kompetensi generik dan kompetensi inti sebagai rujukan utama dalam perencanaan dan pelaksanaan program pengembangan kompetensi secara terintegrasi. Penetapan kompetensi ini bertujuan memastikan keselarasan antara pengembangan individu ASN dengan kebutuhan organisasi secara strategis dan berkelanjutan.
        </p>
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-blue-600 mb-2">Tujuan Makarti Learning Center</h2>
          <p class="text-gray-700 mb-4">Makarti Learning Center hadir untuk memfasilitasi pelatihan dan pengembangan ASN berbasis kompetensi generik yang telah ditetapkan oleh Lembaga Administrasi Negara. Melalui berbagai program pelatihan, workshop, dan pembelajaran daring, Makarti Learning Center berkomitmen mendukung ASN agar mampu mengembangkan potensi diri, meningkatkan profesionalisme, dan berkontribusi optimal bagi organisasi dan masyarakat.</p>
          <p class="text-gray-700 italic">Makarti Learning Center disusun oleh kita, dari kita, dan untuk kita. Semangat kolaborasi dan kepemilikan bersama ini diharapkan dapat memperkuat solidaritas, inovasi, dan rasa memiliki di lingkungan ASN LAN.</p>
        </div>
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-blue-600 mb-2">Kompetensi Generik ASN LAN</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="item in kompetensi" :key="item" class="flex items-center bg-gray-50 rounded-xl p-4 shadow">
              <span class="mr-3 text-blue-600"><i class="fas fa-check-circle"></i></span>
              <span class="font-semibold text-gray-700">{{ item }}</span>
            </div>
          </div>
        </div>
  <div class="mt-8">
          <h2 class="text-xl font-semibold text-blue-600 mb-2">Implementasi Corporate University</h2>
          <p class="text-gray-700">Penetapan kompetensi generik dan inti ini merupakan bagian dari implementasi Corporate University di lingkungan Lembaga Administrasi Negara, agar pengembangan ASN berjalan terarah, relevan, dan berkelanjutan sesuai tuntutan organisasi dan tantangan masa depan.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const kompetensi = [
  'Membangun Jejaring',
  'Customer Relationship Management',
  'Global Mindset',
  'Kepemimpinan',
  'Communication and Branding',
  'Artificial Intelligence',
  'Literasi Data',
  'Berpikir Kritis',
  'Berpikir Analitis dan Inovatif',
  'Design Thinking',
  'Mental Agility dan Resilience',
  'Mengelola Perubahan',
  'Manajemen Mutu',
  'Kemampuan Eksekusi dan Berorientasi Hasil'
];
</script>