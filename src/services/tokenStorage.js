const ACCESS_TOKEN_KEY = 'ahadith.web.accessToken'
const REFRESH_TOKEN_KEY = 'ahadith.web.refreshToken'

function getStorage() {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null
  } catch {
    return null
  }
}

export function getAccessToken() {
  return getStorage()?.getItem(ACCESS_TOKEN_KEY) || null
}

export function setAccessToken(token) {
  const storage = getStorage()
  if (!storage) return

  if (token) {
    storage.setItem(ACCESS_TOKEN_KEY, token)
  } else {
    storage.removeItem(ACCESS_TOKEN_KEY)
  }
}

export function getRefreshToken() {
  return getStorage()?.getItem(REFRESH_TOKEN_KEY) || null
}

export function setRefreshToken(token) {
  const storage = getStorage()
  if (!storage) return

  if (token) {
    storage.setItem(REFRESH_TOKEN_KEY, token)
  } else {
    storage.removeItem(REFRESH_TOKEN_KEY)
  }
}

export function setTokens({ accessToken, refreshToken }) {
  setAccessToken(accessToken)
  setRefreshToken(refreshToken)
}

export function clearTokens() {
  setAccessToken(null)
  setRefreshToken(null)
}

// TODO: Before production, consider Secure HttpOnly cookies for refresh tokens.
// That change requires backend coordination because JavaScript cannot read HttpOnly cookies.
