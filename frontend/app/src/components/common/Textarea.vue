<script setup>
import Editor from '@tinymce/tinymce-vue'
import { TINYMCE_INIT_OPTIONS } from '@/constants'

defineProps({
  labelName: String,
  textareaValue: String,
})
const emits = defineEmits(
    ['input']
)
const onUpdateValue = (value)=>{
   emits('input', value);
}
const tinymce_api_key = import.meta.env.VITE_TINYMCE_API_KEY

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
    </div>
  </div>
</template>