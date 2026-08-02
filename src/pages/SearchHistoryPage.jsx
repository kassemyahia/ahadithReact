import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { History, Search, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { clearSearchHistory, deleteSearchHistoryItem, getSearchHistory } from '../api/searchHistoryApi.js'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSkeleton from '../components/common/LoadingSkeleton.jsx'
import IconBadge from '../components/ui/IconBadge.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import { formatDateTime } from '../utils/formatters.js'
import { labelFrom, searchSourceLabels } from '../utils/labels.js'

export default function SearchHistoryPage() {
  const queryClient = useQueryClient()
  const historyQuery = useQuery({ queryKey: ['search-history'], queryFn: ({ signal }) => getSearchHistory({ limit: 20 }, { signal }) })
  const deleteMutation = useMutation({
    mutationFn: deleteSearchHistoryItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['search-history'] }),
  })
  const clearMutation = useMutation({
    mutationFn: clearSearchHistory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['search-history'] }),
  })
  const items = Array.isArray(historyQuery.data) ? historyQuery.data : []

  return (
    <PageContainer labelledBy="history-heading" className="max-w-3xl">
      <h1 id="history-heading" className="sr-only">سجل البحث</h1>
      <SectionCard>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <IconBadge icon={History} />
            <h2 className="text-xl font-black text-[var(--color-text)]">سجل البحث</h2>
          </div>
          <Button variant="secondary" loading={clearMutation.isPending} disabled={!items.length || clearMutation.isPending} onClick={() => clearMutation.mutate()}>
            <Trash2 className="size-4" aria-hidden="true" />
            مسح السجل
          </Button>
        </div>
      </SectionCard>

      {(historyQuery.error || deleteMutation.error || clearMutation.error) && <ErrorMessage error={historyQuery.error || deleteMutation.error || clearMutation.error} />}
      {historyQuery.isLoading && <LoadingSkeleton rows={4} />}
      {!historyQuery.isLoading && !historyQuery.error && (
        items.length ? (
          <div className="grid gap-3">
            {items.map((entry) => (
              <SectionCard key={entry.id} as="article" className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-black text-[var(--color-text)]">{entry.searchText}</h2>
                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                      {labelFrom(searchSourceLabels, entry.searchSource)} {formatDateTime(entry.createdAt)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/search?query=${encodeURIComponent(entry.searchText || '')}`}>
                      <Button variant="secondary">
                        <Search className="size-4" aria-hidden="true" />
                        بحث
                      </Button>
                    </Link>
                    <Button variant="danger" loading={deleteMutation.isPending} onClick={() => deleteMutation.mutate(entry.id)}>
                      <Trash2 className="size-4" aria-hidden="true" />
                      حذف
                    </Button>
                  </div>
                </div>
              </SectionCard>
            ))}
          </div>
        ) : (
          <EmptyState message="لا يوجد سجل بحث حتى الآن" />
        )
      )}
    </PageContainer>
  )
}
