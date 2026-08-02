import apiClient from './client.js'
import { cleanParams } from '../utils/queryParams.js'

// Inspected backend: PublicCatalogController, PublicBookResponseDto, SearchResponse.
export function getBooks() {
  return apiClient.get('/books').then((res) => res.data)
}

/** @param {string} bookId */
export function getBook(bookId) {
  return apiClient.get(`/books/${bookId}`).then((res) => res.data)
}

/** @param {string} bookId @param {{ page?: number, size?: number }} params */
export function getBookHadiths(bookId, params = {}) {
  return apiClient.get(`/books/${bookId}/ahadith`, { params: cleanParams(params) }).then((res) => res.data)
}

export function getNarrators() {
  return apiClient.get('/rawis').then((res) => res.data)
}

export function getScholars() {
  return apiClient.get('/muhaddiths').then((res) => res.data)
}

export function getTopics() {
  return apiClient.get('/topics').then((res) => res.data)
}

export function getRulings() {
  return apiClient.get('/rulings').then((res) => res.data)
}

/** @param {{ page?: number, size?: number }} params */
export function getExplanations(params = {}) {
  return apiClient.get('/explaining', { params: cleanParams(params) }).then((res) => res.data)
}
