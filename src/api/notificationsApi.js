import apiClient from './client.js'
import { cleanParams } from '../utils/queryParams.js'

export function getAdminNotifications(params = {}, config = {}) {
  return apiClient.get('/admin/notifications', { ...config, params: cleanParams(params) }).then((res) => res.data)
}

export function createAdminNotification(payload) {
  return apiClient.post('/admin/notifications', payload).then((res) => res.data)
}

export function deleteAdminNotification(notificationId) {
  return apiClient.delete(`/admin/notifications/${notificationId}`).then((res) => res.data)
}
