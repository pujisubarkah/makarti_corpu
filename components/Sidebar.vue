<template>
  <aside class="min-h-screen w-64 bg-[#C2E7F6] flex flex-col justify-between font-poppins">
    <div>
      <div class="flex items-center gap-2 px-6 py-4 border-b border-yellow-600">
        <component :is="sidebar.icon" class="w-6 h-6 text-yellow-600" />
        <div>
          <h2 class="text-lg font-bold text-black">{{ sidebar.title }}</h2>
          <p class="text-sm text-yellow-600">{{ sidebar.subtitle }}</p>
        </div>
      </div>
      <nav class="mt-6">
        <ul>
          <li v-for="item in sidebar.menu" :key="item.path">
            <NuxtLink :to="item.path" class="flex items-center gap-3 px-6 py-3 text-black hover:bg-yellow-100 transition rounded-r-full">
              <component :is="item.icon" class="w-5 h-5 text-yellow-600" />
              <span class="font-medium">{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <div class="px-6 py-4 border-t border-yellow-600">
      <button class="flex items-center gap-2 text-black hover:text-yellow-600 font-medium">
        <component :is="sidebar.logout.icon" class="w-5 h-5 text-yellow-600" />
        {{ sidebar.logout.label }}
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useSidebarMenu } from '@/composables/useSidebarMenu'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{ role: 'admin' | 'instruktur' }>()
const sidebar = computed(() => useSidebarMenu(props.role))
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>
