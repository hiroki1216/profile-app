<script setup>
import Editor from '@tinymce/tinymce-vue'
import { TINYMCE_INIT_OPTIONS } from '@/constants'

defineProps({
  labelName: String,
  textareaValue: String,
  invalid: Boolean,
})
const emits = defineEmits(
    ['input']
)
const onUpdateValue = (value)=>{
   emits('input', value);
}
const tinymce_api_key = process.env.VITE_TINYMCE_API_KEY

</script>
<template>
  <div>
    <label :for="labelName">{{ labelName }}</label>
    <div class="mt-1 mb-8">
      <Editor   
      :api-key=tinymce_api_key
      :init="TINYMCE_INIT_OPTIONS"
      :initial-value="textareaValue"
      :model-value="textareaValue"
      @update:model-value="onUpdateValue"
     />
     <span class="font-bold text-rose-600" v-if="invalid">⚠️{{labelName}}は必須項目です。</span>
     <span class="text-green-600" v-else="invalid">✅{{labelName}}が入力されています。</span>
    </div>
  </div>
</template>