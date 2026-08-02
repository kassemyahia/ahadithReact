import Button from './Button.jsx'

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange, disabled = false }) {
  const safeTotalPages = Number.isInteger(totalPages) && totalPages > 0 ? totalPages : 1
  const safeCurrentPage = Math.min(Math.max(Number.parseInt(currentPage, 10) || 1, 1), safeTotalPages)

  return (
    <nav className="flex items-center justify-between gap-3" aria-label="ترقيم الصفحات">
      <Button variant="secondary" disabled={disabled || safeCurrentPage <= 1} onClick={() => onPageChange?.(safeCurrentPage - 1)}>
        السابق
      </Button>
      <span className="text-sm text-stone-600">
        صفحة {safeCurrentPage} من {safeTotalPages}
      </span>
      <Button variant="secondary" disabled={disabled || safeCurrentPage >= safeTotalPages} onClick={() => onPageChange?.(safeCurrentPage + 1)}>
        التالي
      </Button>
    </nav>
  )
}
