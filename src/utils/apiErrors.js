const FALLBACK_MESSAGE = 'حدث خطأ غير متوقع. حاول مرة أخرى.'
const STATUS_MESSAGES = {
  400: 'تعذر تنفيذ الطلب. راجع البيانات وحاول مرة أخرى.',
  401: 'يرجى تسجيل الدخول للمتابعة.',
  403: 'لا تملك صلاحية تنفيذ هذا الإجراء.',
  404: 'المورد المطلوب غير موجود.',
  409: 'تعارض الطلب مع البيانات الحالية.',
  413: 'حجم الملف أكبر من الحد المسموح.',
  415: 'نوع الملف أو المحتوى غير مدعوم.',
  429: 'تم إرسال طلبات كثيرة. حاول لاحقًا.',
  500: 'حدث خطأ في الخادم. حاول لاحقًا.',
}

export function normalizeApiError(error) {
  const response = error?.response
  const data = response?.data
  const fieldErrors = data?.validationErrors || data?.fieldErrors || {}
  const requestId = data?.requestId || response?.headers?.['x-request-id'] || response?.headers?.['x-correlation-id'] || null

  if (response) {
    const message = data?.message === 'Validation failed' ? STATUS_MESSAGES[400] : data?.message || data?.error || STATUS_MESSAGES[response.status] || FALLBACK_MESSAGE
    return {
      message: safeMessage(message),
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
