import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Modal from 'react-modal'

const NavigationModalStyles = {
  content: {
    width: '80%',
    maxWidth: '20rem',
    height: '20rem',
    margin: '0 auto',
    top: '30%',
    borderRadius: '1.25rem',
    backgroundColor: '#292521',
    padding: '1.5625rem',
    border: 'none',
    textAlign: 'center'
  }
}


export default function MainNav() {
  const router = useRouter()
  const [showNavModal, setShowNavModal] = useState(false)

  const onShowNavModal = () => {
    setShowNavModal(!showNavModal)
  }

  const beforeNavigate = () => {
    setShowNavModal(false)
  }

  return (
    <>
      <nav className="main-nav">
        <a href="https://cheekycorgi.com" style={{height: '23px'}}>
          <img src="/assets/logo.svg" alt="Cheeky Corgi" />
        </a>

        <button className="toggle-navbar" onClick={onShowNavModal}>
          <div className="menu-button w-nav-button" aria-label="menu" role="button" tabindex="0" aria-controls="w-nav-overlay-0" aria-haspopup="menu" aria-expanded="false">
            <div className={"line-1 " + (showNavModal ? 'expand' : '')}></div>
            <div className={"line-2 " + (showNavModal ? 'expand' : '')}></div>
            <div className={"line-3 " + (showNavModal ? 'expand' : '')}></div>
          </div>
        </button>

        <div className="right-nav">
          <div className="main-pages">
            <ul>
              <li>
                <a href="https://cheekycorgi.com">
                  Home
                </a>
              </li>
              <li className={router.pathname == '/' ? 'active' : ''}>
                <Link href="/">
                  Mint
                </Link>
              </li>
              <li className={router.pathname == '/claim' ? 'active' : ''}>
                <Link href="/claim">
                  Claim
                </Link>
              </li>
              <li className={router.pathname == '/my-corgis' ? 'active' : ''}>
                <Link href="/my-corgis">
                  My Corgis
                </Link>
              </li>
              <li className={router.pathname == '/sploot' ? 'active' : ''}>
                <Link href="/sploot">
                  Sploot
                </Link>
              </li>
              <li>
                <a href="https://cheekycorgi.com/og-corgis">
                  OG Corgis
                </a>
              </li>
              <li>
                <a href="https://mintology.gitbook.io/untitled/" target="_blank" rel="noreferrer">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="socials">
            <ul>
              <li>
                <a href="https://twitter.com/cheeky_corgi">
                  <img src="/assets/twitter.svg" alt="Twitter" />
                </a>
              </li>
              <li>
                <a href="https://discord.com/invite/AAvqHwf2YR">
                  <img src="/assets/discord.svg" alt="Discord" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/cheekycorginft/">
                  <img src="/assets/instagram.svg" alt="Instagram" />
                </a>
              </li>
              <li>
                <a href="https://opensea.com/collection/cheekycorgi">
                  <img src="/assets/opensea.svg" alt="Opensea" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      { showNavModal && (
        <div className="nav-modal--wrapper" onClick={() => setShowNavModal(false)}>
          <div className="nav-modal">
            <div className="nav-modal__item">
              <a href="https://cheekycorgi.com">
                Home
              </a>
            </div>
            <div className="nav-modal__item">
              <Link href="">
                <a href="#" onClick={beforeNavigate}>Mint</a>
              </Link>
            </div>
            <div className="nav-modal__item">
              <Link href="/claim">
                <a href="#" onClick={beforeNavigate}>Claim</a>
              </Link>
            </div>
            <div className="nav-modal__item">
              <Link href="/my-corgis">
                <a href="#" onClick={beforeNavigate}>My Corgis</a>
              </Link>
            </div>
            <div className="nav-modal__item">
              <Link href="/sploot">
                <a href="#" onClick={beforeNavigate}>Sploot</a>
              </Link>
            </div>
            <div className="nav-modal__item">
              <a href="https://cheekycorgi.com/og-corgis">
                OG Corgis
              </a>
            </div>
            <div className="nav-modal__item">
              <a href="https:/ology.gitbook.io/untitled/">
                FAQ
              </a>
            </div>

            <div className="nav-modal__social">
              <a href="https://twitter.com/cheeky_corgi" style={{marginRight: '22px'}} target="_blank" rel="noreferrer">
                <img src="/assets/twitter.svg" alt="Twitter" />
              </a>
              <a href="https://discord.com/invite/AAvqHwf2YR" style={{marginRight: '22px'}} target="_blank" rel="noreferrer">
                <img src="/assets/discord.svg" alt="Discord" />
              </a>
              <a href="https://www.instagram.com/cheekycorginft/" style={{marginRight: '22px'}} target="_blank" rel="noreferrer">
                <img src="/assets/instagram.svg" alt="Instagram" />
              </a>
              <a href="https://opensea.com/collection/cheekycorgi" target="_blank" rel="noreferrer">
                <img src="/assets/opensea.svg" alt="Opensea" />
              </a>
            </div>
          </div>
        </div>
      )
    }
    </>
  )
}