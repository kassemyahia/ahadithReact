export default function ActiveFilters({ filters = {}, onClear }) {
  const activeFilters = Object.entries(filters).filter(([, value]) => value)

  if (!activeFilters.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {activeFilters.map(([key, value]) => (
        <button key={key} className="rounded-md bg-emerald-50 px-3 py-1 text-sm text-emerald-950" type="button" onClick={() => onClear(key)}>
          {value} ×
        </button>
      ))}
    </div>
  )
}
