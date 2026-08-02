import { Link } from 'react-router-dom'

export default function BookCard({ book }) {
  return (
    <article className="rounded-[20px] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
      {book?.name && <h2 className="text-lg font-black text-[var(--color-text)]">{book.name}</h2>}
      {book?.muhaddith?.name && <p className="mt-2 text-sm text-[var(--color-text-muted)]">{book.muhaddith.name}</p>}
      {book?.id && (
        <Link className="mt-4 inline-flex rounded-full border border-[var(--color-border-gold)] px-4 py-2 text-sm font-bold text-[var(--color-primary-strong)] hover:bg-[var(--color-primary-soft)]" to={`/books/${book.id}`}>
          عرض أحاديث الكتاب
        </Link>
      )}
    </article>
  )
}
