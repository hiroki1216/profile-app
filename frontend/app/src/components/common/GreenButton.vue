<script setup>
import { PencilSquareIcon } from '@heroicons/vue/24/outline'

defineProps({
    type: String,
    name: String,
})
</script>
<template>
  <button class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded w-fit " :type="type">
  <PencilSquareIcon class="h-5 w-5 text-white cursor-pointer"/>
  </button>
</template>