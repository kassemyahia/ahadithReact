import apiClient from './client.js'
import { cleanParams } from '../utils/queryParams.js'

// Inspected backend: MeFavoriteController and FavoriteResponseDto.
/** @param {{ page?: number, size?: number }} params */
export function getFavorites(params = {}, config = {}) {
  return apiClient.get('/me/favorites', { ...config, params: cleanParams(params) }).then((res) => res.data)
}

/** @param {string} hadithId */
export function addFavorite(hadithId) {
  return apiClient.post(`/me/favorites/${hadithId}`).then((res) => res.data)
}

/** @param {string} hadithId */
export function removeFavorite(hadithId) {
  return apiClient.delete(`/me/favorites/${hadithId}`).then((res) => res.data)
}
