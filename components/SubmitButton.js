import React from 'react'

export default function SubmitButton({onClick, disabled, children}){
  return(
    <div className="submit-button-wrapper">
      <div className="submit-button-shadow">
      </div>
      <button className="submit-button" onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </div>
  )
}
