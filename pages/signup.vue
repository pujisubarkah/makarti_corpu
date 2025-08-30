<template>
  <!-- Tambahkan pt-16 di div utama untuk memberikan space dari navbar -->
  <div class="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-poppins pt-16">
    <!-- Ilustrasi Signup dengan overlay gradient -->
    <div class="hidden md:flex md:w-1/2 items-center justify-center relative p-8">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl m-8"></div>
      <img src="/LAN_9802.JPG" alt="signup" class="max-w-[85%] rounded-2xl shadow-2xl relative z-10" />
    </div>

    <!-- Form Signup dengan design modern -->
    <div class="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
      <div class="w-full max-w-lg">
  <h1 class="text-3xl font-bold text-gray-800 text-center mb-2">Mulai untuk Memberikan Materi</h1>
  <p class="text-gray-600 text-center mb-8">Daftar sebagai pemberi materi/instruktur dan bagikan keahlian Anda kepada ASN lain</p>
        
  <form class="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-gradient-to-r from-blue-400 via-purple-400 to-pink-400 p-10 transition-all duration-300 hover:scale-[1.01]" @submit.prevent="submitSignup">
          <!-- Avatar Selection -->
          <div class="mb-8 flex flex-col items-center">
            <div class="relative group">
              <img 
                :src="avatarUrl" 
                alt="Avatar Preview" 
                class="w-32 h-32 rounded-full shadow-2xl border-4 border-gradient-to-r from-blue-400 via-purple-400 to-pink-400 object-cover transition-all duration-300 group-hover:scale-105"
              />
              <button 
                type="button"
                @click="randomizeAvatar"
                class="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-all duration-200"
                aria-label="Randomize Avatar"
              >
                🎲
              </button>
            </div>
            <p class="text-sm text-gray-700 mt-3 font-medium">Pilih avatarmu — bisa dikustom atau acak</p>
          </div>

          <!-- Input fields dengan animasi hover -->
          <div class="space-y-6">
            <!-- Nama Lengkap -->
            <div class="relative group">
              <input type="text" name="name" placeholder="Nama Lengkap" 
                class="input input-bordered w-full pl-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
                v-model="name" />
              <span class="absolute left-3 top-2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                <User :size="20" />
              </span>
            </div>

            <!-- Email -->
            <div class="relative group">
              <input type="email" name="email" placeholder="Email" 
                class="input input-bordered w-full pl-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
                v-model="email" />
              <span class="absolute left-3 top-2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                <Mail :size="20" />
              </span>
            </div>

            <div class="relative group">
              <input type="text" name="nip" placeholder="NIP (Khusus ASN)" 
                class="input input-bordered w-full pl-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
                v-model="nip" />
              <span class="absolute left-3 top-2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                <IdCard :size="20" />
              </span>
            </div>

            <!-- Password fields dengan layout yang lebih baik -->
            <div class="grid grid-cols-2 gap-4">
              <div class="relative group">
                <input type="password" name="password" placeholder="Kata Sandi" 
                  class="input input-bordered w-full pl-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
                  v-model="password" />
                <span class="absolute left-3 top-2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                  <Lock :size="20" />
                </span>
                <progress class="progress progress-info w-full h-1 mt-2" :value="passwordStrength" max="100"></progress>
                <div class="text-xs text-gray-500 mt-2 space-y-1">
                  <p class="font-medium text-gray-600">Password harus memiliki:</p>
                  <ul class="list-disc list-inside space-y-1">
                    <li>Minimal 1 huruf kapital</li>
                    <li>Minimal 1 huruf kecil</li>
                    <li>Minimal 1 angka</li>
                    <li>Minimal 1 karakter spesial</li>
                    <li>Minimal 8 karakter</li>
                  </ul>
                </div>
              </div>
              <div class="relative group">
                <input type="password" name="password2" placeholder="Ulangi Kata Sandi" 
                  class="input input-bordered w-full pl-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
                  v-model="password2" />
                <span class="absolute left-3 top-2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                  <Lock :size="20" />
                </span>
              </div>
            </div>
          </div>

     
          <!-- Button dengan animasi hover -->
          <button id="submitdata" type="submit" 
            class="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-gradient-to-l hover:scale-105">
            🚀 Mulai Memberikan Materi
          </button>
        <div v-if="error" class="w-full text-center py-3 mb-4 rounded-xl bg-red-100 text-red-700 font-semibold border border-red-300 animate-pulse">
          {{ error }}
        </div>
        </form>

        <!-- Link login -->
        <p class="text-center mt-6 text-gray-600">
          Sudah punya akun? 
          <a href="/login" class="text-blue-600 hover:text-blue-700 font-medium">Masuk sebagai Pembelajar</a>
        </p>
        <p class="text-center mt-2 text-gray-600">
          Atau
        </p>
        <p class="text-center mt-2 text-gray-600">
          <NuxtLink to="/signup" class="text-blue-700 hover:text-yellow-400 text-sm font-medium underline transition-colors duration-200">
            Daftar sebagai Pemberi Materi / Instruktur
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User, IdCard, Mail, Lock } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const name = ref('')
const email = ref('')
const nip = ref('')
const password = ref('')
const password2 = ref('')
const passwordStrength = ref(0)
const isLoading = ref(false)
const error = ref('')

// Avatar handling
const avatarUrl = ref('https://api.dicebear.com/7.x/avataaars/svg?seed=1')
const currentSeed = ref(1)

const randomizeAvatar = () => {
  currentSeed.value = Math.floor(Math.random() * 1000)
  avatarUrl.value = `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentSeed.value}`
}

const validateForm = () => {
  if (!name.value || !email.value || !password.value || !password2.value) {
    error.value = 'Semua field harus diisi'
    return false
  }

  if (password.value !== password2.value) {
    error.value = 'Password tidak sama'
    return false
  }

  if (passwordStrength.value < 60) {
    error.value = 'Password terlalu lemah'
    return false
  }

  return true
}

const submitSignup = async () => {
  try {
    error.value = ''
    if (!validateForm()) return

    isLoading.value = true
    
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: name.value,
        email: email.value,
        password: password.value,
        nip: nip.value || undefined,
        avatar_seed: currentSeed.value.toString()
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Gagal mendaftar')
    }

    // Registration successful
    router.push({
      path: '/login',
      query: { 
        message: 'Pendaftaran berhasil! Silakan login dengan akun Anda.' 
      }
    })

  } catch (e) {
    error.value = (e instanceof Error ? e.message : 'Terjadi kesalahan saat mendaftar')
    console.error('Signup error:', e)
  } finally {
    isLoading.value = false
  }
}

// Initialize with random avatar
randomizeAvatar()
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
}

.border-gradient-to-r {
  border-image: linear-gradient(to right, #3b82f6, #a78bfa, #ec4899) 1;
}
</style>
