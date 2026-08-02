import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { HelpCircle, MessageSquare, Send, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { createQuestion, deleteMyQuestion, getMyQuestions } from '../api/questionsApi.js'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSkeleton from '../components/common/LoadingSkeleton.jsx'
import Textarea from '../components/common/Textarea.jsx'
import IconBadge from '../components/ui/IconBadge.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import { formatDateTime, formatNumber } from '../utils/formatters.js'
import { validators } from '../utils/validators.js'

export default function QuestionsPage() {
  const queryClient = useQueryClient()
  const { formState, handleSubmit, register, reset } = useForm({ defaultValues: { askerText: '' } })
  const questionsQuery = useQuery({ queryKey: ['my-questions'], queryFn: ({ signal }) => getMyQuestions({ signal }) })
  const createMutation = useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({ queryKey: ['my-questions'] })
    },
  })
  const deleteMutation = useMutation({
    mutationFn: deleteMyQuestion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['my-questions'] }),
  })
  const questions = Array.isArray(questionsQuery.data) ? questionsQuery.data : []
  const answeredCount = questions.filter((question) => question.answerText).length

  function onSubmit(values) {
    createMutation.mutate({ askerText: values.askerText.trim() })
  }

  return (
    <PageContainer labelledBy="questions-heading" className="max-w-3xl">
      <h1 id="questions-heading" className="sr-only">الأسئلة</h1>
      <SectionCard>
        <div className="flex items-center gap-3">
          <IconBadge icon={MessageSquare} />
          <div>
            <h2 className="text-xl font-black text-[var(--color-text)]">حالة الأسئلة</h2>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">ملخص لإحصائيات الأسئلة لديك</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-[18px] border border-[var(--color-border-gold)] bg-[var(--color-primary)] p-4 text-center text-white">
            <p className="text-sm font-bold">عدد الأسئلة</p>
            <p className="mt-2 text-3xl font-black">{formatNumber(questions.length)}</p>
          </div>
          <div className="rounded-[18px] border border-[var(--color-border-gold)] bg-white p-4 text-center">
            <p className="text-sm font-bold text-[var(--color-primary-strong)]">عدد الإجابات</p>
            <p className="mt-2 text-3xl font-black text-[var(--color-text)]">{formatNumber(answeredCount)}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard>
        <div className="flex items-center gap-3">
          <IconBadge icon={HelpCircle} />
          <h2 className="text-lg font-black text-[var(--color-text)]">اطرح سؤالك هنا</h2>
        </div>
        <form className="mt-5 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          {createMutation.error && <ErrorMessage error={createMutation.error} />}
          <Textarea
            id="askerText"
            label="السؤال"
            placeholder="اكتب سؤالك بوضوح"
            error={formState.errors.askerText?.message}
            maxLength={8000}
            {...register('askerText', { ...validators.required, maxLength: { value: 8000, message: 'السؤال طويل جدًا' } })}
          />
          <Button type="submit" loading={createMutation.isPending} disabled={createMutation.isPending}>
            <Send className="size-4" aria-hidden="true" />
            إرسال السؤال
          </Button>
        </form>
      </SectionCard>

      {(questionsQuery.error || deleteMutation.error) && <ErrorMessage error={questionsQuery.error || deleteMutation.error} />}
      {questionsQuery.isLoading && <LoadingSkeleton rows={4} />}
      {!questionsQuery.isLoading && !questionsQuery.error && (
        questions.length ? (
          <div className="grid gap-3">
            {questions.map((question) => (
              <SectionCard key={question.id} as="article" className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-black text-[var(--color-text)]">{question.askerText}</h2>
                    {question.createdAt && <p className="mt-1 text-sm text-[var(--color-text-muted)]">{formatDateTime(question.createdAt)}</p>}
                    <div className="mt-3 rounded-[16px] border border-[var(--color-primary-soft)] bg-[var(--color-page)] p-3">
                      <p className="font-bold text-[var(--color-primary-strong)]">الإجابة</p>
                      <p className="mt-1 text-sm text-[var(--color-text)]">{question.answerText || 'لم تتم الإجابة بعد.'}</p>
                    </div>
                  </div>
                  <Button variant="danger" loading={deleteMutation.isPending} onClick={() => deleteMutation.mutate(question.id)}>
                    <Trash2 className="size-4" aria-hidden="true" />
                    حذف
                  </Button>
                </div>
              </SectionCard>
            ))}
          </div>
        ) : (
          <EmptyState message="لا توجد أسئلة حتى الآن" />
        )
      )}
    </PageContainer>
  )
}
