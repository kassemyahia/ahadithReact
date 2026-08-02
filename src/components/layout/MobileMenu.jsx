import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import Button from '../common/Button.jsx'

export default function MobileMenu({ navItems, triggerIcon: TriggerIcon }) {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const menuId = 'mobile-navigation'

  return (
    <div className="md:hidden">
      <Button variant="secondary" className="size-11 rounded-full px-0" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-controls={menuId} aria-label="فتح القائمة">
        {TriggerIcon ? <TriggerIcon className="size-5" aria-hidden="true" /> : 'القائمة'}
      </Button>
      {isOpen && (
        <div id={menuId} className="absolute inset-x-4 top-16 z-40 rounded-[20px] border border-[var(--color-border-gold)] bg-white p-3 shadow-[var(--shadow-nav)]">
          <nav className="grid gap-1" aria-label="التنقل للجوال">
            {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-[14px] px-3 py-3 text-sm font-bold ${isActive ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary-strong)]' : 'text-[var(--color-text)] hover:bg-[var(--color-page)]'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            {isAuthenticated ? (
              <>
                <Link className="rounded-[14px] px-3 py-3 text-sm font-bold text-[var(--color-text)]" to="/profile" onClick={() => setIsOpen(false)}>
                  الحساب
                </Link>
                <Button variant="secondary" onClick={logout}>
                  خروج
                </Button>
              </>
            ) : (
              <>
                <Link className="rounded-[14px] px-3 py-3 text-sm font-bold text-[var(--color-text)]" to="/login" onClick={() => setIsOpen(false)}>
                  دخول
                </Link>
                <Link className="rounded-full bg-[var(--color-primary)] px-3 py-3 text-center text-sm font-bold text-white" to="/register" onClick={() => setIsOpen(false)}>
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
