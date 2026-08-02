export default function IconBadge({ icon: Icon, className = '', iconClassName = '', ...props }) {
  return (
    <span
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-sm ${className}`}
      aria-hidden="true"
      {...props}
    >
      {Icon && <Icon className={`size-5 ${iconClassName}`} strokeWidth={2} />}
    </span>
  )
}
