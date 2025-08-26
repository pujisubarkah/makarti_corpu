<template>
  <aside
    :class="['relative min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white shadow-xl flex flex-col py-8 border-r-4 border-yellow-400 transition-all duration-300', isCollapsed ? 'w-20 px-2' : 'w-64 px-6']"
    @mouseenter="isCollapsed = false"
    @mouseleave="isCollapsed = true"
  >
    <!-- Logo & Title -->
    <div class="flex items-center gap-3 mb-8 justify-center">
      <div class="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
        <GraduationCap class="w-7 h-7" />
      </div>
      <div v-if="!isCollapsed">
        <h2 class="text-xl font-bold tracking-wide">Instruktur</h2>
        <p class="text-sm text-blue-200">Panel Kendali</p>
      </div>
    </div>
    <!-- Menu -->
    <nav class="flex-1">
      <ul class="space-y-2 font-medium">
        <li :class="isActive('/instructor')">
          <NuxtLink to="/instructor" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800 hover:text-yellow-300 transition group">
            <Home class="w-6 h-6 group-hover:text-yellow-300 transition" />
            <span v-if="!isCollapsed" class="font-semibold">Dashboard</span>
          </NuxtLink>
        </li>
        <li :class="isActive('/instructor/courses')">
          <NuxtLink to="/instructor/courses" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800 hover:text-yellow-300 transition group">
            <BookOpen class="w-6 h-6 group-hover:text-yellow-300 transition" />
            <span v-if="!isCollapsed" class="font-semibold">Kursus Saya</span>
          </NuxtLink>
        </li>
        <li :class="isActive('/instructor/progress')">
          <NuxtLink to="/instructor/progress" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800 hover:text-yellow-300 transition group">
            <BarChart2 class="w-6 h-6 group-hover:text-yellow-300 transition" />
            <span v-if="!isCollapsed" class="font-semibold">Progress Siswa</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <!-- Logout Button -->
    <div class="mt-10">
      <button class="flex items-center gap-3 px-4 py-3 rounded-lg w-full hover:bg-blue-800 hover:text-yellow-300 transition text-left">
        <LogOut class="w-6 h-6 text-red-400 group-hover:text-yellow-300 transition" />
        <span v-if="!isCollapsed" class="font-semibold">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { GraduationCap, Home, BookOpen, BarChart2, LogOut } from 'lucide-vue-next'

const route = useRoute()
const isCollapsed = ref(true)
const isActive = (path) => {
  return route.path === path ? 'bg-blue-800 text-yellow-300 rounded-lg font-semibold' : ''
}
</script>
