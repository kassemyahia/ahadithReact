import { useId } from 'react'

export default function Textarea({ id, label, error, hint, className = '', required, ...props }) {
  const generatedId = useId()
  const textareaId = id || generatedId
  const hintId = hint ? `${textareaId}-hint` : undefined
  const errorId = error ? `${textareaId}-error` : undefined

  return (
    <label className="block" htmlFor={textareaId}>
      {label && (
          <span className="mb-1.5 block text-sm font-bold text-[var(--color-text)]">
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </span>
      )}
      <textarea
        id={textareaId}
        required={required}
        className={`min-h-28 w-full rounded-[16px] border border-[var(--color-border-gold)] bg-white px-4 py-3 text-right text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary-strong)] focus:ring-4 focus:ring-[var(--color-primary-soft)] ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        {...props}
      />
      {hint && <span id={hintId} className="mt-1 block text-sm text-[var(--color-text-muted)]">{hint}</span>}
      {error && <span id={errorId} className="mt-1 block text-sm text-[var(--color-danger)]">{error}</span>}
    </label>
  )
}
