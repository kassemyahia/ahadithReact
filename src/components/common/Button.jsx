const variants = {
  primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-strong)] focus-visible:ring-[var(--color-primary)]',
  secondary: 'bg-white text-[var(--color-text)] ring-1 ring-[var(--color-border-gold)] hover:bg-[var(--color-primary-soft)] focus-visible:ring-[var(--color-primary)]',
  ghost: 'text-[var(--color-primary-strong)] hover:bg-[var(--color-primary-soft)] focus-visible:ring-[var(--color-primary)]',
  danger: 'bg-[var(--color-danger)] text-white hover:bg-red-800 focus-visible:ring-[var(--color-danger)]',
}

export default function Button({ children, className = '', loading = false, variant = 'primary', type = 'button', disabled, ...props }) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />}
      {loading && <span className="sr-only">جاري التنفيذ</span>}
      {children}
    </button>
  )
}
