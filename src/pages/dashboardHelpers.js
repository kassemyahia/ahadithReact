import { getItems, getPagination } from '../utils/apiData.js'

export function itemsFrom(data) {
  return getItems(data)
}

export function totalPagesFrom(data) {
  return getPagination(data).totalPages || 1
}

export function fieldValue(item, path) {
  return path.split('.').reduce((value, key) => value?.[key], item)
}

export function displayValue(value) {
  if (value === true) return 'نعم'
  if (value === false) return 'لا'
  if (value === null || value === undefined || value === '') return 'غير متوفر'
  return String(value)
}

export function excerpt(value, max = 160) {
  const text = displayValue(value)
  return text.length > max ? `${text.slice(0, max)}...` : text
}
