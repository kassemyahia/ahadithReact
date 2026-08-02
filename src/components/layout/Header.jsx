import { Link, NavLink } from 'react-router-dom'
import { APP_NAME } from '../../utils/constants.js'
import { useAuth } from '../../hooks/useAuth.js'
import Button from '../common/Button.jsx'
import MobileMenu from './MobileMenu.jsx'

const navItems = [
  { to: '/', label: 'الرئيسية' },
  { to: '/search', label: 'البحث' },
  { to: '/books', label: 'الكتب' },
  { to: '/favorites', label: 'المفضلة' },
  { to: '/profile', label: 'الملف الشخصي' },
  { to: '/login', label: 'تسجيل الدخول' },
]

export default function Header() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="app-container flex items-center justify-between gap-4 py-4">
        <Link to="/" className="text-xl font-bold text-emerald-950">
          {APP_NAME}
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="التنقل الرئيسي">
          {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-emerald-50 text-emerald-950' : 'text-stone-700 hover:bg-stone-100'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <>
              <Link className="rounded-md px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100" to="/profile">
                الحساب
              </Link>
              <Button variant="secondary" onClick={logout}>
                خروج
              </Button>
            </>
          ) : (
            <>
              <Link className="rounded-md px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100" to="/login">
                دخول
              </Link>
              <Link className="inline-flex min-h-10 items-center rounded-md bg-emerald-800 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900" to="/register">
                حساب جديد
              </Link>
            </>
          )}
        </div>
        <MobileMenu navItems={navItems} />
      </div>
    </header>
  )
}
