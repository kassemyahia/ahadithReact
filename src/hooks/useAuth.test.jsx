import { render } from '@testing-library/react'
import { useAuth } from './useAuth.js'

function Consumer() {
  useAuth()
  return null
}

describe('useAuth', () => {
  it('throws outside AuthProvider', () => {
    expect(() => render(<Consumer />)).toThrow('useAuth must be used within AuthProvider')
  })
})
