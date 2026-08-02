import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Menu } from 'lucide-react'
import { MemoryRouter } from 'react-router-dom'
import MobileMenu from './MobileMenu.jsx'
import { AuthContext } from '../../contexts/authContext.js'

const authValue = {
  user: null,
  isAuthenticated: false,
  isInitializing: false,
  logout: vi.fn(),
}

describe('MobileMenu', () => {
  it('opens and closes from a navigation link', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <AuthContext.Provider value={authValue}>
          <MobileMenu triggerIcon={Menu} navItems={[{ to: '/search', label: 'البحث المتقدم' }]} />
        </AuthContext.Provider>
      </MemoryRouter>,
    )

    const trigger = screen.getByRole('button', { name: 'فتح القائمة' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'التنقل للجوال' })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'البحث المتقدم' }))
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })
})
