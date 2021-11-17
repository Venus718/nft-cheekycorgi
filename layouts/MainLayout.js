import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import MainNav from '../components/MainNav'
import MainFooter from '../components/MainFooter'
import ConnectWallet from '../components/ConnectWallet'

export default function MainLayout({children}) {
  const router = useRouter()
  const wallet = useSelector(state => state.wallet)

  return (
    <>
      <MainNav />
      {!wallet.connected && <ConnectWallet />}
      {wallet.connected && children}
      {
        (wallet.connected && router.pathname != '/') && (
          <MainFooter />
        )
      }
    </>
  )
}
