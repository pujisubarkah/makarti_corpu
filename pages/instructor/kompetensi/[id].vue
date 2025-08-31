<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-2">{{ kompetensi.name }}</h1>
    <p class="text-gray-600 mb-4">{{ kompetensi.description }}</p>

    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">📚 Course Terkait</h2>
      <button @click="openAddModal" class="btn btn-primary px-6 py-2 text-base font-semibold">+ Tambah Course</button>
    </div>

    <div v-if="course.length === 0" class="text-gray-500 py-10 text-center">
      Belum ada materi  untuk kompetensi ini.
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="c in course" :key="c.id" class="p-4 border rounded-lg shadow">
        <div v-if="c.thumbnail_url" class="mb-3">
          <img :src="c.thumbnail_url" alt="Thumbnail" class="rounded w-full max-h-40 object-cover" />
        </div>
        <h3 class="text-lg font-semibold">{{ c.title }}</h3>
        <p class="text-gray-600">{{ c.description }}</p>
        <div class="flex gap-2 mt-2">
          <NuxtLink :to="`/instructor/courses/${c.id}/manage`" class="btn btn-sm btn-outline">Kelola</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Modal tambah course -->
    <AddCourseModal
      v-if="showAddModal"
      :kompetensi-id="kompetensi.id"
      @close="showAddModal = false"
      @saved="fetchCourse"
    />
    <div class="flex gap-2 mt-6">
    </div>

    <!-- Modal edit kompetensi -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold mb-4">Edit Kompetensi</h3>
        <form @submit.prevent="saveEditKompetensi">
          <div class="mb-3">
            <label class="block text-sm font-medium mb-1">Nama Kompetensi</label>
            <input v-model="editData.name" type="text" class="input input-bordered w-full" required />
          </div>
          <div class="mb-3">
            <label class="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea v-model="editData.description" class="input input-bordered w-full" rows="3" required></textarea>
          </div>
          <div class="mb-3">
            <label class="block text-sm font-medium mb-1">Thumbnail</label>
            <input v-model="editData.thumbnail_url" type="text" class="input input-bordered w-full mb-2" placeholder="https://..." />
            <input type="file" accept="image/*" @change="onThumbnailFileChange" class="input input-bordered w-full mb-2" />
            <div v-if="editData.thumbnail_url" class="mt-2">
              <img :src="editData.thumbnail_url" alt="Thumbnail Preview" class="rounded w-full max-h-32 object-cover border" />
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <button type="button" @click="showEditModal = false" class="btn btn-outline">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
    </div>
</template>

<script setup>
// Handle thumbnail file upload
async function onThumbnailFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const formData = new FormData()
  formData.append('file', file)
  try {
    // Upload to your API endpoint
    const res = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    if (res.url) {
      editData.value.thumbnail_url = res.url
    }
  } catch (err) {
    alert('Gagal upload gambar')
  }
}
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AddCourseModal from '~/components/AddCourseModal.vue'

definePageMeta({
  layout: 'main'
})

const route = useRoute()
const kompetensi = ref({})
const course = ref([])
const showAddModal = ref(false)
const showEditModal = ref(false)
const editId = ref(null)
const editData = ref({})

async function fetchCourse() {
  const res = await $fetch(`/api/course?competensi_id=${route.params.id}`)
  course.value = Array.isArray(res) ? res : []
}

async function fetchKompetensi() {
  kompetensi.value = await $fetch(`/api/competencies/${route.params.id}`)
}

function openAddModal() {
  showAddModal.value = true
}

function openEditModal(kompetensi) {
  editData.value = { ...kompetensi }
  editId.value = kompetensi.id
  showEditModal.value = true
}

async function saveEditKompetensi() {
  await $fetch(`/api/kompetensi/${editId.value}`, {
    method: 'PUT',
    body: { ...editData.value }
  })
  showEditModal.value = false
  fetchKompetensi()
}

async function deleteCourse(id) {
  if (confirm('Yakin hapus course ini?')) {
    await $fetch(`/api/course?competensi_id=${route.params.id}&id=${id}`, { method: 'DELETE' })
    fetchCourse()
  }
}

async function deleteKompetensi(id) {
  if (confirm('Yakin ingin menghapus kompetensi ini?')) {
    await $fetch(`/api/kompetensi/${id}`, { method: 'DELETE' })
    fetchKompetensi()
  }
}

onMounted(async () => {
  await fetchKompetensi()
  await fetchCourse()
})
</script>
