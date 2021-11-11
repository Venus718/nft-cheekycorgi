import Head from 'next/head'
import Image from 'next/image'
import SubmitButton from '../components/SubmitButton'

export default function Home() {
  return (
    <div className="home">
      <div className="public-mint-wrapper">
        <h1>Public Mint</h1>
        <p className="comment">
          Adopt a CheekyCorgi now!<br/>
          Max of 5 Corgis per transaction.
        </p>
        <p className="account-info">
          Connected Account: xxxxxx
        </p>
        <p className="hold-info">
          Number of Corgis you own: xx
        </p>

        <div className="checkout-inputs">
          <div className="quantity-wrapper">
            <input type="number" className="quantity-input" />
            <span className="quantity-label">QUANTITY</span>
          </div>

          <div className="token-selector">
            <a href="#">
              Pay By&nbsp;&nbsp;
              <img src="/icons/down.svg" alt="down" />
            </a>
          </div>
        </div>

        <p className="total-price">
          Total Price: 0 ETH
        </p>

        <div className="mint-button-holder">
          <SubmitButton>MINT</SubmitButton>
        </div>
        
        <p className="total-minted">
          Minted Corgi: 7700
        </p>
      </div>
    </div>
  )
}
