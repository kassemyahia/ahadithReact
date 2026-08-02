export default function LoadingSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-3" aria-label="جاري التحميل">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-20 animate-pulse rounded-[20px] bg-[var(--color-primary-soft)]/70" />
      ))}
    </div>
  )
}
