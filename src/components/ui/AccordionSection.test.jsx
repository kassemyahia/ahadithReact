import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AccordionSection from './AccordionSection.jsx'

describe('AccordionSection', () => {
  it('exposes aria-expanded when toggled', async () => {
    const user = userEvent.setup()
    render(<AccordionSection title="التصنيف">خيارات التصنيف</AccordionSection>)

    const trigger = screen.getByRole('button', { name: 'التصنيف' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('خيارات التصنيف')).toBeInTheDocument()
  })
})
