import { render, screen, waitFor } from '@testing-library/preact'
import WalletForm from './WalletForm'
import userEvent from '@testing-library/user-event'

const mockOnSubmit = jest.fn()

describe('WalletForm', () => {
  beforeEach(() => {
    jest.clearAllMocks() // Clear mocks before each test
  })

  test('renders form elements correctly', () => {
    render(<WalletForm onSubmit={mockOnSubmit} />)

    const input = screen.getByRole('textbox')
    expect(input).toBeVisible()

    const button = screen.getByRole('button', { name: /get balance/i })
    expect(button).toBeVisible()
    expect(button).toBeDisabled()
  })

  test('enables button when form is valid and submits the value', async () => {
    render(<WalletForm onSubmit={mockOnSubmit} />)
    const user = userEvent.setup()

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button', { name: /get balance/i })

    expect(button).toBeDisabled()

    await user.type(input, '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')
    expect(button).toBeEnabled()

    await user.click(button)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        },
        expect.anything(),
      )
    })
  })

  test('shows validation error for required field', async () => {
    render(<WalletForm onSubmit={mockOnSubmit} />)
    const user = userEvent.setup()

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button', { name: /get balance/i })

    await user.click(input)

    expect(button).toBeDisabled()

    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText(/Field is required/i)).toBeVisible()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  test('shows validation error for invalid address', async () => {
    render(<WalletForm onSubmit={mockOnSubmit} />)
    const user = userEvent.setup()

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button', { name: /get balance/i })

    await user.type(input, 'invalid-address')

    expect(button).toBeDisabled()

    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText(/ETH address is not valid/i)).toBeVisible()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})
