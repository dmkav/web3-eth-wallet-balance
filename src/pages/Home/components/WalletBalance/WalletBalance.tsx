import { Network } from '@tatumio/tatum'
import { useMemo } from 'react'

import { useTatumBalance } from 'hooks/useTatum'
import Error from 'components/Error'

import CurrentBalance from './components/CurrentBalance'
import WalletForm from './components/WalletForm'
import classes from './WalletBalance.module.css'

function WalletBalance() {
  const [getBalance, { error, balance }] = useTatumBalance(Network.ETHEREUM)

  const handleSubmit = async ({ address }) => {
    await getBalance(address)
  }

  const ethereumWalletBalance = useMemo(() => {
    if (!balance) {
      return ''
    }

    const ethereumBalance = balance.find((asset) => asset.asset === 'ETH')

    return ethereumBalance ? ethereumBalance.balance : ''
  }, [balance])

  return (
    <div className={classes.container}>
      <WalletForm onSubmit={handleSubmit} />
      {ethereumWalletBalance && (
        <CurrentBalance balance={ethereumWalletBalance} />
      )}
      {error && <Error message={error} />}
    </div>
  )
}

export default WalletBalance
