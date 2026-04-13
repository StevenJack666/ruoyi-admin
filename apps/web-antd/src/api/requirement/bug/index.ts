import type { Bug } from './model';
import type { Project } from '../project/model';
import type { ID, IDS, PageQuery, PageResult } from '#/api/common';
import { requestClient } from '#/api/request';
import { commonExport } from '#/api/helper';
enum Api {
  root = '/requirement/bug',
  bugList = '/requirement/bug/list',
  projectList = '/requirement/project/list',
  itemExport = '/requirement/bug/export',
  changeStatus = '/requirement/bug/changeStatus'
}
/**
 * 查询市场分页列表
 * @param params 请求参数
 * @returns 列表
 */
export function getBugList(params?: PageQuery) {
  return requestClient.get<PageResult<Bug>>(Api.bugList, { params });
}

export function getProjectList(params?: PageQuery) {
  return requestClient.get<PageResult<Project>>(Api.projectList, { params });
}

export function addBug(data: Partial<Bug>) {
  return requestClient.postWithMsg<void>(Api.root, data);
}

export function editBug(data: Partial<Bug>) {
  return requestClient.putWithMsg<void>(Api.root, data);
}

export function bugInfo(id: ID) {
  return requestClient.get<Bug>(`${Api.root}/${id}`);
}
export function delBug(ids: IDS) {
  return requestClient.deleteWithMsg<void>(`${Api.root}/${ids}`);
}

export function handleBugExport(data: Partial<Bug>) {
  return commonExport(Api.itemExport, data);
}

export function handleChangeStatus(data: Partial<Bug>) {
  return requestClient.postWithMsg<void>(Api.changeStatus, data);
}
