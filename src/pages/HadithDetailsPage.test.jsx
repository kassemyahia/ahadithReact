import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import HadithDetailsPage from './HadithDetailsPage.jsx'
import { AuthContext } from '../contexts/authContext.js'

vi.mock('../api/hadithApi.js', () => ({
  getHadith: vi.fn(() => Promise.resolve({ id: '1', text: 'قال رسول الله صلى الله عليه وسلم' })),
}))

vi.mock('../api/favoritesApi.js', () => ({
  addFavorite: vi.fn(() => Promise.resolve({})),
  removeFavorite: vi.fn(() => Promise.resolve()),
}))

describe('HadithDetailsPage', () => {
  it('copies the actual hadith text and announces feedback', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn(() => Promise.resolve())
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

    render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ user: null, isAuthenticated: false, isInitializing: false }}>
          <MemoryRouter initialEntries={['/hadith/1']}>
            <Routes>
              <Route path="/hadith/:hadithId" element={<HadithDetailsPage />} />
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      </QueryClientProvider>,
    )

    await screen.findByText('قال رسول الله صلى الله عليه وسلم')
    await user.click(screen.getByRole('button', { name: /نسخ الحديث/ }))

    expect(writeText).toHaveBeenCalledWith('قال رسول الله صلى الله عليه وسلم')
    expect(screen.getByText('تم نسخ نص الحديث')).toBeInTheDocument()
  })
})
