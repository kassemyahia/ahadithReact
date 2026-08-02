import { Link, Outlet } from 'react-router-dom'
import { APP_NAME } from '../../utils/constants.js'

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen place-items-center bg-[var(--color-page)] px-4 py-8">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 block text-center text-2xl font-black text-[var(--color-primary)]">
          {APP_NAME}
        </Link>
        <Outlet />
        <Link className="mt-5 block text-center text-sm font-bold text-[var(--color-primary-strong)]" to="/">
          العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  )
}
