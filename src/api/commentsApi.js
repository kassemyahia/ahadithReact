import apiClient from './client.js'
import { cleanParams } from '../utils/queryParams.js'

export function getMyComments(config = {}) {
  return apiClient.get('/me/comments', config).then((res) => res.data)
}

export function createHadithComment(hadithId, payload) {
  return apiClient.post(`/me/hadiths/${hadithId}/comments`, payload).then((res) => res.data)
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
