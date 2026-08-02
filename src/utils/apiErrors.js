const FALLBACK_MESSAGE = 'حدث خطأ غير متوقع. حاول مرة أخرى.'

export function normalizeApiError(error) {
  const response = error?.response
  const data = response?.data
  const fieldErrors = data?.validationErrors || data?.fieldErrors || {}
  const requestId = data?.requestId || response?.headers?.['x-request-id'] || response?.headers?.['x-correlation-id'] || null

  if (response) {
    return {
      message: safeMessage(data?.message || data?.error || FALLBACK_MESSAGE),
      status: response.status ?? data?.status ?? null,
      fieldErrors,
      requestId,
    }
  }

  if (error?.request) {
    return {
      message: 'تعذر الاتصال بالخادم. تحقق من اتصال الشبكة.',
      status: null,
      fieldErrors: {},
      requestId: null,
    }
  }

  return {
    message: safeMessage(error?.message || FALLBACK_MESSAGE),
    status: null,
    fieldErrors: {},
    requestId: null,
  }
}

export function getApiErrorMessage(error, fallback = FALLBACK_MESSAGE) {
  return normalizeApiError(error).message || fallback
}

function safeMessage(message) {
  if (!message || typeof message !== 'string') return FALLBACK_MESSAGE
  if (/Exception|StackTrace|org\.|java\./.test(message)) return FALLBACK_MESSAGE
  return message
}
