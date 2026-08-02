import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Bookmark, Trash2 } from 'lucide-react'
import { getFavorites, removeFavorite } from '../api/favoritesApi.js'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSkeleton from '../components/common/LoadingSkeleton.jsx'
import HadithCard from '../components/hadith/HadithCard.jsx'
import IconBadge from '../components/ui/IconBadge.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'

function getItems(data) {
  return data?.items || data?.content || data?.data || []
}

export default function FavoritesPage() {
  const queryClient = useQueryClient()
  const favoritesQuery = useQuery({ queryKey: ['favorites'], queryFn: ({ signal }) => getFavorites({}, { signal }) })
  const removeMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  })
  const favorites = getItems(favoritesQuery.data)

  return (
    <PageContainer labelledBy="favorites-heading" className="max-w-3xl">
      <h1 id="favorites-heading" className="sr-only">المفضلة</h1>
      <SectionCard>
        <div className="flex items-center gap-3">
          <IconBadge icon={Bookmark} />
          <h2 className="text-xl font-black text-[var(--color-text)]">الأحاديث المفضلة</h2>
        </div>
      </SectionCard>
      {favoritesQuery.isLoading && <LoadingSkeleton rows={3} />}
      {(favoritesQuery.error || removeMutation.error) && <ErrorMessage error={favoritesQuery.error || removeMutation.error} />}
      {!favoritesQuery.isLoading && !favoritesQuery.error && (
        favorites.length ? (
          <div className="grid gap-4">
            {favorites.map((hadith) => (
              <div key={hadith.id} className="grid gap-3">
                <HadithCard hadith={hadith} />
                <Button className="justify-self-start" variant="danger" loading={removeMutation.isPending} onClick={() => removeMutation.mutate(hadith.id)}>
                  <Trash2 className="size-4" aria-hidden="true" />
                  إزالة من المفضلة
                </Button>
              </div>
            ))}
          </div>
        ) : <EmptyState message="لا توجد أحاديث في المفضلة" />
      )}
    </PageContainer>
  )
}
