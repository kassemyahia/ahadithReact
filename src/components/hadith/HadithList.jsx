import EmptyState from '../common/EmptyState.jsx'
import ErrorMessage from '../common/ErrorMessage.jsx'
import LoadingSkeleton from '../common/LoadingSkeleton.jsx'
import HadithCard from './HadithCard.jsx'

export default function HadithList({ items = [], isLoading = false, error = null, emptyMessage = 'لا توجد أحاديث للعرض.' }) {
  if (isLoading) return <LoadingSkeleton />
  if (error) return <ErrorMessage error={error} />

  if (!items.length) {
    return <EmptyState message={emptyMessage} />
  }

  return (
    <div className="grid gap-4">
      {items.map((hadith) => (
        <HadithCard key={hadith.id} hadith={hadith} />
      ))}
    </div>
  )
}
