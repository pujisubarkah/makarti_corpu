<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Pengaturan Platform</h1>

    <!-- General Settings -->
    <div class="bg-base-100 p-4 rounded-box shadow mb-6">
      <h2 class="text-xl font-semibold mb-2">General Settings</h2>
      <div class="form-control mb-2">
        <label class="label">Nama Platform</label>
        <input type="text" class="input input-bordered" v-model="settings.platformName" />
      </div>
      <div class="form-control mb-2">
        <label class="label">Upload Logo</label>
        <input type="file" class="file-input file-input-bordered" />
      </div>
    </div>

    <!-- Email Settings -->
    <div class="bg-base-100 p-4 rounded-box shadow mb-6">
      <h2 class="text-xl font-semibold mb-2">Email Settings</h2>
      <div class="form-control mb-2">
        <label class="label">SMTP Host</label>
        <input type="text" class="input input-bordered" v-model="settings.smtpHost" />
      </div>
      <div class="form-control mb-2">
        <label class="label">SMTP Port</label>
        <input type="number" class="input input-bordered" v-model="settings.smtpPort" />
      </div>
    </div>

    <!-- Auth Settings -->
    <div class="bg-base-100 p-4 rounded-box shadow mb-6">
      <h2 class="text-xl font-semibold mb-2">Authentication</h2>
      <label class="cursor-pointer label">
        <span class="label-text">Enable Google Login</span>
        <input type="checkbox" class="toggle toggle-primary" v-model="settings.enableGoogle" />
      </label>
      <label class="cursor-pointer label">
        <span class="label-text">Enable 2FA</span>
        <input type="checkbox" class="toggle toggle-primary" v-model="settings.enable2FA" />
      </label>
    </div>

    <!-- Save Button -->
    <button class="btn btn-primary" @click="saveSettings">Simpan Pengaturan</button>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main'
})

const settings = reactive({
  platformName: 'Jarjit LMS',
  smtpHost: '',
  smtpPort: 587,
  enableGoogle: false,
  enable2FA: false,
})

const saveSettings = () => {
  console.log('Settings disimpan:', settings)
  // TODO: POST ke API atau simpan di Supabase / database lain
}
</script>
