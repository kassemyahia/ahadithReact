import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { login as loginRequest, logout as logoutRequest, register as registerRequest } from '../api/authApi.js'
import { getCurrentUser } from '../api/profileApi.js'
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '../services/tokenStorage.js'
import { normalizeApiError } from '../utils/apiErrors.js'
import { AuthContext } from './authContext.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isInitializing, setIsInitializing] = useState(Boolean(getAccessToken()))
  const didRestore = useRef(false)

  const restoreSession = useCallback(async () => {
    if (didRestore.current) return user
    didRestore.current = true

    if (!getAccessToken()) {
      setIsInitializing(false)
      return null
    }

    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      return currentUser
    } catch {
      clearTokens()
      setUser(null)
      return null
    } finally {
      setIsInitializing(false)
    }
  }, [user])

  useEffect(() => {
    // Auth bootstrap intentionally synchronizes persisted tokens with the backend session.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void restoreSession()
  }, [restoreSession])

  const login = useCallback(async (payload) => {
    try {
      const response = await loginRequest(payload)
      setTokens(response)
      setUser(response.user)
      return response
    } catch (error) {
      throw normalizeApiError(error)
    }
  }, [])

  const register = useCallback(async (payload) => {
    try {
      const response = await registerRequest(payload)
      setTokens(response)
      setUser(response.user)
      return response
    } catch (error) {
      throw normalizeApiError(error)
    }
  }, [])

  const logout = useCallback(async () => {
    const refreshToken = getRefreshToken()
    clearTokens()
    setUser(null)

    if (refreshToken) {
      await logoutRequest(refreshToken).catch(() => null)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing,
      login,
      register,
      logout,
      restoreSession,
      refreshUser: restoreSession,
    }),
    [isInitializing, login, logout, register, restoreSession, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
