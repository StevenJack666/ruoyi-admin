<script lang="ts" setup>
import type { NotificationItem } from './types';

import { Bell, MailCheck } from '@vben/icons';
import { $t } from '@vben/locales';
import {
  VbenButton,
  VbenIconButton,
  VbenPopover,
  VbenScrollbar,
} from '@vben-core/shadcn-ui';
import { useToggle } from '@vueuse/core';

interface Props {
  /**
   * 显示圆点
   */
  dot?: boolean;
  /**
   * 消息列表
   */
  notifications?: NotificationItem[];
  isLoading?: boolean; // 新增：加载状态
  hasMore?: boolean; // 新增：是否有更多数据
}

defineOptions({ name: 'NotificationPopup' });

const props = withDefaults(defineProps<Props>(), {
  dot: false,
  notifications: () => [],
  isLoading: false,
  hasMore: true,
});

const emit = defineEmits<{
  clear: [];
  makeAll: [];
  read: [NotificationItem];
  viewAll: [];
  getAll: [];
  loadMore: [];
}>();

const [open, toggle] = useToggle();

function handleShowNotity() {
  toggle();
  emit('getAll');
}

function close() {
  open.value = false;
}

function handleViewAll() {
  emit('viewAll');
  close();
}

async function handleMakeAll() {
  emit('makeAll');
}

function handleClear() {
  emit('clear');
  close();
}

function handleClick(item: NotificationItem) {
  emit('read', item);
}

// 触发加载更多事件
function handleLoadMore() {
  emit('loadMore');
}

// 3. 处理滚动事件
function onScroll(event: Event) {
  // 如果正在加载或没有更多数据，直接返回
  if (props.isLoading || !props.hasMore) return;

  const target = event.target as HTMLElement;
  // 判断是否滚动到底部（预留10px阈值，提升体验）
  // scrollHeight: 总高度, scrollTop: 滚动条位置, clientHeight: 可视区域高度
  const isBottom =
    target.scrollHeight - target.scrollTop - target.clientHeight < 10;

  if (isBottom) {
    // loadMore();
    handleLoadMore();
  }
}

// // 4. 加载更多逻辑
// function loadMore() {
//   if (loading.value) return;

//   loading.value = true;
//   page.value++;

//   // 通知父组件加载下一页数据
//   emit('loadMore');

//   // 注意：loading 状态的重置通常由父组件完成，或者在这里通过定时器模拟
//   // 最佳实践是父组件数据更新后，通过 watch 监听 notifications 变化来重置 loading
// }
</script>
<template>
  <VbenPopover
    v-model:open="open"
    content-class="relative right-2 w-[360px] p-0"
  >
    <template #trigger>
      <div class="flex-center mr-2 h-full" @click.stop="handleShowNotity">
        <VbenIconButton class="bell-button text-foreground relative">
          <span
            v-if="dot"
            class="bg-primary absolute right-0.5 top-0.5 h-2 w-2 rounded"
          ></span>
          <Bell class="size-4" />
        </VbenIconButton>
      </div>
    </template>

    <div class="relative">
      <div class="flex items-center justify-between p-4 py-3">
        <div class="text-foreground">{{ $t('ui.widgets.notifications') }}</div>
        <VbenIconButton
          :disabled="notifications.length <= 0"
          :tooltip="$t('ui.widgets.markAllAsRead')"
          @click="handleMakeAll"
        >
          <MailCheck class="size-4" />
        </VbenIconButton>
      </div>
      <VbenScrollbar
        v-if="notifications.length > 0"
        ref="scrollbarRef"
        @scroll="onScroll"
      >
        <ul class="!flex max-h-[360px] w-full flex-col">
          <template v-for="item in notifications" :key="item.title">
            <li
              class="hover:bg-accent border-border relative flex w-full cursor-pointer items-start gap-5 border-t px-3 py-3"
              @click="handleClick(item)"
            >
              <span
                v-if="!item.isRead"
                class="bg-primary absolute right-2 top-2 h-2 w-2 rounded"
              ></span>

              <span
                class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
              >
                <img
                  :src="item.avatar"
                  class="aspect-square h-full w-full object-cover"
                  role="img"
                />
              </span>
              <div class="flex flex-col gap-1 leading-none">
                <p class="font-semibold">{{ item.title }}</p>
                <p class="text-muted-foreground my-1 line-clamp-2 text-xs">
                  {{ item.message }}
                </p>
                <p class="text-muted-foreground line-clamp-2 text-xs">
                  {{ item.date }}
                </p>
              </div>
            </li>
          </template>

          <!-- 加载状态提示 -->
          <li
            v-if="isLoading"
            class="flex-center text-muted-foreground py-4 text-xs"
          >
            加载中...
          </li>
          <!-- 无更多数据提示 -->
          <li
            v-else-if="!hasMore"
            class="flex-center text-muted-foreground py-4 text-xs"
          >
            没有更多了
          </li>
        </ul>
      </VbenScrollbar>

      <template v-else>
        <div class="flex-center text-muted-foreground min-h-[150px] w-full">
          {{ $t('common.noData') }}
        </div>
      </template>

      <div
        class="border-border flex items-center justify-between border-t px-4 py-3"
      >
        <VbenButton
          :disabled="notifications.length <= 0"
          size="sm"
          variant="ghost"
          @click="handleClear"
        >
          {{ $t('ui.widgets.clearNotifications') }}
        </VbenButton>
        <VbenButton size="sm" @click="handleViewAll">
          {{ $t('ui.widgets.viewAll') }}
        </VbenButton>
      </div>
    </div>
  </VbenPopover>
</template>

<style scoped>
:deep(.bell-button) {
  &:hover {
    svg {
      animation: bell-ring 1s both;
    }
  }
}

@keyframes bell-ring {
  0%,
  100% {
    transform-origin: top;
  }

  15% {
    transform: rotateZ(10deg);
  }

  30% {
    transform: rotateZ(-10deg);
  }

  45% {
    transform: rotateZ(5deg);
  }

  60% {
    transform: rotateZ(-5deg);
  }

  75% {
    transform: rotateZ(2deg);
  }
}
</style>
