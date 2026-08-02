export default function PageContainer({ children, className = '', labelledBy, ...props }) {
  return (
    <section className={`mx-auto grid w-full max-w-5xl gap-5 ${className}`} aria-labelledby={labelledBy} {...props}>
      {children}
    </section>
  )
}
