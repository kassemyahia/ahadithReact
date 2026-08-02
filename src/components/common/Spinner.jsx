export default function Spinner({ label = 'جاري التحميل' }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-stone-600" role="status">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-800 border-t-transparent" />
      <span>{label}</span>
    </span>
  )
}
