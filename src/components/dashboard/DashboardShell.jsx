import { LogOut, Menu } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import Button from '../common/Button.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { labelFrom, roleLabels } from '../../utils/labels.js'

export default function DashboardShell({ title, navItems }) {
  const [open, setOpen] = useState(false)
  const { logout, user } = useAuth()

  const sidebar = (
    <nav className="grid gap-2" aria-label={title}>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex min-h-11 items-center gap-3 rounded-[14px] px-3 py-2 text-sm font-bold transition ${isActive ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary-strong)]' : 'text-[var(--color-text)] hover:bg-[var(--color-page)]'}`
          }
        >
          {item.icon && <item.icon className="size-5" aria-hidden="true" />}
          {item.label}
        </NavLink>
      ))}
      <Link className="flex min-h-11 items-center rounded-[14px] px-3 py-2 text-sm font-bold text-[var(--color-text-muted)] hover:bg-[var(--color-page)]" to="/">
        العودة إلى الموقع
      </Link>
    </nav>
  )

  return (
    <div className="min-h-screen bg-[var(--color-page)] text-[var(--color-text)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-primary-soft)] bg-[var(--color-header)]/95 backdrop-blur md:hidden">
        <div className="flex min-h-[68px] items-center justify-between px-4">
          <button className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--color-border-gold)] bg-white text-[var(--color-primary)]" type="button" aria-label="فتح القائمة" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <Menu className="size-5" aria-hidden="true" />
          </button>
          <span className="font-black text-[var(--color-primary)]">{title}</span>
          <Button className="size-11 px-0" variant="secondary" onClick={logout} aria-label="تسجيل الخروج">
            <LogOut className="size-5" aria-hidden="true" />
          </Button>
        </div>
        {open && <div className="border-t border-[var(--color-primary-soft)] bg-white p-3">{sidebar}</div>}
      </header>

      <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
        <aside className="sticky top-0 hidden h-screen border-l border-[var(--color-primary-soft)] bg-white p-5 shadow-[var(--shadow-card)] md:block">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-[var(--color-primary)]">{title}</h1>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{user?.name}</p>
            <span className="mt-2 inline-flex rounded-full border border-[var(--color-border-gold)] px-3 py-1 text-xs font-bold text-[var(--color-primary-strong)]">
              {labelFrom(roleLabels, user?.role)}
            </span>
          </div>
          {sidebar}
          <Button className="mt-6 w-full" variant="secondary" onClick={logout}>
            <LogOut className="size-4" aria-hidden="true" />
            خروج
          </Button>
        </aside>

        <main className="min-w-0 px-4 py-5 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
