const variants = {
  primary: 'bg-emerald-800 text-white hover:bg-emerald-900 focus-visible:ring-emerald-700',
  secondary: 'bg-white text-emerald-900 ring-1 ring-emerald-200 hover:bg-emerald-50 focus-visible:ring-emerald-700',
  ghost: 'text-emerald-900 hover:bg-emerald-50 focus-visible:ring-emerald-700',
  danger: 'bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-600',
}

export default function Button({ children, className = '', loading = false, variant = 'primary', type = 'button', disabled, ...props }) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex min-h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <span className="me-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />}
      {loading && <span className="sr-only">جاري التنفيذ</span>}
      {children}
    </button>
  )
}
