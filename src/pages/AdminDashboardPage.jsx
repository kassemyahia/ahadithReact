import { useQuery } from '@tanstack/react-query'
import { BookOpen, Gavel, Library, ScrollText, Tags, UsersRound, UserRoundCheck } from 'lucide-react'
import { getAdminDashboard } from '../api/adminApi.js'
import DashboardPageHeader from '../components/dashboard/DashboardPageHeader.jsx'
import DashboardStatCard from '../components/dashboard/DashboardStatCard.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSkeleton from '../components/common/LoadingSkeleton.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'

const statCards = [
  { key: 'ahadith', label: 'الأحاديث', to: '/admin/content/ahadiths', icon: ScrollText },
  { key: 'books', label: 'الكتب', to: '/admin/content/books', icon: BookOpen },
  { key: 'rawis', label: 'الرواة', to: '/admin/content/rawis', icon: UsersRound },
  { key: 'rulings', label: 'الأحكام', to: '/admin/content/rulings', icon: Gavel },
  { key: 'topics', label: 'الموضوعات', to: '/admin/content/topics', icon: Tags },
  { key: 'muhaddiths', label: 'المحدثون', to: '/admin/content/muhaddiths', icon: UserRoundCheck },
  { key: 'users', label: 'المستخدمون', icon: Library },
]

export default function AdminDashboardPage() {
  const dashboardQuery = useQuery({ queryKey: ['admin-dashboard'], queryFn: ({ signal }) => getAdminDashboard({ signal }) })
  const data = dashboardQuery.data || {}
  const availableCards = statCards.filter((card) => Object.prototype.hasOwnProperty.call(data, card.key))

  return (
    <>
      <DashboardPageHeader title="نظرة عامة" description="إحصاءات حقيقية من لوحة الإدارة في الخادم." />
      {dashboardQuery.error && <ErrorMessage error={dashboardQuery.error} />}
      {dashboardQuery.isLoading && <LoadingSkeleton rows={6} />}
      {!dashboardQuery.isLoading && !dashboardQuery.error && (
        availableCards.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {availableCards.map((card) => <DashboardStatCard key={card.key} {...card} value={data[card.key]} />)}
          </div>
        ) : (
          <EmptyState message="لم يُرجع الخادم أي مؤشرات للوحة الإدارة." />
        )
      )}
      <SectionCard className="mt-5">
        <h2 className="text-lg font-black text-[var(--color-text)]">إجراءات سريعة</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <DashboardStatCard label="طلبات الترقية" value="-" to="/admin/upgrade-requests" />
          <DashboardStatCard label="الأسئلة" value="-" to="/admin/questions" />
          <DashboardStatCard label="التعليقات" value="-" to="/admin/comments" />
        </div>
      </SectionCard>
    </>
  )
}
