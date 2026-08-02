export default function SectionCard({ as: Component = 'section', className = '', children, ...props }) {
  return (
    <Component
      className={`rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-card)] sm:p-6 ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
