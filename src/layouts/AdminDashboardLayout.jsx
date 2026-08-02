import { BookOpen, FileText, Gavel, HelpCircle, Home, MessageSquare, ScrollText, Tags, UserRoundCheck, UsersRound } from 'lucide-react'
import DashboardShell from '../components/dashboard/DashboardShell.jsx'

const adminItems = [
  { to: '/admin', label: 'نظرة عامة', icon: Home, end: true },
  { to: '/admin/upgrade-requests', label: 'طلبات الترقية', icon: FileText },
  { to: '/admin/questions', label: 'الأسئلة', icon: HelpCircle },
  { to: '/admin/comments', label: 'التعليقات', icon: MessageSquare },
  { to: '/admin/content', label: 'إدارة المحتوى', icon: BookOpen, end: true },
  { to: '/admin/content/books', label: 'الكتب', icon: BookOpen },
  { to: '/admin/content/ahadiths', label: 'الأحاديث', icon: ScrollText },
  { to: '/admin/content/rawis', label: 'الرواة', icon: UsersRound },
  { to: '/admin/content/muhaddiths', label: 'المحدثون', icon: UserRoundCheck },
  { to: '/admin/content/topics', label: 'الموضوعات', icon: Tags },
  { to: '/admin/content/rulings', label: 'الأحكام', icon: Gavel },
]

export default function AdminDashboardLayout() {
  return <DashboardShell title="لوحة الإدارة" navItems={adminItems} />
}
