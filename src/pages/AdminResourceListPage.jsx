import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { deleteAdminResource, getAdminResource } from '../api/adminApi.js'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSkeleton from '../components/common/LoadingSkeleton.jsx'
import ConfirmDialog from '../components/dashboard/ConfirmDialog.jsx'
import DashboardPageHeader from '../components/dashboard/DashboardPageHeader.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import { displayValue, excerpt, fieldValue, itemsFrom } from './dashboardHelpers.js'

const resourceConfig = {
  books: { api: 'books', label: 'الكتب', columns: [['name', 'الاسم'], ['title', 'العنوان'], ['muhaddith.name', 'المحدث']] },
  ahadiths: { api: 'ahadith', label: 'الأحاديث', columns: [['hadithNumber', 'الرقم'], ['text', 'النص'], ['book.name', 'الكتاب']] },
  rawis: { api: 'rawis', label: 'الرواة', columns: [['name', 'الاسم'], ['gender', 'الجنس']] },
  muhaddiths: { api: 'muhaddiths', label: 'المحدثون', columns: [['name', 'الاسم'], ['birthDate', 'الميلاد'], ['deathDate', 'الوفاة']] },
  topics: { api: 'topics', label: 'الموضوعات', columns: [['name', 'الاسم'], ['title', 'العنوان']] },
  rulings: { api: 'rulings', label: 'الأحكام', columns: [['name', 'الاسم'], ['title', 'العنوان']] },
  explanations: { api: 'explaining', label: 'الشروح', columns: [['text', 'النص'], ['hadith.id', 'الحديث']] },
  'fake-ahadith': { api: 'fake-ahadith', label: 'الأحاديث غير الصحيحة', columns: [['text', 'النص'], ['ruling', 'الحكم']] },
}

export default function AdminResourceListPage() {
  const { resource } = useParams()
  const config = resourceConfig[resource]
  const queryClient = useQueryClient()
  const [pendingDelete, setPendingDelete] = useState(null)
  const query = useQuery({
    queryKey: ['admin-resource', resource],
    queryFn: ({ signal }) => getAdminResource(config.api, { page: 0, size: 20 }, { signal }),
    enabled: Boolean(config),
  })
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteAdminResource(config.api, id),
    onSuccess: () => {
      setPendingDelete(null)
      queryClient.invalidateQueries({ queryKey: ['admin-resource', resource] })
    },
  })

  if (!config) return <NotFoundPage />

  const items = itemsFrom(query.data)

  return (
    <>
      <DashboardPageHeader title={config.label} description="قائمة إدارية متصلة بنقطة المحتوى المؤكدة. استخدم الحذف فقط عندما يكون السجل واضحاً." />
      {(query.error || deleteMutation.error) && <ErrorMessage error={query.error || deleteMutation.error} />}
      {query.isLoading && <LoadingSkeleton rows={6} />}
      {!query.isLoading && !query.error && (
        items.length ? (
          <div className="grid gap-3">
            {items.map((item) => (
              <article key={item.id} className="rounded-[20px] border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-card)]">
                <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
                  <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                    {config.columns.map(([path, label]) => (
                      <div key={path}>
                        <p className="text-xs font-bold text-[var(--color-text-muted)]">{label}</p>
                        <p className="mt-1 text-sm font-bold leading-7 text-[var(--color-text)]">{excerpt(displayValue(fieldValue(item, path)), path === 'text' ? 120 : 60)}</p>
                      </div>
                    ))}
                  </div>
                  {item.id && (
                    <Button variant="danger" onClick={() => setPendingDelete(item)}>
                      حذف
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState message="لا توجد سجلات في هذه القائمة." />
        )
      )}
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        destructive
        title="حذف السجل"
        message="سيتم حذف هذا السجل من النظام."
        pending={deleteMutation.isPending}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => deleteMutation.mutate(pendingDelete.id)}
        confirmLabel="حذف"
      />
    </>
  )
}
