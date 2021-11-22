import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Head from 'next/head'

import MainNav from '../components/MainNav'
import MainFooter from '../components/MainFooter'
import ConnectWallet from '../components/ConnectWallet'

export default function MainLayout({children}) {
  const router = useRouter()
  const wallet = useSelector(state => state.wallet)

  return (
    <>
      <MainNav />
      {!wallet.connected && (
        <Head>
          <title>Cheeky Corgi</title>
        </Head>
      )}
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
