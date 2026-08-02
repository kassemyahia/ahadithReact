import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/common/ProtectedRoute.jsx'
import AuthLayout from '../components/layout/AuthLayout.jsx'
import MainLayout from '../components/layout/MainLayout.jsx'
import BookDetailsPage from '../pages/BookDetailsPage.jsx'
import BooksPage from '../pages/BooksPage.jsx'
import FavoritesPage from '../pages/FavoritesPage.jsx'
import ForgotPasswordPage from '../pages/ForgotPasswordPage.jsx'
import HadithDetailsPage from '../pages/HadithDetailsPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import ProfilePage from '../pages/ProfilePage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import ResetPasswordPage from '../pages/ResetPasswordPage.jsx'
import SearchPage from '../pages/SearchPage.jsx'
import VerifyEmailPage from '../pages/VerifyEmailPage.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="hadith/:hadithId" element={<HadithDetailsPage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="books/:bookId" element={<BookDetailsPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>
    </Routes>
  )
}
