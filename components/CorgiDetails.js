import React, {useState, useEffect} from 'react'
import axios from 'axios'

import * as Config from '../data/contract'
import { toReduced } from '../utils/address'

export default function CorgiDetails({id, name, bio, uri, onChangeRequest}) {
  const [activeAccordionId, setActiveAccordionId] = useState(-1)
  const [imageUri, setImageUri] = useState()

  const onClickChangeName = (e) => {
    e.preventDefault()
    onChangeRequest(id, true)
  }

  const onClickChangeBio = (e) => {
    e.preventDefault()
    onChangeRequest(id, false)
  }

  const toggleHandler = (accordionId) => {
    if (activeAccordionId !== accordionId) {
      setActiveAccordionId(accordionId)
    } else {
      setActiveAccordionId(-1)
    }
  }

  useEffect(() => {
    if (!uri) return

    const fetchMetaData = async () => {
      try {
        console.log('fetching meta data ...', uri)
        let {data} = await axios.get(uri)
        setImageUri(data.image)
        console.log('image: ', data.image)
      } catch(e) {
      }
    }

    fetchMetaData()
  }, [uri])

  return (
    <div className={`corgi-details ${id <= 0 ? 'hidden' : ''}`}>
      <div className="image-holder">
        <img src={imageUri ?? "/assets/unknown-corgi.png"} />
      </div>

      <div className="details-holder">
        <div className="buttons-row">
          <button onClick={onClickChangeName}>Change Name</button>
          <button onClick={onClickChangeBio}>Change Bio</button>
          <button>
            <a
              href={Config.OPENSEA_URL[Config.ACTIVE_NETWORK_ID] + '/assets/' + Config.NFT_CONTRACT_ADDRESS + '/' + id}
              target="_blank"
              rel="noreferrer"
            >Link to Opensea</a>
          </button>
        </div>

        <Accordion 
          title="Name"
          icon="/icons/name.svg"
          opened={activeAccordionId === 0} 
          toggleHandler={() => toggleHandler(0)}
        >
          <div>
            <div>{name}</div>
          </div>
        </Accordion>
        <Accordion
          title="Bio"
          icon="/icons/bio.svg"
          opened={activeAccordionId === 1}
          toggleHandler={() => toggleHandler(1)}
        >
          <div>
            <div>{bio}</div>
          </div>
        </Accordion>
        <Accordion 
          title="Details"
          icon="/icons/details.svg"
          opened={activeAccordionId === 2}
          toggleHandler={() => toggleHandler(2)}
        >
          <div className="d-flex space-between">
            <div>Contract Address</div>
            <div className="text-yellow text-bold">
            <a 
              href={Config.ETH_SCAN_URL[Config.ACTIVE_NETWORK_ID] + '/address/' + Config.NFT_CONTRACT_ADDRESS} 
              className="smart-contract"
              target="_blank"
              rel="noreferrer"
            >
              {toReduced(Config.NFT_CONTRACT_ADDRESS, 4)}
            </a>
            </div>
          </div>
          <div className="d-flex space-between">
            <div>Token ID</div>
            <div className="text-white">{id}</div>
          </div>
          <div className="d-flex space-between">
            <div>Token Standard</div>
            <div className="text-white">ERC-721</div>
          </div>
          <div className="d-flex space-between">
            <div>Blockchain</div>
            <div className="text-white">Ethereum</div>
          </div>
        </Accordion>
      </div>
    </div>
  )
}

const Accordion = ({title, icon, toggleHandler, opened, children}) => {
  const onClickPanel = (e) => {
    e.preventDefault()
    toggleHandler()
  }

  return (
    <div className="accordion">
      <div className="accordion-panel" onClick={onClickPanel}>
        <div className="accordion-panel__title">
          <img src={icon} />
          <span>{title}</span>
        </div>

        <a href="#">
          {
            opened ? 
              <img src="/icons/up.svg" /> :
              <img src="/icons/down.svg" />
          }
        </a>
      </div>
      {
        opened && (
          <div className="accordion-body">
            {children}
          </div>
        )
      }
    </div>
  )
}