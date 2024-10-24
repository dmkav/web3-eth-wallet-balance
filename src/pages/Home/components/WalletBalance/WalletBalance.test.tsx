import { render, screen, waitFor } from '@testing-library/preact'
import WalletBalance from './WalletBalance'
import initTatum from 'api/tatum'
import { userEvent } from '@testing-library/user-event'
import type { AddressBalance } from '@tatumio/tatum'

jest.mock('api/tatum')

const mockedInitTatum = (
  returnValue: { data?: AddressBalance[]; error?: Error } = {},
) =>
  (initTatum as jest.Mock).mockImplementation(() => ({
    destroy: jest.fn(),
    address: {
      getBalance: () => ({
        data: [
          {
            asset: 'ETH',
            type: 'native',
            address: 'address',
            balance: '10.2',
          },
        ],
        error: null,
        ...returnValue,
      }),
    },
  }))

const ETH_WALLET = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'

describe('WalletBalance component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders initial state', async () => {
    mockedInitTatum()
    render(<WalletBalance />)

    expect(screen.getByRole('form')).toBeVisible()

    const button = screen.getByRole('button', { name: 'Get balance' })
    expect(button).toBeVisible()
    expect(button).toBeDisabled()

    expect(screen.getByRole('textbox')).toBeVisible()
    expect(screen.getByRole<HTMLInputElement>('textbox').value).toEqual('')
  })

  test('displays error when balance fetch fails', async () => {
    const user = userEvent.setup()
    mockedInitTatum({ error: new Error('Failed to fetch'), data: null })

    render(<WalletBalance />)

    const button = screen.getByRole('button', { name: 'Get balance' })
    await user.type(screen.getByRole('textbox'), ETH_WALLET)
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch')).toBeVisible()
    })
  })

  test('renders form and submits balance check', async () => {
    mockedInitTatum()
    const user = userEvent.setup()

    render(<WalletBalance />)

    const button = screen.getByRole('button', { name: 'Get balance' })
    expect(screen.getByRole('form')).toBeVisible()
    expect(button).toBeVisible()

    await user.type(screen.getByRole('textbox'), ETH_WALLET)
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText('10.2 ETH')).toBeVisible()
    })
  })

  test('shows no balance if no ETH balance is found', async () => {
    const user = userEvent.setup()
    mockedInitTatum({
      data: [
        {
          asset: 'BNB',
          type: 'native',
          address: 'address',
          balance: '1000.0',
        },
      ],
    })

    render(<WalletBalance />)

    const button = screen.getByRole('button', { name: 'Get balance' })
    await user.type(screen.getByRole('textbox'), ETH_WALLET)
    await user.click(button)

    expect(screen.queryByText('1000.0')).not.toBeInTheDocument()
  })
})
