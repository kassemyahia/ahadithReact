import apiClient from './client.js'
import { cleanParams } from '../utils/queryParams.js'

// Inspected backend: PublicHadithController, HadithSearchRequest, SearchResponse, FiltersListResponseDto.
/** @param {{ query?: string, mode?: string, includeExplanation?: boolean, page?: number, size?: number, sort?: string }} payload */
export function searchHadiths(payload = {}) {
  return apiClient.post('/ahadith/search', cleanParams(payload)).then((res) => res.data)
}

export function getSearchFilters() {
  return apiClient.get('/search/filters').then((res) => res.data)
}

/** @param {string} hadithId */
export function getHadith(hadithId) {
  return apiClient.get(`/ahadith/${hadithId}`).then((res) => res.data)
}
