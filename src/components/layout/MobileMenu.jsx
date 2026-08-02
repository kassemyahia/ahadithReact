import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import Button from '../common/Button.jsx'

export default function MobileMenu({ navItems }) {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const menuId = 'mobile-navigation'

  return (
    <div className="md:hidden">
      <Button variant="secondary" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-controls={menuId}>
        القائمة
      </Button>
      {isOpen && (
        <div id={menuId} className="absolute inset-x-4 top-16 z-40 rounded-md border border-stone-200 bg-white p-3 shadow-lg">
          <nav className="grid gap-1" aria-label="التنقل للجوال">
            {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-emerald-50 text-emerald-950' : 'text-stone-700 hover:bg-stone-100'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            {isAuthenticated ? (
              <>
                <Link className="rounded-md px-3 py-2 text-sm font-medium text-stone-700" to="/profile" onClick={() => setIsOpen(false)}>
                  الحساب
                </Link>
                <Button variant="secondary" onClick={logout}>
                  خروج
                </Button>
              </>
            ) : (
              <>
                <Link className="rounded-md px-3 py-2 text-sm font-medium text-stone-700" to="/login" onClick={() => setIsOpen(false)}>
                  دخول
                </Link>
                <Link className="rounded-md bg-emerald-800 px-3 py-2 text-sm font-semibold text-white" to="/register" onClick={() => setIsOpen(false)}>
                  حساب جديد
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  )
}
