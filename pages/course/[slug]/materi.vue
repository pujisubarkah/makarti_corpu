<template>
  <div class="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16">
    <!-- Sidebar Materi dengan Design Modern -->
    <transition name="slide">
      <aside v-if="showSidebar" class="w-80 bg-white/95 backdrop-blur-md shadow-2xl border-r border-slate-200 flex flex-col min-h-screen relative">
        <!-- Header Sidebar -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-br-3xl">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-bold text-xl tracking-wide flex items-center gap-3">
              <div class="bg-white/20 p-2 rounded-xl">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
                </svg>
              </div>
              Daftar Materi
            </h2>
            <button class="btn btn-sm btn-circle bg-white/20 border-none hover:bg-white/30 text-white" @click="toggleSidebar">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="text-sm opacity-90">{{ sections.length }} Section Available</div>
        </div>

        <!-- Progress Overview -->
        <div class="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-slate-200">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-slate-600">Progress Keseluruhan</span>
            <span class="text-sm font-bold text-emerald-600">{{ Math.round((completedSections.length / sections.length) * 100) || 0 }}%</span>
          </div>
          <div class="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500 ease-out"
              :style="`width: ${(completedSections.length / sections.length) * 100 || 0}%`"
            ></div>
          </div>
          <div class="flex justify-between text-xs text-slate-500 mt-2">
            <span>{{ completedSections.length }} selesai</span>
            <span>{{ sections.length - completedSections.length }} tersisa</span>
          </div>
           <div v-if="sections.length > 0 && completedSections.length === sections.length" class="mt-4 text-center">
             <button @click="router.push('/my')" class="btn bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all">
               <svg class="w-5 h-5 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
               </svg>
               Kembali ke Kursus Saya
             </button>
           </div>
        </div>

        <!-- Daftar Section -->
        <div class="flex-1 p-4 overflow-y-auto">
          <div class="space-y-3">
            <div v-for="(section, index) in sections" :key="section.id" class="group">
              <button
                @click="selectSection(section)"
                :class="{
                  'w-full text-left p-4 rounded-xl transition-all duration-300 border-2 relative overflow-hidden': true,
                  'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-500 shadow-lg transform scale-105': selectedSection?.id === section.id,
                  'bg-white hover:bg-slate-50 border-slate-200 hover:border-blue-300 hover:shadow-md text-slate-700': selectedSection?.id !== section.id,
                  'ring-2 ring-emerald-200': completedSections.includes(section.id)
                }"
              >
                <!-- Section Number -->
                <div class="flex items-start gap-4">
                  <div :class="{
                    'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold': true,
                    'bg-white/20 text-white': selectedSection?.id === section.id,
                    'bg-slate-100 text-slate-600': selectedSection?.id !== section.id && !completedSections.includes(section.id),
                    'bg-emerald-100 text-emerald-600': completedSections.includes(section.id)
                  }">
                    <span v-if="!completedSections.includes(section.id)">{{ index + 1 }}</span>
                    <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-sm mb-1 line-clamp-2">{{ section.title }}</h3>
                    <div class="flex items-center gap-2 text-xs opacity-75">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                      <span>{{ section.contents?.length || 0 }} konten</span>
                    </div>
                  </div>

                  <!-- Status Badge -->
                  <div v-if="completedSections.includes(section.id)" class="flex-shrink-0">
                    <div class="bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full text-xs font-medium">
                      Selesai
                    </div>
                  </div>
                </div>

                <!-- Hover Effect -->
                <div v-if="selectedSection?.id !== section.id" class="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-300 rounded-xl"></div>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </transition>

    <!-- Area Konten Utama -->
    <main :class="showSidebar ? 'w-full md:w-[calc(100%-20rem)]' : 'w-full'" class="flex-1 transition-all duration-300">
      <!-- Header Konten -->
      <div class="bg-white/80 backdrop-blur-md border-b border-slate-200 p-6 sticky top-16 z-10">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button v-if="!showSidebar" class="btn btn-circle bg-blue-500 hover:bg-blue-600 text-white border-none shadow-lg" @click="toggleSidebar">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
            <div>
              <h1 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <div class="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-xl">
                  <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </div>
                {{ selectedSection?.title || 'Pilih materi di sidebar' }}
              </h1>
              <p v-if="selectedSection" class="text-sm text-slate-500 mt-1">
                Section {{ sections.findIndex(s => s.id === selectedSection.id) + 1 }} dari {{ sections.length }}
              </p>
            </div>
          </div>

          <!-- Action Button -->
          <div v-if="selectedSection" class="flex items-center gap-3">
            <button
              v-if="!completedSections.includes(selectedSection.id)"
              class="btn bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-none shadow-lg px-6"
              @click="handleCompletion(selectedSection.id)"
            >
              <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Tandai Selesai
            </button>
            <div v-else class="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl border border-emerald-200">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="font-medium">Section Selesai</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Konten Section -->
      <div class="p-6">
        <div v-if="selectedSection" class="max-w-4xl mx-auto">
          <div v-if="selectedSection.contents && selectedSection.contents.length" class="space-y-8">
            <div
              v-for="(content, index) in selectedSection.contents"
              :key="content.id"
              class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <!-- Content Header -->
              <div class="bg-gradient-to-r from-slate-50 to-blue-50 p-6 border-b border-slate-200">
                <div class="flex items-center gap-4 mb-3">
                  <div class="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {{ content.order }}
                  </div>
                  <h3 class="text-xl font-bold text-slate-800">{{ content.title }}</h3>
                  <div class="ml-auto">
                    <span :class="{
                      'px-3 py-1 rounded-full text-xs font-medium': true,
                      'bg-red-100 text-red-600': content.type === 'video',
                      'bg-orange-100 text-orange-600': content.type === 'pdf',
                      'bg-purple-100 text-purple-600': content.type === 'link'
                    }">
                      {{ content.type.toUpperCase() }}
                    </span>
                  </div>
                </div>
                <p v-if="content.deskripsi" class="text-slate-600 leading-relaxed whitespace-pre-line">{{ content.deskripsi }}</p>
              </div>

              <!-- Content Body -->
              <div class="p-6">
                <!-- Video Content -->
                <div v-if="content.type === 'video'" class="space-y-4">
                  <div class="relative overflow-hidden rounded-xl shadow-lg">
                    <div class="relative w-full" style="padding-top: 56.25%;">
                      <iframe
                        :src="getYoutubeEmbed(content.content_url)"
                        frameborder="0"
                        allowfullscreen
                        class="absolute top-0 left-0 w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-slate-500">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    <span>Video pembelajaran interaktif</span>
                  </div>
                </div>

                <!-- PDF Content -->
                <div v-else-if="content.type === 'pdf'" class="space-y-4">
                  <div class="bg-slate-50 rounded-xl overflow-hidden">
                    <iframe
                      :src="content.content_url"
                      class="w-full h-96 border-none"
                    ></iframe>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center gap-2 text-slate-500">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 1H7a2 2 0 00-2 2v16a2 2 0 002 2z"/>
                      </svg>
                      <span>Dokumen PDF</span>
                    </div>
                    <a :href="content.content_url" target="_blank" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                      <span>Buka di tab baru</span>
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <!-- Other Content Types -->
                <div v-else class="text-center py-8">
                  <div class="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                  </div>
                  <a :href="content.content_url" target="_blank" class="btn bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none shadow-lg">
                    <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    Akses Konten
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Tampilkan Quiz jika ada -->
          <div v-if="selectedSection.quizzes && selectedSection.quizzes.length" class="space-y-8 mt-8">
            <div v-for="quiz in selectedSection.quizzes" :key="quiz.id" class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {{ quiz.order }}
                </div>
                <span class="font-semibold text-lg text-slate-800">{{ quiz.question }}</span>
                <span class="ml-auto px-3 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-purple-100 text-purple-600': quiz.type === 'multiple',
                    'bg-blue-100 text-blue-600': quiz.type === 'short',
                    'bg-green-100 text-green-600': quiz.type === 'truefalse',
                    'bg-orange-100 text-orange-600': quiz.type === 'fill',
                    'bg-emerald-100 text-emerald-600': quiz.type === 'likert'
                  }">
                  {{ quiz.type.toUpperCase() }}
                </span>
              </div>

              <!-- Multiple Choice -->
              <div v-if="quiz.type === 'multiple'" class="mt-4 space-y-3">
                <div v-for="(choice, idx) in quiz.choices" :key="idx" 
                     class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 cursor-pointer"
                     :class="{ 'border-purple-500 bg-purple-50': quizAnswers[quiz.id] === idx }"
                     @click="saveQuizAnswer(quiz.id, idx)">
                  <input 
                    type="radio" 
                    :name="'quiz-' + quiz.id" 
                    :value="idx" 
                    v-model="quizAnswers[quiz.id]"
                    class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
                  />
                  <span class="text-slate-700 font-medium">{{ String.fromCharCode(65 + idx) }}.</span>
                  <span class="text-slate-800">{{ choice }}</span>
                </div>
              </div>

              <!-- Short Answer -->
              <div v-else-if="quiz.type === 'short'" class="mt-4">
                <input 
                  type="text" 
                  v-model="quizAnswers[quiz.id]"
                  class="input input-bordered w-full p-3 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                  placeholder="Masukkan jawaban singkat..."
                />
              </div>

              <!-- True or False -->
              <div v-else-if="quiz.type === 'truefalse'" class="mt-4 flex gap-6">
                <label class="flex items-center gap-2 p-3 rounded-lg border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 cursor-pointer"
                       :class="{ 'border-green-500 bg-green-50': quizAnswers[quiz.id] === 'true' }">
                  <input 
                    type="radio" 
                    :name="'quiz-' + quiz.id" 
                    value="true" 
                    v-model="quizAnswers[quiz.id]"
                    class="w-4 h-4 text-green-600"
                  />
                  <span class="font-medium text-green-700">Benar</span>
                </label>
                <label class="flex items-center gap-2 p-3 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                       :class="{ 'border-red-500 bg-red-50': quizAnswers[quiz.id] === 'false' }">
                  <input 
                    type="radio" 
                    :name="'quiz-' + quiz.id" 
                    value="false" 
                    v-model="quizAnswers[quiz.id]"
                    class="w-4 h-4 text-red-600"
                  />
                  <span class="font-medium text-red-700">Salah</span>
                </label>
              </div>

              <!-- Fill in the Blanks -->
              <div v-else-if="quiz.type === 'fill'" class="mt-4">
                <input 
                  type="text" 
                  v-model="quizAnswers[quiz.id]"
                  class="input input-bordered w-full p-3 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200" 
                  placeholder="Isi jawaban yang tepat..."
                />
              </div>

              <!-- Likert Scale -->
              <div v-else-if="quiz.type === 'likert'" class="mt-4">
                <div class="flex justify-between items-center mb-3">
                  <span class="text-sm text-slate-500">Sangat Tidak Setuju</span>
                  <span class="text-sm text-slate-500">Sangat Setuju</span>
                </div>
                <div class="flex gap-4 justify-center">
                  <label v-for="n in 5" :key="n" 
                         class="flex flex-col items-center gap-2 p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 cursor-pointer"
                         :class="{ 'border-emerald-500 bg-emerald-50': quizAnswers[quiz.id] === n }">
                    <input 
                      type="radio" 
                      :name="'quiz-' + quiz.id" 
                      :value="n" 
                      v-model="quizAnswers[quiz.id]"
                      class="w-4 h-4 text-emerald-600"
                    />
                    <span class="font-bold text-emerald-700">{{ n }}</span>
                  </label>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="mt-6 flex justify-end">
                <button 
                  @click="submitQuiz(quiz)"
                  class="btn bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-none shadow-lg px-6"
                  :disabled="!quizAnswers[quiz.id] && quizAnswers[quiz.id] !== 0"
                  :class="{ 'opacity-50 cursor-not-allowed': !quizAnswers[quiz.id] && quizAnswers[quiz.id] !== 0 }"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  Submit Jawaban
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 max-w-md mx-auto">
          <div class="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-slate-700 mb-3">Pilih Materi atau Quiz</h3>
          <p class="text-slate-500 mb-6">
            Silakan pilih section dari sidebar untuk mulai belajar atau mengerjakan quiz.
          </p>
          <button v-if="!showSidebar" @click="toggleSidebar" class="btn bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none shadow-lg">
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            Buka Sidebar
          </button>
        </div>

        <!-- Empty State Section -->
        <div
          v-if="selectedSection && (!selectedSection.contents || selectedSection.contents.length === 0) && (!selectedSection.quizzes || selectedSection.quizzes.length === 0)"
          class="text-center py-16"
        >
          <div class="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-600 mb-2">Belum Ada Materi atau Quiz</h3>
          <p class="text-slate-500">Section ini belum memiliki materi maupun quiz.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const showSidebar = ref(true)
const sections = ref([])
const selectedSection = ref(null)
const completedSections = ref([])
const quizAnswers = ref({}) // Tambahkan state untuk menyimpan jawaban quiz

// Fungsi untuk menyimpan jawaban quiz
const saveQuizAnswer = (quizId, answer) => {
  quizAnswers.value[quizId] = answer
}

// Fungsi untuk submit quiz
const submitQuiz = async (quiz) => {
  const userAnswer = quizAnswers.value[quiz.id]
  if (!userAnswer && userAnswer !== 0) {
    alert('Silakan pilih jawaban terlebih dahulu!')
    return
  }

  try {
    // Kirim jawaban ke API (jika ada endpoint untuk submit quiz)
    // const result = await $fetch('/api/quiz_submission', {
    //   method: 'POST',
    //   body: {
    //     quiz_id: quiz.id,
    //     user_id: auth.user.id,
    //     answer: userAnswer
    //   }
    // })
    
    alert(`Jawaban tersimpan untuk: ${quiz.question}`)
  } catch (error) {
    console.error('Error submitting quiz:', error)
    alert('Gagal menyimpan jawaban!')
  }
}

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const selectSection = (section) => {
  selectedSection.value = section
}

const handleCompletion = async (sectionId) => {
  if (!completedSections.value.includes(sectionId)) {
    try {
      await $fetch('/api/section_progress', {
        method: 'POST',
        body: {
          user_id: auth.user.id,
          section_id: sectionId,
          progress_percent: 100,
          is_completed: true
        }
      })
      completedSections.value.push(sectionId)
      // Redirect ke /my jika semua section sudah selesai
      if (completedSections.value.length === sections.value.length) {
        router.push('/my')
      }
    } catch (error) {
      console.error('Error marking section as completed:', error)
    }
  }

  // Cek jika sudah selesai semua section
  if (completedSections.value.length === sections.value.length) {
    router.push('/my')
  }
}

onMounted(async () => {
  try {
    const res = await $fetch('/api/course_section', { method: 'GET' })
    const courseId = route.params.slug
    const filtered = (res.sections || []).filter(s => s.course_id === courseId)
    // Fetch quizzes for each section
    for (const section of filtered) {
      try {
        const quizRes = await $fetch(`/api/quizzes_section/${section.id}`)
        section.quizzes = quizRes.quizzes || []
      } catch {
        section.quizzes = []
      }
    }
    sections.value = filtered
    selectedSection.value = sections.value[0] || null

    if (auth.user?.id) {
      const progressRes = await $fetch('/api/section_progress', { method: 'GET' })
      const userProgress = (progressRes.progress || []).filter(
        p => p.user_id === auth.user.id && p.is_completed
      )
      completedSections.value = userProgress.map(p => p.section_id)
    }
  } catch (error) {
    console.error('Error loading sections:', error)
  }
})

function getYoutubeEmbed(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([A-Za-z0-9_\-]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : url
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
