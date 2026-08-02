export default function EmptyState({ title = 'لا توجد نتائج', message, description, action }) {
  return (
    <div className="rounded-[20px] border border-dashed border-[var(--color-border-gold)] bg-white px-6 py-10 text-center shadow-[var(--shadow-card)]">
      <h2 className="text-lg font-black text-[var(--color-text)]">{title}</h2>
      {(message || description) && <p className="mt-2 text-sm text-[var(--color-text-muted)]">{message || description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
