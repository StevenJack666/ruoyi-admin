import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { getDictOptions } from '#/utils/dict';
import { DictEnum } from '@vben/constants';
export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'bugCode',
    label: 'Bug编码',
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '标题',
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
      options: getDictOptions(DictEnum.REQUIREMENT_BUG_STATUS),
    },
    fieldName: 'status',
    label: '状态',
  },


  // {
  //   component: 'RangePicker',
  //   fieldName: 'createTime',
  //   label: '计划时间',
  // },
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
    title: 'Bug编码',
    field: 'bugCode',
    showOverflow: true,
    // width: 200,
  },
  {
    title: '标题',
    field: 'title',
    showOverflow: true,
    // width: 200,
  },
  {
    title: '严重程度',
    field: 'severity',
    showOverflow: true,
    // width: 200,
  },
  {
    title: '优先级',
    field: 'priority',
    showOverflow: true,
    // width: 200,
  },

  {
    title: '发现版本',
    field: 'foundVersion',
    showOverflow: true,
    // width: 200,
  },
  {
    title: '修复版本',
    field: 'fixedVersion',
    showOverflow: true,
    // width: 200,
  },
  {
    title: '复现步骤',
    field: 'reproduceSteps',
    showOverflow: true,
    // width: 200,
  },
  {
    title: '预期结果',
    field: 'expectedResult',
    showOverflow: true,
    // width: 200,
  },
  {
    title: '实际结果',
    field: 'actualResult',
    showOverflow: true,
    // width: 200,
  },
  // {
  //   title: '状态',
  //   field: 'status',
  //   // width: 100,
  //   slots: {
  //     default: 'status',
  //   },
  // },
  {
    title: '状态',
    field: 'status',
    showOverflow: true,
    // width: 200,
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
    fieldName: 'bugCode',
    label: 'Bug编码',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '标题',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Select',
    fieldName: 'projectId',
    label: '项目Id',
    rules: 'required',
    formItemClass: 'col-span-2',
    componentProps: {
      options: [], // Will be populated dynamically
      showSearch: true,
      //mode: 'multiple', // If multiple selection is needed
    },
  },
  {
    component: 'Input',
    fieldName: 'severity',
    label: '严重程度',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    fieldName: 'priority',
    label: '优先级',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    fieldName: 'foundVersion',
    label: '发现版本',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    fieldName: 'fixedVersion',
    label: '修复版本',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Textarea',
    componentProps: {
      rows: 3,
    },
    fieldName: 'reproduceSteps',
    formItemClass: 'col-span-2',
    label: '复现步骤',
  },


  {
    component: 'Textarea',
    componentProps: {
      rows: 3,
      placeholder: '请输入',
    },
    // rules: 'required',
    fieldName: 'expectedResult',
    formItemClass: 'col-span-2',
    label: '预期结果',
  },
  {
    component: 'Textarea',
    componentProps: {
      rows: 3,
      placeholder: '请输入',
    },
    // rules: 'required',
    fieldName: 'actualResult',
    formItemClass: 'col-span-2',
    label: '实际结果',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    formItemClass: 'col-span-2',
    componentProps: {
      options: getDictOptions(DictEnum.REQUIREMENT_BUG_STATUS),
      showSearch: true,
      //mode: 'multiple', // If multiple selection is needed
    },
  },
];
