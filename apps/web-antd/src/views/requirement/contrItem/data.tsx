import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'reqCode',
    label: 'reqCode',
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: 'title',
  }
  // {
  //   component: 'Select',
  //   componentProps: {
  //     options: [],
  //   },
  //   fieldName: 'skillConfig',
  //   label: 'Skill配置',
  // },
  // {
  //   component: 'Select',
  //   componentProps: {
  //     options: [],
  //   },
  //   fieldName: 'toolConfig',
  //   label: '工具配置',
  // },
  ,
  {
    component: 'Select',
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
    fieldName: 'status',
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
    title: 'reqCode',
    field: 'reqCode',
    showOverflow: true,
    // width: 200,
  },
  {
    title: 'title',
    field: 'title',
    showOverflow: true,
    // width: 200,
  },
  {
    title: 'type',
    field: 'type',
    showOverflow: true,
    // width: 200,
  },

  {
    title: 'priority',
    field: 'priority',
    showOverflow: true,
    // width: 200,
  },
  {
    title: 'params',
    field: 'params',
    showOverflow: true,
    // width: 200,
  },
  {
    title: 'source',
    field: 'source',
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
    title: '是否激活',
    field: 'status',
    // width: 100,
    slots: {
      default: 'status',
    },
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    resizable: false,
    // width: 'auto',
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
    fieldName: 'reqCode',
    label: 'reqCode',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: 'title',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    fieldName: 'type',
    label: 'type',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    fieldName: 'source',
    label: 'source',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Textarea',
    componentProps: {
      rows: 3,
    },
    fieldName: 'content',
    formItemClass: 'col-span-2',
    label: 'content',
  },


  {
    component: 'Textarea',
    componentProps: {
      rows: 3,
      placeholder: '请输入合法的 JSON 格式，例如：{"key": "value"}',
    },
    // rules: 'required',
    fieldName: 'params',
    formItemClass: 'col-span-2',
    label: 'params',
  },
  {
    component: 'RadioGroup',
    rules: 'required',
    componentProps: {
      buttonStyle: 'solid',
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '0' },
      ],
      optionType: 'button',
    },
    defaultValue: '1',
    fieldName: 'status',
    label: '是否激活',
  },
];
