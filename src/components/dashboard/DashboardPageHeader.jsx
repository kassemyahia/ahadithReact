export default function DashboardPageHeader({ title, description, action }) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-black text-[var(--color-text)]">{title}</h1>
        {description && <p className="mt-1 text-sm text-[var(--color-text-muted)]">{description}</p>}
      </div>
      {action}
    </div>
  )
}
