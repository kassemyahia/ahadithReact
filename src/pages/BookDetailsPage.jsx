import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { BookOpen } from 'lucide-react'
import { useState } from 'react'
import { getBook, getBookHadiths } from '../api/catalogApi.js'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSkeleton from '../components/common/LoadingSkeleton.jsx'
import Pagination from '../components/common/Pagination.jsx'
import HadithList from '../components/hadith/HadithList.jsx'
import IconBadge from '../components/ui/IconBadge.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import { getItems, getPagination } from '../utils/apiData.js'

export default function BookDetailsPage() {
  const { bookId } = useParams()
  const [page, setPage] = useState(1)
  const bookQuery = useQuery({ queryKey: ['book', bookId], queryFn: ({ signal }) => getBook(bookId, { signal }), enabled: Boolean(bookId) })
  const hadithsQuery = useQuery({ queryKey: ['book-hadiths', bookId, page], queryFn: ({ signal }) => getBookHadiths(bookId, { page: page - 1, size: 20 }, { signal }), enabled: Boolean(bookId) })
  const hadiths = getItems(hadithsQuery.data)
  const pagination = getPagination(hadithsQuery.data)

  return (
    <PageContainer labelledBy="book-details-heading" className="max-w-4xl">
      <h1 id="book-details-heading" className="sr-only">تفاصيل الكتاب</h1>
      {bookQuery.isLoading && <LoadingSkeleton rows={2} />}
      {bookQuery.error && <ErrorMessage error={bookQuery.error} />}
      {bookQuery.data && (
        <SectionCard>
          <div className="flex items-center gap-3">
            <IconBadge icon={BookOpen} />
            <div>
              <h2 className="text-xl font-black text-[var(--color-text)]">{bookQuery.data.name || bookQuery.data.title}</h2>
              {bookQuery.data.description && <p className="mt-2 text-sm text-[var(--color-text-muted)]">{bookQuery.data.description}</p>}
            </div>
          </div>
        </SectionCard>
      )}
      {hadithsQuery.isLoading && <LoadingSkeleton rows={3} />}
      {hadithsQuery.error && <ErrorMessage error={hadithsQuery.error} />}
      {!hadithsQuery.isLoading && !hadithsQuery.error && (
        hadiths.length ? <HadithList items={hadiths} /> : <EmptyState message="لا توجد أحاديث متاحة لهذا الكتاب" />
      )}
      {pagination.totalPages > 1 && <Pagination currentPage={page} totalPages={pagination.totalPages} disabled={hadithsQuery.isFetching} onPageChange={setPage} />}
    </PageContainer>
  )
}
