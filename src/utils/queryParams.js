export function readPositivePage(value, fallback = 1) {
  const page = Number.parseInt(value, 10)
  return Number.isInteger(page) && page > 0 ? page : fallback
}

export function toBackendPage(uiPage) {
  return Math.max(readPositivePage(uiPage) - 1, 0)
}

export function toUiPage(backendPage) {
  const page = Number.parseInt(backendPage, 10)
  return Number.isInteger(page) && page >= 0 ? page + 1 : 1
}

export function cleanParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0
      return value !== undefined && value !== null && value !== ''
    }),
  )
}

export function readStringParam(searchParams, key, fallback = '') {
  const value = searchParams.get(key)
  return typeof value === 'string' ? value : fallback
}

export function toSearchParams(params = {}) {
  const searchParams = new URLSearchParams()

  Object.entries(cleanParams(params)).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => searchParams.append(key, item))
      return
    }

    searchParams.set(key, value)
  })

  return searchParams
}
