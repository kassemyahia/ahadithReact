import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { deleteAdminUpgradeRequest, getAdminUpgradeDocument, getAdminUpgradeRequest, getAdminUpgradeRequests, reviewUpgradeRequest } from '../api/upgradeRequestsApi.js'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSkeleton from '../components/common/LoadingSkeleton.jsx'
import Select from '../components/common/Select.jsx'
import Textarea from '../components/common/Textarea.jsx'
import ConfirmDialog from '../components/dashboard/ConfirmDialog.jsx'
import DashboardPageHeader from '../components/dashboard/DashboardPageHeader.jsx'
import StatusBadge from '../components/dashboard/StatusBadge.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import { formatDateTime } from '../utils/formatters.js'
import { itemsFrom } from './dashboardHelpers.js'

export function AdminUpgradeRequestsListPage() {
  const [status, setStatus] = useState('')
  const query = useQuery({
    queryKey: ['admin-upgrade-requests', status],
    queryFn: ({ signal }) => getAdminUpgradeRequests({ status, page: 0, size: 20 }, { signal }),
  })
  const requests = itemsFrom(query.data)

  return (
    <>
      <DashboardPageHeader title="طلبات الترقية" description="مراجعة طلبات ترقية الأعضاء إلى علماء." />
      <div className="mb-4 max-w-xs">
        <Select label="الحالة" value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="">كل الحالات</option>
          <option value="under_review">قيد المراجعة</option>
          <option value="approved">مقبول</option>
          <option value="rejected">مرفوض</option>
          <option value="pending_documents">بانتظار المستندات</option>
        </Select>
      </div>
      {query.error && <ErrorMessage error={query.error} />}
      {query.isLoading && <LoadingSkeleton rows={5} />}
      {!query.isLoading && !query.error && (
        requests.length ? (
          <div className="grid gap-3">
            {requests.map((request) => (
              <Link key={request.id} to={`/admin/upgrade-requests/${request.id}`} className="rounded-[20px] border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-card)] hover:border-[var(--color-border-gold)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-black text-[var(--color-text)]">{request.user?.name || request.userName || `طلب #${request.id}`}</h2>
                  <StatusBadge value={request.status} />
                </div>
                {request.createdAt && <p className="mt-2 text-sm text-[var(--color-text-muted)]">{formatDateTime(request.createdAt)}</p>}
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState message="لا توجد طلبات ترقية." />
        )
      )}
    </>
  )
}

export function AdminUpgradeRequestDetailsPage() {
  const { requestId } = useParams()
  const queryClient = useQueryClient()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const reviewForm = useForm({ defaultValues: { reviewNotes: '', rejectionReason: '' } })
  const query = useQuery({
    queryKey: ['admin-upgrade-requests', requestId],
    queryFn: ({ signal }) => getAdminUpgradeRequest(requestId, { signal }),
  })
  const documentMutation = useMutation({
    mutationFn: () => getAdminUpgradeDocument(requestId),
    onSuccess: (data) => {
      if (data?.downloadUrl) window.open(data.downloadUrl, '_blank', 'noopener,noreferrer')
    },
  })
  const reviewMutation = useMutation({
    mutationFn: (payload) => reviewUpgradeRequest(requestId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-upgrade-requests'] }),
  })
  const deleteMutation = useMutation({
    mutationFn: () => deleteAdminUpgradeRequest(requestId),
    onSuccess: () => {
      setConfirmDelete(false)
      queryClient.invalidateQueries({ queryKey: ['admin-upgrade-requests'] })
    },
  })
  const request = query.data

  function review(decision) {
    const values = reviewForm.getValues()
    reviewMutation.mutate({
      decision,
      reviewNotes: values.reviewNotes?.trim() || undefined,
      rejectionReason: decision === 'REJECT' ? values.rejectionReason?.trim() : undefined,
    })
  }

  return (
    <>
      <DashboardPageHeader title="تفاصيل طلب الترقية" description={`رقم الطلب: ${requestId}`} />
      {(query.error || documentMutation.error || reviewMutation.error || deleteMutation.error) && <ErrorMessage error={query.error || documentMutation.error || reviewMutation.error || deleteMutation.error} />}
      {query.isLoading && <LoadingSkeleton rows={5} />}
      {!query.isLoading && !query.error && request && (
        <div className="grid gap-4">
          <SectionCard>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-black text-[var(--color-text)]">{request.user?.name || request.userName || 'مقدم الطلب'}</h2>
              <StatusBadge value={request.status} />
            </div>
            {request.notes && <p className="mt-4 text-sm leading-7 text-[var(--color-text)]">{request.notes}</p>}
            {request.createdAt && <p className="mt-3 text-sm text-[var(--color-text-muted)]">{formatDateTime(request.createdAt)}</p>}
            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="secondary" loading={documentMutation.isPending} onClick={() => documentMutation.mutate()}>فتح المستند</Button>
              <Button variant="danger" onClick={() => setConfirmDelete(true)}>حذف الطلب</Button>
            </div>
          </SectionCard>
          <SectionCard>
            <form className="grid gap-4">
              <Textarea label="ملاحظات المراجعة" {...reviewForm.register('reviewNotes')} />
              <Textarea label="سبب الرفض" hint="يُرسل عند اختيار رفض." {...reviewForm.register('rejectionReason')} />
              <div className="flex flex-wrap gap-3">
                <Button loading={reviewMutation.isPending} onClick={() => review('APPROVE')}>قبول الطلب</Button>
                <Button variant="danger" loading={reviewMutation.isPending} onClick={() => review('REJECT')}>رفض الطلب</Button>
              </div>
            </form>
          </SectionCard>
        </div>
      )}
      <ConfirmDialog open={confirmDelete} destructive title="حذف طلب الترقية" message="سيتم حذف طلب الترقية من النظام." pending={deleteMutation.isPending} onClose={() => setConfirmDelete(false)} onConfirm={() => deleteMutation.mutate()} confirmLabel="حذف" />
    </>
  )
}
