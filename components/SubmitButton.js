import React from 'react'

export default function SubmitButton({onClick, children}){
  return(
    <div className="submit-button-wrapper">
      <div className="submit-button-shadow">
      </div>
      <button className="submit-button" onClick={onClick}>
        {children}
      </button>
    </div>
  )
}
