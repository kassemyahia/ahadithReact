import { useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { verifyEmail } from '../api/authApi.js'
import AuthFormContainer from '../components/auth/AuthFormContainer.jsx'
import Button from '../components/common/Button.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'

export default function VerifyEmailPage() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const mutation = useMutation({ mutationFn: verifyEmail })

  return (
    <AuthFormContainer title="تأكيد البريد الإلكتروني">
      <div className="grid gap-4">
        {mutation.error && <ErrorMessage error={mutation.error} />}
        {mutation.data && <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{mutation.data.message}</p>}
        <Button disabled={!token || mutation.isPending} onClick={() => mutation.mutate(token)}>
          تأكيد البريد
        </Button>
      </div>
    </AuthFormContainer>
  )
}
