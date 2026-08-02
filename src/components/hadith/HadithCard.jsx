import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import HadithMetadata from './HadithMetadata.jsx'

export default function HadithCard({ hadith }) {
  return (
    <article className="rounded-[20px] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
      {hadith?.text && <p className="hadith-text rounded-[16px] border border-[var(--color-primary-soft)] bg-[var(--color-page)] px-4 py-3 text-[17px] text-[var(--color-text)]">{hadith.text}</p>}
      <div className="mt-4">
        <HadithMetadata hadith={hadith} />
      </div>
      {hadith?.id && (
        <Link className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-gold)] bg-white px-4 py-2 text-sm font-bold text-[var(--color-primary-strong)] hover:bg-[var(--color-primary-soft)]" to={`/hadith/${hadith.id}`}>
          عرض التفاصيل
          <ArrowLeft className="size-4" aria-hidden="true" />
        </Link>
      )}
    </article>
  )
}
