import type { Note } from './model';
import type {  ID,IDS, PageQuery, PageResult } from '#/api/common';
import { requestClient } from '#/api/request';
enum Api {
  root = '/requirement/note',
  noteList = '/requirement/note/list',
}
/**
 * 查询市场分页列表
 * @param params 请求参数
 * @returns 列表
 */
export function getNoteList(params?: PageQuery) {
  return requestClient.get<PageResult<Note>>(Api.noteList, { params });
}

// export function getToolList(params?: PageQuery) {
// return requestClient.get<PageResult<Agent>>(Api.toolList, { params });
// }

export function addNote(data: Partial<Note>) {
  return requestClient.postWithMsg<void>(Api.root, data);
}

export function editNote(data: Partial<Note>) {
  return requestClient.putWithMsg<void>(Api.root, data);
}

export function noteInfo(id: ID) {
  return requestClient.get<Note>(`${Api.root}/${id}`);
}
export function delNote(ids: IDS) {
  return requestClient.deleteWithMsg<void>(`${Api.root}/${ids}`);
}
