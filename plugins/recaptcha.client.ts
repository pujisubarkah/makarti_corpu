// plugins/recaptcha.client.ts
import { defineNuxtPlugin } from '#app'
import { VueReCaptcha } from 'vue-recaptcha-v3'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: 'YOUR_SITE_KEY', // Ganti dengan yang dari Google
    loaderOptions: {
      useRecaptchaNet: true,
      autoHideBadge: true,
    }
  })
})
