import { useId, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function AccordionSection({ title, children, defaultOpen = false, className = '' }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const Icon = open ? ChevronUp : ChevronDown

  return (
    <div className={`overflow-hidden rounded-[20px] border border-[var(--color-border-gold)] bg-white ${className}`}>
      <button
        type="button"
        className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-right font-bold text-[var(--color-text)] transition hover:bg-[var(--color-primary-soft)]/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-primary-soft)]"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{title}</span>
        <Icon className="size-5 text-[var(--color-primary)]" aria-hidden="true" />
      </button>
      <div id={id} hidden={!open} className="border-t border-[var(--color-primary-soft)] px-4 py-3">
        {children}
      </div>
    </div>
  )
}
