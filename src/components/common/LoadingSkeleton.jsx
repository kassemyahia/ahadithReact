export default function LoadingSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-3" aria-label="جاري التحميل">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-20 rounded-md bg-stone-200" />
      ))}
    </div>
  )
}
