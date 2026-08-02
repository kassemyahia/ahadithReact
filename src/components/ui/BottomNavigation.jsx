import { Bookmark, HelpCircle, Home, Settings, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/settings', label: 'الإعدادات', icon: Settings },
  { to: '/questions', label: 'الأسئلة', icon: HelpCircle },
  { to: '/', label: 'الرئيسية', icon: Home },
  { to: '/favorites', label: 'المفضلة', icon: Bookmark },
  { to: '/profile', label: 'ملفي', icon: UserRound },
]

export default function BottomNavigation() {
  return (
    <nav className="fixed inset-x-3 bottom-4 z-40 mx-auto max-w-md rounded-full border border-[var(--color-border-gold)] bg-white px-3 py-2 shadow-[var(--shadow-nav)] md:hidden" aria-label="التنقل السفلي">
      <ul className="grid grid-cols-5 items-center gap-1">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex min-h-14 flex-col items-center justify-center gap-1 rounded-full px-1 text-[12px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)] hover:text-[var(--color-primary-strong)]'}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`size-5 ${isActive ? 'stroke-[2.5]' : ''}`} aria-hidden="true" />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
