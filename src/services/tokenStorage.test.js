import { clearTokens, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from './tokenStorage.js'

describe('tokenStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('stores and clears access and refresh tokens', () => {
    setAccessToken('access')
    setRefreshToken('refresh')

    expect(getAccessToken()).toBe('access')
    expect(getRefreshToken()).toBe('refresh')

    clearTokens()

    expect(getAccessToken()).toBeNull()
    expect(getRefreshToken()).toBeNull()
  })

  it('removes a token when passed an empty value', () => {
    setAccessToken('access')
    setAccessToken('')

    expect(getAccessToken()).toBeNull()
  })
})
