import { Link } from 'react-router-dom'
import { BookOpen, Gavel, ScrollText, Tags, UserRoundCheck, UsersRound } from 'lucide-react'
import DashboardPageHeader from '../components/dashboard/DashboardPageHeader.jsx'

const resources = [
  { to: '/admin/content/books', label: 'الكتب', icon: BookOpen },
  { to: '/admin/content/ahadiths', label: 'الأحاديث', icon: ScrollText },
  { to: '/admin/content/rawis', label: 'الرواة', icon: UsersRound },
  { to: '/admin/content/muhaddiths', label: 'المحدثون', icon: UserRoundCheck },
  { to: '/admin/content/topics', label: 'الموضوعات', icon: Tags },
  { to: '/admin/content/rulings', label: 'الأحكام', icon: Gavel },
  { to: '/admin/content/explanations', label: 'الشروح', icon: BookOpen },
  { to: '/admin/content/fake-ahadith', label: 'الأحاديث غير الصحيحة', icon: ScrollText },
]

export default function AdminContentPage() {
  return (
    <>
      <DashboardPageHeader title="إدارة المحتوى" description="روابط إدارة السجلات المدعومة من واجهات الإدارة المؤكدة." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {resources.map((resource) => (
          <Link key={resource.to} to={resource.to} className="rounded-[20px] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] transition hover:border-[var(--color-border-gold)]">
            <resource.icon className="size-6 text-[var(--color-primary)]" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-black text-[var(--color-text)]">{resource.label}</h2>
          </Link>
        ))}
      </div>
    </>
  )
}
