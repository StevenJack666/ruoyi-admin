<template>
  <div class="custom-quill-editor">
    <QuillEditor
      v-model="innerValue"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps<{
  modelValue: string;
  options?: Record<string, any>;
}>()

const emit = defineEmits(['update:model-value'])

// 内部值
const innerValue = ref(props.modelValue || '')

// 外部值变化时同步
watch(() => props.modelValue, val => {
  if (val !== innerValue.value) innerValue.value = val
})

// 内部值变化时通知外部
watch(innerValue, val => {
  emit('update:model-value', val)
})
</script>

<style lang="scss">
.custom-quill-editor .ql-toolbar {
  border-radius: 4px 4px 0 0;
  background: #fafafa;
  border-color: #d9d9d9;
}
.custom-quill-editor .ql-container {
  min-height: 520px;
  border-radius: 0 0 4px 4px;
  border-color: #d9d9d9;
  font-size: 14px;
  background: #fff;
}
.custom-quill-editor .ql-editor {
  min-height: 100px;
  font-family: inherit;
  color: #333;
}
</style>