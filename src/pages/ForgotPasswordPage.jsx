import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { forgotPassword } from '../api/authApi.js'
import AuthFormContainer from '../components/auth/AuthFormContainer.jsx'
import Button from '../components/common/Button.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import Input from '../components/common/Input.jsx'
import { validators } from '../utils/validators.js'

export default function ForgotPasswordPage() {
  const { formState, handleSubmit, register } = useForm()
  const mutation = useMutation({ mutationFn: forgotPassword })

  return (
    <AuthFormContainer title="استعادة كلمة المرور">
      <form className="grid gap-4" onSubmit={handleSubmit((values) => mutation.mutate(values.email))}>
        {mutation.error && <ErrorMessage error={mutation.error} />}
        {mutation.data && <p className="rounded-[16px] border border-[var(--color-border-gold)] bg-[var(--color-primary-soft)] px-4 py-3 text-sm text-[var(--color-primary-strong)]">{mutation.data.message}</p>}
        <Input id="email" label="البريد الإلكتروني" type="email" error={formState.errors.email?.message} {...register('email', { ...validators.required, ...validators.email })} />
        <Button type="submit" disabled={mutation.isPending}>إرسال رابط الاستعادة</Button>
      </form>
    </AuthFormContainer>
  )
}
