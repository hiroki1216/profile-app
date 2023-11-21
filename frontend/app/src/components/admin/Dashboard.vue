<script setup>
import useAbout from '../../composable/useAbout.ts'
import useWork from '../../composable/useWork.ts'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import DangerButton from '@/components/common/DangerButton.vue'
import GreenButton from '@/components/common/GreenButton.vue'
import Input from '@/components/common/Input.vue'
import Textarea from '@/components/common/Textarea.vue'
import { onMounted, nextTick,ref } from 'vue'
import { useRouter } from "vue-router";

const isNil = ref(true);
const isEmpty = ref(true);
const router = useRouter();
const { works, getWorks, deleteWork } = useWork();
const { about, getAbout } = useAbout();
const goToAbout = (async()=>{
    router.push({ name: 'about'})
});
const fetchWorkData = (async(id)=>{
    router.push({ name: 'workEdit', params: { id: id } })
});
const deleteWorkData = (async(item)=>{
    await deleteWork(item);
    router.go(router.currentRoute.path)
});
onMounted(async () => {
    const resAbout  =  await getAbout();
    if(resAbout.value.data !== "nil"){
        isNil.value = false;
        about.value = {...resAbout.value};
    }
    const resWorks  =  await getWorks();
    if(resWorks.value.length !== 0){
        isEmpty.value = false;
        works.value = {...resWorks.value}
    }
    await nextTick();
});
</script>
<template>
    <div class="bg-gradient-to-r from-cyan-500 to-yellow-500 h-screen">
        <h1 class="text-white font-bold text-xl underline underline-offset-4 p-8">Admin Dashboard</h1>
        <div class="flex flex-col md:flex-row md:ml-6 items-center justify-center pt-8">
            <div class="basis-1/2 overflow-auto fixedborder-solid border-2 border-indigo-500 rounded-lg bg-white min-h-full h-96 p-10 md:mr-8 max-md:mb-8">
                <h1 class="text-xl underline underline-offset-4 mb-4">Works</h1>
                <div v-if="isEmpty">
                    <p class="text-gray-400">Worksが登録されていません。</p>
                </div>
                <div v-else>
                    <ul v-for="(item, index) in works" :key="index">
                        <li class="mb-4 grid grid-cols-2 justify-items-center">
                            <a class="cursor-pointer text-blue-500 hover:underline mr-8" @click.prevent = "fetchWorkData(item.ID)">projectName: {{ item.projectName }}</a>
                            <div>
                                <DangerButton
                                    class="mr-4"
                                    :type="'button'" 
                                    :name="'削除'" 
                                    @click="deleteWorkData(item)"
                                >
                                </DangerButton>
                                <GreenButton
                                    :type="'button'" 
                                    :name="'更新'" 
                                    @click="fetchWorkData(item.ID)"
                                >
                                </GreenButton>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="relative basis-1/2 overflow-auto border-solid border-2 border-indigo-500 rounded-lg bg-white h-96 max-h-full p-10 md:mr-6">
                <h1 class="text-xl underline underline-offset-4 mb-4">About</h1>
                <div v-if="isNil">
                    <p class="mb-4 text-gray-400">Aboutが登録されていません。</p>
                    <PrimaryButton
                        :type="'button'" 
                        :name="'About登録ページへ'" 
                        @click="goToAbout"
                    >
                    </PrimaryButton>
                </div>
                <div v-else="isNil">
                    <div class="grid justify-items-center">
                        <!-- <p>ID: {{ about.ID }}</p>
                        <p>CreatedAt: {{ about.CreatedAt }}</p>
                        <p>UpdatedAt: {{ about.UpdatedAt }}</p> -->
                        <Input 
                        :label-name="'名前'" 
                        :input-value="about.name"
                        :isDisabled = true
                        ></Input>
                        <Textarea 
                        :label-name="'自己紹介'" 
                        :textarea-value="about.introduction"
                        :isDisabled = true
                        ></Textarea>
                        <Input 
                        :label-name="'資格'" 
                        :input-value="about.certification"
                        :isDisabled = true
                        ></Input>
                        <Input 
                        :label-name="'専門分野'" 
                        :input-value="about.speciality"
                        :isDisabled = true
                        ></Input>
                        <Textarea 
                        :label-name="'開発経験'" 
                        :textarea-value="about.experiences"
                        :isDisabled = true
                        ></Textarea>
                        <Textarea 
                        :label-name="'アピールポイント'" 
                        :textarea-value="about.strength"
                        :isDisabled = true
                        ></Textarea>
                    </div>
                    <GreenButton
                        class="sticky bottom-0 float-right"
                        :type="'button'" 
                        :name="'About編集ページへ'" 
                        @click="goToAbout"
                    >
                    </GreenButton>
                </div>
            </div>
        </div>
    </div>
</template>