
<template>
  <div class="min-h-screen font-poppins pt-16">
    <reimage />
    <div class="my-8"></div>
    <FeaturesCourse />
    <testimoni />
    <!-- MapSection removed as requested -->
  </div>
</template>



<script setup>
import reimage from '~/components/reimage.vue'
import FeaturesCourse from '~/components/FeaturesCourse.vue'
import testimoni from '~/components/testimoni.vue'
// Halaman selamat datang Cloud Campus

definePageMeta({
  layout: 'default'
})
</script>
