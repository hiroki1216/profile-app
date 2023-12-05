<script setup>
import Editor from '@tinymce/tinymce-vue'
import { TINYMCE_API_KEY, TINYMCE_INIT_OPTIONS } from '@/constants'

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
</script>
<template>
  <div>
    <label :for="labelName">{{ labelName }}</label>
    <div class="mt-1 mb-8">
      <Editor
      :api-key="TINYMCE_API_KEY"
      :init="TINYMCE_INIT_OPTIONS"
      :initial-value="textareaValue"
      :model-value="textareaValue"
      @update:model-value="onUpdateValue"
     />
    </div>
  </div>
</template>