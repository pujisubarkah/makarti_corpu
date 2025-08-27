<script setup>
import { Instagram, Youtube, Linkedin } from 'lucide-vue-next';
</script>


<template>
  <footer class="bg-[#C2E7F6] text-black mt-12 w-full font-poppins rounded-t-2xl shadow-lg border-t-4 border-yellow-600">
    <div class="container mx-auto px-4 py-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Logo & Info -->
        <div>
          <div class="mb-6 flex flex-col items-start">
            <div class="flex items-center gap-2 mb-4">
              <img src="/lanri_.png" alt="Logo Lanri" class="h-12 w-auto bg-white p-1 rounded-lg shadow-lg" />
             
            </div>
            <p class="text-xs text-black">Hak Cipta </p>
            <p class="text-xs text-black">Lembaga Administrasi Negara Republik Indonesia</p>
            <p class="text-xs text-black">Jl. Veteran No. 10, Jakarta Pusat</p>
          </div>
        </div>
        <!-- Navigasi -->
        <div>
          <p class="text-lg font-bold mb-4 text-black">Makarti Learning Center</p>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-black hover:text-yellow-600 transition-colors">Beranda</NuxtLink></li>
            <li><NuxtLink to="/course" class="text-black hover:text-yellow-600 transition-colors">Kursus</NuxtLink></li>
            <li><NuxtLink to="/tentang" class="text-black hover:text-yellow-600 transition-colors">Tentang</NuxtLink></li>
            <li><NuxtLink to="/kontak" class="text-black hover:text-yellow-600 transition-colors">Kontak</NuxtLink></li>
          </ul>
        </div>
        <!-- Sosial Media -->
        <div>
          <p class="text-lg font-bold mb-4 text-black">Ikuti Kami</p>
          <div class="space-y-3">
            <a href="https://www.facebook.com/bppk.kemenkeu/" target="_blank" class="flex items-center gap-3 text-black hover:text-yellow-600 transition-colors">
              <span class="icon"><Instagram :size="24" /></span> <span class="ml-2">LAN RI</span>
            </a>
            <a href="https://twitter.com/bppkkemenkeu" target="_blank" class="flex items-center gap-3 text-black hover:text-yellow-600 transition-colors">
              <span class="icon"><Linkedin :size="24" /></span> <span class="ml-2">@LAN_RI</span>
            </a>
            <a href="https://www.youtube.com/channel/UCDBqV8WfMOK2pwHQZvONb7g" target="_blank" class="flex items-center gap-3 text-black hover:text-yellow-600 transition-colors">
              <span class="icon"><Youtube :size="24" /></span> <span class="ml-2">LAN RI</span>
            </a>
            <a href="https://www.instagram.com/bppkkemenkeu/" target="_blank" class="flex items-center gap-3 text-black hover:text-yellow-600 transition-colors">
              <span class="icon"><Instagram :size="24" /></span> <span class="ml-2">LAN RI</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  <div class="bg-yellow-600 text-black text-center text-xs py-4 w-full font-bold rounded-b-2xl shadow-md">
      © {{ new Date().getFullYear() }} Makarti Learning Center. All rights reserved.
    </div>
  </footer>
</template>
