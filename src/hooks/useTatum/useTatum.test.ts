import { renderHook, act } from '@testing-library/preact-hooks'
import { useTatumBalance } from './useTatum'
import initTatum from 'api/tatum'
import { Network } from '@tatumio/tatum'

jest.mock('api/tatum')

const mockInitTatum = initTatum as jest.Mock

const mockBalanceResponse = {
  data: [{ asset: 'ETH', balance: '1000.1', address: 'some_address' }],
  error: null,
}

const mockBalanceFailedResponse = {
  data: null,
  error: { code: 'validation.failed', message: ['Request validation failed.'] },
}

describe('useTatumBalance hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return balance when getBalance is successful', async () => {
    // Mock successful initialization and getBalance response
    mockInitTatum.mockResolvedValue({
      address: {
        getBalance: jest.fn().mockResolvedValue(mockBalanceResponse),
      },
      destroy: jest.fn(),
    })

    const { result } = renderHook(() => useTatumBalance(Network.ETHEREUM))

    const [getBalance, { balance, loading, error }] = result.current

    /*  Initial state  */
    expect(balance).toBeNull()
    expect(loading).toBe(false)
    expect(error).toBeNull()

    await act(async () => {
      await getBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')
    })

    expect(result.current[1].loading).toBe(false)
    expect(result.current[1].balance).toEqual(mockBalanceResponse.data)
    expect(result.current[1].error).toBeNull()

    // Ensure the mock was called with the correct parameters
    expect(initTatum).toHaveBeenCalledWith(Network.ETHEREUM)
  })

  test('should return error when getBalance fails', async () => {
    // Mock successful initialization and getBalance response
    mockInitTatum.mockResolvedValue({
      address: {
        getBalance: jest.fn().mockResolvedValue(mockBalanceFailedResponse),
      },
      destroy: jest.fn(),
    })

    const { result } = renderHook(() => useTatumBalance(Network.ETHEREUM))

    const [getBalance] = result.current

    await act(async () => {
      await getBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')
    })

    expect(result.current[1].loading).toBe(false)
    expect(result.current[1].balance).toBeNull()
    expect(result.current[1].error).toBe(
      mockBalanceFailedResponse.error.message[0],
    )

    // Ensure the mock was called with the correct parameters
    expect(initTatum).toHaveBeenCalledWith(Network.ETHEREUM)
  })

  test('should handle uncontrolled errors', async () => {
    mockInitTatum.mockResolvedValue({
      address: {
        getBalance: jest
          .fn()
          .mockRejectedValue(new Error('Balance fetch failed')),
      },
      destroy: jest.fn(),
    })

    const { result } = renderHook(() => useTatumBalance(Network.ETHEREUM))
    const [getBalance] = result.current

    await act(async () => {
      await getBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')
    })

    expect(result.current[1].loading).toBe(false)
    expect(result.current[1].balance).toBeNull()
    expect(result.current[1].error).toBe('Balance fetch failed')
    expect(initTatum).toHaveBeenCalledWith(Network.ETHEREUM)
  })
})
