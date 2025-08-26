<!-- filepath: c:\Users\user\Documents\cloud-campus\pages\instructor\courses\index.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'instructor'
})

const auth = useAuthStore()
const courses = ref([])
const showModal = ref(false)
const selectedCourse = ref({})
const showAddModal = ref(false)
const thumbnailError = ref('')

// Form state
const form = ref({
  title: '',
  slug: '',
  description: '',
  thumbnail_url: '',
})

function openModal(course) {
  selectedCourse.value = course
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function openAddModal() {
  showAddModal.value = true
}

function closeAddModal() {
  showAddModal.value = false
  form.value = {
    title: '',
    slug: '',
    description: '',
    thumbnail_url: '',
  }
  thumbnailError.value = ''
}

// Handle image upload for thumbnail
async function onThumbnailChange(e) {
  const file = e.target.files[0]
  thumbnailError.value = ''
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    thumbnailError.value = 'Ukuran gambar maksimal 2 MB.'
    return
  }

  const formData = new FormData()
  formData.append('image', file)
  try {
    const res = await $fetch('https://api.imgbb.com/1/upload?key=1a1425b30d0fc0b7340bdb0a031ca255', {
      method: 'POST',
      body: formData,
    })
    // Link gambar dari imgbb ada di res.data.url
    form.value.thumbnail_url = res.data?.url || ''
  } catch (err) {
    thumbnailError.value = 'Gagal upload gambar ke ImgBB.'
  }
}

async function handleAddCourse() {
  if (!auth.user?.id) return
  const slug = form.value.title.trim().toLowerCase().replace(/\s+/g, '-')
  const newCourse = {
    title: form.value.title,
    slug,
    description: form.value.description,
    thumbnail_url: form.value.thumbnail_url,
    instructor_id: auth.user.id,
    is_published: false,
  }
  await $fetch('/api/instructor/' + auth.user.id + '/course', {
    method: 'POST',
    body: newCourse,
  })

  // Kirim notifikasi ke admin setelah instructor submit draft kursus
  await $fetch('/api/notifikasi', {
    method: 'POST',
    body: {
      user_id: '550e8400-e29b-41d4-a716-446655440000', // id admin
      pesan: `Instructor ${auth.user.full_name} telah mengirimkan draft kursusnya, mohon direview`,
      dibaca: false,
      created_by: auth.user.id // id instructor
    }
  })

  closeAddModal()
  const res = await $fetch(`/api/instructor/${auth.user.id}/course`)
  courses.value = Array.isArray(res) ? res : []
}

onMounted(async () => {
  if (auth.user?.id) {
    const res = await $fetch(`/api/instructor/${auth.user.id}/course`)
    courses.value = Array.isArray(res) ? res : []
  }
})
</script>

<template>
  <div class="flex min-h-screen bg-base-100 pt-16">
    <section class="flex-1 p-6">
      <div class="flex items-center mb-4">
        <div>
          <button
            class="btn px-6 py-2 rounded-xl font-semibold text-white bg-[#3399FF] hover:bg-[#FFD966] hover:text-[#3399FF] shadow transition"
            @click="openAddModal"
          >
            + Tambah Kursus
          </button>
        </div>
        <div class="flex-1 flex justify-center">
          <h2 class="text-2xl font-semibold text-center">📚 Daftar Kursus Anda</h2>
        </div>
      </div>
      <!-- Tambahkan margin bawah agar ada jarak antara tombol dan daftar course -->
      <div class="mb-8"></div>
      <div v-if="courses.length === 0" class="text-gray-500 py-10 text-center">
        Belum ada kursus yang Anda buat.
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="course in courses"
          :key="course.id"
          class="card bg-base-100 shadow-xl border-2 border-[#3399FF] rounded-xl"
        >
          <figure>
            <img :src="course.thumbnail_url" alt="course cover" />
          </figure>
          <div class="card-body">
            <h2 class="card-title flex items-center gap-2">
              {{ course.title }}
              <span
                v-if="course.is_published"
                class="px-2 py-1 text-xs rounded bg-green-100 text-green-700 font-semibold"
              >
                Published
              </span>
              <span
                v-else
                class="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700 font-semibold"
              >
                Draft
              </span>
            </h2>
            <p>{{ course.description }}</p>
            <div class="card-actions justify-end">
              <NuxtLink
                :to="`/instructor/courses/${course.id}/manage`"
                class="btn btn-sm btn-primary"
              >
                Kelola
              </NuxtLink>
              <button class="btn btn-sm btn-outline ml-2" @click="openModal(course)">
                Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Tambah Kursus -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg relative">
        <button class="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost" @click="closeAddModal">
          <span aria-label="Close">&times;</span>
        </button>
        <h3 class="text-xl font-bold mb-4">Tambah Kursus Baru</h3>
        <form @submit.prevent="handleAddCourse">
          <div class="mb-4">
            <label class="block font-semibold mb-1">Judul Kursus</label>
            <input v-model="form.title" type="text" class="input input-bordered w-full" required />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Deskripsi</label>
            <textarea v-model="form.description" class="textarea textarea-bordered w-full" required></textarea>
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Cover Kursus</label>
            <input
              type="file"
              accept="image/*"
              class="file-input file-input-bordered w-full"
              @change="onThumbnailChange"
              required
            />
            <div v-if="thumbnailError" class="text-red-500 mt-2">{{ thumbnailError }}</div>
            <div v-if="form.thumbnail_url" class="mt-2">
              <img :src="form.thumbnail_url" alt="Preview" class="rounded w-full max-h-40 object-cover" />
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-6">
            <button type="button" class="btn btn-outline btn-sm" @click="closeAddModal">Batal</button>
            <button type="submit" class="btn btn-primary btn-sm">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Kelola Kursus -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg relative">
        <button class="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost" @click="closeModal">
          <span aria-label="Close">&times;</span>
        </button>
        <h3 class="text-xl font-bold mb-4">Kelola Kursus</h3>
        <img :src="selectedCourse.thumbnail_url" alt="cover" class="w-full h-40 object-cover rounded mb-4" />
        <div class="mb-2">
          <strong>Judul:</strong> {{ selectedCourse.title }}
        </div>
        <div class="mb-2">
          <strong>Deskripsi:</strong> {{ selectedCourse.description }}
        </div>
        <div class="flex gap-3 mt-6">
          <NuxtLink :to="`/instructor/courses/${selectedCourse.id}/edit`" class="btn btn-outline btn-sm">Edit Kursus</NuxtLink>
          <NuxtLink :to="`/instructor/courses/${selectedCourse.id}/sections`" class="btn btn-outline btn-sm">Kelola Materi</NuxtLink>
          <NuxtLink :to="`/instructor/courses/${selectedCourse.id}/students`" class="btn btn-outline btn-sm">Lihat Peserta</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>