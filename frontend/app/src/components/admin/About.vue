<script setup>
import Input from '@/components/common/Input.vue'
import Textarea from '@/components/common/Textarea.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import useAbout from '../../composable/useAbout.ts'
import { onMounted, nextTick, ref } from 'vue'
import { useRouter } from "vue-router"
const labelName = '名前'
const labelCertification = '資格'
const labelIntroduction = '自己紹介'
const labelSpeciality = '専門分野'
const labelExperience = '開発経験'
const labelStrength = 'アピールポイント'
const submitType = 'submit'
const submitName = '保存'
const router = useRouter();
const isNil = ref(true)
const { about, createAbout, getAbout, updateAbout } = useAbout();
const onUpdateName = (value)=>{
    about.value.name = value.target.value;
}
const onUpdateIntroduction = (value)=>{
    about.value.introduction = value;
}
const onUpdateCertification = (value)=>{
    about.value.certification = value.target.value;
}
const onUpdateSpeciality = (value)=>{
    about.value.speciality = value.target.value;
}
const onUpdateExperience = (value)=>{
    about.value.experiences = value;
}
const onUpdateStrength = (value)=>{
    about.value.strength = value;
}
onMounted(async () => {
    const res = await getAbout();
    if(res.value.data !== "nil"){
        isNil.value = false;
        about.value = {...res.value}
        console.log("nilではありません");
    }
    await nextTick();
});
const onUpdate = async()=>{
    try{
        const data = await updateAbout(about.value);
        console.log(data);
    }catch (error) {
        console.log("error:", error);
    }
    router.push({  name: 'adminDashboard' })
}
const onSubmit = async()=>{
    try{
        const data = await createAbout(about.value);
        console.log(data);
    }catch (error) {
        console.log("error:", error);
    }
    router.push({  name: 'adminDashboard' })
}
</script>
<template>
    <div class="bg-gradient-to-r from-cyan-500 to-yellow-500">
        <h2 v-if="isNil" class="text-white font-bold text-xl underline underline-offset-4 p-8">About作成画面</h2>
        <h2 v-else="isNil" class="text-white font-bold text-xl underline underline-offset-4 p-8">About編集画面</h2>
        <div class="flex flex-col md:flex-row md:flex-wrap md:gap-4 justify-center items-center">
            <div class="bg-white border border-indigo-500 rounded-lg p-8">
                <div class="md:grid grid-cols-2 md:gap-4">
                    <Input 
                    :label-name="labelName" 
                    :input-value="about.name"
                    @input = "onUpdateName"
                    ></Input>
                    <Input 
                    :label-name="labelCertification" 
                    :input-value="about.certification"
                    @input = "onUpdateCertification"
                    ></Input>
                    <Input 
                    :label-name="labelSpeciality" 
                    :input-value="about.speciality"
                    @input = "onUpdateSpeciality"
                    ></Input>
                </div>
                    <Textarea 
                    :label-name="labelIntroduction" 
                    :textarea-value="about.introduction"
                    @input = "onUpdateIntroduction"
                    ></Textarea>
                    <Textarea 
                    :label-name="labelExperience" 
                    :textarea-value="about.experiences"
                    @input = "onUpdateExperience"
                    ></Textarea>
                    <Textarea 
                    :label-name="labelStrength" 
                    :textarea-value="about.strength"
                    @input = "onUpdateStrength"
                    ></Textarea>
                <div class="">
                    <PrimaryButton v-if="isNil"
                    :type="submitType" 
                    :name="submitName" 
                    @click="onSubmit"
                    ></PrimaryButton>
                    <PrimaryButton v-else="isNil"
                        :type="submitType" 
                        :name="submitName" 
                        @click="onUpdate"
                    ></PrimaryButton>
                </div>
            </div>
        </div>
    </div>
</template>