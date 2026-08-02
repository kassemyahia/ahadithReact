import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import AppHeader from '../ui/AppHeader.jsx'
import BottomNavigation from '../ui/BottomNavigation.jsx'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-page)] text-[var(--color-text)]">
      <a className="sr-only focus:not-sr-only focus:absolute focus:inset-inline-start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2" href="#main-content">
        الانتقال إلى المحتوى
      </a>
      <AppHeader />
      <main id="main-content" className="app-container min-h-[calc(100vh-76px)] pb-28 pt-5 md:pb-10 md:pt-8" tabIndex={-1}>
        <Outlet />
      </main>
      <BottomNavigation />
      <Footer />
    </div>
  )
}
