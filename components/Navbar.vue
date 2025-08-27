<template>
  <nav class="fixed top-0 left-0 right-0 w-full flex justify-between items-center px-4 sm:px-10 py-3 bg-[#C2E7F6] shadow-lg backdrop-blur-md font-poppins z-[9999999] border-b-4 border-yellow-600">
    <!-- Logo & Brand -->
    <div class="flex items-center gap-4">
      <a href="/">
        <img src="/lanri_.png" alt="Logo Lanri" class="h-12 w-auto bg-white p-1 rounded-lg shadow-lg" />
      </a>
     
      <div class="hidden md:block">
        <h1 class="text-black font-bold text-xl md:text-2xl tracking-wide drop-shadow-lg" style="text-shadow:0 0 8px #C2E7F6, 0 2px 4px rgba(0,0,0,0.3);">
          Makarti Learning Center
        </h1>
  <p class="text-yellow-600 text-sm font-medium opacity-90">Learning Management System</p>
      </div>
    </div>

    <!-- Hamburger Menu Button (Mobile) -->
    <button 
      @click="isMenuOpen = !isMenuOpen"
  class="lg:hidden text-black p-2 hover:bg-yellow-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600/50"
    >
      <svg 
        class="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          v-if="!isMenuOpen"
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M4 6h16M4 12h16M4 18h16"
        />
        <path 
          v-else
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <!-- Mobile Menu -->
    <div 
      v-if="isMenuOpen" 
  class="lg:hidden fixed inset-0 top-[73px] bg-[#C2E7F6] backdrop-blur-sm z-50"
    >
      <div class="p-4 space-y-4">
        <ul class="space-y-3">
          <li>
            <a 
              href="/" 
              class="block px-4 py-3 rounded-xl font-medium text-base text-black hover:bg-yellow-300 hover:text-yellow-900 transition-all duration-300"
              @click="isMenuOpen = false"
            >
              Beranda
            </a>
          </li>
          <li>
            <a 
              href="/course/" 
              class="block px-4 py-3 rounded-xl font-medium text-base text-black hover:bg-yellow-300 hover:text-yellow-900 transition-all duration-300"
              @click="isMenuOpen = false"
            >
              Materi
            </a>
          </li>
          <li>
            <a 
              href="/my/" 
              class="block px-4 py-3 rounded-xl font-medium text-base text-black hover:bg-yellow-300 hover:text-yellow-900 transition-all duration-300"
              @click="isMenuOpen = false"
            >
              Kursus Saya
            </a>
          </li>
          <li>
            <a href="/Makarti_forum" 
              class="block px-4 py-3 rounded-xl font-medium text-base text-black hover:bg-yellow-300 hover:text-yellow-900 transition-all duration-300"
               @click="isMenuOpen = false">
              Makarti Forum
            </a>
          </li>
        </ul>

        <!-- Mobile Login/User Button -->
  <div class="pt-4 border-t border-yellow-600/50">
          <template v-if="auth.isLoggedIn">
            <div class="space-y-4">
              <span class="block text-black font-medium px-4">
                <i class="fas fa-user-circle mr-2 text-yellow-600"></i>
                {{ auth.user?.name }}
              </span>
              <button 
                @click="auth.logout(); $router.push('/'); isMenuOpen = false" 
                class="w-full bg-yellow-600 text-black border border-yellow-600/20 py-3 px-4 rounded-xl font-medium hover:bg-yellow-500 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </template>
          <template v-else>
            <a 
              href="/login" 
              class="block text-center bg-yellow-600 text-black border border-yellow-600/20 py-3 px-4 rounded-xl font-medium hover:bg-yellow-500 transition-all duration-300"
              @click="isMenuOpen = false"
            >
              Masuk
            </a>
          </template>
        </div>
      </div>
    </div>

    <!-- Desktop Menu -->
    <div class="hidden lg:flex items-center gap-2 xl:gap-6">
      <ul class="flex gap-2 xl:gap-6 list-none font-poppins">
        <li>
          <a href="/" class="px-4 py-2 rounded-lg font-bold text-lg transition-all duration-200 text-black hover:bg-yellow-600 hover:text-yellow-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-600/50">Beranda</a>
        </li>
        <li>
          <a href="/Makarti_forum" class="px-4 py-2 rounded-lg font-bold text-lg transition-all duration-200 text-black hover:bg-yellow-600 hover:text-yellow-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-600/50">Makarti Forum</a>
        </li>
        <li>
          <a href="/course/" class="px-4 py-2 rounded-lg font-bold text-lg transition-all duration-200 text-black hover:bg-yellow-600 hover:text-yellow-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-600/50">Materi</a>
        </li>
        <li>
          <a href="/my/" class="px-4 py-2 rounded-lg font-bold text-lg transition-all duration-200 text-black hover:bg-yellow-600 hover:text-yellow-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-600/50">Kursus Saya</a>
        </li>
      </ul>
      <div class="ml-4">
        <template v-if="auth.isLoggedIn">
          <button @click="isUserDropdownOpen = !isUserDropdownOpen" class="flex items-center gap-2 px-4 py-2 rounded-lg text-black font-semibold text-base hover:bg-yellow-600 transition-all duration-200">
            <i class="fas fa-user-circle text-2xl text-yellow-600"></i>
            <span>{{ auth.user?.name }}</span>
            <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isUserDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <!-- User Dropdown Menu -->
          <div v-show="isUserDropdownOpen" class="absolute right-0 mt-2 w-48 py-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
            <a href="/profile" @click="isUserDropdownOpen = false" class="group flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50/80 transition-all duration-200">
              <span class="flex items-center gap-3">
                <i class="fas fa-user w-5 text-blue-600 group-hover:scale-110 transition-transform"></i>
                <span class="font-medium">Profile</span>
              </span>
            </a>
            <a href="/settings" @click="isUserDropdownOpen = false" class="group flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50/80 transition-all duration-200">
              <span class="flex items-center gap-3">
                <i class="fas fa-cog w-5 text-blue-600 group-hover:scale-110 transition-transform"></i>
                <span class="font-medium">Settings</span>
              </span>
            </a>
            <div class="border-t border-gray-100 my-1"></div>
            <button @click="auth.logout(); $router.push('/'); isUserDropdownOpen = false" class="group flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50/80 transition-all duration-200">
              <span class="flex items-center gap-3">
                <i class="fas fa-sign-out-alt w-5 group-hover:scale-110 transition-transform"></i>
                <span class="font-medium">Logout</span>
              </span>
            </button>
          </div>
        </template>
        <template v-else>
          <a href="/login" class="border border-yellow-400 bg-yellow-400 text-blue-900 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-300 hover:border-yellow-300 transition-all duration-200 flex items-center gap-2 shadow">
            <i class="fas fa-sign-in-alt"></i>
            <span class="hidden md:inline">Masuk </span>
          </a>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const $router = useRouter()
const isMenuOpen = ref(false)
const isUserDropdownOpen = ref(false)

// Close menus when route changes
watch(() => $router.currentRoute.value, () => {
  isMenuOpen.value = false
  isUserDropdownOpen.value = false
})

// Close menus when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.user-dropdown')) {
      isUserDropdownOpen.value = false
    }
    if (!target.closest('nav')) {
      isMenuOpen.value = false
    }
  })
})
</script>

<style scoped>
/* Optional: Add transition for menu */
.fixed {
  transition: all 0.3s ease-in-out;
}

/* Add backdrop filter for better readability */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Add dropdown animation */
.user-dropdown > div {
  transform-origin: top right;
  animation: dropdown 0.2s ease-out;
}

@keyframes dropdown {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>