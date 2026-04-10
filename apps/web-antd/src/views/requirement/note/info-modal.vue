<script setup lang="ts">
import type { User } from '#/api/system/user/model';

import { computed, shallowRef } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';
import { ref } from 'vue';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Descriptions, DescriptionsItem, Tag } from 'ant-design-vue';

import { findUserInfo } from '#/api/system/user';
import { renderDict } from '#/utils/render';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const [BasicModal, modalApi] = useVbenModal({
  onOpenChange: handleOpenChange,
  onClosed() {
    currentUser.value = null;
  },
});

interface UserWithNames extends User {
  postNames: string[];
  roleNames: string[];
}
const currentUser = shallowRef<null | UserWithNames>(null);

const currentData = ref({});

async function handleOpenChange(open: boolean) {
  if (!open) {
    return null;
  }
  // modalApi.modalLoading(true);
  currentData.value = modalApi.getData().row;
  console.log('modalApi.getData()', modalApi.getData(), currentData.value);
  return;

  const { userId } = modalApi.getData() as { userId: number | string };
  const response = await findUserInfo(userId);
  // 外部的roleIds postIds才是真正对应的  新增时为空
  // posts有为Null的情况 需要给默认值
  const { postIds = [], posts = [], roleIds = [], roles = [], user } = response;

  const postNames = posts
    .filter((item) => postIds.includes(item.postId))
    .map((item) => item.postName);

  const roleNames = roles
    .filter((item) => roleIds.includes(item.roleId))
    .map((item) => item.roleName);

  (user as UserWithNames).postNames = postNames;
  (user as UserWithNames).roleNames = roleNames;
  // 赋值
  currentUser.value = user as UserWithNames;

  modalApi.modalLoading(false);
}

const mixInfo = computed(() => {
  if (!currentUser.value) {
    return '-';
  }
  const { deptName, nickName, userName } = currentUser.value;
  return `${userName} / ${nickName} / ${deptName ?? '-'}`;
});

const diffLoginTime = computed(() => {
  if (!currentUser.value) {
    return '-';
  }
  const { loginDate } = currentUser.value;
  // 默认en显示
  dayjs.locale('zh-cn');
  // 计算相差秒数
  const diffSeconds = dayjs().diff(dayjs(loginDate), 'second');
  /**
   * 转为时间显示(x月 x天)
   * https://dayjs.fenxianglu.cn/category/duration.html#%E4%BA%BA%E6%80%A7%E5%8C%96
   *
   */
  const diffText = dayjs.duration(diffSeconds, 'seconds').humanize();
  return diffText;
});
</script>

<template>
  <BasicModal :footer="false" :fullscreen-button="false" title="详情">
    <Descriptions v-if="currentData" size="small" :column="1" bordered>
      <DescriptionsItem label="标题">
        {{ currentData.title || '-' }}
      </DescriptionsItem>
      <DescriptionsItem label="内容">
        {{ currentData.content || '-' }}
      </DescriptionsItem>
    </Descriptions>
  </BasicModal>
</template>
