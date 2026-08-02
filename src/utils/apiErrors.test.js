import { normalizeApiError } from './apiErrors.js'

describe('normalizeApiError', () => {
  it('normalizes backend validation errors', () => {
    const error = {
      response: {
        status: 400,
        data: {
          message: 'Validation failed',
          requestId: 'req-1',
          validationErrors: { email: 'Invalid email format' },
        },
      },
    }

    expect(normalizeApiError(error)).toEqual({
      message: 'تعذر تنفيذ الطلب. راجع البيانات وحاول مرة أخرى.',
      status: 400,
      fieldErrors: { email: 'Invalid email format' },
      requestId: 'req-1',
    })
  })

  it('uses an Arabic network fallback', () => {
    expect(normalizeApiError({ request: {} }).message).toMatch(/تعذر الاتصال/)
  })

  it('hides internal exception messages', () => {
    expect(normalizeApiError({ message: 'java.lang.RuntimeException' }).message).toMatch(/حدث خطأ/)
  })
})
