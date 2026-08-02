export default function EmptyState({ title = 'لا توجد نتائج', message, description, action }) {
  return (
    <div className="rounded-md border border-dashed border-stone-300 bg-white px-6 py-10 text-center">
      <h2 className="text-lg font-bold text-stone-950">{title}</h2>
      {(message || description) && <p className="mt-2 text-sm text-stone-600">{message || description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
