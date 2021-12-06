import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import * as Config from '../data/contract'

import { useSelector, useDispatch } from 'react-redux'
import useContract from '../hooks/useContract'

export default function Faq() {
  const wallet = useSelector(state => state.wallet)
  const [
    web3, 
    nftContract, 
    yieldContract
  ] = useContract()

  const [decimalsOfYieldToken, setDecimalsOfYieldToken] = useState(18)
  const [capOfYieldToken, setCapOfYieldToken] = useState(8888888)
  const [totalSupplyOfYieldToken, setTotalSupplyOfYieldToken] = useState(8888888)
  const [baseRate, setBaseRate] = useState(5)
  const [nameChangePrice, setNameChangePrice] = useState(150)

  const fetchYieldTokenInfo = async () => {
    const _decimals = await yieldContract.methods.decimals().call()
    // console.log('decimals: ', _decimals)
    setDecimalsOfYieldToken(Number(_decimals))

    const _cap = await yieldContract.methods.cap().call()
    // console.log('cap: ', _cap)
    setCapOfYieldToken(Number(_cap) / (10 ** Number(_decimals)))

    const _totalSupply = await yieldContract.methods.totalSupply().call()
    // console.log('total supply: ', _totalSupply)
    setTotalSupplyOfYieldToken(Number(_totalSupply) / (10**Number(_decimals)));

    const _baseRate = await yieldContract.methods.BASE_RATE().call()
    // console.log('base rate: ', _baseRate)
    setBaseRate(Number(_baseRate) / (10**Number(_decimals)))

    const _nameChangePrice = await nftContract.methods.NAME_CHANGE_PRICE().call()
    // console.log('name change price: ', _nameChangePrice)
    setNameChangePrice(Math.ceil(Number(_nameChangePrice) / (10**Number(_decimals))))
  }

  useEffect(() => {
    if (!yieldContract) return

    fetchYieldTokenInfo()
  }, [yieldContract])

  return (
    <div className="about-sploot">
      <Head>
        <title>FAQ | CheekyCorgi.com</title>
      </Head>
      <div className="what-is-sploot">
        <img src="/assets/corgi.svg" /> <span>What is SPLOOT?</span>
      </div>

      <div className="sploot-everything">
        <div className="sploot-explanation">
          <h3>Everything SPLOOT</h3>
          <p>
            SPLOOT sits at the core of everything in the CheekyCorgi universe. As the universe grows more utility will be added.
          </p>
          <div className="three-corgis">
            <img src="/assets/corgi.svg" width="40" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <img src="/assets/corgi.svg" width="40" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <img src="/assets/corgi.svg" width="40" />
          </div>
          <h3>YIELD</h3>
          <p className="yield-sploot">
            Every CheekyCorgi yields <span className="text-yellow text-bold">{baseRate.toLocaleString()} $SPLOOT</span> a day. Every SPLOOT is cute and precious.
          </p>
          <div className="book-icon">
            <img src="/icons/book.svg" />
          </div>
          <h3>Personalize</h3>
          <p className="yield-sploot">
            Personalised name and bio costs <span className="text-yellow text-bold">{nameChangePrice.toLocaleString()} $SPLOOT</span> each. Your corgi is
            ready to meet the whole world in the metaverse.
          </p>
          <div className="book-icon">
            <img src="/icons/governance.svg" />
          </div>
          <h3>Governance</h3>
          <p className="yield-sploot">
            $SPLOOT token will be used for voting in CheekyCorgi community for future roadmap
          </p>
          <div className="book-icon">
            <img src="/icons/purchase.svg" />
          </div>
          <h3>Purchase</h3>
          <p style={{marginBottom: '2rem'}}>
            $SPLOOT token can be used for purchasing CheekyCorgi VX (coming end of Dec) and Corgiland (coming Q1, 2022) and other in game items in CheekyCorgi ecosystem.
          </p>
        </div>

        <div className="sploot-supply-info">
          <div className="info-card">
            <span className="info-card-bgnd"></span>
            <div className="info-card-body">
              <p>
                <span className="text-yellow text-super-bold">$SPLOOT</span> Supply:
              </p>
              <p>{totalSupplyOfYieldToken.toLocaleString()}</p>
              <p style={{marginTop: '27px'}}><span className="text-yellow text-super-bold">$SPLOOT</span> Smart Contract:</p>
              <p>
                <a 
                  href={Config.ETH_SCAN_URL[Config.ACTIVE_NETWORK_ID] + '/address/' + Config.YIELD_TOKEN_CONTRACT_ADDRESS}
                  target="_blank"
                  rel="noreferrer"
                >
                  {Config.ETH_SCAN_URL[Config.ACTIVE_NETWORK_ID] + '/address/' + Config.YIELD_TOKEN_CONTRACT_ADDRESS}
                </a>
              </p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-card-bgnd"></span>
            <div className="info-card-body">
              <p>
                <span className="text-yellow text-super-bold">$SPLOOT</span> is the utility token that fuels the CheekyCorgi ecosystem. It is NOT an investment and has NO economic value.
              </p>
              <p style={{marginTop: '27px'}}>
                Each CheekyCorgi is able to claim {baseRate.toLocaleString()} $SPLOOT tokens per day. Total circulation of $SPLOOT token is {capOfYieldToken.toLocaleString()} only, make every SPLOOT precious and rare.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}