import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import {NotificationManager} from 'react-notifications'
import chunk from 'lodash.chunk'
import clonedeep from 'lodash.clonedeep'

import SubmitButton from '../components/SubmitButton'
import CorgiDetails from '../components/CorgiDetails'
import Modal from 'react-modal'

import useContract from '../hooks/useContract'

const ChangeFieldModalStyles = {
  content: {
    width: '23.5rem',
    height: '14rem',
    margin: '0 auto',
    top: '30%',
    borderRadius: '1.25rem',
    backgroundColor: '#292521',
    padding: '1.5625rem',
    border: 'none'
  }
}

export default function MyCorgis() {
  const wallet = useSelector(state => state.wallet)
  const [
    web3, 
    nftContract, 
    yieldContract
  ] = useContract()

  const [loading, setLoading] = useState(true)
  const [pendingUpdate, setPendingUpdate] = useState(false)

  const [decimalsOfYieldToken, setDecimalsOfYieldToken] = useState(18)
  const [nameChangePrice, setNameChangePrice] = useState(0)
  const [bioChangePrice, setBioChangePrice] = useState(0)
  const [balanceOfYieldToken, setBalanceOfYieldToken] = useState(0)
  const [claimableBalanceOfYieldToken, setClaimableBalanceOfYieldToken] = useState(0)
  const [pendingClaiming, setPendingClaiming] = useState(false)

  const [balanceOfNft, setBalanceOfNft] = useState(0)
  const [ownedNftIDs, setOwnedNftIDs] = useState([])
  const [ownedTokenNames, setOwnedTokenNames] = useState({})  // id => name
  const [ownedTokenBios, setOwnedTokenBios] = useState({})  // id => bio
  const [ownedTokenUris, setOwnedTokenUris] = useState({})

  const [showChangeNameModal, setShowChangeNameModal] = useState(false)
  const [showChangeBioModal, setShowChangeBioModal] = useState(false)

  const [activeTokenId, setActiveTokenId] = useState()
  const [nameInput, setNameInput] = useState('')
  const [bioInput, setBioInput] = useState('')

  const onChangeRequestModal = (tokenId, isName) => {
    setActiveTokenId(tokenId)
    if (isName) {
      setShowChangeNameModal(true)
    } else {
      setShowChangeBioModal(true)
    }

    setNameInput(ownedTokenNames[tokenId])
    setBioInput(ownedTokenBios[tokenId])
  }

  const fetchDecimalsOfYieldToken = async () => {
    const _decimals = await yieldContract.methods.decimals().call()
    console.log('decimals: ', _decimals)
    setDecimalsOfYieldToken(Number(_decimals))
  }

  const fetchYieldRewards = async () => {
    const _balanceOfYield = await yieldContract.methods.balanceOf(wallet.address).call()
    const _claimableBalanceOfYield = await yieldContract.methods.getTotalClaimable(wallet.address).call()
    console.log('balanceOfYield: ', _balanceOfYield)
    console.log('claimableBalanceOfYield: ', _claimableBalanceOfYield)

    setBalanceOfYieldToken(Number(_balanceOfYield))
    setClaimableBalanceOfYieldToken(Number(_claimableBalanceOfYield))
  }

  const claimYieldRewards = async () => {
    setPendingClaiming(true)
    try {
      await nftContract.methods.getReward().send({from: wallet.address})
      NotificationManager.success('Claiming rewards succeeded!')
      await fetchYieldRewards()
    } catch(e) {
      NotificationManager.error('Claiming rewards failed!')
    }
    setPendingClaiming(false)
  }

  const fetchNftBalances = async () => {
    const _nameChangePrice = await nftContract.methods.NAME_CHANGE_PRICE().call()
    console.log('name change price: ', _nameChangePrice)
    setNameChangePrice(Number(_nameChangePrice))

    const _bioChangePrice = await nftContract.methods.BIO_CHANGE_PRICE().call()
    console.log('bio change price: ', _bioChangePrice)
    setBioChangePrice(Number(_bioChangePrice))

    const _balanceOfNft = await nftContract.methods.balanceOf(wallet.address).call()
    console.log('nft balance: ', _balanceOfNft)
    setBalanceOfNft(Number(_balanceOfNft))
    const _ownedNftIDs = []
    for (let i = 0; i < Number(_balanceOfNft); i++) {
      let _id = await nftContract.methods.tokenOfOwnerByIndex(wallet.address, i).call()
      _ownedNftIDs.push(Number(_id))
    }

    if (_ownedNftIDs.length % 3 === 1) {
      _ownedNftIDs.push(-1)
      _ownedNftIDs.push(-1)
    } else if (_ownedNftIDs.length % 3 === 2) {
      _ownedNftIDs.push(-1)
    }

    setOwnedNftIDs(_ownedNftIDs)
    console.log('nft ids: ', _ownedNftIDs)
    console.log(chunk(_ownedNftIDs, 3))

    const _tokenNames = {}
    const _tokenBios = {}
    const _tokenUris = {}
    for(let _token of _ownedNftIDs) {
      if (_token === -1) continue
      let _tokenName = await nftContract.methods.tokenNameByIndex(_token).call()
      let _tokenBio = await nftContract.methods.bio(_token).call()
      let _tokenUri = await nftContract.methods.tokenURI(_token).call()

      _tokenNames[_token] = _tokenName
      _tokenBios[_token] = _tokenBio
      _tokenUris[_token] = _tokenUri
    }

    setOwnedTokenNames(_tokenNames)
    setOwnedTokenBios(_tokenBios)
    setOwnedTokenUris(_tokenUris)

    console.log('names: ', _tokenNames)
    console.log('bios: ', _tokenBios)
    console.log('uris: ', _tokenUris)
    setLoading(false)
  }

  const onClickSubmitName = async () => {
    console.log('active token: ', activeTokenId, nameInput)
    const _nameInput = nameInput.trim()
    if (!_nameInput.length || _nameInput.length > 32) {
      return NotificationManager.info('Invalid name!')
    }

    if (nameChangePrice > balanceOfYieldToken) {
      return NotificationManager.info('Insufficient balance!')
    }

    try {
      setPendingUpdate(true)
      await nftContract.methods.changeName(activeTokenId, _nameInput).send({from: wallet.address})

      // update current status
      const _tokenNames = clonedeep(ownedTokenNames)
      _tokenNames[activeTokenId] = _nameInput
      setOwnedTokenNames(_tokenNames)
      NotificationManager.success('Changing name succeeded!')
      setShowChangeNameModal(false)
    } catch(e) {
      NotificationManager.error('Changing name failed!')
    }
    setPendingUpdate(false)
  }

  const onClickSubmitBio = async () => {
    console.log('active bio: ', activeTokenId, bioInput)
    const _bioInput = bioInput.trim()
    if (!_bioInput.length || _bioInput.length > 32) {
      return NotificationManager.info('Invalid bio!')
    }

    if (bioChangePrice > balanceOfYieldToken) {
      return NotificationManager.info('Insufficient balance!')
    }

    try {
      setPendingUpdate(true)
      await nftContract.methods.changeBio(activeTokenId, _bioInput).send({from: wallet.address})

      // update current status
      const _tokenBios = clonedeep(ownedTokenBios)
      _tokenBios[activeTokenId] = _bioInput
      setOwnedTokenBios(_tokenBios)
      NotificationManager.success('Changing bio succeeded!')
      setShowChangeBioModal(false)
    } catch(e) {
      NotificationManager.error('Changing bio failed!')
    }
    setPendingUpdate(false)
  }

  useEffect(() => {
    if (!yieldContract) return

    fetchDecimalsOfYieldToken()
    fetchYieldRewards()
  }, [yieldContract])

  useEffect(() => {
    if (!nftContract) return

    fetchNftBalances()
  }, [nftContract])

  return (
    <div className="my-corgis">
      <Head>
        <title>My Corgis | CheekyCorgi.com</title>
      </Head>
      <h1>My Corgis</h1>
      <div className="sploot-balance-section">
        <div className="sploot-balance">
          <img src="/icons/sploot.svg" />
          <div className="balance-numbers">
            <p>Balance: <span className="text-white">{(balanceOfYieldToken / 10**decimalsOfYieldToken).toFixed(2)}</span></p>
            <p>Pending: <span className="text-white">{(claimableBalanceOfYieldToken  / 10**decimalsOfYieldToken).toFixed(2)}</span></p>
            <div className="sploot-balance__claim-button1" style={{marginBottom: '.9375rem'}}>
              <SubmitButton onClick={claimYieldRewards} disabled={pendingClaiming || (claimableBalanceOfYieldToken === 0)}>
                { pendingClaiming ? 'Claiming' : 'CLAIM SPLOOT'}
              </SubmitButton>
            </div>
          </div>
        </div>

        <div className="sploot-balance__claim-button2">
          <SubmitButton onClick={claimYieldRewards} disabled={pendingClaiming || (claimableBalanceOfYieldToken === 0)}>
            { pendingClaiming ? 'Claiming' : 'CLAIM SPLOOT'}
          </SubmitButton>
        </div>
      </div>
      {
        loading && (
          <div className="not-found-corgi">
            <h3>Loading ...</h3>
          </div>
        )
      }

      {
        !loading && !balanceOfNft && (
          <div className="not-found-corgi">
            <h3>No corgi found</h3>
            <p>Eget nullam pellentesque cras tellus eu sit amet. Vel velit ut condimentum sit pretium <br/>ultrices tortor convallis. Tempus enim gravida elit magna erat viverra.</p>
          </div>
        )
      }

      {
        !loading && balanceOfNft > 0 && (
          <div className="corgi-holdings">
            {
              chunk(ownedNftIDs, 3).map((row, rowNo) => (
                <div className="corgi-holdings__row" key={rowNo}>
                  {
                    row.map((_token, colNo) => (
                      <CorgiDetails 
                        id={_token}
                        key={colNo}
                        name={ownedTokenNames[_token]}
                        bio={ownedTokenBios[_token]}
                        uri={ownedTokenUris[_token]}
                        onChangeRequest={onChangeRequestModal}
                      />
                    ))
                  }
                </div>
              ))
            }
          </div>
        )
      }

      <Modal
        isOpen={showChangeNameModal}
        onRequestClose={() => !pendingUpdate && setShowChangeNameModal(false)}
        style={ChangeFieldModalStyles}
      >
        <div className="change-corgi-modal">
          <h3 className="change-value-title">Change Name</h3>
          <input type="text" id="name" className="corgi-value" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Type Name..." />
          <button 
            className="submit-corgi-change"
            onClick={onClickSubmitName}
            disabled={pendingUpdate}
          >
            {pendingUpdate? 'Changing' : 'Change Name'}
          </button>
          <p className="change-corgi-fee">Fee 150 Sploot</p>
          <a className="close" onClick={(e) => !pendingUpdate && setShowChangeNameModal(false)} ><img src="/icons/times.svg" /></a>
        </div>
      </Modal>

      <Modal
        isOpen={showChangeBioModal}
        onRequestClose={() => !pendingUpdate && setShowChangeBioModal(false)}
        style={ChangeFieldModalStyles}
      >
        <div className="change-corgi-modal">
          <h3 className="change-value-title">Change Bio</h3>
          <input type="text" id="bio" className="corgi-value" value={bioInput} onChange={(e) => setBioInput(e.target.value)} placeholder="Type Bio..." />
          <button 
            className="submit-corgi-change"
            onClick={onClickSubmitBio}
            disabled={pendingUpdate}
          >
            {pendingUpdate? 'Changing' : 'Change Bio'}
          </button>
          <p className="change-corgi-fee">Fee 150 Sploot</p>
          <a className="close" onClick={(e) => !pendingUpdate && setShowChangeBioModal(false)} ><img src="/icons/times.svg" /></a>
        </div>
      </Modal>
    </div>
  )
}
