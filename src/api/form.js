import request from './request'

// 提交表单数据
export function submitForm(data) {
  return request({
    url: '/form/submit',
    method: 'post',
    data
  })
}

// 获取表单数据
export function getFormData(id) {
  return request({
    url: `/form/data/${id}`,
    method: 'get'
  })
}

// 上传文件
export function uploadFile(data) {
  return request({
    url: '/form/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

// 获取表单选项数据
export function getFormOptions() {
  return request({
    url: '/form/options',
    method: 'get'
  })
}

// 保存表单草稿
export function saveFormDraft(data) {
  return request({
    url: '/form/draft',
    method: 'post',
    data
  })
}

// 获取表单草稿
export function getFormDraft(id) {
  return request({
    url: `/form/draft/${id}`,
    method: 'get'
  })
}