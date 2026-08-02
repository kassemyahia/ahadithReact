import axios from 'axios'
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '../services/tokenStorage.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:8080/api/v1' : '/api/v1')

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

let refreshRequest = null
let authFailureHandler = null

export function setAuthFailureHandler(handler) {
  authFailureHandler = handler
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const refreshToken = getRefreshToken()

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      originalRequest?._skipAuthRefresh ||
      originalRequest?.url === '/auth/refresh' ||
      !refreshToken
    ) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      refreshRequest ||= apiClient
        .post('/auth/refresh', { refreshToken }, { _skipAuthRefresh: true })
        .then((response) => response.data)
        .finally(() => {
          refreshRequest = null
        })

      const tokens = await refreshRequest
      setTokens(tokens)
      originalRequest.headers ||= {}
      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`
      return apiClient(originalRequest)
    } catch (refreshError) {
      clearTokens()
      authFailureHandler?.()
      return Promise.reject(refreshError)
    }
  },
)

export default apiClient
