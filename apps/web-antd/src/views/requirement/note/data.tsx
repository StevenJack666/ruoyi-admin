import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import RichText from '#/components/RichText/index.vue';
import { markRaw } from 'vue';
export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'title',
    label: 'title',
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: 'ID',
    field: 'id',
    // width: 80,
    visible: false,
  },
  {
    title: 'title',
    field: 'title',
    showOverflow: true,
    // width: 200,
  },
  {
    title: 'content',
    field: 'content',
    showOverflow: true,
    // width: 200,
  },
  {
    title: '创建人',
    field: 'createBy',
    slots: {
      default: 'createBy',
    },
  },
  {
    title: '创建时间',
    field: 'createTime',
    showOverflow: true,
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    resizable: false,
    width: 'auto',
  },
];

export const drawerSchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
    fieldName: 'id',
    label: 'id',
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: 'title',
    // rules: 'required',
    formItemClass: 'col-span-2',
  },

  // {
  //   component: 'Textarea',
  //   componentProps: {
  //     rows: 3,
  //   },
  //   fieldName: 'content',
  //   formItemClass: 'col-span-2',
  //   label: 'content',
  // },
  {
    component: markRaw(RichText),  // 使用富文本组件
    fieldName: 'content',
    formItemClass: 'col-span-2',
    label: 'content',
    defaultValue: '', // ✅ 强烈建议
    componentProps: {
      options: {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
          ],
        },
      },
    },
  },
];
