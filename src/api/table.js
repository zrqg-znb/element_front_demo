import request from './request'

// 获取表格数据列表
export function getTableList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

// 获取表格详情
export function getTableDetail(id) {
  return request({
    url: `/table/detail/${id}`,
    method: 'get'
  })
}

// 创建表格数据
export function createTableItem(data) {
  return request({
    url: '/table/create',
    method: 'post',
    data
  })
}

// 更新表格数据
export function updateTableItem(data) {
  return request({
    url: '/table/update',
    method: 'put',
    data
  })
}

// 删除表格数据
export function deleteTableItem(id) {
  return request({
    url: `/table/delete/${id}`,
    method: 'delete'
  })
}

// 批量删除表格数据
export function batchDeleteTableItems(ids) {
  return request({
    url: '/table/batch-delete',
    method: 'post',
    data: { ids }
  })
}

// 导出表格数据
export function exportTable(params) {
  return request({
    url: '/table/export',
    method: 'get',
    params,
    responseType: 'blob'
  })
}