<template>
  <div class="min-h-screen pt-24 px-6">
    <h1 class="text-3xl font-bold text-yellow-700 mb-6">Learning Path Anda</h1>

    <!-- Radar Chart -->
    <div id="radarChart" class="w-full h-96 mb-12"></div>

    <h2 class="text-2xl font-bold text-yellow-700 mb-4">Rekomendasi Kursus</h2>

    <div v-if="recommendations.length > 0" class="grid md:grid-cols-2 gap-6">
      <div
        v-for="(rec, idx) in recommendations"
        :key="idx"
        class="bg-white border border-yellow-200 p-6 rounded-2xl shadow-md"
      >
        <!-- Kalau ada course -->
        <template v-if="rec.courses.length > 0">
          <h3 class="font-bold text-lg mb-3">
            Kompetensi: {{ rec.competency_name }}
          </h3>
          <div v-for="course in rec.courses" :key="course.id" class="mb-6">
            <img
              :src="course.thumbnail_url"
              alt=""
              class="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h4 class="font-bold text-md mb-2">{{ course.title }}</h4>
            <p class="text-gray-600 mb-2">{{ course.description }}</p>
            <p class="text-sm text-gray-500">Instruktur: {{ course.instructor_name }}</p>
          </div>
        </template>

        <!-- Fallback kalau kursus kosong -->
        <template v-else>
          <h3 class="font-bold text-lg mb-2">Kompetensi: {{ rec.competency_name }}</h3>
          <p class="text-yellow-800 bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
            📌 Materi untuk kompetensi ini belum tersedia. Nantikan update berikutnya 🚀
          </p>
        </template>
      </div>
    </div>

    <!-- Loading state atau fallback -->
    <div v-else class="text-center text-gray-500">
      Tidak ada rekomendasi saat ini.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'

// State
const competencyScores = ref<Record<number, number>>({})
const recommendations = ref<any[]>([])
const competencyNames = ref<Record<number, string>>({})

onMounted(async () => {
  try {
    // 1. Ambil daftar kompetensi (nama)
    const compRes = await fetch('/api/competencies')
    const compData = await compRes.json()
    if (Array.isArray(compData)) {
      competencyNames.value = Object.fromEntries(
        compData.map((c: any) => [c.id, c.name])
      )
    }

    // 2. Ambil hasil assessment (skor kompetensi)
    const res = await fetch('/api/learning-path')
    const data = await res.json()
    competencyScores.value = data.answers || {}

    // 3. Ambil 2 kompetensi dengan skor terendah
    const lowestCompetencies = Object.entries(competencyScores.value)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 2)
      .map(([id]) => Number(id))

    // 4. Ambil semua kursus
    const courseRes = await fetch('/api/course')
    const courses = await courseRes.json()

    // 5. Buat rekomendasi
    recommendations.value = lowestCompetencies.map((cid) => {
      return {
        competency_id: cid,
        competency_name: competencyNames.value[cid] || `Kompetensi #${cid}`,
        courses: Array.isArray(courses)
          ? courses.filter((c: any) => c.competency_id === cid && c.is_published)
          : []
      }
    })

    // 6. Render chart setelah DOM siap
    await nextTick()
    renderRadarChart()
  } catch (e) {
    console.error('Gagal memuat learning path', e)
  }
})

// Fungsi render radar chart
const renderRadarChart = () => {
  const chartDom = document.getElementById('radarChart')
  if (!chartDom) return

  const myChart = echarts.init(chartDom)

  const names = Object.entries(competencyScores.value || {}).map(
    ([cid]) => competencyNames.value?.[Number(cid)] || `Kompetensi #${cid}`
  )
  const scores = Object.values(competencyScores.value || {})

  myChart.setOption({
    tooltip: {},
    radar: {
      indicator: names.map((name) => ({ name, max: 5 })),
      shape: 'circle',
      splitNumber: 5,
  axisName: { color: '#1e293b', fontWeight: 'bold' }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: scores,
            name: 'Skor Kompetensi',
            areaStyle: { color: 'rgba(30, 64, 175, 0.2)' },
            lineStyle: { color: '#1e293b', width: 3 },
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: { color: '#1e293b' }
          }
        ]
      }
    ]
  })

  // Cleanup saat unmount
  window.addEventListener('beforeunload', () => {
    myChart.dispose()
  })
}
</script>

<style scoped>
/* Optional: tambahkan jika perlu styling tambahan */
</style>