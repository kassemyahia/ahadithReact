import apiClient from './client.js'
import { cleanParams } from '../utils/queryParams.js'

export function getSearchHistory(params = {}, config = {}) {
  return apiClient.get('/me/search-history', { ...config, params: cleanParams(params) }).then((res) => res.data)
}

export function searchSearchHistory(params = {}, config = {}) {
  return apiClient.get('/me/search-history/search', { ...config, params: cleanParams(params) }).then((res) => res.data)
}

export function clearSearchHistory() {
  return apiClient.delete('/me/search-history').then((res) => res.data)
}

export function deleteSearchHistoryItem(id) {
  return apiClient.delete(`/me/search-history/${id}`).then((res) => res.data)
}
