<template>
  <div class="bg-white rounded-xl shadow-lg p-6 md:p-10 text-black mb-6 font-poppins">
    <!-- Image Carousel Section -->
    <div class="mb-6">
      <div class="relative overflow-hidden rounded-lg">
        <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div v-for="(image, index) in images" :key="index" class="w-full flex-shrink-0">
            <img :src="image.src" :alt="image.alt" class="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg border-4 border-white" />
          </div>
        </div>
        
        <!-- Navigation Dots -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <button 
            v-for="(image, index) in images" 
            :key="index"
            @click="currentSlide = index"
            :class="['w-3 h-3 rounded-full transition-colors', currentSlide === index ? 'bg-[#FFB400]' : 'bg-white/50']"
          ></button>
        </div>
        
        <!-- Previous/Next Buttons -->
        <button 
          @click="previousSlide"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button 
          @click="nextSlide"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Content Section -->
    <div class="grid md:grid-cols-2 gap-8 items-center">
      <!-- Left Content -->
      <div>
        <div class="flex items-center mb-4">
          <div class="bg-[#3399FF] p-2 rounded-lg mr-3">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-black">
            Makarti Learning Center
          </h2>
        </div>
        
        <div class="bg-[#3399FF]/10 p-4 rounded-lg mb-4">
          <p class="text-xl md:text-2xl font-bold text-black mb-2">
            "Satu Acuan, ASN Unggul"
          </p>
          <p class="text-sm text-black italic">
            Platform Makarti Learning Center untuk transformasi kompetensi ASN LAN
          </p>
        </div>
      </div>

      <!-- Right Content -->
      <div class="space-y-4">
        <div class="flex items-start space-x-3">
          <div class="bg-[#3399FF] p-2 rounded-full flex-shrink-0 mt-1">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-lg text-black">Kompetensi Terintegrasi</h3>
            <p class="text-sm text-black">Menyatukan kompetensi generik dan inti ASN untuk pembelajaran yang terarah dan sistematis.</p>
          </div>
        </div>

        <div class="flex items-start space-x-3">
          <div class="bg-[#3399FF] p-2 rounded-full flex-shrink-0 mt-1">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-lg text-black">Kapasitas Strategis</h3>
            <p class="text-sm text-black">Menguatkan kapasitas individu yang sejalan dengan visi dan strategi organisasi pemerintahan.</p>
          </div>
        </div>

        <div class="flex items-start space-x-3">
          <div class="bg-[#3399FF] p-2 rounded-full flex-shrink-0 mt-1">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-lg text-black">ASN Masa Depan</h3>
            <p class="text-sm text-black">Mendorong terciptanya ASN yang siap menghadapi tantangan, cerdas dalam berkarya, dan tangguh dalam melayani.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Banner Makarti Learning Center dengan image carousel
const currentSlide = ref(0)
const images = [
  { src: '/LAN_9694.JPG', alt: 'Makarti Learning Center - Gambar 1' },
  { src: '/LAN_9736.JPG', alt: 'Makarti Learning Center - Gambar 2' },
  { src: '/LAN_9802.JPG', alt: 'Makarti Learning Center - Gambar 3' }
]

let autoSlideInterval = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % images.length
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? images.length - 1 : currentSlide.value - 1
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 4000) // Ganti slide setiap 4 detik
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>
