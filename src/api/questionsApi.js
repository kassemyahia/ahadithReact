import apiClient from './client.js'
import { cleanParams } from '../utils/queryParams.js'

export function createQuestion(payload) {
  return apiClient.post('/me/questions', payload).then((res) => res.data)
}

export function getMyQuestions(config = {}) {
  return apiClient.get('/me/questions', config).then((res) => res.data)
}

export function getMyQuestion(questionId, config = {}) {
  return apiClient.get(`/me/questions/${questionId}`, config).then((res) => res.data)
}

export function deleteMyQuestion(questionId) {
  return apiClient.delete(`/me/questions/${questionId}`).then((res) => res.data)
}

export function getScholarQuestions(params = {}, config = {}) {
  return apiClient.get('/scholar/questions', { ...config, params: cleanParams(params) }).then((res) => res.data)
}

export function getScholarQuestion(questionId, config = {}) {
  return apiClient.get(`/scholar/questions/${questionId}`, config).then((res) => res.data)
}

export function answerScholarQuestion(questionId, payload) {
  return apiClient.patch(`/scholar/questions/${questionId}/answer`, payload).then((res) => res.data)
}

export function updateScholarQuestionStatus(questionId, payload) {
  return apiClient.patch(`/scholar/questions/${questionId}/status`, payload).then((res) => res.data)
}

export function getAdminQuestions(params = {}, config = {}) {
  return apiClient.get('/admin/questions', { ...config, params: cleanParams(params) }).then((res) => res.data)
}

export function getAdminQuestion(questionId, config = {}) {
  return apiClient.get(`/admin/questions/${questionId}`, config).then((res) => res.data)
}

export function answerAdminQuestion(questionId, payload) {
  return apiClient.patch(`/admin/questions/${questionId}/answer`, payload).then((res) => res.data)
}

export function updateAdminQuestionStatus(questionId, payload) {
  return apiClient.patch(`/admin/questions/${questionId}/status`, payload).then((res) => res.data)
}

export function deleteAdminQuestion(questionId) {
  return apiClient.delete(`/admin/questions/${questionId}`).then((res) => res.data)
}
