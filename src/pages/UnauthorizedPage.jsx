import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'

export default function UnauthorizedPage() {
  return (
    <PageContainer labelledBy="unauthorized-heading" className="max-w-xl">
      <SectionCard className="text-center">
        <h1 id="unauthorized-heading" className="text-2xl font-black text-[var(--color-primary)]">غير مصرح</h1>
        <p className="mt-3 text-[var(--color-text-muted)]">لا تملك صلاحية الوصول إلى هذه الصفحة.</p>
        <Link className="mt-5 inline-flex" to="/">
          <Button>العودة إلى الرئيسية</Button>
        </Link>
      </SectionCard>
    </PageContainer>
  )
}
