import { useQuery } from '@tanstack/react-query'
import { AlertTriangle } from 'lucide-react'
import { getInvalidHadiths } from '../api/catalogApi.js'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSkeleton from '../components/common/LoadingSkeleton.jsx'
import IconBadge from '../components/ui/IconBadge.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import { getItems } from '../utils/apiData.js'

export default function InvalidHadithsPage() {
  const query = useQuery({ queryKey: ['invalid-hadiths'], queryFn: ({ signal }) => getInvalidHadiths({}, { signal }) })
  const items = getItems(query.data)

  return (
    <PageContainer labelledBy="invalid-heading" className="max-w-3xl">
      <h1 id="invalid-heading" className="sr-only">أحاديث منتشرة لا تصح</h1>
      {query.isLoading && <LoadingSkeleton rows={4} />}
      {query.error && <ErrorMessage error={query.error} />}
      {!query.isLoading && !query.error && (
        items.length ? (
          <div className="grid gap-3">
            {items.map((item) => (
              <SectionCard key={item.id} as="article">
                <div className="flex items-start gap-3">
                  <IconBadge icon={AlertTriangle} />
                  <p className="hadith-text text-[17px] text-[var(--color-text)]">{item.text}</p>
                </div>
              </SectionCard>
            ))}
          </div>
        ) : <EmptyState message="لا توجد أحاديث غير صحيحة متاحة" />
      )}
    </PageContainer>
  )
}
