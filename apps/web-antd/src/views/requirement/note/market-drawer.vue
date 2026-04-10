<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import { addNote, editNote, noteInfo } from '#/api/requirement/note';
import { defaultFormValueGetter, useBeforeCloseDiff } from '#/utils/popup';

import { drawerSchema } from './data';
import { message } from 'ant-design-vue';

const localToolOptions = ref<{ label: string; value: string | number }[]>([]);
const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    formItemClass: 'col-span-2',
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'vertical',
  // schema: drawerSchema(),
  schema: computed(() => {
    const schema = drawerSchema();

    // Find and update toolConfig field with dynamic options
    const toolConfigField = schema.find((item) => item.fieldName === 'toolIds');
    if (toolConfigField) {
      toolConfigField.componentProps = {
        ...toolConfigField.componentProps,
        options: localToolOptions.value,
      };
    }

    return schema;
  }),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2 gap-x-4',
});

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: defaultFormValueGetter(formApi),
    currentGetter: defaultFormValueGetter(formApi),
  },
);

const [BasicDrawer, drawerApi] = useVbenDrawer({
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  async onOpenChange(isOpen) {
    if (!isOpen) {
      return null;
    }
    drawerApi.drawerLoading(true);

    const data = drawerApi.getData() as {
      id?: number | string;
      toolOptions?: { label: string; value: string | number }[];
      formData?: Record<string, any>;
    };
    if (data?.toolOptions && data.toolOptions.length > 0) {
      localToolOptions.value = data.toolOptions;
      console.log('工具选项已加载:', localToolOptions.value);
    }

    // const { id } = drawerApi.getData() as { id?: number | string };
    isUpdate.value = !!data?.id;
    if (isUpdate.value && data?.id) {
      try {
        const record = await noteInfo(data.id);

        await formApi.setValues(record);
      } catch (error) {
        message.error('加载详情失败');
      }
    }
    if (data?.formData) {
      await formApi.setValues(data.formData);
    }
    await markInitialized();

    drawerApi.drawerLoading(false);
  },
});

async function handleConfirm() {
  try {
    drawerApi.lock(true);
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    const data = cloneDeep(await formApi.getValues());
    // 验证JSON格式
    // if (data.configJson) {
    //   try {
    //     JSON.parse(data.configJson);
    //   } catch (e) {
    //     message.error('编排配置必须是合法的 JSON 格式');
    //     // 定位到该字段
    //     formApi.scrollToField('configJson');
    //     // formApi.setFieldValue('authConfig', data.authConfig);
    //     drawerApi.lock(false);
    //     return;
    //   }
    // }
    await (isUpdate.value ? editNote(data) : addNote(data));
    resetInitialized();
    emit('reload');
    drawerApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    drawerApi.lock(false);
  }
}

async function handleClosed() {
  await formApi.resetForm();
  resetInitialized();
}
</script>

<template>
  <BasicDrawer :title="title" class="w-[600px]">
    <BasicForm />
  </BasicDrawer>
</template>
