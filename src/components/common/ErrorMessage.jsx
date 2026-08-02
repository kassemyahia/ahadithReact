import { normalizeApiError } from '../../utils/apiErrors.js'

export default function ErrorMessage({ error, message, requestId }) {
  const normalizedError = error ? normalizeApiError(error) : null
  const visibleMessage = message || normalizedError?.message
  const visibleRequestId = requestId || normalizedError?.requestId

  return (
    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
      <p>{visibleMessage}</p>
      {visibleRequestId && <p className="mt-1 text-xs text-red-700">معرّف الطلب: {visibleRequestId}</p>}
    </div>
  )
}
