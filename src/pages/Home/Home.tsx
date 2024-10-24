import preactLogo from '../../assets/tatum.jpeg'

import WalletBalance from './components/WalletBalance'
import classes from './Home.module.css'

export default function Home() {
  return (
    <div class="home">
      <a href="https://preactjs.com" target="_blank">
        <img
          className={classes.image}
          src={preactLogo}
          alt="Preact logo"
          height="160"
          width="160"
        />
      </a>
      <h1>Tatum Hello</h1>
      <WalletBalance />
    </div>
  )
}
