import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import {
  deleteAdminComment,
  deleteScholarComment,
  getAdminComment,
  getAdminComments,
  getScholarComment,
  getScholarComments,
  updateScholarComment,
} from '../api/commentsApi.js'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSkeleton from '../components/common/LoadingSkeleton.jsx'
import Textarea from '../components/common/Textarea.jsx'
import ConfirmDialog from '../components/dashboard/ConfirmDialog.jsx'
import DashboardPageHeader from '../components/dashboard/DashboardPageHeader.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import { formatDateTime } from '../utils/formatters.js'
import { excerpt, itemsFrom } from './dashboardHelpers.js'

const config = {
  admin: {
    base: '/admin/comments',
    title: 'إدارة التعليقات',
    description: 'تعليقات النظام المتاحة للإشراف الإداري.',
    listKey: ['admin-comments'],
    getList: getAdminComments,
    getOne: getAdminComment,
    delete: deleteAdminComment,
  },
  scholar: {
    base: '/scholar/comments',
    title: 'تعليقاتي',
    description: 'التعليقات العلمية التي يسمح الخادم بعرضها وتعديلها لصلاحيتك.',
    listKey: ['scholar-comments'],
    getList: getScholarComments,
    getOne: getScholarComment,
    update: updateScholarComment,
    delete: deleteScholarComment,
  },
}

export function CommentsListPage({ scope }) {
  const current = config[scope]
  const query = useQuery({ queryKey: current.listKey, queryFn: ({ signal }) => current.getList({ page: 0, size: 20 }, { signal }) })
  const comments = itemsFrom(query.data)

  return (
    <>
      <DashboardPageHeader title={current.title} description={current.description} />
      {query.error && <ErrorMessage error={query.error} />}
      {query.isLoading && <LoadingSkeleton rows={5} />}
      {!query.isLoading && !query.error && (
        comments.length ? (
          <div className="grid gap-3">
            {comments.map((comment) => (
              <Link key={comment.id} to={`${current.base}/${comment.id}`} className="rounded-[20px] border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-card)] hover:border-[var(--color-border-gold)]">
                <h2 className="font-black text-[var(--color-text)]">{excerpt(comment.text || comment.commentText)}</h2>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">{comment.createdAt ? formatDateTime(comment.createdAt) : `تعليق #${comment.id}`}</p>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState message="لا توجد تعليقات." />
        )
      )}
    </>
  )
}

export function CommentDetailsPage({ scope }) {
  const { commentId } = useParams()
  const current = config[scope]
  const queryClient = useQueryClient()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const query = useQuery({
    queryKey: [...current.listKey, commentId],
    queryFn: ({ signal }) => current.getOne(commentId, { signal }),
  })
  const comment = query.data
  const editForm = useForm({ values: { text: currentText(current, comment) } })
  const updateMutation = useMutation({
    mutationFn: (payload) => current.update(commentId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: current.listKey }),
  })
  const deleteMutation = useMutation({
    mutationFn: () => current.delete(commentId),
    onSuccess: () => {
      setConfirmDelete(false)
      queryClient.invalidateQueries({ queryKey: current.listKey })
    },
  })

  function onSubmit(values) {
    updateMutation.mutate({ text: values.text.trim() })
  }

  return (
    <>
      <DashboardPageHeader title="تفاصيل التعليق" description={`رقم التعليق: ${commentId}`} />
      {(query.error || updateMutation.error || deleteMutation.error) && <ErrorMessage error={query.error || updateMutation.error || deleteMutation.error} />}
      {query.isLoading && <LoadingSkeleton rows={4} />}
      {!query.isLoading && !query.error && comment && (
        <SectionCard>
          <p className="text-sm leading-7 text-[var(--color-text)]">{currentText(current, comment)}</p>
          {comment.createdAt && <p className="mt-3 text-sm text-[var(--color-text-muted)]">{formatDateTime(comment.createdAt)}</p>}
          {current.update ? (
            <form className="mt-5 grid gap-4" onSubmit={editForm.handleSubmit(onSubmit)}>
              <Textarea label="نص التعليق" error={editForm.formState.errors.text?.message} {...editForm.register('text', { required: 'النص مطلوب' })} />
              <div className="flex flex-wrap gap-3">
                <Button type="submit" loading={updateMutation.isPending}>حفظ التعديل</Button>
                <Button variant="danger" onClick={() => setConfirmDelete(true)}>حذف التعليق</Button>
              </div>
            </form>
          ) : (
            <Button className="mt-5" variant="danger" onClick={() => setConfirmDelete(true)}>حذف التعليق</Button>
          )}
        </SectionCard>
      )}
      <ConfirmDialog open={confirmDelete} destructive title="حذف التعليق" message="سيتم حذف هذا التعليق." pending={deleteMutation.isPending} onClose={() => setConfirmDelete(false)} onConfirm={() => deleteMutation.mutate()} confirmLabel="حذف" />
    </>
  )
}

function currentText(_current, comment) {
  return comment?.text || comment?.commentText || ''
}
