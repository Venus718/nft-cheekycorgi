import React from 'react'

export default function Faq() {
  return (
    <div className="about-sploot">
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
            <p>
              <span className="text-yellow text-super-bold">5 $SPLOOT</span> Supply:
            </p>
            <p>XXXXXX</p>
            <p style={{marginTop: '27px'}}><span className="text-yellow text-super-bold">$SPLOOT</span> Smart Contract:</p>
          </div>
        </div>
      </div>
    </div>
  )
}