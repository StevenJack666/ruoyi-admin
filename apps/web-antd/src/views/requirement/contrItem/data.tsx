import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { getDictOptions } from '#/utils/dict';
import { DictEnum } from '@vben/constants';
export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Select',
    componentProps: {
      options: [],
    },
    fieldName: 'projectId',
    label: '所属项目',
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
      options: getDictOptions(DictEnum.REQUIREMENT_ITEM_STATUS),
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
    title: '需求编码',
    field: 'reqCode',
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
    title: '所属项目',
    field: 'projectId',
    showOverflow: true,
    // width: 200,
    slots: {
      default: 'projectName',
    },
  },
  {
    title: '类型',
    field: 'type',
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
    title: '来源',
    field: 'source',
    showOverflow: true,
    // width: 200,
  },
  {
    title: '内容',
    field: 'content',
    showOverflow: true,
    // width: 200,
  },
  {
    title: '状态',
    field: 'status',
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
    component: 'Select',
    fieldName: 'projectId',
    label: '项目Id',
    // rules: 'required',
    formItemClass: 'col-span-2',
    componentProps: {
      options: [], // Will be populated dynamically
      showSearch: true,
      //mode: 'multiple', // If multiple selection is needed
    },
  },
  {
    component: 'Input',
    fieldName: 'reqCode',
    label: '需求编码',
    // rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '标题',
    // rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    fieldName: 'type',
    label: '类型',
    // rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    fieldName: 'priority',
    label: '优先级',
    // rules: 'required',
    formItemClass: 'col-span-2',
  },

  {
    component: 'Input',
    fieldName: 'source',
    label: '来源',
    // rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Textarea',
    componentProps: {
      rows: 3,
    },
    fieldName: 'content',
    formItemClass: 'col-span-2',
    label: '内容',
  },

  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    // rules: 'required',
    formItemClass: 'col-span-2',
    componentProps: {
      options: getDictOptions(DictEnum.REQUIREMENT_ITEM_STATUS),
      showSearch: true,
      //mode: 'multiple', // If multiple selection is needed
    },
  },
];
