import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'name',
    label: 'agent名称',
  },
  {
    component: 'Select',
    componentProps: {
      options: [],
    },
    fieldName: 'skillConfig',
    label: 'Skill配置',
  },
  {
    component: 'Select',
    componentProps: {
      options: [],
    },
    fieldName: 'toolConfig',
    label: '工具配置',
  },
  {
    component: 'Select',
    componentProps: {
      options: [
        { label: '是', value: 'ENABLED' },
        { label: '否', value: 'DISABLED' },
      ],
    },
    fieldName: 'isActive',
    label: '是否激活',
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
    title: 'agent名称',
    field: 'name',
    showOverflow: true,
    // width: 200,
  },
  {
    title: '描述',
    field: 'description',
    showOverflow: true,
    // width: 200,
  },
  {
    title: 'Skill',
    field: 'skillConfig',
    // width: 100,
  },
  {
    title: '工具',
    field: 'toolConfig',
    // width: 100,
  },
  {
    title: '是否激活',
    field: 'isActive',
    width: 100,
    slots: {
      default: 'isActive',
    },
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
    fieldName: 'name',
    label: '市场名称',
    rules: 'required',
    formItemClass: 'col-span-2',
  },

  {
    component: 'Textarea',
    componentProps: {
      rows: 3,
    },
    fieldName: 'description',
    formItemClass: 'col-span-2',
    label: '描述',
  },
  {
    component: 'Select',
    fieldName: 'skillConfig',
    label: 'Skill配置',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Select',
    fieldName: 'toolConfig',
    label: '工具配置',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'RadioGroup',
    rules: 'required',
    componentProps: {
      buttonStyle: 'solid',
      options: [
        { label: '是', value: 'ENABLED' },
        { label: '否', value: 'DISABLED' },
      ],
      optionType: 'button',
    },
    defaultValue: 'ENABLED',
    fieldName: 'isActive',
    label: '是否激活',
  },
];
