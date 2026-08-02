import apiClient from './client.js'

// Inspected backend: UserProfileController, AuthUserDto, ProfileImageResponse.
export function getCurrentUser() {
  return apiClient.get('/me').then((res) => res.data)
}

/** @param {File} file */
export function uploadProfileImage(file) {
  const formData = new FormData()
  formData.append('file', file)
  return apiClient.post('/me/profile-image', formData).then((res) => res.data)
}

export function removeProfileImage() {
  return apiClient.delete('/me/profile-image').then((res) => res.data)
}

export function logoutAllSessions() {
  return apiClient.post('/me/logout-all').then((res) => res.data)
}
