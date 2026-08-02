import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/common/ProtectedRoute.jsx'
import RoleRoute from '../components/common/RoleRoute.jsx'
import GuestRoute from '../components/common/GuestRoute.jsx'
import AuthLayout from '../components/layout/AuthLayout.jsx'
import MainLayout from '../components/layout/MainLayout.jsx'
import AdminDashboardLayout from '../layouts/AdminDashboardLayout.jsx'
import ScholarDashboardLayout from '../layouts/ScholarDashboardLayout.jsx'
import AdminContentPage from '../pages/AdminContentPage.jsx'
import AdminDashboardPage from '../pages/AdminDashboardPage.jsx'
import AdminResourceListPage from '../pages/AdminResourceListPage.jsx'
import { AdminUpgradeRequestDetailsPage, AdminUpgradeRequestsListPage } from '../pages/AdminUpgradeRequestsPage.jsx'
import BookDetailsPage from '../pages/BookDetailsPage.jsx'
import BooksPage from '../pages/BooksPage.jsx'
import { CommentDetailsPage, CommentsListPage } from '../pages/CommentsManagementPage.jsx'
import DashboardRedirectPage from '../pages/DashboardRedirectPage.jsx'
import FavoritesPage from '../pages/FavoritesPage.jsx'
import ForgotPasswordPage from '../pages/ForgotPasswordPage.jsx'
import HadithDetailsPage from '../pages/HadithDetailsPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import InvalidHadithsPage from '../pages/InvalidHadithsPage.jsx'
import MuhaddithsPage from '../pages/MuhaddithsPage.jsx'
import NarratorsPage from '../pages/NarratorsPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import ProfilePage from '../pages/ProfilePage.jsx'
import { QuestionDetailsPage, QuestionsListPage } from '../pages/QuestionsManagementPage.jsx'
import QuestionsPage from '../pages/QuestionsPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import ResetPasswordPage from '../pages/ResetPasswordPage.jsx'
import SearchPage from '../pages/SearchPage.jsx'
import SearchHistoryPage from '../pages/SearchHistoryPage.jsx'
import SettingsPage from '../pages/SettingsPage.jsx'
import ScholarDashboardPage from '../pages/ScholarDashboardPage.jsx'
import UnauthorizedPage from '../pages/UnauthorizedPage.jsx'
import UpgradeRequestPage from '../pages/UpgradeRequestPage.jsx'
import VerifyEmailPage from '../pages/VerifyEmailPage.jsx'
import { ROLES } from '../utils/roles.js'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="hadith/:hadithId" element={<HadithDetailsPage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="books/:bookId" element={<BookDetailsPage />} />
        <Route path="invalid-hadiths" element={<InvalidHadithsPage />} />
        <Route path="narrators" element={<NarratorsPage />} />
        <Route path="muhaddiths" element={<MuhaddithsPage />} />
        <Route path="unauthorized" element={<UnauthorizedPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="questions" element={<QuestionsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="search-history" element={<SearchHistoryPage />} />
          <Route path="upgrade-request" element={<UpgradeRequestPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardRedirectPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route element={<RoleRoute allowedRoles={[ROLES.SCHOLAR, ROLES.ADMIN]} />}>
        <Route path="scholar" element={<ScholarDashboardLayout />}>
          <Route index element={<ScholarDashboardPage />} />
          <Route path="questions" element={<QuestionsListPage scope="scholar" />} />
          <Route path="questions/:questionId" element={<QuestionDetailsPage scope="scholar" />} />
          <Route path="comments" element={<CommentsListPage scope="scholar" />} />
          <Route path="comments/:commentId" element={<CommentDetailsPage scope="scholar" />} />
        </Route>
      </Route>
      <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route path="admin" element={<AdminDashboardLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="upgrade-requests" element={<AdminUpgradeRequestsListPage />} />
          <Route path="upgrade-requests/:requestId" element={<AdminUpgradeRequestDetailsPage />} />
          <Route path="questions" element={<QuestionsListPage scope="admin" />} />
          <Route path="questions/:questionId" element={<QuestionDetailsPage scope="admin" />} />
          <Route path="comments" element={<CommentsListPage scope="admin" />} />
          <Route path="comments/:commentId" element={<CommentDetailsPage scope="admin" />} />
          <Route path="content" element={<AdminContentPage />} />
          <Route path="content/:resource" element={<AdminResourceListPage />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route element={<GuestRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>
        <Route path="verify-email" element={<VerifyEmailPage />} />
      </Route>
    </Routes>
  )
}
