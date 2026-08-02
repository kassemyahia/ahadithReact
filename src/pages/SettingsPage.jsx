import { LogOut, Shield, Settings } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { logoutAllSessions } from '../api/profileApi.js'
import Button from '../components/common/Button.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import IconBadge from '../components/ui/IconBadge.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import { useAuth } from '../hooks/useAuth.js'

export default function SettingsPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const logoutAllMutation = useMutation({
    mutationFn: logoutAllSessions,
    onSuccess: async () => {
      await logout()
      navigate('/login', { replace: true })
    },
  })

  return (
    <PageContainer labelledBy="settings-heading" className="max-w-2xl">
      <h1 id="settings-heading" className="sr-only">الإعدادات</h1>
      <SectionCard>
        <div className="flex items-center gap-3">
          <IconBadge icon={Settings} />
          <h2 className="text-xl font-black text-[var(--color-text)]">الإعدادات</h2>
        </div>
        <div className="mt-5 grid gap-3">
          {logoutAllMutation.error && <ErrorMessage error={logoutAllMutation.error} />}
          <div className="rounded-[18px] border border-[var(--color-primary-soft)] bg-[var(--color-page)] p-4">
            <div className="flex items-center gap-3">
              <Shield className="size-5 text-[var(--color-primary)]" aria-hidden="true" />
              <div>
                <h2 className="font-black text-[var(--color-text)]">الجلسات</h2>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">يمكنك إنهاء الجلسة الحالية أو كل الجلسات المرتبطة بحسابك.</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="secondary" onClick={logout}>
                <LogOut className="size-4" aria-hidden="true" />
                تسجيل الخروج
              </Button>
              <Button variant="danger" loading={logoutAllMutation.isPending} onClick={() => logoutAllMutation.mutate()}>
                <LogOut className="size-4" aria-hidden="true" />
                تسجيل الخروج من كل الجلسات
              </Button>
            </div>
          </div>
        </div>
      </SectionCard>
    </PageContainer>
  )
}
