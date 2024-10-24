import { Network } from '@tatumio/tatum'
import type { AddressBalance } from '@tatumio/tatum'
import { useState } from 'react'
import { mapToFirstError } from './helpers'
import initTatum from 'api/tatum'

export const useTatumBalance = (network: Network) => {
  const [balance, setBalance] = useState<AddressBalance[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const getBalance = async (address: string) => {
    setError(null)
    setBalance(null)
    setLoading(true)
    try {
      const tatum = await initTatum(network)
      const { data, error } = await tatum.address.getBalance({
        addresses: [address],
      })

      void tatum.destroy()

      setBalance(data)

      if (error) {
        setError(mapToFirstError(error))
      }

      return {
        data,
        error,
      }
    } catch (error) {
      const mappedError = mapToFirstError(error)
      setError(mappedError)

      return {
        data: null,
        error,
      }
    } finally {
      setLoading(false)
    }
  }

  return [getBalance, { balance, loading, error }] as const
}
