import { useEffect, useId } from 'react'
import Button from './Button.jsx'

export default function Modal({ title, children, open, onClose }) {
  const titleId = useId()

  useEffect(() => {
    if (!open) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose?.()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--color-text)]/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-[24px] bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-primary-soft)] px-5 py-4">
          <h2 id={titleId} className="text-lg font-black text-[var(--color-text)]">{title}</h2>
          <Button variant="ghost" onClick={onClose} aria-label="إغلاق">
            ×
          </Button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  )
}
