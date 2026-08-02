import { useParams } from 'react-router-dom'

export default function HadithDetailsPage() {
  const { hadithId } = useParams()

  return (
    <section className="grid gap-3" aria-labelledby="hadith-details-heading">
      <h1 id="hadith-details-heading" className="text-2xl font-bold text-stone-950">
        تفاصيل الحديث
      </h1>
      <p className="text-sm text-stone-600">سيتم عرض نص الحديث، التخريج، والبيانات المرتبطة هنا.</p>
      {hadithId && <p className="text-sm text-stone-500">معرّف الحديث: {hadithId}</p>}
    </section>
  )
}
