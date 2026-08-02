import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BottomNavigation from './BottomNavigation.jsx'

describe('BottomNavigation', () => {
  it('marks the current route as active', () => {
    render(
      <MemoryRouter initialEntries={['/questions']}>
        <BottomNavigation />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /الأسئلة/ })).toHaveAttribute('aria-current', 'page')
  })
})
