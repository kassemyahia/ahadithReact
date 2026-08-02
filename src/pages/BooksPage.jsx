import { useQuery } from '@tanstack/react-query'
import { BookOpen } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getBooks } from '../api/catalogApi.js'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSkeleton from '../components/common/LoadingSkeleton.jsx'
import IconBadge from '../components/ui/IconBadge.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import SearchInput from '../components/ui/SearchInput.jsx'
import { getItems } from '../utils/apiData.js'

export default function BooksPage() {
  const [query, setQuery] = useState('')
  const booksQuery = useQuery({ queryKey: ['books'], queryFn: ({ signal }) => getBooks({ signal }) })
  const books = getItems(booksQuery.data)
  const visibleBooks = query.trim()
    ? books.filter((book) => book.name?.includes(query.trim()) || book.muhaddith?.name?.includes(query.trim()))
    : books

  return (
    <PageContainer labelledBy="books-heading">
      <h1 id="books-heading" className="sr-only">الكتب والمصادر</h1>
      <SearchInput aria-label="البحث في الكتب" placeholder="ابحث في الكتب" value={query} onChange={(event) => setQuery(event.target.value)} />
      {booksQuery.isLoading && <LoadingSkeleton rows={4} />}
      {booksQuery.error && <ErrorMessage error={booksQuery.error} />}
      {!booksQuery.isLoading && !booksQuery.error && (
        visibleBooks.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleBooks.map((book) => (
              <Link key={book.id || book.name} to={`/books/${book.id}`} className="grid min-h-40 gap-4 rounded-[20px] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] transition hover:border-[var(--color-border-gold)]">
                <IconBadge icon={BookOpen} className="bg-[var(--color-primary-soft)] text-[var(--color-primary-strong)]" />
                <div>
                  <h2 className="text-lg font-black text-[var(--color-text)]">{book.name || book.title}</h2>
                  {book.description && <p className="mt-2 line-clamp-2 text-sm text-[var(--color-text-muted)]">{book.description}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState message={query ? 'لا توجد كتب مطابقة' : 'لا توجد كتب متاحة'} />
        )
      )}
    </PageContainer>
  )
}
