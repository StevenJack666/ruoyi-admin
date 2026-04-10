import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'projectCode',
    label: 'projectCode',
  },
  {
    component: 'Input',
    fieldName: 'projectName',
    label: 'projectName',
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
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    fieldName: 'status',
    label: '状态',
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
    title: 'projectCode',
    field: 'projectCode',
    showOverflow: true,
    // width: 200,
  },
  {
    title: 'projectName',
    field: 'projectName',
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
    title: '状态',
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
    fieldName: 'projectCode',
    label: 'projectCode',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    fieldName: 'projectName',
    label: 'projectName',
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
    component: 'RadioGroup',
    rules: 'required',
    componentProps: {
      buttonStyle: 'solid',
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
      optionType: 'button',
    },
    defaultValue: '1',
    fieldName: 'status',
    label: '状态',
  },
];
