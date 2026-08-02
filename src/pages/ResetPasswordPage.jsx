import { useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { resetPassword } from '../api/authApi.js'
import AuthFormContainer from '../components/auth/AuthFormContainer.jsx'
import PasswordInput from '../components/auth/PasswordInput.jsx'
import Button from '../components/common/Button.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import { validators } from '../utils/validators.js'

export default function ResetPasswordPage() {
  const [params] = useSearchParams()
  const { formState, handleSubmit, register } = useForm({ defaultValues: { token: params.get('token') || '' } })
  const mutation = useMutation({ mutationFn: resetPassword })

  return (
    <AuthFormContainer title="تعيين كلمة مرور جديدة">
      <form className="grid gap-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        {mutation.error && <ErrorMessage error={mutation.error} />}
        {mutation.data && <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{mutation.data.message}</p>}
        <input type="hidden" {...register('token', validators.required)} />
        <PasswordInput id="newPassword" label="كلمة المرور الجديدة" error={formState.errors.newPassword?.message} {...register('newPassword', { ...validators.required, ...validators.password })} />
        <Button type="submit" disabled={mutation.isPending}>تحديث كلمة المرور</Button>
      </form>
    </AuthFormContainer>
  )
}
