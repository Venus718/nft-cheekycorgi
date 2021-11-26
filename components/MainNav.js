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
    setShowNavModal(true)
  }

  const beforeNavigate = () => {
    setShowNavModal(false)
  }

  return (
    <nav className="main-nav">
      <a href="https://cheekycorgi.com" style={{height: '23px'}}>
        <img src="/assets/logo.svg" alt="Cheeky Corgi" />
      </a>
      
      <button className="toggle-navbar" onClick={onShowNavModal}>
        <img 
          src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"
        />
      </button>

      <div className="right-nav">
        <div className="main-pages">
          <ul>
            <li className={router.pathname == '/' ? 'active' : ''}>
              <a href="https://cheekycorgi.com">
                Home
              </a>
            </li>
            <li className={router.pathname == '/mint' ? 'active' : ''}>
              <Link href="/mint">
                Mint
              </Link>
            </li>
            <li className={router.pathname == '/claim' ? 'active' : ''}>
              <Link href="/claim">
                Claim
              </Link>
            </li>
            <li>
              <a href="https://cheekycorgi.com/og-corgis">
                OG Corgis
              </a>
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

      <Modal 
        onRequestClose={() => setShowNavModal(false)}
        style={NavigationModalStyles}
        isOpen={showNavModal}
      >
        <div className="nav-modal">
          <div className="nav-modal__item">
            <Link href="/">
              <a href="#" onClick={beforeNavigate}>Home</a>
            </Link>
          </div>
          <div className="nav-modal__item">
            <Link href="/claim">
              <a href="#" onClick={beforeNavigate}>Claim</a>
            </Link>
          </div>
          <div className="nav-modal__item">
            <Link href="/">
              <a href="#" onClick={beforeNavigate}>OG Corgis</a>
            </Link>
          </div>
          <div className="nav-modal__item">
            <Link href="/my-corgis">
              <a href="#" onClick={beforeNavigate}>My Corgis</a>
            </Link>
          </div>
          <div className="nav-modal__item">
            <Link href="/faq">
              <a href="#" onClick={beforeNavigate}>Sploot</a>
            </Link>
          </div>

          <div className="nav-modal__social">
            <ul style={{justifyContent: 'space-between'}}>
              <li>
                <a href="https://twitter.com/cheeky_corgi" target="_blank" rel="noreferrer">
                  <img src="/assets/twitter.svg" alt="Twitter" />
                </a>
              </li>
              <li>
                <a href="https://discord.com/invite/AAvqHwf2YR" target="_blank" rel="noreferrer">
                  <img src="/assets/discord.svg" alt="Discord" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/cheekycorginft/" target="_blank" rel="noreferrer">
                  <img src="/assets/instagram.svg" alt="Instagram" />
                </a>
              </li>
              <li>
                <a href="https://opensea.com/collection/cheekycorgi" target="_blank" rel="noreferrer">
                  <img src="/assets/opensea.svg" alt="Opensea" />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </Modal>
    </nav>
  )
}