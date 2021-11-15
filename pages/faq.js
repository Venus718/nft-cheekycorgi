import Head from 'next/head'
import React from 'react'

export default function Faq() {
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
            Every CheekyCorgi yields <span className="text-yellow text-bold">5 $SPLOOT</span> a day. Every SPLOOT is cute and precious.
          </p>
          <div className="book-icon">
            <img src="/icons/book.svg" />
          </div>
          <h3>Personalize</h3>
          <p>
            Personalised name and bio costs <span className="text-yellow text-bold">150 $SPLOOT</span> each. Your corgi is
            ready to meet the whole world in the metaverse.
          </p>
        </div>

        <div className="sploot-supply-info">
          <div className="info-card">
            <span className="info-card-bgnd"></span>
            <div className="info-card-body">
              <p>
                <span className="text-yellow text-super-bold">$SPLOOT</span> Supply:
              </p>
              <p>XXXXXX</p>
              <p style={{marginTop: '27px'}}><span className="text-yellow text-super-bold">$SPLOOT</span> Smart Contract:</p>
              <p>
                <a href="https://etherscan.io/address/0xa9ad7f75ed971a74b4f09fcf680c92cdbc940078">
                  https://etherscan.io/address/0xa9ad7f75ed971a74b4f09fcf680c92cdbc940078
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
                Each CheekyCorgi is able to claim 5 $SPLOOT tokens per day. Total circulation of $SPLOOT token is 8,888,888 only, make every SPLOOT precious and rare.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}