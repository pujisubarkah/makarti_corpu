<template>
  <div>
    <p class="mb-4">Pertanyaan: Apa ibukota Indonesia?</p>
    <div class="form-control">
      <label class="label cursor-pointer">
        <input type="radio" name="quiz" class="radio checked:bg-blue-500" />
        <span class="label-text ml-2">Jakarta</span>
      </label>
      <label class="label cursor-pointer">
        <input type="radio" name="quiz" class="radio checked:bg-red-500" />
        <span class="label-text ml-2">Bandung</span>
      </label>
    </div>
    <button class="btn btn-accent mt-4" @click="$emit('completed')">Kirim Jawaban</button>
  </div>
</template>

<script setup>
defineProps(['section'])
</script>
