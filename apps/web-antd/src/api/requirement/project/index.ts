import type { Project } from './model';
import type {  ID,IDS, PageQuery, PageResult } from '#/api/common';
import { requestClient } from '#/api/request';
enum Api {
  root = '/requirement/project',
  projectList = '/requirement/project/list',
}
/**
 * 查询市场分页列表
 * @param params 请求参数
 * @returns 列表
 */
export function getProjectList(params?: PageQuery) {
  return requestClient.get<PageResult<Project>>(Api.projectList, { params });
}

// export function getToolList(params?: PageQuery) {
// return requestClient.get<PageResult<Agent>>(Api.toolList, { params });
// }

export function addProject(data: Partial<Project>) {
  return requestClient.postWithMsg<void>(Api.root, data);
}

export function editProject(data: Partial<Project>) {
  return requestClient.putWithMsg<void>(Api.root, data);
}

export function projectInfo(id: ID) {
  return requestClient.get<Project>(`${Api.root}/${id}`);
}
export function delProject(ids: IDS) {
  return requestClient.deleteWithMsg<void>(`${Api.root}/${ids}`);
}
