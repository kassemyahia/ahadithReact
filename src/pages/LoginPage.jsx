import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AuthFormContainer from '../components/auth/AuthFormContainer.jsx'
import PasswordInput from '../components/auth/PasswordInput.jsx'
import Button from '../components/common/Button.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import Input from '../components/common/Input.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { defaultAuthenticatedPath } from '../utils/roles.js'
import { validators } from '../utils/validators.js'

export default function LoginPage() {
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { formState, handleSubmit, register } = useForm()

  async function onSubmit(values) {
    setError(null)
    try {
      const response = await login(values)
      navigate(location.state?.from?.pathname || defaultAuthenticatedPath(response.user), { replace: true })
    } catch (apiError) {
      setError(apiError)
    }
  }

  return (
    <AuthFormContainer title="تسجيل الدخول" subtitle="ادخل بحسابك للوصول إلى الملف والمفضلة.">
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        {error && <ErrorMessage error={error} />}
        <Input id="email" label="البريد الإلكتروني" type="email" error={formState.errors.email?.message} {...register('email', { ...validators.required, ...validators.email })} />
        <PasswordInput id="password" label="كلمة المرور" error={formState.errors.password?.message} {...register('password', validators.required)} />
        <Button type="submit" disabled={formState.isSubmitting}>
          دخول
        </Button>
      </form>
      <p className="mt-4 text-sm text-[var(--color-text-muted)]">
        <Link className="font-bold text-[var(--color-primary-strong)]" to="/forgot-password">
          نسيت كلمة المرور؟
        </Link>{' '}
        أو{' '}
        <Link className="font-bold text-[var(--color-primary-strong)]" to="/register">
          أنشئ حسابًا
        </Link>
      </p>
    </AuthFormContainer>
  )
}
