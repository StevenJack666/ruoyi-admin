import { requestClient } from '#/api/request';
import type { PageQuery, PageResult } from '#/api/common';
// 获取所有消息
export function getAllNotify(params?: PageQuery) {
    return requestClient.get<PageResult<PageQuery>>('/bus/message/history', {
        params,
    });
}
// 全部标记为已读
export function markNotify(data?: {}) {
    return requestClient.postWithMsg<void>('/bus/message/ackAll', data);
}

//已读消息回执
export function readNotify(data?: []) {
    return requestClient.postWithMsg<void>('/bus/message/ack', data);
}

// 清空消息
export function removeNotify(data?: {}) {
    return requestClient.postWithMsg<void>('/bus/message/delete', data);
}



