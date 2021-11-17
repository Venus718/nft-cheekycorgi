import React from 'react'
import * as Config from '../data/contract'

export default function MyCorgis() {

  return (
    <footer className="main-footer">
      <a 
        href={Config.ETH_SCAN_URL[Config.ACTIVE_NETWORK_ID] + '/address/' + Config.CHEEKY_CORGI_CONTRACT_ADDRESS + '#code'} 
        className="smart-contract"
        target="_blank"
      >
        Smart Contract
      </a>

      <div className="copyright">&copy; 2021 CheekyCorgi. All rights reserved</div>

      <div className="socials">
        <a href="https://twitter.com/cheeky_corgi">
          <img src="/assets/twitter.svg" alt="Twitter" />
        </a>
        <a href="https://discord.com/invite/AAvqHwf2YR">
          <img src="/assets/discord.svg" alt="Discord" />
        </a>
        <a href="https://www.instagram.com/cheekycorginft/">
          <img src="/assets/instagram.svg" alt="Instagram" />
        </a>
      </div>
    </footer>
  )
}