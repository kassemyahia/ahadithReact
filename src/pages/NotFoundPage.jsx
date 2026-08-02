import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'

export default function NotFoundPage() {
  return (
    <section className="rounded-md border border-stone-200 bg-white p-6 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-stone-950">الصفحة غير موجودة</h1>
      <p className="mt-2 text-stone-600">الرابط المطلوب غير متاح.</p>
      <Link className="mt-5 inline-flex" to="/">
        <Button>العودة للرئيسية</Button>
      </Link>
    </section>
  )
}
