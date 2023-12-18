<script setup>
defineProps({
    labelName: String,
    inputValue: String,
    isDisabled: Boolean,
    invalid: Boolean,
})
const emits = defineEmits(
    ['input']
)
const updateInput = (value) =>{
    emits('input', value);
}

</script>
<template>
    <div class="">
        <label class="mb-4" :for="labelName">{{ labelName }}</label>
        <br>
        <div class="mb-8">
            <input 
            @input="updateInput" 
            :class="{
            'mt-1 mb-1 px-3 py-2 bg-white border shadow-md border-slate-300 focus:outline-none focus:border-pink-500 focus:ring-pink-500 block rounded-md sm:text-sm focus:ring-1 md:w-96 h-8 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none': true,
            'bg-red-100	outline-none border-pink-500 ring-pink-500 ring-1': invalid,
            }"            
            type="text" 
            name="name" 
            :id="labelName" 
            :value="inputValue" 
            :disabled="isDisabled"
            >
            <div v-if="!isDisabled">
                <span class="font-bold text-rose-600" v-if="invalid">⚠️{{labelName}}は必須項目です。</span>
                <span class="text-green-600" v-else="invalid">✅{{labelName}}が入力されています。</span>
            </div>
        </div>
    </div>
</template>