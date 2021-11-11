import Head from 'next/head'
import Image from 'next/image'
import SubmitButton from '../components/SubmitButton'
import CorgiDetails from '../components/CorgiDetails'

export default function MyCorgis() {
  return (
    <div className="my-corgis">
      <h1>My Corgis</h1>
      <div className="sploot-balance-section">
        <div className="sploot-balance">
          <img src="/icons/sploot.svg" />
          <div className="balance-numbers">
            <p>Balance: <span className="text-white">XX</span></p>
            <p>Pending: <span className="text-white">XX</span></p>
          </div>
        </div>

        <SubmitButton>CLAIM SPLOOT</SubmitButton>
      </div>

      <div className="not-found-corgi">
        <h3>No corgi found</h3>
        <p>Eget nullam pellentesque cras tellus eu sit amet. Vel velit ut condimentum sit pretium <br/>ultrices tortor convallis. Tempus enim gravida elit magna erat viverra.</p>
      </div>

      <div className="corgi-holdings">
        <CorgiDetails />
        <CorgiDetails />
        <CorgiDetails />
      </div>
    </div>
  )
}
