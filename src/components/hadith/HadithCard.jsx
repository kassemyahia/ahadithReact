import { Link } from 'react-router-dom'
import HadithMetadata from './HadithMetadata.jsx'

export default function HadithCard({ hadith }) {
  return (
    <article className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
      {hadith?.text && <p className="hadith-text text-lg text-stone-950">{hadith.text}</p>}
      <div className="mt-4">
        <HadithMetadata hadith={hadith} />
      </div>
      {hadith?.id && (
        <Link className="mt-4 inline-flex text-sm font-semibold text-emerald-800 hover:text-emerald-950" to={`/hadith/${hadith.id}`}>
          عرض التفاصيل
        </Link>
      )}
    </article>
  )
}
