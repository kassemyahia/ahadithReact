import { Search } from 'lucide-react'

export default function SearchInput({ className = '', inputClassName = '', ...props }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[var(--color-primary)]" aria-hidden="true" />
      <input
        className={`min-h-[52px] w-full rounded-[16px] border border-[var(--color-border-gold)] bg-white py-3 pe-4 ps-12 text-right text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary-strong)] focus:ring-4 focus:ring-[var(--color-primary-soft)] ${inputClassName}`}
        placeholder="ابحث عن حديث"
        {...props}
      />
    </div>
  )
}
