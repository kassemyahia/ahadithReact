import { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { CalendarDays, Image, Mail, Trash2, UserRound } from 'lucide-react'
import { removeProfileImage, uploadProfileImage } from '../api/profileApi.js'
import Button from '../components/common/Button.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import Input from '../components/common/Input.jsx'
import { useAuth } from '../hooks/useAuth.js'
import IconBadge from '../components/ui/IconBadge.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'

export default function ProfilePage() {
  const { user, refreshUser } = useAuth()
  const fileInputRef = useRef(null)
  const [fileError, setFileError] = useState('')
  const uploadMutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => refreshUser?.(),
  })
  const removeMutation = useMutation({
    mutationFn: removeProfileImage,
    onSuccess: () => refreshUser?.(),
  })
  const imageUrl = user?.avatarUrl

  function handleFileChange(event) {
    const [file] = event.target.files || []
    setFileError('')
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setFileError('الصورة يجب أن تكون بصيغة JPEG أو PNG أو WebP.')
      } else if (file.size > 2 * 1024 * 1024) {
        setFileError('حجم الصورة يجب ألا يتجاوز ٢ م.ب.')
      } else {
        uploadMutation.mutate(file)
      }
    }
    event.target.value = ''
  }

  return (
    <PageContainer labelledBy="profile-heading" className="max-w-2xl">
      <h1 id="profile-heading" className="sr-only">الملف الشخصي</h1>
      <SectionCard>
        <div className="flex items-center gap-3">
          <IconBadge icon={UserRound} />
          <h2 className="text-xl font-black text-[var(--color-text)]">بيانات الملف الشخصي</h2>
        </div>

        {(uploadMutation.error || removeMutation.error) && (
          <div className="mt-5">
            <ErrorMessage error={uploadMutation.error || removeMutation.error} />
          </div>
        )}
        {fileError && (
          <div className="mt-5">
            <ErrorMessage message={fileError} />
          </div>
        )}

        <div className="mt-6 grid justify-items-center gap-4">
          {imageUrl ? (
            <img className="size-28 rounded-full border-4 border-[var(--color-primary-soft)] object-cover shadow-[var(--shadow-card)]" src={imageUrl} alt={`صورة ${user?.name || 'المستخدم'}`} />
          ) : (
            <div className="flex size-28 items-center justify-center rounded-full border-4 border-[var(--color-primary-soft)] bg-[var(--color-page)] text-[var(--color-primary)]">
              <UserRound className="size-14" aria-hidden="true" />
              <span className="sr-only">لا توجد صورة ملف شخصي</span>
            </div>
          )}
          <input ref={fileInputRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} aria-label="اختيار صورة الملف الشخصي" />
          <div className="flex flex-wrap justify-center gap-3">
            <Button loading={uploadMutation.isPending} onClick={() => fileInputRef.current?.click()}>
              <Image className="size-4" aria-hidden="true" />
              تعيين صورة
            </Button>
            <Button variant="secondary" loading={removeMutation.isPending} onClick={() => removeMutation.mutate()} disabled={!imageUrl || removeMutation.isPending}>
              <Trash2 className="size-4" aria-hidden="true" />
              إزالة الصورة
            </Button>
          </div>
        </div>

        <div className="mt-7 grid gap-4">
          <div className="relative">
            <UserRound className="absolute right-4 top-[43px] size-5 text-[var(--color-primary)]" aria-hidden="true" />
            <Input id="profile-name" label="اسم المستخدم" value={user?.name || ''} readOnly className="pe-12" />
          </div>
          <div className="relative">
            <Mail className="absolute right-4 top-[43px] size-5 text-[var(--color-primary)]" aria-hidden="true" />
            <Input id="profile-email" label="البريد الإلكتروني" type="email" value={user?.email || ''} readOnly className="pe-12" />
          </div>
          {user?.birthDate && (
            <div className="relative">
              <CalendarDays className="absolute right-4 top-[43px] size-5 text-[var(--color-primary)]" aria-hidden="true" />
              <Input id="profile-birth-date" label="تاريخ الميلاد" type="date" value={user.birthDate} readOnly className="pe-12" />
            </div>
          )}
        </div>
      </SectionCard>
    </PageContainer>
  )
}
