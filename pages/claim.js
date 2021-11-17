import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import SubmitButton from '../components/SubmitButton'
import Modal from 'react-modal'

export default function Claim() {
  const [quantity, setQuantity] = useState(0)

  return (
    <div className="claim">
      <Head>
        <title>Claim | CheekyCorgi.com</title>
      </Head>
      <div className="public-mint-wrapper">
        <h1>Exclusive Partnership</h1>
        <p className="comment">
          Friend, here's your free CheekyCorgi<br/>
          buddy for claiming. Cheers to friendship!
        </p>
        <p className="account-info">
          Connected Account: xxxxxx
        </p>
        <p className="hold-info">
          Friendship NFT Found: xx
        </p>

        <div className="checkout-inputs">
          <div className="quantity-wrapper">
            <input type="number" className="quantity-input" value={quantity} />
            <span className="quantity-label">QUANTITY</span>
          </div>
        </div>

        <p className="total-price">
          Total Price: 0
        </p>

        <div className="mint-button-holder">
          <SubmitButton>CLAIM FOR FREE (EXCLUDE GAS)</SubmitButton>
        </div>
        
        <p className="total-minted">
          Total supply: 300
        </p>

        <p className="claimable-nfts">
          Reserved for ApprovingCorgis, JunkyardDogs, PudgyPenguins holders
        </p>
      </div>
    </div>
  )
}
