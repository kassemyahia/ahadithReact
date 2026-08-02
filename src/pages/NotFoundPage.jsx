import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'

export default function NotFoundPage() {
  return (
    <section className="rounded-[24px] border border-[var(--color-border-gold)] bg-white p-6 text-center shadow-[var(--shadow-card)]">
      <h1 className="text-2xl font-black text-[var(--color-primary)]">الصفحة غير موجودة</h1>
      <p className="mt-2 text-[var(--color-text-muted)]">الرابط المطلوب غير متاح.</p>
      <Link className="mt-5 inline-flex" to="/">
        <Button>العودة للرئيسية</Button>
      </Link>
    </section>
  )
}
