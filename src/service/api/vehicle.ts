import { request } from '../http'

// 项目空间相关API
export const projectApi = {
  // 获取项目列表
  getProjectList(params: object) {
    return request.Get('/projects/', { params })
  },

  // 获取项目详情
  getProjectDetail(id: string) {
    return request.Get(`/projects/${id}/`)
  },

  // 创建项目
  createProject(data: object) {
    return request.Post('/projects/', data)
  },

  // 更新项目
  updateProject(id: string, data: object) {
    return request.Put(`/projects/${id}/`, data)
  },

  // 删除项目
  deleteProject(id: string) {
    return request.Delete(`/projects/${id}/`)
  },

  // 获取所有启用的项目（用于下拉选择）
  getActiveProjects() {
    return request.Get('/projects/', {
      params: { is_active: true, page_size: 1000 },
    })
  },
}

// 车型相关API
export const vehicleApi = {
  // 获取车型列表
  getVehicleList(params: object) {
    return request.Get('/vehicles/', { params })
  },

  // 获取车型详情
  getVehicleDetail(id: string) {
    return request.Get(`/vehicles/${id}/`)
  },

  // 创建车型
  createVehicle(data: object) {
    return request.Post('/vehicles/', data)
  },

  // 更新车型
  updateVehicle(id: string, data: object) {
    return request.Put(`/vehicles/${id}/`, data)
  },

  // 删除车型
  deleteVehicle(id: string) {
    return request.Delete(`/vehicles/${id}/`)
  },
}
