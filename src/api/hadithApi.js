import apiClient from './client.js'
import { cleanParams } from '../utils/queryParams.js'

// Inspected backend: PublicHadithController, HadithSearchRequest, SearchResponse, FiltersListResponseDto.
/** @param {{ query?: string, mode?: string, includeExplanation?: boolean, page?: number, size?: number, sort?: string }} payload */
export function searchHadiths(payload = {}, config = {}) {
  return apiClient.post('/ahadith/search', cleanParams(payload), config).then((res) => res.data)
}

export function getSearchFilters(config = {}) {
  return apiClient.get('/search/filters', config).then((res) => res.data)
}

/** @param {string} hadithId */
export function getHadith(hadithId, config = {}) {
  return apiClient.get(`/ahadith/${hadithId}`, config).then((res) => res.data)
}
