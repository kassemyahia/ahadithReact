export default function Spinner({ label = 'جاري التحميل' }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)]" role="status">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
      <span>{label}</span>
    </span>
  )
}
