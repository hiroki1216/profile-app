<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'

defineProps({
    type: String,
    name: String,
})
</script>
<template>
  <button class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded w-fit " :type="type">
  <TrashIcon class="h-5 w-5 text-white cursor-pointer"/>
  </button>
</template>