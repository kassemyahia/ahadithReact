const arabicDateFormatter = new Intl.DateTimeFormat('ar', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

const arabicNumberFormatter = new Intl.NumberFormat('ar')

export function formatDateTime(value) {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : arabicDateFormatter.format(date)
}

export function formatNumber(value) {
  return Number.isFinite(Number(value)) ? arabicNumberFormatter.format(Number(value)) : ''
}

export function formatFileSize(bytes) {
  const size = Number(bytes)
  if (!Number.isFinite(size)) return ''
  if (size < 1024) return `${formatNumber(size)} بايت`
  if (size < 1024 * 1024) return `${formatNumber((size / 1024).toFixed(1))} ك.ب`
  return `${formatNumber((size / (1024 * 1024)).toFixed(1))} م.ب`
}
