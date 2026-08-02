import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BookOpen, Bookmark, Check, Copy, MessageSquarePlus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getHadith } from '../api/hadithApi.js'
import { addFavorite, removeFavorite } from '../api/favoritesApi.js'
import { createScholarHadithComment } from '../api/commentsApi.js'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSkeleton from '../components/common/LoadingSkeleton.jsx'
import Textarea from '../components/common/Textarea.jsx'
import HadithMetadata from '../components/hadith/HadithMetadata.jsx'
import IconBadge from '../components/ui/IconBadge.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { canAccessScholarFeatures } from '../utils/roles.js'

function fieldValue(source, paths) {
  for (const path of paths) {
    const value = path.split('.').reduce((current, key) => current?.[key], source)
    if (value !== undefined && value !== null && value !== '') return value
  }
  return null
}

export default function HadithDetailsPage() {
  const { hadithId } = useParams()
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [copied, setCopied] = useState(false)
  const commentForm = useForm({ defaultValues: { text: '' } })
  const hadithQuery = useQuery({ queryKey: ['hadith', hadithId], queryFn: ({ signal }) => getHadith(hadithId, { signal }), enabled: Boolean(hadithId) })
  const addFavoriteMutation = useMutation({
    mutationFn: () => addFavorite(hadithId),
    onSuccess: () => {
      queryClient.setQueryData(['hadith', hadithId], (current) => current ? { ...current, viewerState: { ...(current.viewerState || {}), favorited: true } } : current)
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
  const removeFavoriteMutation = useMutation({
    mutationFn: () => removeFavorite(hadithId),
    onSuccess: () => {
      queryClient.setQueryData(['hadith', hadithId], (current) => current ? { ...current, viewerState: { ...(current.viewerState || {}), favorited: false } } : current)
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
  const scholarCommentMutation = useMutation({
    mutationFn: (payload) => createScholarHadithComment(hadithId, payload),
    onSuccess: () => {
      commentForm.reset()
      queryClient.invalidateQueries({ queryKey: ['scholar-comments'] })
    },
  })

  const hadith = hadithQuery.data
  const text = fieldValue(hadith, ['text', 'hadithText', 'content'])
  const metadata = [
    ['الحكم', fieldValue(hadith, ['ruling.name'])],
    ['المحدث', fieldValue(hadith, ['muhaddith.name'])],
    ['الراوي', fieldValue(hadith, ['rawi.name', 'narrator.name'])],
    ['السند', fieldValue(hadith, ['sanad'])],
  ].filter(([, value]) => value)
  const topics = fieldValue(hadith, ['topics', 'topic']) || []
  const isFavorited = Boolean(hadith?.viewerState?.favorited)
  const favoritePending = addFavoriteMutation.isPending || removeFavoriteMutation.isPending

  async function handleCopy() {
    if (!text || !navigator.clipboard) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  function handleFavorite() {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location }, replace: false })
      return
    }
    if (isFavorited) {
      removeFavoriteMutation.mutate()
    } else {
      addFavoriteMutation.mutate()
    }
  }

  function handleScholarComment(values) {
    scholarCommentMutation.mutate({ text: values.text.trim() })
  }

  return (
    <PageContainer labelledBy="hadith-details-heading" className="max-w-3xl">
      <h1 id="hadith-details-heading" className="sr-only">تفاصيل الحديث</h1>
      {hadithQuery.isLoading && <LoadingSkeleton rows={4} />}
      {(hadithQuery.error || addFavoriteMutation.error || removeFavoriteMutation.error || scholarCommentMutation.error) && <ErrorMessage error={hadithQuery.error || addFavoriteMutation.error || removeFavoriteMutation.error || scholarCommentMutation.error} />}
      {!hadithQuery.isLoading && !hadithQuery.error && !hadith && <EmptyState message="لا توجد أحاديث متاحة" />}
      {hadith && (
        <SectionCard>
          <div className="flex items-center gap-3">
            <IconBadge icon={BookOpen} />
            <h2 className="text-xl font-black text-[var(--color-text)]">بيانات الحديث</h2>
          </div>

          <div className="mt-5">
            <HadithMetadata hadith={hadith} />
          </div>

          {text ? (
            <p className="hadith-text mt-5 rounded-[18px] border border-[var(--color-border-gold)] bg-[var(--color-page)] px-5 py-4 text-[18px] text-[var(--color-text)]">
              {text}
            </p>
          ) : (
            <p className="mt-5 rounded-[18px] border border-[var(--color-border-gold)] bg-[var(--color-page)] px-5 py-4 text-center text-[var(--color-text-muted)]">
              لا يوجد نص حديث متاح
            </p>
          )}

          {metadata.length > 0 && (
            <dl className="mt-5 grid gap-3">
              {metadata.map(([label, value]) => (
                <div key={label} className="rounded-[16px] border border-[var(--color-primary-soft)] bg-white px-4 py-3">
                  <dt className="font-black text-[var(--color-primary-strong)]">{label}</dt>
                  <dd className="mt-1 text-[var(--color-text)]">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-6 flex items-center gap-3">
            <IconBadge icon={Bookmark} />
            <h2 className="text-lg font-black text-[var(--color-text)]">التصنيف الموضوعي</h2>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {Array.isArray(topics) && topics.length > 0 ? (
              topics.map((topic) => (
                <span key={topic.id || topic.name || topic} className="rounded-full border border-[var(--color-border-gold)] bg-[var(--color-primary-soft)] px-3 py-1 text-sm font-bold text-[var(--color-primary-strong)]">
                  {topic.name || topic.label || topic}
                </span>
              ))
            ) : (
              <span className="rounded-full border border-[var(--color-border-gold)] bg-white px-3 py-1 text-sm text-[var(--color-text-muted)]">لا توجد موضوعات مرتبطة</span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={handleCopy} disabled={!text}>
              {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
              {copied ? 'تم النسخ' : 'نسخ الحديث'}
            </Button>
            <Button onClick={handleFavorite} loading={favoritePending} disabled={!hadithId || favoritePending}>
              <Bookmark className="size-4" aria-hidden="true" />
              {isFavorited ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
            </Button>
            <span className="sr-only" aria-live="polite">{copied ? 'تم نسخ نص الحديث' : ''}</span>
          </div>
        </SectionCard>
      )}
      {hadith && canAccessScholarFeatures(user) && (
        <SectionCard>
          <div className="flex items-center gap-3">
            <IconBadge icon={MessageSquarePlus} />
            <h2 className="text-lg font-black text-[var(--color-text)]">تعليق علمي</h2>
          </div>
          <form className="mt-5 grid gap-4" onSubmit={commentForm.handleSubmit(handleScholarComment)}>
            <Textarea
              label="نص التعليق"
              error={commentForm.formState.errors.text?.message}
              {...commentForm.register('text', { required: 'نص التعليق مطلوب' })}
            />
            <Button type="submit" loading={scholarCommentMutation.isPending}>إضافة التعليق</Button>
          </form>
        </SectionCard>
      )}
    </PageContainer>
  )
}
