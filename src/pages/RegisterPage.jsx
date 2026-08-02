import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AuthFormContainer from '../components/auth/AuthFormContainer.jsx'
import PasswordInput from '../components/auth/PasswordInput.jsx'
import Button from '../components/common/Button.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import Input from '../components/common/Input.jsx'
import Select from '../components/common/Select.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { validators } from '../utils/validators.js'

export default function RegisterPage() {
  const [error, setError] = useState(null)
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const { formState, handleSubmit, register } = useForm()

  async function onSubmit(values) {
    setError(null)
    try {
      await registerUser({ ...values, gender: values.gender || null, birthDate: values.birthDate || null })
      navigate('/profile', { replace: true })
    } catch (apiError) {
      setError(apiError)
    }
  }

  return (
    <AuthFormContainer title="إنشاء حساب" subtitle="تتبع المفضلة وإدارة بيانات الحساب.">
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        {error && <ErrorMessage error={error} />}
        <Input id="name" label="الاسم" error={formState.errors.name?.message} {...register('name', validators.required)} />
        <Input id="email" label="البريد الإلكتروني" type="email" error={formState.errors.email?.message} {...register('email', { ...validators.required, ...validators.email })} />
        <PasswordInput id="password" label="كلمة المرور" error={formState.errors.password?.message} {...register('password', { ...validators.required, ...validators.password })} />
        <Select id="gender" label="الجنس" {...register('gender')}>
          <option value="">غير محدد</option>
          <option value="MALE">ذكر</option>
          <option value="FEMALE">أنثى</option>
        </Select>
        <Input id="birthDate" label="تاريخ الميلاد" type="date" {...register('birthDate')} />
        <Button type="submit" disabled={formState.isSubmitting}>
          إنشاء الحساب
        </Button>
      </form>
      <p className="mt-4 text-sm text-stone-600">
        لديك حساب؟ <Link className="font-semibold text-emerald-800" to="/login">تسجيل الدخول</Link>
      </p>
    </AuthFormContainer>
  )
}
