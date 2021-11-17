import Web3 from 'web3'
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {NFT_CONTRACT_ADDRESS, YIELD_TOKEN_CONTRACT_ADDRESS} from '../data/contract'
import NftABI from '../data/nftABI.json'
import YieldABI from '../data/yieldABI.json'

export default useContract = () => {
  const wallet = useSelector(state => state.wallet)

  const [web3, setWeb3] = useState()
  const [nftContract, setNftContract] = useState()
  const [yieldContract, setYieldContract] = useState()

  useEffect(() => {
    if (wallet.connected) {
      const _web3 = new Web3(wallet.wallet.provider)
      const _nftContract = _web3.eth.Contract(NftABI, NFT_CONTRACT_ADDRESS)
      const _yieldContract = _web3.eth.Contract(YieldABI, YIELD_TOKEN_CONTRACT_ADDRESS)

      setWeb3(_web)
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
