import React from 'react'

export default function SubmitButton({onClick, children}){
  return(
    <div className="submit-button-wrapper">
      <button className="submit-button">
        {children}
      </button>
      <div className="submit-button-shadow">
      </div>
    </div>
  )
}
