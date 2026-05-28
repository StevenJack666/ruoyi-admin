import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { getDictOptions } from '#/utils/dict';
import { DictEnum } from '@vben/constants';
import RichText from '#/components/RichText/index.vue';
import { markRaw } from 'vue';
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
  },
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
  // {
  //   title: 'Bug编码',
  //   field: 'bugCode',
  //   showOverflow: true,
  //   // width: 200,
  // },
  {
    title: '标题',
    field: 'title',
    showOverflow: true,
    width: 600,
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
    title: '严重程度',
    field: 'severity',
    showOverflow: true,
    // width: 200,
    slots: {
      default: 'severity',
    },
  },
  // {
  //   title: '优先级',
  //   field: 'priority',
  //   showOverflow: true,
  //   // width: 200,
  // },
  // {
  //   title: '负责人',
  //   field: 'assigneeId',
  //   showOverflow: true,
  //   // width: 200,
  //   slots: {
  //     default: 'assignee',
  //   },
  // },
  // {
  //   title: '创建人',
  //   field: 'ownerId',
  //   showOverflow: true,
  //   // width: 200,
  //   slots: {
  //     default: 'owner',
  //   },
  // },

  // {
  //   title: '发现版本',
  //   field: 'foundVersion',
  //   showOverflow: true,
  //   // width: 200,
  // },
  // {
  //   title: '修复版本',
  //   field: 'fixedVersion',
  //   showOverflow: true,
  //   // width: 200,
  // },
  // {
  //   title: '复现步骤',
  //   field: 'reproduceSteps',
  //   showOverflow: true,
  //   // width: 200,
  // },
  // {
  //   title: '预期结果',
  //   field: 'expectedResult',
  //   showOverflow: true,
  //   // width: 200,
  // },
  // {
  //   title: '实际结果',
  //   field: 'actualResult',
  //   showOverflow: true,
  //   // width: 200,
  // },
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
  // {
  //   component: 'Input',
  //   fieldName: 'bugCode',
  //   label: 'Bug编码',
  //   rules: 'required',
  //   formItemClass: 'col-span-2',
  // },
  {
    component: 'Input',
    fieldName: 'title',
    label: '标题',
    // rules: 'required',
    formItemClass: 'col-span-2',
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
  // {
  //   component: 'Select',
  //   fieldName: 'assigneeId',
  //   label: '负责人',
  //   // rules: 'required',
  //   formItemClass: 'col-span-2',
  //   componentProps: {
  //     options: [], // Will be populated dynamically
  //     showSearch: true,
  //     //mode: 'multiple', // If multiple selection is needed
  //   },
  // },
  {
    component: 'Select',
    fieldName: 'severity',
    label: '严重程度',
    formItemClass: 'col-span-2',
    componentProps: {
      options: getDictOptions(DictEnum.BUG_SEVERITY),
      showSearch: true,
      //mode: 'multiple', // If multiple selection is needed
    },
  },
  // {
  //   component: 'Select',
  //   fieldName: 'priority',
  //   label: '优先级',
  //   formItemClass: 'col-span-2',
  //   componentProps: {
  //     options: getDictOptions(DictEnum.BUG_PRIORITY),
  //     showSearch: true,
  //     //mode: 'multiple', // If multiple selection is needed
  //   },
  // },
  // {
  //   component: 'Input',
  //   fieldName: 'foundVersion',
  //   label: '发现版本',
  //   formItemClass: 'col-span-2',
  // },
  // {
  //   component: 'Input',
  //   fieldName: 'fixedVersion',
  //   label: '修复版本',
  //   formItemClass: 'col-span-2',
  // },
  // {
  //   component: 'Textarea',
  //   componentProps: {
  //     rows: 3,
  //   },
  //   fieldName: 'reproduceSteps',
  //   formItemClass: 'col-span-2',
  //   label: '复现步骤',
  // },
  {
    component: markRaw(RichText),  // 使用富文本组件
    fieldName: 'reproduceSteps',
    formItemClass: 'col-span-2',
    label: '复现步骤',
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
  // {
  //   component: 'Textarea',
  //   componentProps: {
  //     rows: 3,
  //     placeholder: '请输入',
  //   },
  //   // rules: 'required',
  //   fieldName: 'expectedResult',
  //   formItemClass: 'col-span-2',
  //   label: '预期结果',
  // },
  // {
  //   component: 'Textarea',
  //   componentProps: {
  //     rows: 3,
  //     placeholder: '请输入',
  //   },
  //   // rules: 'required',
  //   fieldName: 'actualResult',
  //   formItemClass: 'col-span-2',
  //   label: '实际结果',
  // },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    // rules: 'required',
    formItemClass: 'col-span-2',
    componentProps: {
      options: getDictOptions(DictEnum.REQUIREMENT_BUG_STATUS),
      showSearch: true,
      //mode: 'multiple', // If multiple selection is needed
    },
  },
];
