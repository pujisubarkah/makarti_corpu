<template>
  <div class="p-6 pt-20"> <!-- Tambahkan pt-20 untuk menghindari navbar -->
    <h1 class="text-3xl font-bold mb-6">📚 Daftar Section Kursus</h1>
    <!-- Form tambah section -->
    <form class="flex gap-2 items-center mb-8">
      <input v-model="newSectionTitle" type="text" class="input input-bordered text-lg" placeholder="Judul Section" required />
      <input v-model.number="newSectionOrder" type="number" class="input input-bordered w-24 text-lg" placeholder="Urutan" min="1" required />
      <button type="submit" class="btn btn-primary text-lg" @click.prevent="addSection">Tambah Section</button>
    </form>
    <div v-if="sectionError" class="text-red-500 mb-4 text-lg">{{ sectionError }}</div>
    <!-- Tabel Section -->
    <table class="table w-full bg-white border border-gray-200 text-lg">
      <thead class="bg-gray-100">
        <tr>
          <th class="py-3 px-4 text-left text-xl">Order</th>
          <th class="py-3 px-4 text-left text-xl">Section</th>
          <th class="py-3 px-4 text-left text-xl">Content</th>
          <th class="py-3 px-4 text-left text-xl">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="section in sections" :key="section.id" class="border-t">
          <td class="py-3 px-4">{{ section.order }}</td>
          <td class="py-3 px-4">{{ section.title }}</td>
          <td class="py-3 px-4">
            <!-- Konten -->
            <div v-if="section.contents && section.contents.length" class="mb-4">
              <h4 class="font-semibold text-gray-700 mb-2">📄 Konten:</h4>
              <ul>
                <li v-for="content in section.contents" :key="content.id" class="flex items-center gap-2 mb-1">
                  <span class="text-blue-600 text-lg">#{{ content.order }}</span>
                  <a :href="content.content_url" target="_blank" class="text-blue-600 underline text-lg">{{ content.title }}</a>
                  <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{{ content.type }}</span>
                  <button class="btn btn-xs btn-error text-lg" @click="removeContent(content.id)">Hapus</button>
                </li>
              </ul>
            </div>

            <!-- Quiz -->
            <div v-if="section.quizzes && section.quizzes.length" class="mb-4">
              <h4 class="font-semibold text-gray-700 mb-2">❓ Quiz:</h4>
              <ul>
                <li v-for="quiz in section.quizzes" :key="quiz.id" class="flex items-center gap-2 mb-1">
                  <span class="text-purple-600 text-lg">#{{ quiz.order }}</span>
                  <span class="text-purple-600 text-lg">{{ quiz.question }}</span>
                  <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">{{ quiz.type }}</span>
                  <button class="btn btn-xs btn-error text-lg" @click="removeQuiz(quiz.id)">Hapus</button>
                </li>
              </ul>
            </div>

            <!-- Pesan jika tidak ada konten dan quiz -->
            <div v-if="(!section.contents || section.contents.length === 0) && (!section.quizzes || section.quizzes.length === 0)" class="text-gray-400 mb-2 text-lg">
              Belum ada konten atau quiz
            </div>

            <!-- Tombol Aksi -->
            <div class="flex gap-2 mt-3">
              <button class="btn btn-xs btn-primary text-lg" @click="openAddContentModal(section)">Tambah Konten</button>
              <button class="btn btn-xs btn-warning text-lg" @click="openAddQuizModal(section)">Tambah Quiz</button>
            </div>
          </td>
          <td class="py-3 px-4">
            <div class="flex gap-2">
              <button class="btn btn-sm btn-outline text-lg flex items-center gap-1" @click="editSection(section)">
                <Pencil class="w-5 h-5" /> Edit
              </button>
              <button class="btn btn-sm btn-error text-white text-lg flex items-center gap-1" @click="deleteSection(section.id)">
                <Trash2 class="w-5 h-5" /> Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    

    <!-- Modal Tambah Konten -->
    <div v-if="showAddContentModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="modal-overlay absolute inset-0 bg-black opacity-30"></div>
      <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
        <div class="modal-content py-4 text-left px-6">
          <h2 class="text-lg font-bold mb-4">Tambah Konten ke {{ selectedSection?.title }}</h2>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="contentTitle">Judul Konten</label>
            <input v-model="newContentTitle" type="text" id="contentTitle" class="input input-bordered w-full" placeholder="Judul Konten" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="contentDescription">Deskripsi Konten</label>
            <textarea v-model="newContentDescription" id="contentDescription" class="input input-bordered w-full" placeholder="Deskripsi singkat tentang konten ini" rows="3"></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="contentType">Tipe Konten</label>
            <select v-model="newContentType" id="contentType" class="select select-bordered w-full">
              <option value="video">Video</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="contentOrder">Urutan Konten</label>
            <input v-model.number="newContentOrder" type="number" id="contentOrder" class="input input-bordered w-24" min="1" placeholder="Urutan" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="contentUrl">URL Konten</label>
            <input v-model="newContentUrl" type="url" id="contentUrl" class="input input-bordered w-full" placeholder="https://example.com" required />
          </div>
          <div class="flex justify-end gap-2">
            <button class="btn btn-secondary" @click="showAddContentModal = false">Batal</button>
            <button class="btn btn-primary" @click="addContent">Simpan Konten</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Tambah Quiz -->
    <div v-if="showAddQuizModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="modal-overlay absolute inset-0 bg-black opacity-30"></div>
      <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
        <div class="modal-content py-4 text-left px-6">
          <h2 class="text-lg font-bold mb-4">Tambah Quiz ke {{ selectedSection?.title }}</h2>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Tipe Quiz</label>
            <select v-model="newQuizType" class="select select-bordered w-full">
              <option value="multiple">Multiple Choice</option>
              <option value="short">Short Answer</option>
              <option value="truefalse">True or False</option>
              <option value="fill">Fill in the Blanks</option>
              <option value="likert">Likert Scale</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="quizQuestion">Pertanyaan Quiz</label>
            <input v-model="newQuizQuestion" type="text" id="quizQuestion" class="input input-bordered w-full" placeholder="Pertanyaan" required />
          </div>
          <!-- Tambahkan input order -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="quizOrder">Urutan Quiz</label>
            <input v-model.number="newQuizOrder" type="number" id="quizOrder" class="input input-bordered w-24" min="1" placeholder="Urutan" required />
          </div>
          <!-- Multiple Choice -->
          <div v-if="newQuizType === 'multiple'" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Pilihan Jawaban</label>
            <div v-for="(choice, idx) in newQuizChoices" :key="idx" class="flex gap-2 mb-2">
              <input v-model="newQuizChoices[idx]" type="text" class="input input-bordered w-full" :placeholder="`Pilihan ${String.fromCharCode(65+idx)}`" required />
              <input type="radio" :value="idx" v-model="newQuizCorrect" :name="'quizCorrect'" />
              <span>Benar</span>
            </div>
            <button class="btn btn-xs btn-outline" @click="addChoice" type="button">Tambah Pilihan</button>
          </div>
          <!-- Short Answer -->
          <div v-if="newQuizType === 'short'" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="quizAnswer">Jawaban Singkat</label>
            <input v-model="newQuizAnswer" type="text" id="quizAnswer" class="input input-bordered w-full" placeholder="Jawaban" required />
          </div>
          <!-- True or False -->
          <div v-if="newQuizType === 'truefalse'" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Jawaban</label>
            <select v-model="newQuizAnswer" class="select select-bordered w-full">
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <!-- Fill in the Blanks -->
          <div v-if="newQuizType === 'fill'" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="quizAnswer">Jawaban yang Benar</label>
            <input v-model="newQuizAnswer" type="text" id="quizAnswer" class="input input-bordered w-full" placeholder="Jawaban" required />
          </div>
          <!-- Likert Scale -->
          <div v-if="newQuizType === 'likert'" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Skala Likert (1-5)</label>
            <select v-model="newQuizAnswer" class="select select-bordered w-full">
              <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <div class="flex justify-end gap-2">
            <button class="btn btn-secondary" @click="showAddQuizModal = false">Batal</button>
            <button class="btn btn-primary" @click="addQuiz">Simpan Quiz</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Edit Section -->
    <div v-if="showEditSectionModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="modal-overlay absolute inset-0 bg-black opacity-30"></div>
      <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
        <div class="modal-content py-4 text-left px-6">
          <h2 class="text-lg font-bold mb-4">Edit Section</h2>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="editSectionTitle">Judul Section</label>
            <input v-model="editSectionTitle" type="text" id="editSectionTitle" class="input input-bordered w-full text-lg" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="editSectionOrder">Urutan</label>
            <input v-model.number="editSectionOrder" type="number" id="editSectionOrder" class="input input-bordered w-24 text-lg" min="1" required />
          </div>
          <div class="flex justify-end gap-2">
            <button class="btn btn-secondary" @click="showEditSectionModal = false">Batal</button>
            <button class="btn btn-primary" @click="saveEditSection">Simpan Perubahan</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'instructor'
})

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Pencil, Trash2 } from 'lucide-vue-next'

const route = useRoute()
const courseId = route.params.id
const sections = ref([])
const newSectionTitle = ref('')
const newSectionOrder = ref(1)
const sectionError = ref('')
const showAddContentModal = ref(false)
const showAddQuizModal = ref(false)
const showEditSectionModal = ref(false)
const selectedSection = ref(null)
const newContentTitle = ref('')
const newContentDescription = ref('')
const newContentUrl = ref('')
const newContentType = ref('video') // Tambahkan ini
const newQuizType = ref('multiple')
const newQuizQuestion = ref('')
const newQuizChoices = ref(['', ''])
const newQuizCorrect = ref(0)
const newQuizAnswer = ref('')
const editSectionTitle = ref('')
const editSectionOrder = ref(1)
const newContentOrder = ref(1) // Tambahkan ini
const sectionContents = ref([])
const newQuizOrder = ref(1) // Tambahkan ini

async function fetchSections() {
  const res = await $fetch(`/api/course_section`, { method: 'GET' })
  // Filter sections berdasarkan courseId dan ambil yang sudah include contents
  const filteredSections = (res.sections || [])
    .filter(s => s.course_id === courseId)
    .sort((a, b) => a.order - b.order)
  
  // Fetch quiz untuk setiap section
  for (let section of filteredSections) {
    try {
      const quizRes = await $fetch(`/api/quizzes_section/${section.id}`)
      section.quizzes = quizRes.quizzes || []
    } catch (err) {
      section.quizzes = []
    }
  }
  
  sections.value = filteredSections
}

async function addSection() {
  sectionError.value = ''
  try {
    const res = await $fetch(`/api/course_section/${courseId}`, {
      method: 'POST',
      body: {
        title: newSectionTitle.value,
        order: newSectionOrder.value
      }
    })
    if (res && res.id) {
      sections.value.push(res)
      newSectionTitle.value = ''
      newSectionOrder.value = sections.value.length + 1
      fetchSections()
    } else {
      sectionError.value = res.error || 'Gagal menambah section.'
    }
  } catch (err) {
    sectionError.value = 'Terjadi kesalahan server.'
  }
}

function editSection(section) {
  selectedSection.value = section
  editSectionTitle.value = section.title
  editSectionOrder.value = section.order
  showEditSectionModal.value = true
}

async function saveEditSection() {
  if (!selectedSection.value) return
  await $fetch(`/api/course_section/${courseId}`, {
    method: 'PUT',
    body: {
      id: selectedSection.value.id,
      title: editSectionTitle.value,
      order: editSectionOrder.value
    }
  })
  showEditSectionModal.value = false
  fetchSections()
}

function deleteSection(id) {
  if (confirm('Yakin ingin menghapus section ini?')) {
    $fetch(`/api/course_section/${courseId}`, {
      method: 'DELETE',
      body: { id }
    }).then(fetchSections)
  }
}

function openAddContentModal(section) {
  selectedSection.value = section
  showAddContentModal.value = true
  newContentTitle.value = ''
  newContentDescription.value = ''
  newContentUrl.value = ''
  newContentType.value = 'video'
  newContentOrder.value = (section.contents?.length || 0) + 1 // default urutan berikutnya
}

async function addContent() {
  try {
    const res = await $fetch(`/api/course_section/${selectedSection.value.id}/content`, {
      method: 'POST',
      body: {
        title: newContentTitle.value,
        type: newContentType.value,
        deskripsi: newContentDescription.value, // harus 'deskripsi'
        content_url: newContentUrl.value,       // harus 'content_url'
        order: newContentOrder.value
      }
    })
    showAddContentModal.value = false
    fetchSections()
    alert('Konten berhasil ditambahkan!')
  } catch (err) {
    alert('Gagal menambahkan konten!')
  }
}

async function removeContent(sectionId, idx) {
  // Hapus konten dari backend, misal PATCH/DELETE
  await $fetch(`/api/course_section/${sectionId}/content/${idx}`, { method: 'DELETE' })
  fetchSections()
}

function addChoice() {
  newQuizChoices.value.push('')
}

function openAddQuizModal(section) {
  selectedSection.value = section
  showAddQuizModal.value = true
  newQuizType.value = 'multiple'
  newQuizQuestion.value = ''
  newQuizChoices.value = ['', '']
  newQuizCorrect.value = 0
  newQuizAnswer.value = ''
  newQuizOrder.value = (section.quizzes?.length || 0) + 1 // default urutan berikutnya
}

async function addQuiz() {
  try {
    let body = { 
      type: newQuizType.value, 
      question: newQuizQuestion.value,
      section_id: selectedSection.value.id,
      order: newQuizOrder.value // Kirim order ke API
    }
    if (newQuizType.value === 'multiple') {
      body.choices = newQuizChoices.value
      body.correct_answer = newQuizCorrect.value
    } else {
      body.correct_answer = newQuizAnswer.value
    }
    const res = await $fetch(`/api/quizzes_section/${selectedSection.value.id}`, {
      method: 'POST',
      body
    })
    if (res.error) {
      alert('Gagal menambahkan quiz: ' + res.error)
    } else {
      showAddQuizModal.value = false
      fetchSections()
      alert('Quiz berhasil ditambahkan!')
    }
  } catch (err) {
    alert('Terjadi kesalahan saat menambahkan quiz!')
  }
}

async function fetchSectionContents(sectionId) {
  const res = await $fetch(`/api/content_section/${sectionId}`)
  sectionContents.value = res
}

// Panggil fungsi ini saat section dipilih atau setelah tambah konten
// Contoh: fetchSectionContents(selectedSection.value.id)

onMounted(fetchSections)
</script>
