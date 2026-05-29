<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { McpMarket } from '#/api/mcp/market/model';

import { useAccess } from '@vben/access';
import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { Modal, Popconfirm, Space, message } from 'ant-design-vue';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  getItemList,
  delItem,
  getProjectList,
  handleItemExport,
  handleChangeStatus,
} from '#/api/requirement/contrItem';
import { TableSwitch } from '#/components/table';
import { commonDownloadExcel } from '#/utils/file/download';
import infoModal from './info-modal.vue';
import marketDrawer from './market-drawer.vue';
import { columns, querySchema } from './data';

import { ref, onBeforeMount, reactive, nextTick } from 'vue';
import { useRoute } from 'vue-router';

const projectIdFromRoute = ref<string | null>(null);
// import { userList } from '#/api/system/user';

const route = useRoute();
const queryParams = reactive<{ projectId?: string }>({
  projectId: route.query.projectId as string | undefined,
});
const projectId = route.query.projectId;
const projectOptions = ref<{ label: string; value: string | number }[]>([]);
const userOptions = ref<{ label: string; value: string | number }[]>([]);
const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
    reserve: true,
  },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    // enabled: false, // 禁止首次自动查询
    ajax: {
      query: async ({ page }) => {
        // 手动获取 form 值
        // const formValues = tableApi.formApi.form.values;
        const formValues = await tableApi.formApi.getValues();

        console.log('formValues', formValues, queryParams);

        return await getItemList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...queryParams,
          ...formValues,
        });
      },
    },
  },
  // proxyConfig: {
  //   ajax: {
  //     query: async ({ page }, formValues = {}) => {
  //       return await mcpMarketList({
  //         pageNum: page.currentPage,
  //         pageSize: page.pageSize,
  //         ...formValues,
  //       });
  //     },
  //   },
  // },
  rowConfig: {
    keyField: 'id',
  },
  id: 'mcp-market-index',
  showOverflow: false,
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  // immediate: false, // ✅ 禁止首次自动加载
});

const [MarketDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: marketDrawer,
});

const [InfoModal, modalApi] = useVbenModal({
  connectedComponent: infoModal,
});

function handleAdd() {
  fetchProjectList();
  console.log('Passing projectOptions:', projectOptions.value);
  drawerApi.setData({
    projectOptions: projectOptions.value,
    formData: {},
  });
  // drawerApi.setData({});
  drawerApi.open();
}

async function handleEdit(record: McpMarket) {
  fetchProjectList();
  console.log('record.id:', record.id);
  drawerApi.setData({
    id: record.id,
    projectOptions: projectOptions.value,
    formData: {
      id: record.id,
      marketName: record.marketName,
      description: record.description,
      skillIds: record?.skillIds,
      toolIds: record?.toolIds,
      configJson: record.configJson,
      status: record.status,
    },
  });
  drawerApi.open();
}

async function handleDelete(row: McpMarket) {
  await delItem([row.id]);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: McpMarket) => row.id);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await delItem(ids);
      await tableApi.query();
    },
  });
}

async function handleRefresh(row: McpMarket) {
  try {
    const result = await mcpMarketRefresh(row.id);
    message.success(
      `刷新成功，新增 ${result.addedCount} 个工具，更新 ${result.updatedCount} 个工具`
    );
    await tableApi.query();
  } catch (error) {
    message.error('刷新失败');
  }
}

function handleDownloadExcel() {
  commonDownloadExcel(handleItemExport, '需求项', tableApi.formApi.form.values);
}
function handleInfo(row: McpMarket) {
  modalApi.setData({ row });
  modalApi.open();
}

const { hasAccessByCodes } = useAccess();

onBeforeMount(async () => {
  // console.log('projectId from route query:', projectId);

  // 获取路由projectId
  const projectId = route.query.projectId as string | undefined;
  await fetchProjectList();
  console.log('projectId from route query:', projectId);

  // await fetchUserList();
  tableApi.formApi.updateSchema([
    {
      fieldName: 'projectId',
      componentProps: {
        options: projectOptions.value,
      },
      defaultValue: projectId,
    },
  ]);

  if (projectId) {
    // 关键
    // queryParams.value.projectId = projectId;
    await tableApi.formApi.setValues({ projectId });
  }

  console.log('Initial form values:', tableApi);
  // 必须 nextTick
  await nextTick();
  // tableApi.query(tableApi.formApi.form.values);
  // 最后手动触发
  await tableApi.query();
  // if (projectId) {
  //   tableApi.query({
  //     projectId,
  //   });
  // } else {
  //   tableApi.query();
  // }
});

async function fetchProjectList() {
  try {
    const res = await getProjectList({
      pageSize: 100,
      pageNum: 1,
      status: '1',
    });
    // Adjust based on your actual API response structure

    console.log('eeeeeeeeee');
    const projects = res?.rows || res || [];
    projectOptions.value = projects.map((pro: any) => ({
      label: pro.projectName, // Adjust field names based on API
      value: pro.id,
    }));
  } catch (error) {
    console.error('Fetch tool list failed:', error);
    message.error('Failed to fetch tool list');
  }
}

// async function fetchUserList() {
//   try {
//     const res = await userList({
//       pageSize: 100,
//       pageNum: 1,
//     });
//     // Adjust based on your actual API response structure

//     console.log('eeeeeeeeee');
//     const users = res?.rows || res || [];
//     userOptions.value = users.map((pro: any) => ({
//       label: pro.userName, // Adjust field names based on API
//       value: pro.userId,
//     }));
//   } catch (error) {
//     console.error('Fetch tool list failed:', error);
//     message.error('Failed to fetch tool list');
//   }
// }
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="需求项列表">
      <template #toolbar-tools>
        <Space>
          <a-button v-access:code="['requirement:item:export']" @click="handleDownloadExcel">
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['requirement:item:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button type="primary" v-access:code="['requirement:item:add']" @click="handleAdd">
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>

      <!-- <template #status="{ row }">
        <TableSwitch
          v-model:value="row.status"
          :api="() => handleChangeStatus(row)"
          :checked-value="'1'"
          :unchecked-value="'0'"
          @reload="tableApi.query()"
        />
      </template> -->
      <!-- <template #status="{ row }">
        <a-tag :color="row.status == '1' ? 'green' : 'red'">
          {{ row.status == '1' ? '是' : '否' }}
        </a-tag>
      </template> -->
      <template #projectName="{ row }">
        {{
          (projectOptions || []).find((project) => project.value === row.projectId)?.label || '-'
        }}
      </template>
      <template #createBy="{ row }">
        {{ (userOptions || []).find((user) => user.value === row.createBy)?.label || '-' }}
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button @click.stop="handleInfo(row)"> 详情 </ghost-button>
          <ghost-button v-access:code="['requirement:item:edit']" @click.stop="handleEdit(row)">
            {{ $t('pages.common.edit') }}
          </ghost-button>
          <Popconfirm
            :get-popup-container="getVxePopupContainer"
            placement="left"
            title="确认删除？"
            @confirm="handleDelete(row)"
          >
            <ghost-button danger v-access:code="['requirement:item:remove']" @click.stop="">
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <MarketDrawer @reload="tableApi.query()" />
    <InfoModal />
  </Page>
</template>
