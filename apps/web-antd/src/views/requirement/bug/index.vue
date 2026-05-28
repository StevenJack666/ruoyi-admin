<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { McpMarket } from '#/api/mcp/market/model';

import { useAccess } from '@vben/access';
import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { Modal, Popconfirm, Space, message } from 'ant-design-vue';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import { DictEnum } from '@vben/constants';
import { cloneDeep } from 'lodash-es';
import { renderDict } from '#/utils/render';
import {
  getBugList,
  delBug,
  getProjectList,
  handleBugExport,
  handleChangeStatus,
} from '#/api/requirement/bug';
import { userList } from '#/api/system/user';
import { TableSwitch } from '#/components/table';
import { commonDownloadExcel } from '#/utils/file/download';
import infoModal from './info-modal.vue';
import marketDrawer from './market-drawer.vue';
import { columns, querySchema } from './data';

import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const projectId = route.query.projectId;
const dynamicQuerySchema = ref([]);
const isReady = ref(false);
const projectOptions = ref<{ label: string; value: string | number }[]>([]);
const userOptions = ref<{ label: string; value: string | number }[]>([]);
const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: dynamicQuerySchema,
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
        return await getBugList({
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

async function handleAdd() {
  console.log('Passing projectOptions:', projectOptions.value);
  await fetchProjectList();
  await fetchUserList();
  drawerApi.setData({
    projectOptions: projectOptions.value,
    userOptions: userOptions.value,
    formData: {
      reproduceSteps: '',
      status: 'open',
    },
  });
  // drawerApi.setData({});
  drawerApi.open();
}

async function handleEdit(record: McpMarket) {
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

function handleCopy(record: McpMarket) {
  drawerApi.setData({
    id: record.id,
    isCopy: true,
    projectOptions: projectOptions.value,
    userOptions: userOptions.value,
    formData: {
      marketName: record.marketName + '-copy',
      description: record.description,
      skillIds: record?.skillIds,
      toolIds: record?.toolIds,
      configJson: record.configJson,
      status: 'open', // 新复制的默认设置为未发布
    },
  });
  drawerApi.open();
}

async function handleDelete(row: McpMarket) {
  await delBug([row.id]);
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
      await delBug(ids);
      await tableApi.query();
    },
  });
}

function handleDownloadExcel() {
  commonDownloadExcel(handleBugExport, '项目Bug', tableApi.formApi.form.values);
}
function handleInfo(row: McpMarket) {
  modalApi.setData({ row, projectOptions: projectOptions.value, userOptions: userOptions.value });
  modalApi.open();
}

const { hasAccessByCodes } = useAccess();

onBeforeMount(async () => {
  await fetchProjectList();
  await fetchUserList();
  isReady.value = true;
  // 深拷贝 schema
  const schema = cloneDeep(querySchema());

  // 注入 options
  const projectField = schema.find((item) => item.fieldName === 'projectId');
  if (projectField) {
    projectField.componentProps.options = projectOptions.value;
    if (projectId) {
      projectField.defaultValue = projectId;
    }
  }
  console.log('schema', schema, projectOptions.value);
  dynamicQuerySchema.value = schema;
});
async function fetchUserList() {
  try {
    const res = await userList({
      pageSize: 100,
      pageNum: 1,
    });
    // Adjust based on your actual API response structure

    console.log('eeeeeeeeee');
    const users = res?.rows || res || [];
    userOptions.value = users.map((pro: any) => ({
      label: pro.userName, // Adjust field names based on API
      value: pro.userId,
    }));
  } catch (error) {
    console.error('Fetch tool list failed:', error);
    message.error('Failed to fetch tool list');
  }
}
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
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="bug列表" v-if="isReady">
      <template #toolbar-tools>
        <Space>
          <a-button v-access:code="['mcp:market:export']" @click="handleDownloadExcel">
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['mcp:market:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button type="primary" v-access:code="['mcp:market:add']" @click="handleAdd">
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>

      <template #status="{ row }">
        <TableSwitch
          v-model:value="row.status"
          :api="() => handleChangeStatus(row)"
          :checked-value="'1'"
          :unchecked-value="'0'"
          @reload="tableApi.query()"
        />
      </template>
      <template #severity="{ row }">
        <component :is="renderDict(row.severity, DictEnum.BUG_SEVERITY)" />
      </template>

      <template #projectName="{ row }">
        {{
          (projectOptions || []).find((project) => project.value === row.projectId)?.label || '-'
        }}
      </template>
      <template #assignee="{ row }">
        {{ (userOptions || []).find((user) => user.value === row.assigneeId)?.label || '-' }}
      </template>
      <template #owner="{ row }">
        {{ (userOptions || []).find((user) => user.value === row.ownerId)?.label || '-' }}
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button @click.stop="handleCopy(row)"> 复制 </ghost-button>
          <ghost-button @click.stop="handleInfo(row)"> 详情 </ghost-button>
          <ghost-button v-access:code="['agent:market:edit']" @click.stop="handleEdit(row)">
            {{ $t('pages.common.edit') }}
          </ghost-button>
          <Popconfirm
            :get-popup-container="getVxePopupContainer"
            placement="left"
            title="确认删除？"
            @confirm="handleDelete(row)"
          >
            <ghost-button danger v-access:code="['agent:market:remove']" @click.stop="">
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
