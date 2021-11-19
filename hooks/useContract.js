import Web3 from 'web3'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  NFT_CONTRACT_ADDRESS,
  YIELD_TOKEN_CONTRACT_ADDRESS,
} from '../data/contract'

import NftABI from '../data/nftABI.json'
import YieldABI from '../data/yieldABI.json'

const useContract = () => {
  const wallet = useSelector(state => state.wallet)

  const [web3, setWeb3] = useState()
  const [nftContract, setNftContract] = useState()
  const [yieldContract, setYieldContract] = useState()

  useEffect(() => {
    console.log('wallet.connected changed.', wallet.connected)

    if (wallet.connected && wallet.wallet.provider) {
      console.log('configuring web3, nft/yield contracts ...')

      const _web3 = new Web3(wallet.wallet.provider)
      const _nftContract = new _web3.eth.Contract(NftABI, NFT_CONTRACT_ADDRESS)
      const _yieldContract = new _web3.eth.Contract(YieldABI, YIELD_TOKEN_CONTRACT_ADDRESS)

      setWeb3(_web3)
      setNftContract(_nftContract)
      setYieldContract(_yieldContract)
    } else {
      setWeb3(null)
      setNftContract(null)
      setYieldContract(null)
    }
  }, [wallet.connected])

  return [web3, nftContract, yieldContract]
}

export default useContract
