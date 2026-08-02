import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.jsx'
import { AuthContext } from '../../contexts/authContext.js'

function renderProtected(authValue) {
  return render(
    <MemoryRouter initialEntries={['/favorites']}>
      <AuthContext.Provider value={authValue}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/favorites" element={<h1>الأحاديث المفضلة</h1>} />
          </Route>
          <Route path="/login" element={<h1>تسجيل الدخول</h1>} />
        </Routes>
      </AuthContext.Provider>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  it('shows an accessible loading state while initializing', () => {
    renderProtected({ isAuthenticated: false, isInitializing: true })

    expect(screen.getByRole('status')).toHaveTextContent('جاري التحميل')
  })

  it('renders protected content when authenticated', () => {
    renderProtected({ isAuthenticated: true, isInitializing: false })

    expect(screen.getByRole('heading', { name: 'الأحاديث المفضلة' })).toBeInTheDocument()
  })

  it('redirects unauthenticated users to login', () => {
    renderProtected({ isAuthenticated: false, isInitializing: false })

    expect(screen.getByRole('heading', { name: 'تسجيل الدخول' })).toBeInTheDocument()
  })
})
