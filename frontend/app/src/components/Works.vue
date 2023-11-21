<script setup>
import useWork from '../composable/useWork.ts'
import { onMounted } from 'vue'
const { works, getWorks } = useWork();
onMounted(async () => {
    const res  =  await getWorks();
    works.value = {...res.value}
})
</script>
<template>
    <h2>Works</h2>
    <div v-for="(item, index) in works" :key="index">
      <p>ID: {{ item.ID }}</p>
      <p>CreatedAt: {{ item.CreatedAt }}</p>
      <p>UpdatedAt: {{ item.UpdatedAt }}</p>
      <p>projectName: {{ item.projectName }}</p>
      <p>language: {{ item.language }}</p>
      <p>framework: {{ item.framework }}</p>
      <p>tool: {{ item.tool }}</p>
      <p>introduction: {{ item.introduction }}</p>
      <p>responsible: {{ item.responsible }}</p>
      <p>acquiredSkill: {{ item.acquiredSkill }}</p>
      <hr />
    </div>
  </template>
<style scoped>
</style>