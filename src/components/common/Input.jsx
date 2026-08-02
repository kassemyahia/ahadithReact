import { useId } from 'react'

export default function Input({ id, label, error, hint, className = '', required, ...props }) {
  const generatedId = useId()
  const inputId = id || generatedId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <label className="block" htmlFor={inputId}>
      {label && (
          <span className="mb-1.5 block text-sm font-bold text-[var(--color-text)]">
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </span>
      )}
      <input
        id={inputId}
        required={required}
        className={`min-h-12 w-full rounded-[16px] border border-[var(--color-border-gold)] bg-white px-4 py-2 text-right text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary-strong)] focus:ring-4 focus:ring-[var(--color-primary-soft)] ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        {...props}
      />
      {hint && <span id={hintId} className="mt-1 block text-sm text-[var(--color-text-muted)]">{hint}</span>}
      {error && <span id={errorId} className="mt-1 block text-sm text-[var(--color-danger)]">{error}</span>}
    </label>
  )
}
