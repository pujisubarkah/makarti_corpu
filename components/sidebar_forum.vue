<template>
  <aside
    :class="[ 'relative min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white shadow-xl flex flex-col py-8 border-r-4 border-yellow-400 transition-all duration-300 font-poppins', isCollapsed ? 'w-20 px-2' : 'w-64 px-6' ]"
    @mouseenter="isCollapsed = false"
    @mouseleave="isCollapsed = true"
  >
    <!-- Logo & Title -->
    <div class="flex items-center gap-3 mb-8 justify-center">
      <i class="fas fa-comments text-yellow-300 text-3xl drop-shadow-lg"></i>
      <div v-if="!isCollapsed">
        <h2 class="text-xl font-bold tracking-wide">Makarti Forum</h2>
        <p class="text-sm text-blue-200">Diskusi & Informasi</p>
      </div>
    </div>
    <!-- Menu -->
    <nav class="flex-1">
      <ul class="space-y-1 font-medium">
        <li :class="isActive('/makarti_forum/knowledge-base')">
          <NuxtLink to="/makarti_forum/knowledge-base" class="flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-transparent transition group hover:bg-yellow-400 hover:border-yellow-400 hover:text-blue-900">
            <i class="fas fa-book w-6 h-6 group-hover:text-blue-900 transition"></i>
            <span v-if="!isCollapsed">Knowledge Base</span>
          </NuxtLink>
        </li>
        <li :class="isActive('/makarti_forum/webinar')">
          <NuxtLink to="/makarti_forum/webinar" class="flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-transparent transition group hover:bg-yellow-400 hover:border-yellow-400 hover:text-blue-900">
            <i class="fas fa-video w-6 h-6 group-hover:text-blue-900 transition"></i>
            <span v-if="!isCollapsed">Webinar</span>
          </NuxtLink>
        </li>
        <li :class="isActive('/makarti_forum/informasi')">
          <NuxtLink to="/makarti_forum/informasi" class="flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-transparent transition group hover:bg-yellow-400 hover:border-yellow-400 hover:text-blue-900">
            <i class="fas fa-info-circle w-6 h-6 group-hover:text-blue-900 transition"></i>
            <span v-if="!isCollapsed">Informasi</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isCollapsed = ref(true)
const isActive = (path: string) => {
  return route.path === path ? 'bg-blue-800 text-yellow-300 rounded-lg font-semibold' : ''
}
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.sidebar-link {
  background: transparent;
  color: #fff;
  border: 2px solid transparent;
}
.sidebar-link:hover, .sidebar-link:focus {
  background: #FFB400;
  color: #1e3a8a;
  border-color: #FFB400;
  box-shadow: 0 2px 8px rgba(255, 180, 0, 0.15);
}
.sidebar-link i {
  color: #FFB400;
}
</style>
