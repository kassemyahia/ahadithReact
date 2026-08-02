import { HelpCircle, Home, MessageSquare, Search, UserRound } from 'lucide-react'
import DashboardShell from '../components/dashboard/DashboardShell.jsx'

const scholarItems = [
  { to: '/scholar', label: 'نظرة عامة', icon: Home, end: true },
  { to: '/scholar/questions', label: 'الأسئلة', icon: HelpCircle },
  { to: '/scholar/comments', label: 'تعليقاتي', icon: MessageSquare },
  { to: '/search', label: 'تصفح الأحاديث', icon: Search },
  { to: '/profile', label: 'الملف الشخصي', icon: UserRound },
]

export default function ScholarDashboardLayout() {
  return <DashboardShell title="لوحة العالم" navItems={scholarItems} />
}
