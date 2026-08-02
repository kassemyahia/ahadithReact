import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import ProfilePage from './ProfilePage.jsx'
import { AuthContext } from '../contexts/authContext.js'

function renderProfile() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

  return render(
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{
          user: { name: 'مستخدم', email: 'user@example.com' },
          isAuthenticated: true,
          isInitializing: false,
          refreshUser: vi.fn(),
        }}
      >
        <ProfilePage />
      </AuthContext.Provider>
    </QueryClientProvider>,
  )
}

describe('ProfilePage', () => {
  it('renders accessible profile image action labels', () => {
    renderProfile()

    expect(screen.getByRole('button', { name: /تعيين صورة/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /إزالة الصورة/ })).toBeInTheDocument()
    expect(screen.getByLabelText('اختيار صورة الملف الشخصي')).toBeInTheDocument()
  })
})
