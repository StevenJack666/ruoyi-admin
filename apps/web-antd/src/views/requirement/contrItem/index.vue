<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { McpMarket } from '#/api/mcp/market/model';

import { useAccess } from '@vben/access';
import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { Modal, Popconfirm, Space, message } from 'ant-design-vue';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import { getItemList, delItem } from '#/api/requirement/contrItem';
import { TableSwitch } from '#/components/table';
import { commonDownloadExcel } from '#/utils/file/download';
import infoModal from './info-modal.vue';
import marketDrawer from './market-drawer.vue';
import { columns, querySchema } from './data';

import { ref, onMounted } from 'vue';

const toolOptions = ref<{ label: string; value: string | number }[]>([]);

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
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await getItemList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
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
});

const [MarketDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: marketDrawer,
});

const [InfoModal, modalApi] = useVbenModal({
  connectedComponent: infoModal,
});

function handleAdd() {
  console.log('Passing toolOptions:', toolOptions.value);
  drawerApi.setData({
    toolOptions: toolOptions.value,
    formData: {},
  });
  // drawerApi.setData({});
  drawerApi.open();
}

async function handleEdit(record: McpMarket) {
  console.log('record.id:', record.id);
  drawerApi.setData({
    id: record.id,
    toolOptions: toolOptions.value,
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
      `刷新成功，新增 ${result.addedCount} 个工具，更新 ${result.updatedCount} 个工具`,
    );
    await tableApi.query();
  } catch (error) {
    message.error('刷新失败');
  }
}

// function handleDownloadExcel() {
//   commonDownloadExcel(
//     mcpMarketExport,
//     'MCP市场数据',
//     tableApi.formApi.form.values,
//   );
// }
function handleInfo(row: McpMarket) {
  modalApi.setData({ row });
  modalApi.open();
}

const { hasAccessByCodes } = useAccess();

onMounted(() => {
  // fetchToolList();
});
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="agent列表">
      <template #toolbar-tools>
        <Space>
          <!-- <a-button
            v-access:code="['mcp:market:export']"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button> -->
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['mcp:market:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['mcp:market:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <!-- <template #status="{ row }">
        <TableSwitch
          v-model:value="row.status"
          :disabled="!hasAccessByCodes(['agent:market:edit'])"
          :checked-value="1"
          :unchecked-value="0"
        />
      </template> -->
      <template #status="{ row }">
        <a-tag :color="row.status == '1' ? 'green' : 'red'">
          {{ row.status == '1' ? '是' : '否' }}
        </a-tag>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button @click.stop="handleInfo(row)"> 详情 </ghost-button>
          <ghost-button
            v-access:code="['agent:market:edit']"
            @click.stop="handleEdit(row)"
          >
            {{ $t('pages.common.edit') }}
          </ghost-button>
          <Popconfirm
            :get-popup-container="getVxePopupContainer"
            placement="left"
            title="确认删除？"
            @confirm="handleDelete(row)"
          >
            <ghost-button
              danger
              v-access:code="['agent:market:remove']"
              @click.stop=""
            >
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
