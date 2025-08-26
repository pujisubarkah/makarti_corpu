<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
const categories = [
  {
    title: 'Semi-close loop ecosystem dalam Pengentasan kemiskinan',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    link: '#'
  },
  {
    title: 'Rencana Induk Pengentasan kemiskinan',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    link: '#'
  },
  {
    title: 'Industrialisasi untuk Memerdekakan Rakyat Miskin',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    link: '#'
  },
  {
    title: 'Penyusunan Proposal',
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    link: '#'
  },
  {
    title: 'Studi Kasus Inovasi Pengentasan Kemiskinan',
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    link: '#'
  },
  {
    title: 'Penyusunan proposal Pengentasan Kemiskinan',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
    link: '#'
  }
]
</script>

<template>
  <section class="container mx-auto py-8 font-poppins">
    <div class="mb-8">
      <div class="bg-[#3399FF] rounded-xl shadow-lg p-6 md:p-10 text-white mb-6">
        <h2 class="text-3xl md:text-4xl font-extrabold mb-2 text-[#FFD966]">Akademi Pengentasan Kemiskinan</h2>
        <p class="text-base md:text-lg mb-4">Kemiskinan masih menjadi tantangan besar di Indonesia, meskipun tren menunjukkan penurunan.</p>
        <ul class="list-disc pl-5 space-y-1 text-sm md:text-base">
          <li>Berdasarkan data Badan Pusat Statistik (BPS) per September 2024: <span class="font-bold">Jumlah penduduk miskin mencapai 24,06 juta orang</span> atau <span class="font-bold">8,57%</span> dari total populasi.</li>
          <li>Tingkat kemiskinan di <span class="font-bold">perdesaan lebih tinggi (11,34%)</span> dibandingkan <span class="font-bold">perkotaan (6,66%)</span></li>
          <li>Mayoritas rumah tangga miskin bekerja di sektor <span class="font-bold">pertanian informal</span> dan memiliki pendidikan rendah (<span class="font-bold">64,15%</span> hanya tamat SD atau tidak tamat SD)</li>
          <li>Garis kemiskinan nasional adalah <span class="font-bold">Rp 595.242/kapita/bulan</span>, dengan rata-rata rumah tangga miskin memiliki <span class="font-bold">4,71 anggota</span></li>
          <li>Meskipun angka ini merupakan yang <span class="font-bold">terendah sejak 1960</span>, tantangan struktural seperti <span class="font-bold">ketimpangan wilayah</span>, <span class="font-bold">akses pendidikan</span>, dan <span class="font-bold">minimnya keterlibatan sektor swasta</span> masih menghambat percepatan pengentasan kemiskinan.</li>
        </ul>
      </div>
    </div>
    <!-- Swiper Carousel -->
    <div class="w-full pb-4">
      <Swiper
        :slides-per-view="1"
        :space-between="24"
        navigation
        pagination
        class="h-[340px]"
      >
        <SwiperSlide v-for="cat in categories" :key="cat.title">
          <div class="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-[1.03] transition-all">
            <a :href="cat.link" target="_blank" rel="noopener" class="block">
              <div class="relative">
                <img :src="cat.img" :alt="cat.title" class="w-full h-48 object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-[#3399FF]/70 to-transparent"></div>
                <span class="absolute bottom-2 right-2 bg-[#FFD966] text-[#3399FF] text-xs font-bold px-3 py-1 rounded shadow">View Materi</span>
              </div>
            </a>
            <div class="p-4 flex-1 flex flex-col justify-between">
              <h5 class="text-lg font-bold text-[#3399FF] mb-2 leading-tight">{{ cat.title }}</h5>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
