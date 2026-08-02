import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, LibraryBig, Search, UsersRound } from 'lucide-react'
import PageContainer from '../components/ui/PageContainer.jsx'
import SearchInput from '../components/ui/SearchInput.jsx'

export default function HomePage() {
  const featureCards = [
    { title: 'الكتب والمصادر', to: '/books', icon: BookOpen, enabled: true },
    { title: 'أحاديث منتشرة لا تصح', to: '/invalid-hadiths', icon: Search, enabled: true },
    { title: 'تراجم المحدثين', to: '/muhaddiths', icon: UsersRound, enabled: true },
    { title: 'تراجم الرواة', to: '/narrators', icon: LibraryBig, enabled: true },
  ]

  return (
    <PageContainer className="gap-6">
      <h1 id="home-heading" className="sr-only">الرئيسية</h1>
      <Link to="/search" aria-label="الانتقال إلى البحث المتقدم">
        <SearchInput readOnly />
      </Link>

      <article className="rounded-[24px] border border-[var(--color-primary-strong)] bg-[var(--color-primary-amber)] p-5 text-[var(--color-text)] shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-black">حديث اليوم</h2>
          <BookOpen className="size-7 text-white" aria-hidden="true" />
        </div>
        <div className="mt-5 rounded-[20px] border border-white/50 bg-white/45 p-4 text-center">
          <p className="font-black">لا يوجد حديث متاح</p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">لم يتم العثور على مصدر حديث اليوم في واجهة الخادم الحالية.</p>
        </div>
        <Link to="/search" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[var(--color-primary-strong)]">
          عرض الأحاديث
          <ArrowLeft className="size-4" aria-hidden="true" />
        </Link>
      </article>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {featureCards.map(({ title, to, icon: Icon, enabled }) => {
          const content = (
            <>
              <span className="flex size-14 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary-strong)]">
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <span className="mt-auto text-center text-base font-black leading-7 text-[var(--color-text)]">{title}</span>
              {!enabled && <span className="sr-only">غير متاح حاليًا</span>}
            </>
          )

          return enabled ? (
            <Link key={title} to={to} className="flex min-h-[170px] flex-col items-center gap-4 rounded-[20px] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] transition hover:border-[var(--color-border-gold)]">
              {content}
            </Link>
          ) : (
            <div key={title} className="flex min-h-[170px] cursor-not-allowed flex-col items-center gap-4 rounded-[20px] border border-[var(--color-border)] bg-white/75 p-5 opacity-80 shadow-[var(--shadow-card)]" aria-disabled="true">
              {content}
            </div>
          )
        })}
      </div>
    </PageContainer>
  )
}
