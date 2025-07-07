import request from './request'

// 用户登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 用户登出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

// 创建用户
export function createUser(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

// 更新用户
export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'put',
    data
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: `/user/delete/${id}`,
    method: 'delete'
  })
}