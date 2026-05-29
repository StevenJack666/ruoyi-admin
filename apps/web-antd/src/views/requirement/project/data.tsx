import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'projectCode',
    label: '项目编码',
  },
  {
    component: 'Input',
    fieldName: 'projectName',
    label: '项目名称',
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
    title: '项目编码',
    field: 'projectCode',
    showOverflow: true,
    // width: 200,
  },
  {
    title: '项目名称',
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
  // {
  //   title: '创建人',
  //   field: 'createBy',
  //   slots: {
  //     default: 'createBy',
  //   },
  // },
  {
    title: '创建时间',
    field: 'createTime',
    showOverflow: true,
    formatter: ({ cellValue }) => {
      if (!cellValue) return '-';

      const date = new Date(cellValue);

      const yyyy = date.getFullYear();
      const MM = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const HH = String(date.getHours()).padStart(2, '0');
      const mm = String(date.getMinutes()).padStart(2, '0');
      const ss = String(date.getSeconds()).padStart(2, '0');

      return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
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
    fieldName: 'projectCode',
    label: '项目编码',
    // rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    fieldName: 'projectName',
    label: '项目名称',
    // rules: 'required',
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
    // rules: 'required',
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
