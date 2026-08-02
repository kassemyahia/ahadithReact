import { useAuth } from '../hooks/useAuth.js'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <section className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-stone-950">الملف الشخصي</h1>
      <dl className="mt-5 grid gap-3 text-sm">
        <div><dt className="font-semibold text-stone-700">الاسم</dt><dd>{user?.name}</dd></div>
        <div><dt className="font-semibold text-stone-700">البريد الإلكتروني</dt><dd>{user?.email}</dd></div>
        <div><dt className="font-semibold text-stone-700">الحالة</dt><dd>{user?.status}</dd></div>
      </dl>
    </section>
  )
}
