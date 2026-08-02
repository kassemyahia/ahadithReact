import apiClient from './client.js'
import { cleanParams } from '../utils/queryParams.js'

export function getMyComments(config = {}) {
  return apiClient.get('/me/comments', config).then((res) => res.data)
}

export function getMyComment(commentId, config = {}) {
  return apiClient.get(`/me/comments/${commentId}`, config).then((res) => res.data)
}

export function createHadithComment(hadithId, payload) {
  return apiClient.post(`/me/hadiths/${hadithId}/comments`, payload).then((res) => res.data)
}

export function createScholarHadithComment(hadithId, payload) {
  return apiClient.post(`/scholar/hadiths/${hadithId}/comments`, payload).then((res) => res.data)
}

export function updateMyComment(commentId, payload) {
  return apiClient.patch(`/me/comments/${commentId}`, payload).then((res) => res.data)
}

export function deleteMyComment(commentId) {
  return apiClient.delete(`/me/comments/${commentId}`).then((res) => res.data)
}

export function getScholarComments(params = {}, config = {}) {
  return apiClient.get('/scholar/comments', { ...config, params: cleanParams(params) }).then((res) => res.data)
}

export function getScholarComment(commentId, config = {}) {
  return apiClient.get(`/scholar/comments/${commentId}`, config).then((res) => res.data)
}

export function updateScholarComment(commentId, payload) {
  return apiClient.patch(`/scholar/comments/${commentId}`, payload).then((res) => res.data)
}

export function deleteScholarComment(commentId) {
  return apiClient.delete(`/scholar/comments/${commentId}`).then((res) => res.data)
}

export function getAdminComments(params = {}, config = {}) {
  return apiClient.get('/admin/comments', { ...config, params: cleanParams(params) }).then((res) => res.data)
}

export function getAdminComment(commentId, config = {}) {
  return apiClient.get(`/admin/comments/${commentId}`, config).then((res) => res.data)
}

export function deleteAdminComment(commentId) {
  return apiClient.delete(`/admin/comments/${commentId}`).then((res) => res.data)
}
