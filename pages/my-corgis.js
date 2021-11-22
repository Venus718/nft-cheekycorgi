import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import {NotificationManager} from 'react-notifications'

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

  const [balanceOfYieldToken, setBalanceOfYieldToken] = useState(0)
  const [claimableBalanceOfYieldToken, setClaimableBalanceOfYieldToken] = useState(0)
  const [pendingClaiming, setPendingClaiming] = useState(false)

  const [balanceOfNft, setBalanceOfNft] = useState(0)

  const [showChangeNameModal, setShowChangeNameModal] = useState(false)
  const [showChangeBioModal, setShowChangeBioModal] = useState(false)

  const [activeTokenId, setActiveTokenId] = useState()
  const [nameInput, setNameInput] = useState()
  const [bioInput, setBioInput] = useState()

  const onChangeRequestModal = (tokenId, isName) => {
    setActiveTokenId(tokenId)
    if (isName) {
      setShowChangeNameModal(true)
    } else {
      setShowChangeBioModal(true)
    }
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
    const _balanceOfNft = await nftContract.methods.balanceOf(wallet.address).call()
    console.log('nft balance: ', _balanceOfNft)
    setBalanceOfNft(Number(_balanceOfNft))
  }

  useEffect(() => {
    if (!yieldContract) return

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
            <p>Balance: <span className="text-white">{balanceOfYieldToken}</span></p>
            <p>Pending: <span className="text-white">{claimableBalanceOfYieldToken}</span></p>
          </div>
        </div>

        <SubmitButton onClick={claimYieldRewards} disabled={pendingClaiming || (claimableBalanceOfYieldToken === 0)}>
          { pendingClaiming ? 'Claiming' : 'CLAIM SPLOOT'}
        </SubmitButton>
      </div>

      {
        !balanceOfNft && (
          <div className="not-found-corgi">
            <h3>No corgi found</h3>
            <p>Eget nullam pellentesque cras tellus eu sit amet. Vel velit ut condimentum sit pretium <br/>ultrices tortor convallis. Tempus enim gravida elit magna erat viverra.</p>
          </div>
        )
      }

      {
        balanceOfNft > 0 && (
          <div className="corgi-holdings">
            <CorgiDetails id={10} onChangeRequest={onChangeRequestModal} />
            <CorgiDetails id={19} onChangeRequest={onChangeRequestModal} />
            <CorgiDetails id={14} onChangeRequest={onChangeRequestModal} />
          </div>
        )
      }

      <Modal
        isOpen={showChangeNameModal}
        onRequestClose={() => setShowChangeNameModal(false)}
        style={ChangeFieldModalStyles}
      >
        <div className="change-corgi-modal">
          <h3 className="change-value-title">Change Name</h3>
          <input type="text" id="name" className="corgi-value" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Type Name..." />
          <button className="submit-corgi-change">Change Name</button>
          <p className="change-corgi-fee">Fee 150 Sploot</p>
          <a className="close" onClick={(e) => setShowChangeNameModal(false)} ><img src="/icons/times.svg" /></a>
        </div>
      </Modal>

      <Modal
        isOpen={showChangeBioModal}
        onRequestClose={() => setShowChangeBioModal(false)}
        style={ChangeFieldModalStyles}
      >
        <div className="change-corgi-modal">
          <h3 className="change-value-title">Change Bio</h3>
          <input type="text" id="bio" className="corgi-value" value={bioInput} onChange={(e) => setBioInput(e.target.value)} placeholder="Type Bio..." />
          <button className="submit-corgi-change">Change Bio</button>
          <p className="change-corgi-fee">Fee 150 Sploot</p>
          <a className="close" onClick={(e) => setShowChangeBioModal(false)} ><img src="/icons/times.svg" /></a>
        </div>
      </Modal>
    </div>
  )
}
