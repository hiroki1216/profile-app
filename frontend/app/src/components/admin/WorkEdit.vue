<script setup>
import Input from '@/components/common/Input.vue'
import Textarea from '@/components/common/Textarea.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import useWork from '../../composable/useWork.ts'
import { onMounted } from 'vue'
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { TINYMCE_API_KEY, TINYMCE_INIT_OPTIONS } from '@/constants'
import Editor from '@tinymce/tinymce-vue'

const router = useRouter();
const route = useRoute();
const labelProjectName = 'プロジェクト名'
const labelLanguage = '言語'
const labelFramework = 'フレームワーク'
const labelTool = 'ツール・その他'
const labelIntroduction = 'プロジェクト詳細'
const labelResponsible = '担当業務'
const labelAcquiredSkill = '身につけたスキル'
const submitType = 'submit'
const submitName = '保存'
const { work, getWork, updateWork }= useWork();
const id = route.params.id;
onMounted(async () => {
    const res = await getWork(id);
    work.value = {...res.value}
});
const onUpdateProjectName  = (value)=>{
    work.value.projectName = value.target.value;
}
const onUpdateLanguage = (value)=>{
    work.value.language = value.target.value;
}
const onUpdateFramework = (value)=>{
    work.value.framework = value.target.value;
}
const onUpdateTool = (value)=>{
    work.value.tool = value.target.value;
}
const onUpdateIntroduction = (value)=>{
    work.value.introduction = value;
}
const onUpdateResponsible  = (value)=>{
    work.value.responsible = value;
}
const onUpdateAcquiredSkill = (value)=>{
    work.value.acquiredSkill = value;
}
const onSubmit = async()=>{
    try{
        const data = await updateWork(work.value, id);
        console.log(data);
    }catch (error) {
        console.log("error:", error);
    }
    router.push({ name: 'adminDashboard' })
}
</script>
<template>
    <div class="bg-gradient-to-r from-cyan-500 to-yellow-500">
        <h2 class="text-white font-bold text-xl underline underline-offset-4 p-8">Work編集画面</h2>
        <div class="flex flex-col md:flex-row md:flex-wrap md:gap-4 justify-center items-center">
            <div class="bg-white border border-indigo-500 rounded-lg p-8">
                <div class="md:grid grid-cols-2 md:gap-4">
                    <Input 
                        :label-name="labelProjectName" 
                        :input-value="work.projectName"
                        @input = "onUpdateProjectName"
                    ></Input>
                    <Input 
                        :label-name="labelLanguage" 
                        :input-value="work.language"
                        @input = "onUpdateLanguage"
                    ></Input>
                    <Input 
                        :label-name="labelFramework" 
                        :input-value="work.framework"
                        @input = "onUpdateFramework"
                    ></Input>
                    <Input 
                        :label-name="labelTool" 
                        :input-value="work.tool"
                        @input = "onUpdateTool"
                    ></Input>
                </div>
                <Textarea 
                    :label-name="labelIntroduction" 
                    :textarea-value="work.introduction"
                    @input = "onUpdateIntroduction"
                ></Textarea>
                <Textarea 
                    :label-name="labelResponsible" 
                    :textarea-value="work.responsible"
                    @input = "onUpdateResponsible"
                ></Textarea>
                <Textarea 
                    :label-name="labelAcquiredSkill" 
                    :textarea-value="work.acquiredSkill"
                    @input = "onUpdateAcquiredSkill"
                ></Textarea>
                <PrimaryButton 
                    :type="submitType" 
                    :name="submitName" 
                    @click="onSubmit"
                ></PrimaryButton>
            </div>
        </div>
    </div>
</template>