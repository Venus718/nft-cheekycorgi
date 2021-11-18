import Web3 from 'web3'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  NFT_CONTRACT_ADDRESS,
  YIELD_TOKEN_CONTRACT_ADDRESS,
  SHIBA_INU_CONTRACT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
  USDC_CONTRACT_ADDRESS
} from '../data/contract'

import NftABI from '../data/nftABI.json'
import YieldABI from '../data/yieldABI.json'
import erc20ABI from "../data/erc20.json"

const useContract = () => {
  const wallet = useSelector(state => state.wallet)

  const [web3, setWeb3] = useState()
  const [nftContract, setNftContract] = useState()
  const [yieldContract, setYieldContract] = useState()
  const [shibaInuContract, setShibaInuContract] = useState()
  const [usdtContract, setUsdtContract] = useState()
  const [usdcContract, setUsdcContract] = useState()

  useEffect(() => {
    console.log('wallet.connected changed.', wallet.connected)

    if (wallet.connected && wallet.wallet.provider) {
      console.log('configuring web3, nft/yield contracts ...')

      const _web3 = new Web3(wallet.wallet.provider)
      const _nftContract = new _web3.eth.Contract(NftABI, NFT_CONTRACT_ADDRESS)
      const _yieldContract = new _web3.eth.Contract(YieldABI, YIELD_TOKEN_CONTRACT_ADDRESS)
      const _shibaInuContract = new _web3.eth.Contract(erc20ABI, SHIBA_INU_CONTRACT_ADDRESS)
      const _usdtContract = new _web3.eth.Contract(erc20ABI, USDT_CONTRACT_ADDRESS)
      const _usdcContract = new _web3.eth.Contract(erc20ABI, USDC_CONTRACT_ADDRESS)

      setWeb3(_web3)
      setNftContract(_nftContract)
      setYieldContract(_yieldContract)
      setShibaInuContract(_shibaInuContract)
      setUsdtContract(_usdtContract)
      setUsdcContract(_usdcContract)
    } else {
      setWeb3(null)
      setNftContract(null)
      setYieldContract(null)
      setShibaInuContract(null)
      setUsdtContract(null)
      setUsdcContract(null)
    }
  }, [wallet.connected])

  return [web3, nftContract, yieldContract, shibaInuContract, usdtContract, usdcContract]
}

export default useContract
