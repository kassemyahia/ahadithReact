export default function AuthFormContainer({ title, subtitle, children }) {
  return (
    <section className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-stone-950">{title}</h1>
      {subtitle && <p className="mt-2 text-sm text-stone-600">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </section>
  )
}
