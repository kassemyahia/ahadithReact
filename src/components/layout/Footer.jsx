import { APP_NAME } from '../../utils/constants.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="hidden border-t border-[var(--color-primary-soft)] bg-[var(--color-header)] md:block">
      <div className="app-container py-6 text-sm text-[var(--color-text-muted)]">
        {APP_NAME} - {year}
      </div>
    </footer>
  )
}
