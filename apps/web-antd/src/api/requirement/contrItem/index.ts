import type { Item } from './model';
import type { ID, IDS, PageQuery, PageResult } from '#/api/common';
import { requestClient } from '#/api/request';
enum Api {
  root = '/requirement/item',
  itemList = '/requirement/item/list',
}
/**
 * 查询市场分页列表
 * @param params 请求参数
 * @returns 列表
 */
export function getItemList(params?: PageQuery) {
  return requestClient.get<PageResult<Item>>(Api.itemList, { params });
}

// export function getToolList(params?: PageQuery) {
// return requestClient.get<PageResult<Agent>>(Api.toolList, { params });
// }

export function addItem(data: Partial<Item>) {
  return requestClient.postWithMsg<void>(Api.root, data);
}

export function editItem(data: Partial<Item>) {
  return requestClient.putWithMsg<void>(Api.root, data);
}

export function itemInfo(id: ID) {
  return requestClient.get<Item>(`${Api.root}/${id}`);
}
export function delItem(ids: IDS) {
  return requestClient.deleteWithMsg<void>(`${Api.root}/${ids}`);
}
