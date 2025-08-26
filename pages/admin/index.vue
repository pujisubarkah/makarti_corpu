<template>
  <div class="p-6 space-y-6">
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl shadow-lg p-6 flex flex-col items-center text-white">
        <Icon name="heroicons-outline:user-group" class="w-10 h-10 mb-2" />
        <div class="text-2xl font-bold">1,204</div>
        <div class="text-sm opacity-80">Total Siswa</div>
      </div>
      <div class="bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl shadow-lg p-6 flex flex-col items-center text-white">
        <Icon name="heroicons-outline:academic-cap" class="w-10 h-10 mb-2" />
        <div class="text-2xl font-bold">87</div>
        <div class="text-sm opacity-80">Total Instruktur</div>
      </div>
      <div class="bg-gradient-to-br from-green-600 to-green-400 rounded-xl shadow-lg p-6 flex flex-col items-center text-white">
        <Icon name="heroicons-outline:book-open" class="w-10 h-10 mb-2" />
        <div class="text-2xl font-bold">312</div>
        <div class="text-sm opacity-80">Kursus</div>
      </div>
      <div class="bg-gradient-to-br from-yellow-500 to-yellow-300 rounded-xl shadow-lg p-6 flex flex-col items-center text-white">
        <Icon name="heroicons-outline:collection" class="w-10 h-10 mb-2" />
        <div class="text-2xl font-bold">1,129</div>
        <div class="text-sm opacity-80">Konten</div>
      </div>
    </div>

    <!-- Grafik ECharts -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Pie Chart -->
      <div class="bg-base-100 rounded-xl p-6 shadow">
        <h2 class="text-xl font-bold mb-4">Distribusi Kursus</h2>
        <div class="w-full h-80">
          <client-only>
            <v-chart :option="pieOption" autoresize />
          </client-only>
        </div>
      </div>
      <!-- Bar Chart -->
      <div class="bg-base-100 rounded-xl p-6 shadow">
        <h2 class="text-xl font-bold mb-4">Aktivitas Bulanan</h2>
        <div class="w-full h-80">
          <client-only>
            <v-chart :option="barOption" autoresize />
          </client-only>
        </div>
      </div>
      <!-- Radar Chart -->
      <div class="bg-base-100 rounded-xl p-6 shadow md:col-span-2">
        <h2 class="text-xl font-bold mb-4">Skill Siswa (Radar)</h2>
        <div class="w-full h-80">
          <client-only>
            <v-chart :option="radarOption" autoresize />
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

import { ref } from 'vue'
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, BarChart, RadarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  RadarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
])

const pieOption = ref({
  title: {
    text: 'Distribusi Kursus',
    left: 'center',
    textStyle: { fontWeight: 'bold', fontSize: 16 }
  },
  tooltip: { trigger: 'item' },
  legend: { bottom: 10 },
  series: [
    {
      name: 'Kursus',
      type: 'pie',
      radius: '60%',
      data: [
        { value: 120, name: 'Statistik' },
        { value: 90, name: 'GIS' },
        { value: 60, name: 'Ekonomi' },
        { value: 42, name: 'Teknologi' }
      ],
      emphasis: {
        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.3)' }
      }
    }
  ]
})

const barOption = ref({
  title: {
    text: 'Aktivitas Bulanan',
    left: 'center',
    textStyle: { fontWeight: 'bold', fontSize: 16 }
  },
  tooltip: {},
  legend: {
    data: ['Siswa', 'Instruktur'],
    top: 30
  },
  grid: { left: 40, right: 20, bottom: 40, top: 70 },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu']
  },
  yAxis: { type: 'value' },
  series: [
    {
      name: 'Siswa',
      type: 'bar',
      data: [200, 300, 400, 350, 500, 600, 700, 650],
      itemStyle: { color: '#3b82f6' }
    },
    {
      name: 'Instruktur',
      type: 'bar',
      data: [20, 30, 40, 35, 50, 60, 70, 65],
      itemStyle: { color: '#f59e42' }
    }
  ]
})

const radarOption = ref({
  title: {
    text: 'Skill Siswa',
    left: 'center',
    textStyle: { fontWeight: 'bold', fontSize: 16 }
  },
  tooltip: {},
  legend: { data: ['Siswa A', 'Siswa B'], top: 30 },
  radar: {
    indicator: [
      { name: 'Statistik', max: 100 },
      { name: 'GIS', max: 100 },
      { name: 'Ekonomi', max: 100 },
      { name: 'Teknologi', max: 100 },
      { name: 'Bahasa', max: 100 }
    ]
  },
  series: [
    {
      name: 'Skill',
      type: 'radar',
      data: [
        { value: [80, 90, 70, 85, 60], name: 'Siswa A' },
        { value: [60, 70, 80, 60, 90], name: 'Siswa B' }
      ],
      itemStyle: { color: 'rgba(59, 130, 246, 0.8)' }
    }
  ]
})
</script>

<!-- Install vue-echarts dan echarts terlebih dahulu:
npm install echarts vue-echarts
-->
