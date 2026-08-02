export default function ActiveFilters({ filters = {}, onClear }) {
  const activeFilters = Object.entries(filters).filter(([, value]) => value)

  if (!activeFilters.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {activeFilters.map(([key, value]) => (
        <button key={key} className="rounded-full border border-[var(--color-border-gold)] bg-[var(--color-primary-soft)] px-3 py-1 text-sm font-bold text-[var(--color-primary-strong)]" type="button" onClick={() => onClear(key)}>
          {value} ×
        </button>
      ))}
    </div>
  )
}
