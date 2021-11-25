import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as walletActions from '../redux/actions'
import { initOnboard } from "../utils/walletServices"
import { ACTIVE_NETWORK_ID } from '../data/contract'

export default function ConnectWallet() {
  const dispatch = useDispatch()
  const wallet = useSelector(state => state.wallet)

  const [onboard, setOnboard] = useState()
  useEffect(() => {
    const _onboard = initOnboard({
      address: (address) => {
        console.log('address callback: ', address)
        dispatch(walletActions.setAddress(address))
      },
      network: (network) => {
        console.log('network callback: ', network)
        if (network !== ACTIVE_NETWORK_ID && wallet.connected) {
          alert("Changing of network is detected, a page reload will take place.")
          window.location.reload()
        }
        dispatch(walletActions.setNetwork(network))
      },
      balance: (balance) => {
        dispatch(walletActions.setBalance(balance))
      },
      wallet: (wallet) => {
        dispatch(walletActions.setWallet(wallet))
      }
    })
  
    setOnboard(_onboard)
  }, [])

  const onClickConnect = async () => {
    if (onboard) {
      const walletSelected = await onboard.walletSelect()
      if (!walletSelected) return

      console.log('wallet selected: ', walletSelected)
      const readyToTransact = await onboard.walletCheck()
      console.log('Wallet selected: ', walletSelected, ' Ready to transact: ', readyToTransact)
      if (walletSelected && readyToTransact) {
        dispatch(walletActions.setConnected(true))
      }
    }
  }

  return (
    <div className="connect-wallet-wrapper">
      <h1>Welcome to CheekyCorgi</h1>

      <p className="comment">
        Connect a wallet to mint our NFT and sploot token.
      </p>

      <button className="connect" onClick={onClickConnect}>
        Connect Wallet
      </button>
    </div>
  )
}
