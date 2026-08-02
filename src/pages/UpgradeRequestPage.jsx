import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Download, FileText, Send } from 'lucide-react'
import { createUpgradeRequest, getMyUpgradeDocument, getMyUpgradeRequests } from '../api/upgradeRequestsApi.js'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSkeleton from '../components/common/LoadingSkeleton.jsx'
import Textarea from '../components/common/Textarea.jsx'
import IconBadge from '../components/ui/IconBadge.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import { formatDateTime, formatFileSize } from '../utils/formatters.js'
import { labelFrom, statusLabels } from '../utils/labels.js'

export default function UpgradeRequestPage() {
  const queryClient = useQueryClient()
  const fileInputRef = useRef(null)
  const [document, setDocument] = useState(null)
  const [notes, setNotes] = useState('')
  const [fileError, setFileError] = useState('')
  const requestsQuery = useQuery({ queryKey: ['upgrade-requests'], queryFn: ({ signal }) => getMyUpgradeRequests({ signal }) })
  const createMutation = useMutation({
    mutationFn: createUpgradeRequest,
    onSuccess: () => {
      setDocument(null)
      setNotes('')
      queryClient.invalidateQueries({ queryKey: ['upgrade-requests'] })
    },
  })
  const documentMutation = useMutation({
    mutationFn: getMyUpgradeDocument,
    onSuccess: (data) => {
      if (data?.downloadUrl) window.open(data.downloadUrl, '_blank', 'noopener,noreferrer')
    },
  })
  const requests = Array.isArray(requestsQuery.data) ? requestsQuery.data : []

  function handleFileChange(event) {
    const [file] = event.target.files || []
    setFileError('')
    if (!file) {
      setDocument(null)
      return
    }
    if (file.type !== 'application/pdf' || !file.name.toLowerCase().endsWith('.pdf')) {
      setDocument(null)
      setFileError('يرجى اختيار ملف PDF فقط.')
      return
    }
    setDocument(file)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!document) {
      setFileError('ملف PDF مطلوب لإرسال طلب الترقية.')
      return
    }
    createMutation.mutate({ document, notes })
  }

  return (
    <PageContainer labelledBy="upgrade-heading" className="max-w-3xl">
      <h1 id="upgrade-heading" className="sr-only">طلب الترقية</h1>
      <SectionCard>
        <div className="flex items-center gap-3">
          <IconBadge icon={FileText} />
          <h2 className="text-xl font-black text-[var(--color-text)]">طلب الترقية</h2>
        </div>
        <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
          {(createMutation.error || documentMutation.error) && <ErrorMessage error={createMutation.error || documentMutation.error} />}
          <input ref={fileInputRef} className="sr-only" type="file" accept="application/pdf,.pdf" onChange={handleFileChange} aria-label="اختيار ملف طلب الترقية" />
          <div className="rounded-[18px] border border-[var(--color-border-gold)] bg-[var(--color-page)] p-4">
            <p className="font-bold text-[var(--color-text)]">{document ? document.name : 'لم يتم اختيار ملف'}</p>
            {document && <p className="mt-1 text-sm text-[var(--color-text-muted)]">{formatFileSize(document.size)}</p>}
            {fileError && <p className="mt-2 text-sm text-[var(--color-danger)]">{fileError}</p>}
            <Button className="mt-3" variant="secondary" onClick={() => fileInputRef.current?.click()}>
              <FileText className="size-4" aria-hidden="true" />
              اختيار ملف PDF
            </Button>
          </div>
          <Textarea label="ملاحظات اختيارية" value={notes} maxLength={2000} onChange={(event) => setNotes(event.target.value)} />
          <Button type="submit" loading={createMutation.isPending} disabled={createMutation.isPending}>
            <Send className="size-4" aria-hidden="true" />
            إرسال طلب الترقية
          </Button>
        </form>
      </SectionCard>

      {requestsQuery.isLoading && <LoadingSkeleton rows={3} />}
      {requestsQuery.error && <ErrorMessage error={requestsQuery.error} />}
      {!requestsQuery.isLoading && !requestsQuery.error && (
        requests.length ? (
          <div className="grid gap-3">
            {requests.map((request) => (
              <SectionCard key={request.id} as="article" className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-black text-[var(--color-text)]">{labelFrom(statusLabels, request.status)}</h2>
                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">{formatDateTime(request.createdAt)}</p>
                    {request.rejectionReason && <p className="mt-2 text-sm text-[var(--color-danger)]">{request.rejectionReason}</p>}
                    {request.reviewNotes && <p className="mt-2 text-sm text-[var(--color-text-muted)]">{request.reviewNotes}</p>}
                  </div>
                  {request.documentAvailable && (
                    <Button variant="secondary" loading={documentMutation.isPending} onClick={() => documentMutation.mutate(request.id)}>
                      <Download className="size-4" aria-hidden="true" />
                      تنزيل المستند
                    </Button>
                  )}
                </div>
              </SectionCard>
            ))}
          </div>
        ) : (
          <EmptyState message="لا توجد طلبات ترقية حتى الآن" />
        )
      )}
    </PageContainer>
  )
}
