<template>
  <section class="p-6 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">👨‍🏫 Profil Instruktur</h2>

    <div class="card bg-base-100 shadow-md">
      <div class="card-body">
        <div class="flex items-center gap-4">
          <div class="avatar">
            <div class="w-16 rounded-full">
              <img src="https://i.pravatar.cc/300" alt="Profile" />
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold">{{ profile.name }}</h3>
            <p class="text-sm text-gray-500">{{ profile.email }}</p>
          </div>
        </div>

        <div class="mt-4 space-y-2">
          <p><strong>Bidang:</strong> {{ profile.specialty }}</p>
          <p><strong>Bergabung sejak:</strong> {{ profile.joined }}</p>
        </div>

        <div class="card-actions mt-6">
          <button class="btn btn-sm btn-outline">Edit Profil</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'instructor'
})

const profile = {
  name: 'Pujiatmo Subarkah',
  email: 'puji@inoland.id',
  specialty: 'Statistik, Remote Sensing & GIS',
  joined: 'Maret 2024',
}
</script>
