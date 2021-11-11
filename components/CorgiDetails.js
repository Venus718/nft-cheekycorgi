import React, {useState} from 'react'
import {CONTRACT_ADDRESS} from '../data/contract'
import {toReduced} from '../utils/address'

export default function CorgiDetails({id, uri, name, bio}) {
  const [activeAccordionId, setActiveAccordionId] = useState(-1)
  const toggleHandler = (accordionId) => {
    if (activeAccordionId !== accordionId) {
      setActiveAccordionId(accordionId)
    } else {
      setActiveAccordionId(-1)
    }
  }

  return (
    <div className="corgi-details">
      <div className="image-holder">
        <img src="/assets/unknown-corgi.png" />
      </div>

      <div className="details-holder">
        <div className="buttons-row">
          <button>Change Name</button>
          <button>Change Bio</button>
          <button>Link to Opensea</button>
        </div>

        <Accordion 
          title="Name"
          icon="/icons/name.svg"
          opened={activeAccordionId === 0} 
          toggleHandler={() => toggleHandler(0)}
        />
        <Accordion
          title="Bio"
          icon="/icons/bio.svg"
          opened={activeAccordionId === 1}
          toggleHandler={() => toggleHandler(1)}
        />
        <Accordion 
          title="Details"
          icon="/icons/details.svg"
          opened={activeAccordionId === 2}
          toggleHandler={() => toggleHandler(2)}
        >
          <div className="d-flex space-between">
            <div>Contract Address</div>
            <div className="text-yellow text-bold">{toReduced(CONTRACT_ADDRESS, 4)}</div>
          </div>
          <div className="d-flex space-between">
            <div>Token ID</div>
            <div className="text-white">99</div>
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