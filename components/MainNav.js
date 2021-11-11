import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function MainNav() {
  const router = useRouter()

  return (
    <nav className="main-nav">
      <Link href="/">
        <img src="/assets/logo.svg" alt="Cheeky Corgi" />
      </Link>

      <div className="right-nav">
        <div className="main-pages">
          <ul>
            <li className={router.pathname == '/' ? 'active' : ''}>
              <Link href="/">
                Home
              </Link>
            </li>
            <li>
              <Link href="/">
                OG Corgis
              </Link>
            </li>
            <li className={router.pathname == '/my-corgis' ? 'active' : ''}>
              <Link href="/my-corgis">
                My Corgis
              </Link>
            </li>
            <li className={router.pathname == '/faq' ? 'active' : ''}>
              <Link href="/faq">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div className="socials">
          <ul>
            <li>
              <a href="https://twitter.com">
                <img src="/assets/twitter.svg" alt="Twitter" />
              </a>
            </li>
            <li>
              <a href="https://discord.com">
                <img src="/assets/discord.svg" alt="Discord" />
              </a>
            </li>
            <li>
              <a href="https://instagram.com">
                <img src="/assets/instagram.svg" alt="Instagram" />
              </a>
            </li>
            <li>
              <a href="https://opensea.com">
                <img src="/assets/opensea.svg" alt="Opensea" />
              </a>
            </li>
          </ul>
        </div>

        <button className="connect">
          Connect Wallet
        </button>
      </div>
    </nav>
  )
}