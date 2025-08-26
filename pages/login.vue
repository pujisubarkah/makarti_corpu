<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center p-4">
    <div class="w-full max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        <!-- Left Side - Illustration & Branding -->
        <div class="flex flex-col items-center justify-center text-center lg:text-left space-y-6">
          <!-- Hero Image -->
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <img 
              src="/LAN_9736.JPG" 
              alt="Learning Platform" 
              class="relative w-full max-w-lg rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500" 
            />
          </div>

          <!-- Branding Text -->
          <div class="space-y-4">
            <div class="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div class="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 p-3 rounded-2xl shadow-lg border-2 border-yellow-400">
                <svg class="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/>
                </svg>
              </div>
              <h1 class="text-3xl lg:text-4xl font-bold text-blue-900 drop-shadow-lg mt-20" style="text-shadow: 0 2px 8px #FFD966, 0 0px 0px #FFD966, 1px 1px 0 #FFD966, -1px -1px 0 #FFD966;">
                Makarti Corpu
              </h1>
            </div>
            
            <p class="text-lg text-blue-700 leading-relaxed max-w-md mx-auto lg:mx-0">
              Platform pembelajaran untuk membangun kompetensi ASN yang unggul dan profesional
            </p>

            <!-- Features -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-md mx-auto lg:mx-0">
              <div class="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-3 rounded-xl border-l-4 border-yellow-400">
                <div class="bg-green-100 p-2 rounded-lg">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700">Pembelajaran Terakreditasi</span>
              </div>
              
              <div class="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-3 rounded-xl border-l-4 border-yellow-400">
                <div class="bg-blue-100 p-2 rounded-lg">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700">Akses 24/7</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Login Forms -->
        <div class="flex flex-col items-center justify-center">
          
          <!-- Welcome Form - Institution Selection -->
          <div v-if="!showOtherForm" class="w-full max-w-md">
            <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border-l-4 border-yellow-400 p-8 space-y-6">
              <!-- Header -->
              <div class="text-center space-y-3">
                <div class="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg border-2 border-yellow-400">
                  <svg class="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-blue-900">Selamat Datang!</h2>
                <p class="text-blue-700">Masuk ke platform pembelajaran Makarti Corpu</p>
              </div>

              <!-- Login Button -->
              <div class="space-y-4">
                <button @click="showOtherForm = true" class="group w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-900 text-yellow-300 font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
                  <div class="bg-white/20 p-2 rounded-lg">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <span>Masuk ke Platform</span>
                  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </button>
              </div>

              <!-- Security Notice -->
              <div class="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-4 text-center">
                <div class="flex items-center justify-center gap-2 mb-2">
                  <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                  <span class="font-semibold text-yellow-800">Penting!</span>
                </div>
                <p class="text-sm text-yellow-700">
                  Gunakan akun Anda secara bijak dan <strong>JANGAN</strong> bagi pakai kepada orang lain.
                </p>
              </div>
            </div>
          </div>

          <!-- Login Form -->
          <div v-else class="w-full max-w-md">
            <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border-l-4 border-yellow-400 p-8 space-y-6">
              <!-- Back Button -->
              <button @click="showOtherForm = false" class="flex items-center gap-2 text-blue-700 hover:text-yellow-400 transition-colors duration-200 group">
                <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                <span class="font-medium">Kembali</span>
              </button>

              <!-- Header -->
              <div class="text-center space-y-3">
                <div class="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg border-2 border-yellow-400">
                  <svg class="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-blue-900">Masuk ke Akun</h2>
                <p class="text-blue-700">Masuk dengan email dan kata sandi Makarti Anda</p>
              </div>

              <!-- Login Form -->
              <form @submit.prevent="handleSubmit" class="space-y-5">
                <!-- Email Input -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Email</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                      </svg>
                    </div>
                    <input
                      type="email"
                      v-model="email"
                      placeholder="nama@email.com"
                      class="w-full pl-12 pr-4 py-3 border-2 border-yellow-400 rounded-xl focus:border-blue-700 focus:ring-2 focus:ring-yellow-400 transition-colors duration-200 bg-white/50"
                      required
                    />
                  </div>
                </div>

                <!-- Password Input -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Kata Sandi</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </div>
                    <input
                      type="password"
                      v-model="password"
                      placeholder="Masukkan kata sandi"
                      class="w-full pl-12 pr-4 py-3 border-2 border-yellow-400 rounded-xl focus:border-blue-700 focus:ring-2 focus:ring-yellow-400 transition-colors duration-200 bg-white/50"
                      required
                    />
                  </div>
                </div>

                <!-- Error Message -->
                <div v-if="errorMsg" class="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                  <p class="text-red-600 text-sm">{{ errorMsg }}</p>
                </div>

                <!-- Submit Button -->
                <button 
                  type="submit" 
                  :disabled="loading"
                  class="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-900 disabled:from-gray-400 disabled:to-gray-500 text-yellow-300 font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg v-if="loading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ loading ? 'Memproses...' : 'Masuk' }}</span>
                </button>

                <!-- Forgot Password -->
                <div class="text-center">
                  <NuxtLink to="/send-email" class="text-yellow-400 hover:text-blue-700 text-sm font-medium hover:underline transition-colors duration-200">
                    Lupa kata sandi?
                  </NuxtLink>
                </div>
              </form>
            </div>
          </div>

          <!-- User Info (After Login) -->
          <div v-if="auth.user" class="mt-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border-l-4 border-yellow-400 p-4">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 w-10 h-10 rounded-full flex items-center justify-center text-yellow-400 font-bold border-2 border-yellow-400">
                  {{ auth.user?.name?.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <p class="font-semibold text-blue-900">{{ auth.user?.name }}</p>
                  <p class="text-sm text-blue-700">Berhasil masuk</p>
                </div>
              </div>
              <button 
                @click="auth.logout(); router.push('/')" 
                class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200 flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

// Prevent access if already logged in
const auth = useAuthStore()
const router = useRouter()

if (auth.isLoggedIn) {
  router.push('/my')
}

const showOtherForm = ref(false)
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function handleSubmit() {
  loading.value = true
  errorMsg.value = ''
  try {
    type LoginResponse =
      | { success: boolean; user: { id: string; email: string; full_name: string; role_id: number }; error?: undefined }
      | { error: string; success?: undefined; user?: undefined };

    const res: LoginResponse = await ($fetch as any)('/api/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    if ('success' in res && res.success && res.user) {
      auth.login({ 
        id: String(res.user.id), 
        name: res.user.full_name, 
        role_id: Number(res.user.role_id)
      })
      // Redirect sesuai role_id
      if (res.user.role_id === 1) {
        router.push('/admin')
      } else if (res.user.role_id === 2) {
        router.push('/instructor')
      } else {
        router.push('/my')
      }
    } else {
      errorMsg.value = res.error || 'Login gagal. Silakan coba lagi.'
    }
  } catch (err) {
    errorMsg.value = 'Terjadi kesalahan. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.floating {
  animation: float 6s ease-in-out infinite;
}

/* Custom backdrop blur */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

/* Smooth gradient animations */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.gradient-animate {
  background-size: 200% 200%;
  animation: gradient-shift 4s ease infinite;
}
</style>