<script setup>
defineProps({
    type: String,
    name: String,
})
</script>
<template>
  <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded  w-fit" :type="type">{{ name }}</button>
</template>