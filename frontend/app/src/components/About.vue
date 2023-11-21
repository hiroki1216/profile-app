<script setup>
import useAbout from '../composable/useAbout.ts'
import { onMounted } from 'vue'
const { about, getAbout } = useAbout();
onMounted(async () => {
    const res  =  await getAbout();
    about.value = {...res.value}
})
</script>
<template>
    <h2>About</h2>
    <div>
        <p>ID: {{ about.ID }}</p>
        <p>CreatedAt: {{ about.CreatedAt }}</p>
        <p>UpdatedAt: {{ about.UpdatedAt }}</p>
        <p>Name: {{ about.name }}</p>
        <p>Introduction: {{ about.introduction }}</p>
        <p>Certification: {{ about.certification }}</p>
        <p>Speciality: {{ about.speciality }}</p>
        <p>Experiences: {{ about.experiences }}</p>
        <p>Strength: {{ about.strength }}</p>
    </div>
</template>
<style scoped>
</style>