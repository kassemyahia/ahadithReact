export default function AuthFormContainer({ title, subtitle, children }) {
  return (
    <section className="rounded-[24px] border border-[var(--color-border-gold)] bg-white p-6 shadow-[var(--shadow-card)]">
      <h1 className="text-center text-2xl font-black text-[var(--color-primary)]">{title}</h1>
      {subtitle && <p className="mt-2 text-center text-sm text-[var(--color-text-muted)]">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </section>
  )
}
