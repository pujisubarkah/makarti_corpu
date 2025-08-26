<template>
  <section class="section no-padding-top section-padding-mobile py-8 font-poppins bg-gray-50">
    <div class="container mx-auto">
      <section id="basic" class="section mt-20 no-padding">
        <div class="relative" style="padding-bottom:30%;height:0;">
          <div class="absolute inset-0 w-full h-full flex items-center justify-center">
            <!-- Carousel/Swiper -->
            <div class="w-full max-w-4xl mx-auto">
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center z-10">
                  <button @click="prev" :disabled="activeIndex === 0" class="slick-arrow slick-prev bg-[#3399FF] text-white px-4 py-2 rounded-full shadow disabled:opacity-50">&#8592;</button>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center z-10">
                  <button @click="next" :disabled="activeIndex === courses.length - 1" class="slick-arrow slick-next bg-[#3399FF] text-white px-4 py-2 rounded-full shadow disabled:opacity-50">&#8594;</button>
                </div>
                <div class="overflow-hidden">
                  <div class="flex transition-all duration-500" :style="`transform: translateX(-${activeIndex * 100}%); width: ${courses.length * 100}%`">
                    <div v-for="(course, idx) in courses" :key="course.title" class="w-full flex-shrink-0 px-2">
                      <a :href="course.link" class="block w-full">
                        <figure class="image is-3by1 margin-20 rounded-xl overflow-hidden shadow-lg">
                          <img :src="course.img" :alt="course.title" class="w-full h-64 object-cover" />
                        </figure>
                        <div class="mt-4 text-center">
                          <h3 class="text-xl font-bold text-[#3399FF]">{{ course.title }}</h3>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="content-wrapper no-padding-top is-hidden-mobile mt-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div class="flex items-center justify-center">
            <div class="floating-circle mr-4">
              <img src="https://klc2.kemenkeu.go.id/shared/assets/images/course.svg" alt="course" width="120" class="mx-auto" />
            </div>
            <div class="has-text-left m-auto">
              <p class="clean-text text-lg font-bold">Akademi Pengentasan Kemiskinan</p>
              <p class="clean-text text-base font-semibold">Temukan pelatihan dan pengetahuan untuk masa depan yang lebih baik!</p>
            </div>
          </div>
          <div class="flex items-center justify-center">
            <div class="floating-circle mr-4">
              <img src="https://klc2.kemenkeu.go.id/shared/assets/images/knowledge.svg" alt="knowledge" width="120" class="mx-auto" />
            </div>
            <div class="has-text-left m-auto">
              <p class="clean-text text-lg font-bold">Pusat Pengetahuan Pengentasan Kemiskinan</p>
              <p class="clean-text text-base font-semibold">Jelajahi seluruh pengetahuan dan inovasi!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
const courses = [
  {
    title: 'Semi-close loop ecosystem dalam Pengentasan kemiskinan',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    title: 'Rencana Induk Pengentasan kemiskinan',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    title: 'Industrialisasi untuk Memerdekakan Rakyat Miskin',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    title: 'Penyusunan Proposal',
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    title: 'Studi Kasus Inovasi Pengentasan Kemiskinan',
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    title: 'Penyusunan proposal Pengentasan Kemiskinan',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    link: '#'
  }
];
const activeIndex = ref(0);
function prev() {
  if (activeIndex.value > 0) activeIndex.value--;
}
function next() {
  if (activeIndex.value < courses.length - 1) activeIndex.value++;
}
</script>
