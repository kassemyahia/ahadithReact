export function getItems(response) {
  if (Array.isArray(response)) return response
  return response?.items || []
}

export function getPagination(response) {
  return response?.pagination || {
    page: 0,
    size: getItems(response).length,
    totalItems: getItems(response).length,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  }
}

export function toIdList(value) {
  if (!value) return []
  return Array.isArray(value) ? value.filter(Boolean) : [value]
}

export function compactPayload(payload = {}) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0
      return value !== undefined && value !== null && value !== ''
    }),
  )
}
