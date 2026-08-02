import { Link } from 'react-router-dom'
import { HelpCircle, MessageSquare, Search } from 'lucide-react'
import DashboardPageHeader from '../components/dashboard/DashboardPageHeader.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'

const cards = [
  { to: '/scholar/questions', label: 'أسئلة تحتاج إجابة', icon: HelpCircle },
  { to: '/scholar/comments', label: 'تعليقاتي العلمية', icon: MessageSquare },
  { to: '/search', label: 'تصفح الأحاديث', icon: Search },
]

export default function ScholarDashboardPage() {
  return (
    <>
      <DashboardPageHeader title="لوحة العالم" description="إدارة الأسئلة والتعليقات العلمية المتاحة لصلاحيتك." />
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.to} to={card.to} className="rounded-[20px] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] transition hover:border-[var(--color-border-gold)]">
            <card.icon className="size-6 text-[var(--color-primary)]" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-black text-[var(--color-text)]">{card.label}</h2>
          </Link>
        ))}
      </div>
      <SectionCard className="mt-5">
        <h2 className="text-lg font-black text-[var(--color-text)]">الصلاحيات المتاحة</h2>
        <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">
          يمكنك الإجابة عن أسئلة الأعضاء وإضافة تعليق علمي للأحاديث وتعديل تعليقاتك أو حذفها. إدارة المحتوى وطلبات الترقية محصورة بالمدير.
        </p>
      </SectionCard>
    </>
  )
}
