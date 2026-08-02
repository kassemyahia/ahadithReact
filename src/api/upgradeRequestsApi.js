import apiClient from './client.js'
import { cleanParams } from '../utils/queryParams.js'

export function createUpgradeRequest({ document, notes }) {
  const formData = new FormData()
  if (document) formData.append('document', document)
  if (notes) formData.append('notes', notes)
  return apiClient.post('/me/upgrade-requests', formData).then((res) => res.data)
}

export function getCurrentUpgradeRequest(config = {}) {
  return apiClient.get('/me/upgrade-requests/current', config).then((res) => res.data)
}

export function getMyUpgradeRequests(config = {}) {
  return apiClient.get('/me/upgrade-requests', config).then((res) => res.data)
}

export function getMyUpgradeDocument(upgradeRequestId, config = {}) {
  return apiClient.get(`/me/upgrade-requests/${upgradeRequestId}/document`, config).then((res) => res.data)
}

export function getAdminUpgradeRequests(params = {}, config = {}) {
  return apiClient.get('/admin/upgrade-requests', { ...config, params: cleanParams(params) }).then((res) => res.data)
}

export function getAdminUpgradeRequest(upgradeRequestId, config = {}) {
  return apiClient.get(`/admin/upgrade-requests/${upgradeRequestId}`, config).then((res) => res.data)
}

export function getAdminUpgradeDocument(upgradeRequestId, config = {}) {
  return apiClient.get(`/admin/upgrade-requests/${upgradeRequestId}/document`, config).then((res) => res.data)
}

export function reviewUpgradeRequest(upgradeRequestId, payload) {
  return apiClient.patch(`/admin/upgrade-requests/${upgradeRequestId}/review`, payload).then((res) => res.data)
}

export function deleteAdminUpgradeRequest(upgradeRequestId) {
  return apiClient.delete(`/admin/upgrade-requests/${upgradeRequestId}`).then((res) => res.data)
}
