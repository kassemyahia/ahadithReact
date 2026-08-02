import { labelFrom, statusLabels } from '../../utils/labels.js'

export default function StatusBadge({ value }) {
  if (!value) return null
  return (
    <span className="inline-flex rounded-full border border-[var(--color-border-gold)] bg-[var(--color-primary-soft)] px-3 py-1 text-xs font-bold text-[var(--color-primary-strong)]">
      {labelFrom(statusLabels, value)}
    </span>
  )
}
