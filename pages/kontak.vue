<script setup>
import LeafletMap from '@/components/LeafletMap.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-poppins pt-40 pb-40">
    <div class="container mx-auto px-4 max-w-2xl">
      <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-blue-600">
        <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Kontak Akademi Pengentasan Kemiskinan</h1>
        <p class="text-gray-700 mb-6">
          Jika Anda memiliki pertanyaan, masukan, atau ingin berkolaborasi, silakan hubungi kami melalui form di bawah atau kontak resmi berikut.
        </p>
        <div class="mb-8">
          <div class="mb-4">
            <span class="font-semibold text-blue-700">Email:</span>
            <a href="mailto:info@pengentasankemiskinan.id" class="text-blue-600 hover:underline ml-2">info@pengentasankemiskinan.id</a>
          </div>
          <div class="mb-4">
            <span class="font-semibold text-blue-700">Telepon:</span>
            <span class="ml-2">021-12345678</span>
          </div>
          <div class="mb-4">
            <span class="font-semibold text-blue-700">Alamat:</span>
            <span class="ml-2">Jl. Purnawarman No 99, Kebayoran Baru, Jakarta Selatan</span>
          </div>
        </div>
        <form class="space-y-4 mt-8">
          <div>
            <input type="text" placeholder="Nama Anda" class="input input-bordered w-full" />
          </div>
          <div>
            <input type="email" placeholder="Email Anda" class="input input-bordered w-full" />
          </div>
          <div>
            <textarea placeholder="Pesan Anda" class="textarea textarea-bordered w-full" rows="4"></textarea>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="btn btn-primary px-8">Kirim Pesan</button>
          </div>
        </form>
        <div class="mt-8">
          <div class="rounded-xl overflow-hidden shadow-lg border border-blue-200">
            <iframe
              src="https://www.google.com/maps?q=Lembaga+Administrasi+Negara,+Jl.+Veteran+No.10,+Jakarta&output=embed"
              width="100%"
              height="450"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>