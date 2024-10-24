import classes from './CurrentBalance.module.css'

interface Props {
  balance: string
}

function CurrentBalance({ balance }: Props) {
  return (
    <div className={classes.container}>
      <p className={classes.text}>
        <b>Balance:</b> {balance} ETH
      </p>
    </div>
  )
}

export default CurrentBalance
