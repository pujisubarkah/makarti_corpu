<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl">&times;</button>
      <h2 class="text-xl font-bold mb-6 text-blue-900">Tambah Course Baru</h2>
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium mb-1">Judul Course</label>
          <input v-model="title" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea v-model="description" class="w-full border rounded px-3 py-2" rows="3" required></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Cover Course</label>
          <input type="file" accept="image/*" class="w-full border rounded px-3 py-2" @change="onThumbnailChange" />
          <div v-if="thumbnailError" class="text-red-600 mt-1">{{ thumbnailError }}</div>
          <div v-if="thumbnail_url" class="mt-2">
            <img :src="thumbnail_url" alt="Preview" class="rounded w-full max-h-40 object-cover" />
          </div>
        </div>
        <div class="flex gap-4 mt-6">
          <button type="submit" :disabled="loading" class="btn btn-primary px-6 py-2 font-semibold">
            {{ loading ? 'Menyimpan...' : 'Simpan' }}
          </button>
          <button type="button" @click="$emit('close')" class="btn btn-outline">Batal</button>
        </div>
        <div v-if="errorMsg" class="text-red-600 mt-2">{{ errorMsg }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'


const props = defineProps({
  kompetensiId: { type: [String, Number], required: true }
})
const emit = defineEmits(['close', 'saved'])

const title = ref('')
const description = ref('')
const thumbnail_url = ref('')
const thumbnailError = ref('')
const loading = ref(false)
const errorMsg = ref('')

const auth = useAuthStore()

// Upload cover ke Cloudinary
async function onThumbnailChange(e) {
  const file = e.target.files[0]
  thumbnailError.value = ''
  if (!file) return

  // Validasi ukuran file (max 2 MB)
  if (file.size > 2 * 1024 * 1024) {
    thumbnailError.value = 'Ukuran gambar maksimal 2 MB.'
    return
  }

  loading.value = true

  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'Makarti_corpu')   // ← upload preset kamu
    formData.append('cloud_name', 'dqlfyyigk')          // ← cloud name kamu

    const response = await fetch(
  'https://api.cloudinary.com/v1_1/dqlfyyigk/image/upload', // ✅ tanpa spasi
  {
    method: 'POST',
    body: formData
  }
)

    const result = await response.json()

    if (result.secure_url) {
      thumbnail_url.value = result.secure_url // Simpan URL langsung dari Cloudinary
      console.log('Upload berhasil:', result.secure_url)
    } else {
      thumbnailError.value = result.message || 'Gagal upload ke Cloudinary.'
    }
  } catch (err) {
    thumbnailError.value = 'Terjadi kesalahan saat upload gambar.'
    console.error('Cloudinary upload error:', err)
  } finally {
    loading.value = false
  }
}

const slug = ref('')
watch(title, (val) => {
  slug.value = val.toLowerCase().replace(/ /g, '-')
})

async function handleSubmit() {
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await $fetch('/api/course', {
      method: 'POST',
      body: {
        title: title.value,
        description: description.value,
        slug: slug.value,
        thumbnail_url: thumbnail_url.value,
        instructor_id: auth.user?.id,
        competency_id: props.kompetensiId
      }
    })
    if (res && res.id) {
      emit('saved')
      emit('close')
    } else {
      errorMsg.value = res.error || 'Gagal menambah course.'
      console.error('API error:', res)
    }
  } catch (err) {
    errorMsg.value = 'Terjadi kesalahan. Silakan coba lagi.'
    console.error('Submit exception:', err)
  } finally {
    loading.value = false
  }
}
</script>
