<template>
        
  <div class="min-h-screen bg-white flex pt-20 font-poppins">
    <sidebar_forum />
    <div class="flex-1 p-8 overflow-y-auto">
      <div
        class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border-t-4 border-yellow-400 relative"
      >
        <h1
          class="text-3xl font-bold text-blue-900 mb-2 text-center drop-shadow-lg"
        >
          Makarti Forum
        </h1>

        <p class="text-lg text-blue-700 mb-6 text-center">
          Tempat diskusi, berbagi ide, dan kolaborasi antar peserta Makarti
          Corpu.
        </p>

        <!-- Button Buat Topik Baru setelah deskripsi forum -->
        <div class="flex justify-end mb-6">
          <button
            @click="showTopicModal = true"
            class="bg-gradient-to-r from-yellow-400 to-yellow-200 text-blue-900 font-semibold px-6 py-3 rounded-lg shadow-md flex items-center gap-2 hover:from-yellow-500 hover:to-yellow-300 transition"
          >
            <i class="fas fa-plus-circle text-yellow-600"></i>
            Buat Topik Baru
          </button>
        </div>




<!-- Modal Buat Topik Baru -->
        <div v-if="showTopicModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
            <!-- Tombol close -->
            <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700" @click="showTopicModal = false">
              <i class="fas fa-times text-xl"></i>
            </button>
            <h2 class="text-xl font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <i class="fas fa-plus-circle text-yellow-400"></i>
              Buat Topik Baru
            </h2>
            <form @submit.prevent="createTopic" class="flex flex-col gap-4">
              <input
                v-model="newTopic.title"
                type="text"
                placeholder="Judul Topik"
                class="border border-yellow-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <textarea
                v-model="newTopic.description"
                rows="4"
                placeholder="Deskripsi atau pertanyaan..."
                class="border border-yellow-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              ></textarea>
              <div class="flex gap-3 justify-end">
                <button
                  type="button"
                  class="bg-gray-200 text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition-all shadow flex items-center gap-2"
                  @click="showTopicModal = false"
                >
                  <i class="fas fa-times"></i>
                  Batal
                </button>
                <button
                  type="submit"
                  class="bg-gradient-to-r from-blue-700 to-blue-900 text-yellow-300 font-semibold px-6 py-3 rounded-lg hover:from-blue-800 hover:to-blue-900 transition-all shadow-md flex items-center gap-2 justify-center"
                >
                  <i class="fas fa-paper-plane"></i>
                  Kirim Topik
                </button>
              </div>
            </form>
          </div>
        </div>


 


        <!-- Forum Terbaru -->
        <div
          class="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-lg p-6 shadow-md border-l-4 border-yellow-400"
        >
          <h2
            class="text-xl font-semibold text-yellow-300 mb-3 flex items-center gap-2"
          >
            <i class="fas fa-comments text-yellow-300"></i>
            Forum Terbaru
          </h2>

          <div v-if="loading" class="text-yellow-200">Loading topik...</div>
          <div v-else class="space-y-3">
            <div
              v-for="topic in topics"
              :key="topic.id"
              class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-300 mb-2"
            >
              <div
                class="cursor-pointer hover:bg-yellow-50 transition"
                @click="toggleReplies(topic)"
              >
                <h3 class="font-semibold text-blue-900">{{ topic.title }}</h3>
                <p class="text-sm text-blue-700 mt-1">
                  {{ topic.replies_count }} balasan •
                  {{ formatTime(topic.last_reply_at) }}
                </p>
              </div>

              <!-- Detail & Replies -->
              <div
                v-if="selectedTopic && selectedTopic.id === topic.id"
                class="mt-4"
              >
                <p class="text-blue-700 mb-2">{{ selectedTopic.description }}</p>

                <!-- List Balasan -->
                <div v-if="repliesLoading" class="text-yellow-400">
                  Loading balasan...
                </div>
                <div
                  v-else-if="replies.length === 0"
                  class="text-gray-400"
                >
                  Belum ada balasan.
                </div>
                <div v-else class="space-y-3">
                  <div
                    v-for="reply in replies"
                    :key="reply.id"
                    class="bg-yellow-50 p-3 rounded pl-6 flex gap-3 items-start"
                  >
                    <img
                      v-if="reply.avatar_seed"
                      :src="`https://api.dicebear.com/7.x/thumbs/svg?seed=${reply.avatar_seed}`"
                      alt="avatar"
                      class="w-8 h-8 rounded-full border border-yellow-300"
                    />
                    <div class="flex-1">
                      <div class="text-blue-900 font-semibold flex items-center gap-2">
                        <span>{{ reply.full_name || 'Anonim' }}</span>
                        <span class="text-xs text-gray-400">{{ formatTime(reply.created_at) }}</span>
                      </div>
                      <div class="mt-1">{{ reply.content }}</div>
                    </div>
                  </div>
                </div>

                <!-- Form Balasan Baru -->
                <form
                  v-if="isLoggedIn"
                  @submit.prevent="createReply(topic.id)"
                  class="mt-4 flex flex-col gap-2"
                >
                  <textarea
                    v-model="newReply"
                    rows="2"
                    placeholder="Tulis balasan..."
                    class="border border-yellow-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    class="self-end bg-gradient-to-r from-blue-700 to-blue-900 text-yellow-300 font-semibold px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-900 transition-all shadow-md flex items-center gap-2"
                  >
                    <i class="fas fa-reply"></i>
                    Balas
                  </button>
                </form>

                <!-- Kalau belum login -->
                <div v-else class="mt-4 text-red-600 font-medium">
                  ⚠️ Kamu harus login dulu untuk membalas.
                </div>
              </div>
            </div>
          </div>
        </div>

      
  <!-- ...existing code... -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import sidebar_forum from '~/components/sidebar_forum.vue'
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

// State
const topics = ref<any[]>([])
const loading = ref(true)
const newTopic = ref({ title: '', description: '' })
const selectedTopic = ref<any | null>(null)
const replies = ref<any[]>([])
const repliesLoading = ref(false)
const newReply = ref('')
const auth = useAuthStore()
const showTopicModal = ref(false) // harus ada sebelum dipakai
const isLoggedIn = computed(() => auth.isLoggedIn) // auth harus hasil useAuthStore()

// Toggle replies section
const toggleReplies = async (topic: any) => {
  if (selectedTopic.value && selectedTopic.value.id === topic.id) {
    selectedTopic.value = null
    replies.value = []
    return
  }
  selectedTopic.value = topic
  replies.value = []
  repliesLoading.value = true
  try {
    const res = await $fetch(`/api/topics/${topic.id}/posts`)
    replies.value = Array.isArray(res) ? res : []
  } catch (e) {
    replies.value = []
  } finally {
    repliesLoading.value = false
  }
}

// Fetch topics
const fetchTopics = async () => {
  try {
    const res = await $fetch('/api/topics')
    topics.value = Array.isArray(res) ? res : []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

// Create topic
const createTopic = async () => {
  try {
    await $fetch('/api/topics', {
      method: 'POST',
      body: newTopic.value,
    })
    newTopic.value = { title: '', description: '' }
    fetchTopics() // refresh list
  } catch (e) {
    console.error(e)
  }
}

// Create reply
const createReply = async (topicId: number) => {
  if (!newReply.value.trim()) return
  try {
    await $fetch(`/api/topics/${topicId}/posts`, {
      method: 'POST',
      body: {
        user_id: 1, // TODO: ganti sesuai user login
        content: newReply.value,
      },
    })
    newReply.value = ''
    // Refresh replies setelah submit
    const res = await $fetch(`/api/topics/${topicId}/posts`)
    replies.value = Array.isArray(res) ? res : []
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  fetchTopics()
})

// Format waktu (simple)
const formatTime = (time: string) => {
  return new Date(time).toLocaleString('id-ID')
}
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>
