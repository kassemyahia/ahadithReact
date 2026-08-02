import EmptyState from '../common/EmptyState.jsx'
import ErrorMessage from '../common/ErrorMessage.jsx'
import LoadingSkeleton from '../common/LoadingSkeleton.jsx'
import BookCard from './BookCard.jsx'

export default function BookList({ items = [], isLoading = false, error = null, emptyMessage = 'لا توجد كتب للعرض.' }) {
  if (isLoading) return <LoadingSkeleton />
  if (error) return <ErrorMessage error={error} />

  if (!items.length) {
    return <EmptyState title="لا توجد كتب" message={emptyMessage} />
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
