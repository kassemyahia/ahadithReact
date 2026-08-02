import { useQuery } from '@tanstack/react-query'
import { UsersRound } from 'lucide-react'
import { getMuhaddiths } from '../api/catalogApi.js'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSkeleton from '../components/common/LoadingSkeleton.jsx'
import IconBadge from '../components/ui/IconBadge.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'

export default function MuhaddithsPage() {
  const query = useQuery({ queryKey: ['muhaddiths'], queryFn: ({ signal }) => getMuhaddiths({ signal }) })
  const items = Array.isArray(query.data) ? query.data : []

  return (
    <PageContainer labelledBy="muhaddiths-heading">
      <h1 id="muhaddiths-heading" className="sr-only">تراجم المحدثين</h1>
      {query.isLoading && <LoadingSkeleton rows={4} />}
      {query.error && <ErrorMessage error={query.error} />}
      {!query.isLoading && !query.error && (
        items.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <SectionCard key={item.serialNumber || item.name} as="article">
                <IconBadge icon={UsersRound} />
                <h2 className="mt-4 text-lg font-black text-[var(--color-text)]">{item.name}</h2>
                {item.about && <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">{item.about}</p>}
              </SectionCard>
            ))}
          </div>
        ) : <EmptyState message="لا توجد تراجم محدثين متاحة" />
      )}
    </PageContainer>
  )
}
