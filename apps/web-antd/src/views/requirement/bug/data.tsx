import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

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
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
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
    title: '类型',
    field: 'type',
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
    fieldName: 'foundVersion',
    label: 'foundVersion',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    fieldName: 'fixedVersion',
    label: 'fixedVersion',
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
    label: 'reproduceSteps',
  },


  {
    component: 'Textarea',
    componentProps: {
      rows: 3,
      placeholder: '请输入合法的 JSON 格式，例如：{"key": "value"}',
    },
    // rules: 'required',
    fieldName: 'expectedResult',
    formItemClass: 'col-span-2',
    label: 'expectedResult',
  },
  {
    component: 'Textarea',
    componentProps: {
      rows: 3,
      placeholder: '请输入合法的 JSON 格式，例如：{"key": "value"}',
    },
    // rules: 'required',
    fieldName: 'actualResult',
    formItemClass: 'col-span-2',
    label: 'actualResult',
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
    label: '状态',
  },
];
