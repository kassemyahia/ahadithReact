import apiClient from './client.js'

// Inspected backend: AuthController, auth/account request DTOs, AuthResponseDto.
/** @param {{ email: string, password: string }} payload */
export function login(payload) {
  return apiClient.post('/auth/login', payload).then((res) => res.data)
}

/** @param {{ name: string, email: string, password: string, gender?: string|null, birthDate?: string|null, avatarUrl?: string }} payload */
export function register(payload) {
  return apiClient.post('/auth/register', payload).then((res) => res.data)
}

/** @param {string} refreshToken */
export function refreshSession(refreshToken) {
  return apiClient.post('/auth/refresh', { refreshToken }).then((res) => res.data)
}

/** @param {string|null} refreshToken */
export function logout(refreshToken) {
  return apiClient.post('/auth/logout', refreshToken ? { refreshToken } : {}).then((res) => res.data)
}

/** @param {string} token */
export function verifyEmail(token) {
  return apiClient.post('/auth/verify-email', { token }).then((res) => res.data)
}

/** @param {string} email */
export function resendVerification(email) {
  return apiClient.post('/auth/resend-verification', { email }).then((res) => res.data)
}

/** @param {string} email */
export function forgotPassword(email) {
  return apiClient.post('/auth/forgot-password', { email }).then((res) => res.data)
}

/** @param {{ token: string, newPassword: string }} payload */
export function resetPassword(payload) {
  return apiClient.post('/auth/reset-password', payload).then((res) => res.data)
}
