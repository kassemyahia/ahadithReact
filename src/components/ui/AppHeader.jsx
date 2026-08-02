import { Menu } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { APP_NAME } from '../../utils/constants.js'
import { useAuth } from '../../hooks/useAuth.js'
import Button from '../common/Button.jsx'
import MobileMenu from '../layout/MobileMenu.jsx'

const publicItems = [
  { to: '/', label: 'الرئيسية' },
  { to: '/search', label: 'البحث المتقدم' },
  { to: '/books', label: 'الكتب' },
  { to: '/invalid-hadiths', label: 'لا تصح' },
]

const memberItems = [
  { to: '/questions', label: 'الأسئلة' },
  { to: '/favorites', label: 'المفضلة' },
  { to: '/search-history', label: 'السجل' },
  { to: '/profile', label: 'ملفي' },
]

export default function AppHeader() {
  const { isAuthenticated, logout } = useAuth()
  const navItems = isAuthenticated ? [...publicItems, ...memberItems] : publicItems

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-primary-soft)] bg-[var(--color-header)]/95 shadow-sm backdrop-blur">
      <div className="app-container flex min-h-[76px] items-center justify-between gap-3 py-3">
        <Link to="/" className="text-lg font-black text-[var(--color-primary)]">
          {APP_NAME}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="التنقل الرئيسي">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-bold transition ${isActive ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary-strong)]' : 'text-[var(--color-text-muted)] hover:bg-white hover:text-[var(--color-primary-strong)]'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <Button variant="secondary" onClick={logout}>
              خروج
            </Button>
          ) : (
            <>
              <Link className="rounded-full px-4 py-2 text-sm font-bold text-[var(--color-primary-strong)] hover:bg-white" to="/login">
                دخول
              </Link>
              <Link className="inline-flex min-h-11 items-center rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-bold text-white hover:bg-[var(--color-primary-strong)]" to="/register">
                حساب جديد
              </Link>
            </>
          )}
        </div>

        <MobileMenu navItems={navItems} triggerIcon={Menu} />
      </div>
    </header>
  )
}
