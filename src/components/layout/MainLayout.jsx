import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-950">
      <a className="sr-only focus:not-sr-only focus:absolute focus:inset-inline-start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2" href="#main-content">
        الانتقال إلى المحتوى
      </a>
      <Header />
      <main id="main-content" className="app-container min-h-[calc(100vh-137px)] py-8" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
