import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import SubmitButton from '../components/SubmitButton'
import Modal from 'react-modal'

const CoinSelectionModalStyles = {
  content: {
    width: '19rem',
    height: '17.5rem',
    margin: '0 auto',
    top: '30%',
    borderRadius: '1.25rem',
    backgroundColor: '#292521',
    padding: '1.5625rem',
    border: 'none'
  }
}

const PaymentMethod = ({label, icon, active, onClick}) => {
  const onClickHandler = (e) => {
    e.preventDefault()
    onClick()
  }

  return (
    <div className="payment-item">
      <a
        href="#" 
        className={`payment-item__info ${active ? 'active' : ''}`}
        onClick={onClickHandler}
      >
        <img src={icon} />
        <span>{label}</span>
      </a>
      <div className="payment-item__checked">
      {
        active && <img src="/icons/coin-selected.svg" />
      }
      </div>
    </div>
  )
}

export default function Home() {
  const [showCoinsModal, setShowCoinsModal] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState()

  const [quantity, setQuantity] = useState(0)

  const onSelectCoinsModal = (e) => {
    e.preventDefault()
    setShowCoinsModal(true)
  }

  const onSelectedCoin = (_coin) => {
    setSelectedCoin(_coin)
    setShowCoinsModal(false)
  }

  return (
    <div className="mint">
      <Head>
        <title>Home | CheekyCorgi.com</title>
      </Head>
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
            <input type="number" className="quantity-input" value={quantity} />
            <span className="quantity-label">QUANTITY</span>
          </div>

          <div className="token-selector">
            <a href="#" onClick={onSelectCoinsModal}>
            {
              !selectedCoin ? (
                <div className="not-selected">
                  Pay By&nbsp;&nbsp;
                  <img src="/icons/down.svg" alt="down" />
                </div>
              ) : (
                <div className="selected">
                  <img src={`/icons/coin-${selectedCoin}.svg`} />&nbsp;&nbsp;
                  {selectedCoin.toUpperCase()}&nbsp;&nbsp;
                  <img src="/icons/down.svg" alt="down" />
                </div>
              )
            }
            </a>
          </div>
        </div>

        <p className="total-price">
          Total Price: 0
        </p>

        <div className="mint-button-holder">
          <SubmitButton>MINT</SubmitButton>
        </div>
        
        <p className="total-minted">
          Minted Corgi: xxx / 7700
        </p>
      </div>

      <Modal
        isOpen={showCoinsModal}
        onRequestClose={() => setShowCoinsModal(false)}
        style={CoinSelectionModalStyles}
      >
        <h3 className="payment-selection-title">Select Payment Option</h3>
        <PaymentMethod icon="/icons/coin-eth.svg" label="ETH" active={selectedCoin==='eth'} onClick={() => onSelectedCoin('eth')} />
        <PaymentMethod icon="/icons/coin-shiba.svg" label="Shiba" active={selectedCoin==='shiba'} onClick={() => onSelectedCoin('shiba')} />
        <PaymentMethod icon="/icons/coin-usdt.svg" label="USDT" active={selectedCoin==='usdt'} onClick={() => onSelectedCoin('usdt')} />
        <PaymentMethod icon="/icons/coin-usdc.svg" label="USDC" active={selectedCoin==='usdc'} onClick={() => onSelectedCoin('usdc')} />
      </Modal>
    </div>
  )
}
