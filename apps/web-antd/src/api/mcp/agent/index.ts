import type { Agent, McpTool } from './model';
import type {  ID,IDS, PageQuery, PageResult } from '#/api/common';
import { requestClient } from '#/api/request';
enum Api {
  root = '/agent/market',
  agentList = '/agent/market/list',
  toolList = '/mcp/tool/list',
}
/**
 * 查询市场分页列表
 * @param params 请求参数
 * @returns 列表
 */
export function getAgentList(params?: PageQuery) {
  return requestClient.get<PageResult<Agent>>(Api.agentList, { params });
}

export function getToolList(params?: PageQuery) {
return requestClient.get<PageResult<Agent>>(Api.toolList, { params });
}

export function addAgent(data: Partial<Agent>) {
  return requestClient.postWithMsg<void>(Api.root, data);
}

export function editAgent(data: Partial<Agent>) {
  return requestClient.putWithMsg<void>(Api.root, data);
}

export function agentInfo(id: ID) {
  return requestClient.get<Agent>(`${Api.root}/${id}`);
}
export function delAgent(ids: IDS) {
  return requestClient.deleteWithMsg<void>(`${Api.root}/${ids}`);
}
