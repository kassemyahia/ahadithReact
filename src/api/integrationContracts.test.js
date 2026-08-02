import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('./client.js', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

const apiClient = (await import('./client.js')).default
const { searchHadiths } = await import('./hadithApi.js')
const { createQuestion, deleteMyQuestion } = await import('./questionsApi.js')
const { createUpgradeRequest } = await import('./upgradeRequestsApi.js')
const { getSearchHistory } = await import('./searchHistoryApi.js')

describe('frontend API contracts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    apiClient.get.mockResolvedValue({ data: [] })
    apiClient.post.mockResolvedValue({ data: {} })
    apiClient.patch.mockResolvedValue({ data: {} })
    apiClient.delete.mockResolvedValue({ data: undefined })
  })

  it('posts Hadith search to the canonical backend route', async () => {
    const payload = { query: 'الإيمان', page: 0, size: 20, bookIds: ['book-1'], empty: '' }

    await searchHadiths(payload)

    expect(apiClient.post).toHaveBeenCalledWith('/ahadith/search', {
      query: 'الإيمان',
      page: 0,
      size: 20,
      bookIds: ['book-1'],
    }, {})
  })

  it('uses askerText for member question creation', async () => {
    await createQuestion({ askerText: 'ما معنى الحديث؟' })

    expect(apiClient.post).toHaveBeenCalledWith('/me/questions', { askerText: 'ما معنى الحديث؟' })
  })

  it('deletes a member question by canonical id route', async () => {
    await deleteMyQuestion('question-1')

    expect(apiClient.delete).toHaveBeenCalledWith('/me/questions/question-1')
  })

  it('sends upgrade requests as multipart FormData fields', async () => {
    const file = new File(['%PDF-1.4'], 'request.pdf', { type: 'application/pdf' })

    await createUpgradeRequest({ document: file, notes: 'ملاحظة' })

    const [path, body] = apiClient.post.mock.calls[0]
    expect(path).toBe('/me/upgrade-requests')
    expect(body).toBeInstanceOf(FormData)
    expect(body.get('document')).toBe(file)
    expect(body.get('notes')).toBe('ملاحظة')
  })

  it('uses limit query parameters for search history', async () => {
    await getSearchHistory({ limit: 20 })

    expect(apiClient.get).toHaveBeenCalledWith('/me/search-history', { params: { limit: 20 } })
  })
})
