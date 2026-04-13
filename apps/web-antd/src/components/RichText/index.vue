<template>
  <div class="custom-quill-editor">
    <QuillEditor
      v-model:content="innerValue"
      content-type="html"
      :options="options"
      @update:content="onContentChange"
      :key="innerValueKey"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// Props（兼容表单适配器 baseModelPropName:'value' 和 v-model:modelValue）
const props = defineProps<{
  modelValue?: string;
  value?: string;
  options?: Record<string, any>;
}>();

// Emits
const emit = defineEmits(['update:modelValue', 'update:value', 'change']);

// 内部值，优先取 value（ant design vue 表单适配器传入的是 value）
const innerValue = ref(props.value ?? props.modelValue ?? '');

// 生成唯一 key，每次内容变为空时强制刷新
const innerValueKey = computed(() => (innerValue.value === '' ? Date.now() : 'static'));
// 父组件值变化时同步到内部
watch(
  () => props.value ?? props.modelValue,
  (val) => {
    const v = val ?? '';
    if (v !== innerValue.value) innerValue.value = v;
  }
);

// QuillEditor 内容变化时同步到父组件
function onContentChange(val: string) {
  emit('update:value', val);
  emit('update:modelValue', val);
  emit('change', val);
}
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
