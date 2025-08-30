// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { id: string; name: string; role_id: number; email: string; token?: string },
  }),
  persist: true, // 🔥 Ini tetap dipakai!
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    login(user: { id: string; name: string; role_id: number; email: string; token?: string }) {
      this.user = user
    },
    logout() {
      this.user = null
    },
  },
})
