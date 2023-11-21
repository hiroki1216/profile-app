<script setup>
defineProps({
  labelName: String,
  textareaValue: String,
  isDisabled: Boolean,
})
</script>
<template>
  <div>
    <label class="mb-4" :for="labelName">{{ labelName }}</label>
    <br>
    <textarea class="mt-1 px-3 py-2 bg-white border shadow-md border-slate-300 focus:outline-none focus:border-pink-500 focus:ring-pink-500 block rounded-md sm:text-sm focus:ring-1 md:w-96 h-24 mb-8 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" :id="labelName" :disabled="isDisabled">{{ textareaValue }}</textarea>
  </div>
</template>