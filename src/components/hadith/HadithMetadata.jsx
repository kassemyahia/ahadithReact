export default function HadithMetadata({ hadith, metadata }) {
  const source = metadata || hadith || {}
  const items = [
    source?.book?.name && ['الكتاب', source.book.name],
    source?.muhaddith?.name && ['المحدث', source.muhaddith.name],
    source?.rawi?.name && ['الراوي', source.rawi.name],
    source?.ruling?.name && ['الحكم', source.ruling.name],
    source?.hadithNumber && ['رقم الحديث', source.hadithNumber],
  ].filter(Boolean)

  return (
    <dl className="flex flex-wrap gap-2 text-sm text-[var(--color-text-muted)]">
      {items.map(([label, value]) => (
        <div key={label} className="rounded-full border border-[var(--color-border-gold)] bg-white px-3 py-1">
          <dt className="sr-only">{label}</dt>
          <dd>
            <span className="font-bold text-[var(--color-primary-strong)]">{label}: </span>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
