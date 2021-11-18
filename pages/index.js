import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'

import useContract from '../hooks/useContract'
import useRefresh from '../hooks/useRefresh'

import SubmitButton from '../components/SubmitButton'
import { toReduced } from '../utils/address'
import * as Config from '../data/contract'


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

const ApproveCoinModalStyles = (noIncludingApprove = true) => ({
  content: {
    width: '21rem',
    height: noIncludingApprove ? '22.5rem' : '26.5rem',
    borderRadius: '0',
    margin: '0 auto',
    top: '30%',
    padding: '1rem',
    backgroundColor: '#292521',
    border: '1px solid #FF9136'
  }
})

export default function Home() {
  const wallet = useSelector(state => state.wallet)
  const [
    web3, 
    nftContract, 
    yieldContract, 
    ShibaInu, 
    USDT, 
    USDC
  ] = useContract()
  const { fastRefresh } = useRefresh()

  const [maxQuantity, setMaxQuantity] = useState(10)
  const [paymentMethods, setPaymentMethods] = useState([])

  const [showCoinsModal, setShowCoinsModal] = useState(false)

  const [selectedCoin, setSelectedCoin] = useState()
  const [selectedCoinTitle, setSelectedCoinTitle] = useState()
  const [quantity, setQuantity] = useState(0)
  const [unitPrice, setUnitPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const [totalSupply, setTotalSupply] = useState()
  const [balanceOf, setBalanceOf] = useState(0)
  const [statusLoaded, setStatusLoaded] = useState(false)

  const [noNeedApprove, setNoNeedApprove] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)

  const activePaymentMethod = () => paymentMethods.find(e => e.name === selectedCoin)

  const onChangeQuantityInput = (e) => {
    e.preventDefault()
    const _newValue = Number(e.target.value)
    if (_newValue >= 0 && _newValue <= maxQuantity) {
      setQuantity(_newValue)
    }
  }

  const onSelectCoinsModal = (e) => {
    e.preventDefault()
    setShowCoinsModal(true)
  }

  const onSelectedCoin = (_coin) => {
    setSelectedCoin(_coin)
    setShowCoinsModal(false)
  }

  const onClickMint = () => {
    console.log('public minting')

    setShowCheckoutModal(true)
  }

  useEffect(() => {
    const fetchReadOnlyStatus = async () => {
      let _maxQuantity = await nftContract.methods.maxPublicQuantity().call()
      let _token1 = await nftContract.methods.PAYMENT_METHODS(0).call()
      let _token2 = await nftContract.methods.PAYMENT_METHODS(1).call()
      let _token3 = await nftContract.methods.PAYMENT_METHODS(2).call()
      let _publicPriceByEth = await nftContract.methods.publicPrice().call()
      let _balanceOf = await nftContract.methods.balanceOf(wallet.address).call()
      let _totalSupply = await nftContract.methods.totalSupply().call()

      let _paymentMethods = [
        {
          id: 0,
          name: 'eth',
          title: 'ETH',
          displayPrice: Number(web3.utils.fromWei(_publicPriceByEth)),
          price: Number(_publicPriceByEth),
          contract: null,
        },
        {
          id: 1,
          name: 'usdt',
          title: 'USDT',
          displayPrice: Number(_token1.publicPrice),
          price: Number(_token1.publicPrice) * (10**Number(_token1.decimals)),
          contract: USDT,
        },
        {
          id: 2,
          name: 'usdc',
          title: 'USDC',
          displayPrice: Number(_token2.publicPrice),
          price: Number(_token2.publicPrice) * (10**Number(_token2.decimals)),
          contract: USDC,
        },
        {
          id: 3,
          name: 'shiba',
          title: 'Shiba',
          displayPrice: Number(_token3.publicPrice),
          price: Number(_token3.publicPrice) * (10**Number(_token3.decimals)),
          contract: ShibaInu
        },
      ]

      setPaymentMethods(_paymentMethods)
      setMaxQuantity(Number(_maxQuantity))
      setBalanceOf(_balanceOf)
      setTotalSupply(_totalSupply)
      setStatusLoaded(true)
    }

    if (nftContract) {
      fetchReadOnlyStatus()
    }
  }, [nftContract])

  useEffect(() => {
    console.log('recheck allowance')
    if (!activePaymentMethod()) return
    let _unitPrice = activePaymentMethod().displayPrice
    let _price = activePaymentMethod().price
    let _totalPrice = (_unitPrice * quantity).toFixed(2)
    setUnitPrice(_unitPrice)
    setTotalPrice(_totalPrice)
    setSelectedCoinTitle(activePaymentMethod().title)

    if (selectedCoin === 'eth') {
      setNoNeedApprove(true)
    } else {
      setNoNeedApprove(false)
    }
    // check allowance

  }, [selectedCoin, quantity, wallet.address])

  useEffect(() => {
    const fetchTotalSupply = async () => {
      let _totalSupply = await nftContract.methods.totalSupply().call()
      setTotalSupply(_totalSupply)

      console.log('Total Supply: ', _totalSupply)
    }

    if (nftContract) {
      fetchTotalSupply()
    }
  }, [fastRefresh])

  return (
    <div className="mint">
      <Head>
        <title>Home | CheekyCorgi.com</title>
      </Head>
      <div className="public-mint-wrapper">
        <h1>Public Mint</h1>
        <p className="comment">
          Adopt a CheekyCorgi now!<br/>
          Max of {maxQuantity} Corgis per transaction.
        </p>
        <p className="account-info">
          Connected Account: {toReduced(wallet.address, 4)}
        </p>
        <p className="hold-info">
          Number of Corgis you own: {balanceOf}
        </p>

        <div className="checkout-inputs">
          <div className="quantity-wrapper">
            <input 
              type="number" 
              className="quantity-input"
              value={quantity}
              onChange={onChangeQuantityInput} 
              disabled={!statusLoaded}
            />
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
          {
            selectedCoin ?
              (
                <>
                  Total Price: {totalPrice}
                </>
              ) :
              (
                <>Please select &quot;Pay By&quot;</>
              )
          }
          
        </p>

        <div className="mint-button-holder">
          <SubmitButton onClick={onClickMint} disabled={!totalPrice}>MINT</SubmitButton>
        </div>
        
        <p className="total-minted">
          Minted Corgi: {totalSupply} / 7700
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

      <Modal
        isOpen={showCheckoutModal}
        onRequestClose={() => setShowCheckoutModal(false)}
        style={ApproveCoinModalStyles(noNeedApprove)}
      >
        <div className="approve-token-modal">
          <div className="approve-token-modal__title-bar">
            <div>
              <h2>
                Approve Checkout
              </h2>
              <h3>
                for minting CheekyCorgi
              </h3>
            </div>

            <a className="close" onClick={() => setShowCheckoutModal(false)} >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.80241 0.936218L9.11976 0.261684C8.93504 0.0769682 8.62986 0.0769682 8.43711 0.261684L5.03189 3.6668L1.56249 0.197435C1.3777 0.0126389 1.07251 0.0126389 0.879843 0.197435L0.197192 0.88008C0.0123944 1.0648 0.0123944 1.36998 0.197192 1.56273L3.65863 5.02414L0.261441 8.43736C0.0767242 8.62208 0.0767242 8.92726 0.261441 9.12001L0.944092 9.80265C1.12881 9.98737 1.43399 9.98737 1.62674 9.80265L5.03189 6.39746L8.43711 9.80265C8.62182 9.98737 8.92701 9.98737 9.11976 9.80265L9.80241 9.12001C9.98713 8.93529 9.98713 8.63011 9.80241 8.43736L6.38915 5.03217L9.79438 1.62705C9.98713 1.43415 9.98713 1.12896 9.80241 0.936218Z" fill="#FFF"/>
              </svg>
            </a>
          </div>

          <div className="approve-token-modal__body">
            <p>Kindly approve the transaction in your wallet</p>
            <div className="selected-tokens-info">
              <div className="token-label">
                <img src={`/icons/coin-${selectedCoin}2.svg`} />
                <div className="token-label__name">{selectedCoinTitle}</div>
              </div>
              <div className="token-amount">{totalPrice}</div>
            </div>

            <div className="checkout-info">
              <div className="checkout-info__row">
                <div>Unit Price</div>
                <div>{unitPrice} {selectedCoinTitle}</div>
              </div>
              <div className="checkout-info__row">
                <div>Quantity</div>
                <div>{quantity}</div>
              </div>
              <div className="checkout-info__row">
                <div>Total Price</div>
                <div>{totalPrice} {selectedCoinTitle}</div>
              </div>
            </div>
          </div>

          {
            !noNeedApprove && (
              <div className="approve-token-modal__confirm">
                <div>Approve your {selectedCoinTitle} to be paid<br/>into CheekyCorgi</div>
                <button>Approve</button>
              </div>
            )
          }

          <button className="checkout">Checkout</button>
        </div>
      </Modal>
    </div>
  )
}
