import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button.jsx'

describe('Button', () => {
  it('renders children and handles clicks', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button onClick={onClick}>حفظ</Button>)

    await user.click(screen.getByRole('button', { name: 'حفظ' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
