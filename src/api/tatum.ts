import { Ethereum, Network, TatumSDK } from '@tatumio/tatum'

const TATUM_KEY = process.env.API_KEY

const initTatum = async (network: Network) => {
  switch (network) {
    case Network.ETHEREUM:
      return await TatumSDK.init<Ethereum>({
        network,
        apiKey: { v4: TATUM_KEY },
        verbose: true,
      })
    default:
      throw new Error(`${network} network is not implemented`)
  }
}

export default initTatum
