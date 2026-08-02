import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes.jsx'
import { AuthContext } from '../contexts/authContext.js'

function renderRoutes(path, authValue = {}) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  const value = {
    user: null,
    isAuthenticated: false,
    isInitializing: false,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    refreshUser: vi.fn(),
    ...authValue,
  }

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]}>
        <AuthContext.Provider value={value}>
          <AppRoutes />
        </AuthContext.Provider>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('AppRoutes', () => {
  it('renders the Arabic home page', () => {
    renderRoutes('/')

    expect(screen.getByRole('heading', { name: 'الرئيسية' })).toBeInTheDocument()
  })

  it('redirects protected routes to login when unauthenticated', () => {
    renderRoutes('/favorites')

    expect(screen.getByRole('heading', { name: 'تسجيل الدخول' })).toBeInTheDocument()
  })
})
