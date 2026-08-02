import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'

export default function HomePage() {
  return (
    <section className="grid gap-6">
      <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-emerald-800">واجهة عربية للبحث في الحديث</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-stone-950">ابحث في الأحاديث والكتب من مصدر API الخلفية.</h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          هذا البناء الأولي يجهز البنية، التوجيه، المصادقة، والاتصال بالخادم دون إضافة بيانات تجريبية.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/search">
            <Button>ابدأ البحث</Button>
          </Link>
          <Link to="/books">
            <Button variant="secondary">تصفح الكتب</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
