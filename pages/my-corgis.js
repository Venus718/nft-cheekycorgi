import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import SubmitButton from '../components/SubmitButton'
import CorgiDetails from '../components/CorgiDetails'
import Modal from 'react-modal'

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
            <p>Balance: <span className="text-white">XX</span></p>
            <p>Pending: <span className="text-white">XX</span></p>
          </div>
        </div>

        <SubmitButton>CLAIM SPLOOT</SubmitButton>
      </div>

      <div className="not-found-corgi">
        <h3>No corgi found</h3>
        <p>Eget nullam pellentesque cras tellus eu sit amet. Vel velit ut condimentum sit pretium <br/>ultrices tortor convallis. Tempus enim gravida elit magna erat viverra.</p>
      </div>

      <div className="corgi-holdings">
        <CorgiDetails id={10} onChangeRequest={onChangeRequestModal} />
        <CorgiDetails id={19} onChangeRequest={onChangeRequestModal} />
        <CorgiDetails id={14} onChangeRequest={onChangeRequestModal} />
      </div>

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
