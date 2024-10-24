import initTatum from './tatum'
import { Network, TatumSDK } from '@tatumio/tatum'

jest.mock('@tatumio/tatum', () => ({
  ...jest.requireActual('@tatumio/tatum'),
  TatumSDK: {
    init: jest.fn(),
  },
}))

const mockInitResponse = { id: 'some_id' }

describe('initTatum function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('initializes TatumSDK for Ethereum network', async () => {
    ;(TatumSDK.init as jest.Mock).mockResolvedValue(mockInitResponse)

    const result = await initTatum(Network.ETHEREUM)

    expect(TatumSDK.init).toHaveBeenCalledWith({
      network: Network.ETHEREUM,
      apiKey: { v4: process.env.API_KEY },
      verbose: true,
    })

    expect(result).toEqual(mockInitResponse)
  })

  test('throws an error for unsupported network', async () => {
    await expect(initTatum(Network.BNB)).rejects.toThrow(
      'bnb-beacon-chain-mainnet network is not implemented',
    )
  })
})
