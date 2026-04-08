import type { NotificationItem } from '@vben/layouts';

import { computed, ref, watch } from 'vue';

import { SvgMessageUrl } from '@vben/icons';
import { $t } from '@vben/locales';
import { useUserStore } from '@vben/stores';

import { Modal, notification } from 'ant-design-vue';
import dayjs from 'dayjs';
import { defineStore } from 'pinia';

import { useSseMessage } from '#/utils/message';
import { getAllNotify, markNotify, readNotify, removeNotify } from '#/api/notify';

export const useNotifyStore = defineStore(
  'app-notify',
  () => {
    /**
     * return才会被持久化 存储全部消息
     */
    const notificationList = ref<NotificationItem[]>([]);

    // 1. 新增分页状态
    const currentPage = ref(1);
    const pageSize = ref(5);
    const isLoading = ref(false);
    const hasMore = ref(true);

    const userStore = useUserStore();
    const userId = computed(() => {
      return userStore.userInfo?.userId || '0';
    });

    const notifications = computed(() => {
      return notificationList.value.filter(
        (item) => item.userId === userId.value,
      );
    });

    async function loadMoreNOtity() {
      // 如果正在加载或没有更多数据，直接返回
      if (isLoading.value || !hasMore.value) {
        return;
      }

      isLoading.value = true;
      const nextPage = currentPage.value + 1;
      // 页码加 1
      // currentPage.value++;
      try {
        const result = await getAllNotify({
          pageSize: pageSize.value,
          pageNum: nextPage,
        });

        // 总条数（根据你的接口字段调整）
        const total = result.total || 0;

        // 处理返回数据
        let messageList: NotificationItem[] = result.rows?.map((item: any) => ({
          avatar: SvgMessageUrl,
          date: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
          isRead: item.readStatus == '1',
          title: item.msgTitle || $t('component.notice.title'),
          ...item
        })) || [];

        // 如果没有获取到新数据，标记为没有更多
        if (messageList.length === 0) {
          hasMore.value = false;
        } else {
          // 合并数据
          const combinedList = [...notificationList.value, ...messageList];

          // 去重逻辑 (保持原有逻辑)
          const uniqueMap = new Map();
          combinedList.forEach((item) => {
            const key = (item as any).id || (item as any).notifyId;
            if (key) {
              uniqueMap.set(key, item);
            }
          });

          // 排序并更新
          const uniqueList = Array.from(uniqueMap.values()).sort((a, b) => {
            return dayjs(b.date).valueOf() - dayjs(a.date).valueOf();
          });

          notificationList.value = uniqueList;

          console.log('加这一段判断', notificationList.value)

          // ✅ 加这一段判断
          if (notificationList.value.length >= total) {
            hasMore.value = false;
          }
        }
      } catch (error) {
        console.error('Load more notifications failed:', error);
        // 出错时回退页码，以便下次重试
        currentPage.value--;
      } finally {
        isLoading.value = false;
      }
    }

    /**
     * 开始监听sse消息
     */
    async function startListeningMessage() {

      getAllMessage()
      // 默认sse 使用 websocket自行开启注释
      // const websocketReturnData = useWebSocketMessage();
      // if (!websocketReturnData) {
      //   return;
      // }
      // const { data } = websocketReturnData;

      const sseReturnData = useSseMessage();
      if (!sseReturnData) {
        return;
      }
      const { data } = sseReturnData;

      watch(data, (message) => {
        if (!message) return;
        console.log(`接收到消息: ${message}`);
        const messageObj = JSON.parse(message);
        console.log('接收到消息-2:', message.message);
        notification.success({
          description: messageObj?.message,
          duration: 3,
          message: $t('component.notice.received'),
        });

        notificationList.value.unshift({
          // avatar: `https://api.multiavatar.com/${random(0, 10_000)}.png`, 随机头像
          avatar: SvgMessageUrl,
          date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          isRead: false,
          message: messageObj.message,
          title: $t('component.notice.title'),
          userId: userId.value,
        });

        // 需要手动置空 vue3在值相同时不会触发watch
        data.value = null;
      });
    }

    function resetPagination() {
      currentPage.value = 1;
      hasMore.value = true;
      isLoading.value = false;
    }

    // 获取所有消息
    async function getAllMessage() {
      // ✅ 先重置分页
      resetPagination();
      notificationList.value = [];
      const result = await getAllNotify({
        pageSize: pageSize.value,
        pageNum: 1
      });

      const total = result.total || 0;


      // Ensure result.rows exists and map them to NotificationItem format if necessary
      // Assuming result.rows contains objects compatible with NotificationItem or needs mapping
      let messageList: NotificationItem[] = result.rows?.map((item: any) => ({
        // Map your API fields to NotificationItem fields
        // Adjust these keys based on your actual API response structure
        // id: item.notifyId || item.id,
        avatar: SvgMessageUrl,
        date: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
        isRead: item.readStatus == '1', // Example: assuming '1' means read
        // message: item.msgContent || item.message,
        title: item.msgTitle || $t('component.notice.title'),
        // userId: userId.value,
        ...item // Spread rest properties if needed
      })) || [];

      console.log('messageList-messageList', messageList)

      // 2. Merge with existing list
      const combinedList = [...notificationList.value, ...messageList,];
      console.log('combinedList-combinedList', combinedList)

      // 3. Deduplicate based on unique ID (e.g., 'id' or 'notifyId')
      // Use a Map to keep only the latest occurrence of each ID
      const uniqueMap = new Map();
      combinedList.forEach((item) => {
        // Use a unique identifier from your data. Replace 'id' with your actual unique key
        const key = (item as any).id || (item as any).notifyId;
        if (key) {
          uniqueMap.set(key, item);
        }
      });

      // 4. Convert back to array and sort by date (newest first)
      const uniqueList = Array.from(uniqueMap.values()).sort((a, b) => {
        return dayjs(b.date).valueOf() - dayjs(a.date).valueOf();
      });

      // 5. Update the store
      notificationList.value = uniqueList;

      // ✅ 关键：初始化时也要判断 hasMore
      if (notificationList.value.length >= total) {
        hasMore.value = false;
      }

      console.log('notificationList-notificationList', notificationList.value)
    }

    /**
     * 设置全部已读
     */
    async function setAllRead() {
      await markNotify()
      getAllMessage()
      // notificationList.value
      //   .filter((item) => item.userId === userId.value)
      //   .forEach((item) => {
      //     item.isRead = true;
      //   });
    }

    /**
     * 设置单条消息已读
     * @param item 通知
     */
    async function setRead(item: NotificationItem) {
      // !item.isRead && (item.isRead = true);
      const postData = [item.messageId]
      await readNotify(postData)
      // 显示信息
      Modal.info({
        title: item.title,
        content: item.message,
      });

      getAllMessage()
    }

    /**
     * 清空全部消息
     */
    async function clearAllMessage() {
      await removeNotify()
      // notificationList.value = notificationList.value.filter(
      //   (item) => item.userId !== userId.value,
      // );
      notificationList.value = [];
      getAllMessage()
    }

    /**
     * 只需要空实现即可
     * 否则会在退出登录清空所有
     */
    function $reset() {
      // notificationList.value = [];
    }
    /**
     * 显示小圆点
     */
    const showDot = computed(() =>
      notificationList.value
        .filter((item) => item.userId === userId.value)
        .some((item) => !item.isRead),
    );

    return {
      $reset,
      clearAllMessage,
      notificationList,
      notifications,
      setAllRead,
      setRead,
      showDot,
      startListeningMessage,
      getAllMessage,
      loadMoreNOtity,
      isLoading,
      hasMore
    };
  },
  {
    persist: {
      pick: ['notificationList'],
    },
  },
);
