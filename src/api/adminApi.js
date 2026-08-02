import apiClient from './client.js'
import { cleanParams } from '../utils/queryParams.js'

export function getAdminDashboard(config = {}) {
  return apiClient.get('/admin/dashboard', config).then((res) => res.data)
}

export function getAdminResource(resource, params = {}, config = {}) {
  return apiClient.get(`/admin/${resource}`, { ...config, params: cleanParams(params) }).then((res) => res.data)
}

export function getAdminResourceById(resource, id, config = {}) {
  return apiClient.get(`/admin/${resource}/${id}`, config).then((res) => res.data)
}

export function createAdminResource(resource, payload) {
  return apiClient.post(`/admin/${resource}`, payload).then((res) => res.data)
}

export function updateAdminResource(resource, id, payload) {
  return apiClient.put(`/admin/${resource}/${id}`, payload).then((res) => res.data)
}

export function patchAdminResource(resource, id, payload) {
  return apiClient.patch(`/admin/${resource}/${id}`, payload).then((res) => res.data)
}

export function deleteAdminResource(resource, id) {
  return apiClient.delete(`/admin/${resource}/${id}`).then((res) => res.data)
}

export function getActivityLogs(params = {}, config = {}) {
  return apiClient.get('/admin/activity-logs', { ...config, params: cleanParams(params) }).then((res) => res.data)
}
