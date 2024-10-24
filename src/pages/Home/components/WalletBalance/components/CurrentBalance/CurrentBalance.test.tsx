import CurrentBalance from './CurrentBalance'
import { render, screen } from '@testing-library/preact'

describe('CurrentBalance', () => {
  test('renders balance correctly', () => {
    const balance = '1000.23434235'

    render(<CurrentBalance balance={balance} />)

    const balanceElement = screen.getByText(/ETH/i)

    expect(balanceElement).toBeVisible()
    expect(balanceElement).toHaveTextContent(`Balance: ${balance} ETH`)
  })
})
