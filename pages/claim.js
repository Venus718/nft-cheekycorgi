import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import Image from 'next/image'
import {NotificationManager} from 'react-notifications'

import SubmitButton from '../components/SubmitButton'

import useContract from '../hooks/useContract'
import useRefresh from '../hooks/useRefresh'

import {FRIENDSHIP_NFT_ADDRESSES} from "../data/contract"
import erc721EnumerableABI from "../data/erc721Enumerable.json"
import { toReduced } from '../utils/address'

export default function Claim() {
  const wallet = useSelector(state => state.wallet)
  const [web3, nftContract, yieldContract] = useContract()

  const { fastRefresh } = useRefresh()

  const [totalClaimed, setTotalClaimed] = useState(0)
  const [maxClaimable, setMaxClaimable] = useState(300)
  const [claimed, setClaimed] = useState(false)
  const [pendingClaim, setPendingClaim] = useState(false)
  const [claimableNftContracts, setClaimableNftContracts] = useState([])
  const [totalClaimableNftCounts, setTotalClaimableNftCounts] = useState(0)

  const onClickClaim = async () => {
    console.log('total claimed: ', totalClaimed)
    console.log('max claimed: ', maxClaimable)

    if (!totalClaimableNftCounts || totalClaimed >= maxClaimable) {
      return NotificationManager.error('All claimed already!')
    }
    console.log('claiming cheekycorgi ...')

    setPendingClaim(true)
    try {
      for(let _collectionId = 0; _collectionId < claimableNftContracts.length; _collectionId ++) {
        let _collection = claimableNftContracts[_collectionId]

        if (_collection.balanceOf > 0) {
          for (let _index = 0; _index < _collection.balanceOf; _index ++) {
            let _tokenId = await _collection.contract.methods.tokenOfOwnerByIndex(wallet.address, _index).call()
            let _isClaimedAlready = await nftContract.methods.isClaimedAlready(_collectionId, _tokenId).call()
            if (!_isClaimedAlready) {
              await nftContract.methods.claim(_collection.address, _tokenId).send({from: wallet.address})
              setClaimed(true)
              setPendingClaim(false)
              return NotificationManager.success('Successfully claimed!')
            }
          }
        }
      }
    } catch(e) {
      setPendingClaim(false)
      return NotificationManager.error('Claiming failed unexpectedly!')
    }
    setPendingClaim(false)
    return NotificationManager.success('Sorry, but you can not claim CheekyCorgi!')
  }

  useEffect(() => {
    const fetchClaimedStatus = async () => {
      console.log('fetch claimed status ...')
      let _totalClaimed = await nftContract.methods.totalClaimed().call()
      let _maxClaimable = await nftContract.methods.maxClaimable().call()

      let _claimed = await nftContract.methods.claimedAddresses(wallet.address).call()
      setClaimed(_claimed)
      console.log('claimed: ', claimed)
      
      setTotalClaimed(Number(_totalClaimed))
      setMaxClaimable(Number(_maxClaimable))

      console.log('total claimed: ', _totalClaimed)
      console.log('max claimable: ', _maxClaimable)

      let _claimableNftContracts = [], _totalBalance = 0
      for (let _contractAddress of FRIENDSHIP_NFT_ADDRESSES) {
        let _contract = new web3.eth.Contract(erc721EnumerableABI, _contractAddress)
        let _balanceOf = await _contract.methods.balanceOf(wallet.address).call()
        _totalBalance += Number(_balanceOf)

        _claimableNftContracts.push({
          address: _contractAddress,
          contract: _contract,
          balanceOf: Number(_balanceOf)
        })
      }

      setClaimableNftContracts(_claimableNftContracts)
      setTotalClaimableNftCounts(_totalBalance)

      console.log('created claimable contracts: ', _claimableNftContracts.length)
      console.log('claimable nft balance: ', _totalBalance)
    }

    if (nftContract) {
      fetchClaimedStatus()
    }
  }, [nftContract])

  useEffect(() => {
    const fetchStatus = async () => {
      // [UPDATEME] Remove commenct below
      let _claimed = await nftContract.methods.claimedAddresses(wallet.address).call()
      setClaimed(_claimed)
      console.log('claimed: ', claimed)

      let _totalClaimed = await nftContract.methods.totalClaimed().call()
      setTotalClaimed(Number(_totalClaimed))
      console.log('total claimed: ', _totalClaimed)
  
      let _totalBalance = 0
      for (let _collection of claimableNftContracts) {
        let _balanceOf = await _collection.contract.methods.balanceOf(wallet.address).call()
        console.log('fetching balanceOf: ', _collection.address, _balanceOf)
        _totalBalance += Number(_balanceOf)
      }
      console.log('claimable nft balance: ', _totalBalance)
      setTotalClaimableNftCounts(_totalBalance)
    }

    if (nftContract && claimableNftContracts.length > 0) {
      fetchStatus()
    }
  }, [fastRefresh])

  return (
    <div className="claim">
      <Head>
        <title>Claim | CheekyCorgi.com</title>
      </Head>
      <div className="public-mint-wrapper">
        <h1>Exclusive Partnership</h1>
        <p className="comment">
          Friend, here&apos;s your free CheekyCorgi<br/>
          buddy for claiming. Cheers to friendship!
        </p>
        <p className="account-info">
          Connected Account: {toReduced(wallet.address, 4)}
        </p>
        <p className="hold-info">
          Friendship NFT Found: {totalClaimableNftCounts}
        </p>

        <div className="mint-button-holder">
          <SubmitButton onClick={onClickClaim} disabled={claimed}>
            {
              claimed ? 
              'Claimed Already' : 
              (
                pendingClaim ? 'Claiming' : 'CLAIM FOR FREE (EXCLUDE GAS)'
              )
            }
          </SubmitButton>
        </div>
        
        <p className="total-minted">
          Total supply: {maxClaimable}
        </p>

        <p className="claimable-nfts">
          Reserved for ApprovingCorgis, JunkyardDogs,<br/> Uninterested Unicorn holders
        </p>
      </div>
    </div>
  )
}
