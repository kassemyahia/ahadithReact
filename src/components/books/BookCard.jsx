import { Link } from 'react-router-dom'

export default function BookCard({ book }) {
  return (
    <article className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
      {book?.name && <h2 className="text-lg font-bold text-stone-950">{book.name}</h2>}
      {book?.muhaddith?.name && <p className="mt-2 text-sm text-stone-600">{book.muhaddith.name}</p>}
      {book?.id && (
        <Link className="mt-4 inline-flex text-sm font-semibold text-emerald-800 hover:text-emerald-950" to={`/books/${book.id}`}>
          عرض أحاديث الكتاب
        </Link>
      )}
    </article>
  )
}
