import { useId } from 'react'

export default function Select({ id, label, error, hint, children, className = '', required, ...props }) {
  const generatedId = useId()
  const selectId = id || generatedId
  const hintId = hint ? `${selectId}-hint` : undefined
  const errorId = error ? `${selectId}-error` : undefined

  return (
    <label className="block" htmlFor={selectId}>
      {label && (
        <span className="mb-1 block text-sm font-medium text-stone-800">
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </span>
      )}
      <select
        id={selectId}
        required={required}
        className={`min-h-11 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        {...props}
      >
        {children}
      </select>
      {hint && <span id={hintId} className="mt-1 block text-sm text-stone-500">{hint}</span>}
      {error && <span id={errorId} className="mt-1 block text-sm text-red-700">{error}</span>}
    </label>
  )
}
