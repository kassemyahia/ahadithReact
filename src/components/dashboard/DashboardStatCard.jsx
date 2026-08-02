import { formatNumber } from '../../utils/formatters.js'
import { Link } from 'react-router-dom'

export default function DashboardStatCard({ label, value, icon: Icon, to }) {
  const Component = to ? Link : 'div'
  return (
    <Component to={to} className="block rounded-[20px] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] transition hover:border-[var(--color-border-gold)] hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-[var(--color-text-muted)]">{label}</span>
        {Icon && <Icon className="size-5 text-[var(--color-primary)]" aria-hidden="true" />}
      </div>
      <p className="mt-4 text-3xl font-black text-[var(--color-text)]">{formatNumber(value)}</p>
    </Component>
  )
}
