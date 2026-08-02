import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  answerAdminQuestion,
  answerScholarQuestion,
  deleteAdminQuestion,
  getAdminQuestion,
  getAdminQuestions,
  getScholarQuestion,
  getScholarQuestions,
  updateAdminQuestionStatus,
  updateScholarQuestionStatus,
} from '../api/questionsApi.js'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSkeleton from '../components/common/LoadingSkeleton.jsx'
import Textarea from '../components/common/Textarea.jsx'
import ConfirmDialog from '../components/dashboard/ConfirmDialog.jsx'
import DashboardPageHeader from '../components/dashboard/DashboardPageHeader.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import { formatDateTime } from '../utils/formatters.js'
import { itemsFrom } from './dashboardHelpers.js'
import { useState } from 'react'

const config = {
  admin: {
    base: '/admin/questions',
    title: 'إدارة الأسئلة',
    listKey: ['admin-questions'],
    getList: getAdminQuestions,
    getOne: getAdminQuestion,
    answer: answerAdminQuestion,
    status: updateAdminQuestionStatus,
    delete: deleteAdminQuestion,
  },
  scholar: {
    base: '/scholar/questions',
    title: 'أسئلة العلماء',
    listKey: ['scholar-questions'],
    getList: getScholarQuestions,
    getOne: getScholarQuestion,
    answer: answerScholarQuestion,
    status: updateScholarQuestionStatus,
  },
}

export function QuestionsListPage({ scope }) {
  const current = config[scope]
  const query = useQuery({ queryKey: current.listKey, queryFn: ({ signal }) => current.getList({ page: 0, size: 20 }, { signal }) })
  const questions = itemsFrom(query.data)

  return (
    <>
      <DashboardPageHeader title={current.title} description="عرض الأسئلة المتاحة حسب صلاحيات الخادم." />
      {query.error && <ErrorMessage error={query.error} />}
      {query.isLoading && <LoadingSkeleton rows={5} />}
      {!query.isLoading && !query.error && (
        questions.length ? (
          <div className="grid gap-3">
            {questions.map((question) => (
              <Link key={question.id} to={`${current.base}/${question.id}`} className="rounded-[20px] border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-card)] hover:border-[var(--color-border-gold)]">
                <h2 className="font-black text-[var(--color-text)]">{question.askerText || question.questionText || `سؤال #${question.id}`}</h2>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">{question.answerText ? 'تمت الإجابة' : 'بانتظار الإجابة'} {question.createdAt ? `- ${formatDateTime(question.createdAt)}` : ''}</p>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState message="لا توجد أسئلة متاحة." />
        )
      )}
    </>
  )
}

export function QuestionDetailsPage({ scope }) {
  const { questionId } = useParams()
  const current = config[scope]
  const queryClient = useQueryClient()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { formState, handleSubmit, register, reset } = useForm({ defaultValues: { answerText: '' } })
  const query = useQuery({
    queryKey: [...current.listKey, questionId],
    queryFn: ({ signal }) => current.getOne(questionId, { signal }),
  })
  const question = query.data
  const answerMutation = useMutation({
    mutationFn: (payload) => current.answer(questionId, payload),
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({ queryKey: current.listKey })
    },
  })
  const statusMutation = useMutation({
    mutationFn: () => current.status(questionId, { isActive: !question?.isActive }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: current.listKey }),
  })
  const deleteMutation = useMutation({
    mutationFn: () => current.delete(questionId),
    onSuccess: () => {
      setConfirmDelete(false)
      queryClient.invalidateQueries({ queryKey: current.listKey })
    },
  })

  function onSubmit(values) {
    answerMutation.mutate({ answerText: values.answerText.trim() })
  }

  return (
    <>
      <DashboardPageHeader title="تفاصيل السؤال" description={`رقم السؤال: ${questionId}`} />
      {(query.error || answerMutation.error || statusMutation.error || deleteMutation.error) && <ErrorMessage error={query.error || answerMutation.error || statusMutation.error || deleteMutation.error} />}
      {query.isLoading && <LoadingSkeleton rows={4} />}
      {!query.isLoading && !query.error && question && (
        <div className="grid gap-4">
          <SectionCard>
            <h2 className="text-lg font-black text-[var(--color-text)]">{question.askerText || question.questionText || 'السؤال'}</h2>
            {question.createdAt && <p className="mt-2 text-sm text-[var(--color-text-muted)]">{formatDateTime(question.createdAt)}</p>}
            <div className="mt-4 rounded-[16px] border border-[var(--color-primary-soft)] bg-[var(--color-page)] p-4">
              <p className="font-bold text-[var(--color-primary-strong)]">الإجابة الحالية</p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text)]">{question.answerText || 'لم تتم الإجابة بعد.'}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="secondary" loading={statusMutation.isPending} onClick={() => statusMutation.mutate()}>
                {question.isActive === false ? 'تفعيل السؤال' : 'تعطيل السؤال'}
              </Button>
              {current.delete && (
                <Button variant="danger" onClick={() => setConfirmDelete(true)}>
                  حذف السؤال
                </Button>
              )}
            </div>
          </SectionCard>
          <SectionCard>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <Textarea label="الإجابة" error={formState.errors.answerText?.message} {...register('answerText', { required: 'الإجابة مطلوبة' })} />
              <Button type="submit" loading={answerMutation.isPending}>حفظ الإجابة</Button>
            </form>
          </SectionCard>
        </div>
      )}
      <ConfirmDialog open={confirmDelete} destructive title="حذف السؤال" message="سيتم حذف هذا السؤال من النظام." pending={deleteMutation.isPending} onClose={() => setConfirmDelete(false)} onConfirm={() => deleteMutation.mutate()} confirmLabel="حذف" />
    </>
  )
}
