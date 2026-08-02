import { useParams } from 'react-router-dom'

export default function BookDetailsPage() {
  const { bookId } = useParams()

  return (
    <section className="grid gap-3" aria-labelledby="book-details-heading">
      <h1 id="book-details-heading" className="text-2xl font-bold text-stone-950">
        تفاصيل الكتاب
      </h1>
      <p className="text-sm text-stone-600">سيتم عرض معلومات الكتاب وأحاديثه هنا.</p>
      {bookId && <p className="text-sm text-stone-500">معرّف الكتاب: {bookId}</p>}
    </section>
  )
}
