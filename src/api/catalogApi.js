import apiClient from './client.js'
import { cleanParams } from '../utils/queryParams.js'

// Inspected backend: PublicCatalogController, PublicBookResponseDto, SearchResponse.
export function getBooks(config = {}) {
  return apiClient.get('/books', config).then((res) => res.data)
}

/** @param {string} bookId */
export function getBook(bookId, config = {}) {
  return apiClient.get(`/books/${bookId}`, config).then((res) => res.data)
}

/** @param {string} bookId @param {{ page?: number, size?: number }} params */
export function getBookHadiths(bookId, params = {}, config = {}) {
  return apiClient.get(`/books/${bookId}/ahadith`, { ...config, params: cleanParams(params) }).then((res) => res.data)
}

export function getNarrators(config = {}) {
  return apiClient.get('/rawis', config).then((res) => res.data)
}

export function getNarrator(narratorId, config = {}) {
  return apiClient.get(`/rawis/${narratorId}`, config).then((res) => res.data)
}

export function getMuhaddiths(config = {}) {
  return apiClient.get('/muhaddiths', config).then((res) => res.data)
}

export function getMuhaddith(muhaddithId, config = {}) {
  return apiClient.get(`/muhaddiths/${muhaddithId}`, config).then((res) => res.data)
}

export function getTopics(config = {}) {
  return apiClient.get('/topics', config).then((res) => res.data)
}

export function getTopic(topicId, config = {}) {
  return apiClient.get(`/topics/${topicId}`, config).then((res) => res.data)
}

export function getRulings(config = {}) {
  return apiClient.get('/rulings', config).then((res) => res.data)
}

export function getRuling(rulingId, config = {}) {
  return apiClient.get(`/rulings/${rulingId}`, config).then((res) => res.data)
}

/** @param {{ page?: number, size?: number }} params */
export function getExplanations(params = {}, config = {}) {
  return apiClient.get('/explaining', { ...config, params: cleanParams(params) }).then((res) => res.data)
}

export function getExplanation(explanationId, config = {}) {
  return apiClient.get(`/explaining/${explanationId}`, config).then((res) => res.data)
}

export function getInvalidHadiths(params = {}, config = {}) {
  return apiClient.get('/fake-ahadith', { ...config, params: cleanParams(params) }).then((res) => res.data)
}

export function getInvalidHadith(invalidHadithId, config = {}) {
  return apiClient.get(`/fake-ahadith/${invalidHadithId}`, config).then((res) => res.data)
}
