import { useQuery } from '@tanstack/react-query'
import { UserRound } from 'lucide-react'
import { getNarrators } from '../api/catalogApi.js'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSkeleton from '../components/common/LoadingSkeleton.jsx'
import IconBadge from '../components/ui/IconBadge.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'

export default function NarratorsPage() {
  const query = useQuery({ queryKey: ['rawis'], queryFn: ({ signal }) => getNarrators({ signal }) })
  const items = Array.isArray(query.data) ? query.data : []

  return (
    <PageContainer labelledBy="narrators-heading">
      <h1 id="narrators-heading" className="sr-only">تراجم الرواة</h1>
      {query.isLoading && <LoadingSkeleton rows={4} />}
      {query.error && <ErrorMessage error={query.error} />}
      {!query.isLoading && !query.error && (
        items.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <SectionCard key={item.serialNumber || item.name} as="article">
                <IconBadge icon={UserRound} />
                <h2 className="mt-4 text-lg font-black text-[var(--color-text)]">{item.name}</h2>
                {item.about && <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">{item.about}</p>}
              </SectionCard>
            ))}
          </div>
        ) : <EmptyState message="لا توجد تراجم رواة متاحة" />
      )}
    </PageContainer>
  )
}
