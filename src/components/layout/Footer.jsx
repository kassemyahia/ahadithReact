import { APP_NAME } from '../../utils/constants.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="app-container py-6 text-sm text-stone-600">
        {APP_NAME} - {year}
      </div>
    </footer>
  )
}
