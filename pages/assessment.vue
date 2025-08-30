<template>
  <div class="min-h-screen pt-24 px-6">
    <h1 class="text-3xl font-bold text-yellow-700 mb-4">Assessment Kompetensi Generik</h1>
    <p class="text-gray-600 mb-8">
      Jawablah pertanyaan berikut sesuai kondisi nyata Anda.
    </p>

    <!-- Form input jawaban -->
    <form v-if="!showResult" @submit.prevent="submitAssessment" class="space-y-8">
      <div v-for="(item, index) in competencies" :key="index" class="bg-white p-6 rounded-2xl shadow-md border border-yellow-200">
        <p class="font-semibold mb-2">{{ index + 1 }}. {{ item.question }}</p>

        <div class="flex gap-4">
          <label v-for="n in 5" :key="n" class="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              :name="'c'+index" 
              :value="n" 
              v-model="answers[index]" 
              class="text-yellow-600"
            />
            <span>{{ n }}</span>
          </label>
        </div>
        <p class="text-sm text-gray-400 mt-2">1 = Sangat Tidak Setuju, 5 = Sangat Setuju</p>
      </div>

      <button 
        type="submit" 
        class="bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-xl shadow-md transition-all"
      >
        Kirim Jawaban
      </button>
    </form>

  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import * as echarts from 'echarts'

const competencies = ref<any[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch('/api/assessment')
    const data = await res.json()
    if (data.assessment) {
      competencies.value = data.assessment
    } else {
      error.value = 'Gagal memuat assessment.'
    }
  } catch (e) {
    error.value = 'Gagal memuat assessment.'
  } finally {
    loading.value = false
  }
})


const answers = ref<(number | null)[]>([])
const showResult = ref(false)

// Reset form
const resetAssessment = () => {
  answers.value = Array(competencies.value.length).fill(null)
  showResult.value = false
}

// Submit jawaban
const submitAssessment = async () => {
  if (answers.value.length !== competencies.value.length || answers.value.includes(null)) {
    alert("Mohon isi semua jawaban terlebih dahulu!")
    return
  }

  // POST ke /api/assessment_answer
  try {
    const user_id = 1 // Ganti dengan user_id yang sesuai
    const res = await fetch('/api/assessment_answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, answers: answers.value })
    })
    const data = await res.json()
    if (data.error) {
      alert(data.error)
      return
    }
  showResult.value = true
  await nextTick()
    // Redirect ke learning path setelah submit sukses
    setTimeout(() => {
      window.location.href = '/learning-path'
    }, 1500)
  } catch (e) {
    alert('Gagal mengirim jawaban assessment.')
  }
}


</script>
